import {
  Injectable,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { Redis } from 'ioredis';

import { User } from '../user/entities/user.entity.js';
import { LoginDto } from './dto/login.dto.js';
import { REDIS_CLIENT } from '../redis/redis.provider.js';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwtService: JwtService,

    @Inject(REDIS_CLIENT)
    private readonly redis: Redis,
  ) {}

  // =========================
  // LOGIN
  // =========================

  async login(dto: LoginDto) {
     const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', {
        email: dto.email,
      })
      .getOne();

    if (!user) {
      throw new UnauthorizedException(
        'Email hoặc mật khẩu không đúng',
      );
    }

    const isPasswordValid = await bcrypt.compare(
      dto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException(
        'Email hoặc mật khẩu không đúng',
      );
    }

    // ID riêng cho refresh token
    const jti = randomUUID();

    // Access Token
    const accessToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
      },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: '15m',
      },
    );

    // Refresh Token
    const refreshToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        jti,
      },
      {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '7d',
      },
    );

    // Lưu refresh session vào Redis
    const redisKey = `refresh:${user.id}:${jti}`;

    await this.redis.set(
      redisKey,
      '1',
      'EX',
      7 * 24 * 60 * 60,
    );

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
      },
    };
  }

  // =========================
  // REFRESH
  // =========================

  async refresh(refreshToken: string) {
    let payload: {
      sub: string;
      jti: string;
    };

    try {
      payload = await this.jwtService.verifyAsync(
        refreshToken,
        {
          secret: process.env.JWT_REFRESH_SECRET,
        },
      );
    } catch {
      throw new UnauthorizedException(
        'Refresh token không hợp lệ hoặc đã hết hạn',
      );
    }

    if (!payload.sub || !payload.jti) {
      throw new UnauthorizedException(
        'Refresh token không hợp lệ',
      );
    }

    // Kiểm tra session trong Redis
    const redisKey = `refresh:${payload.sub}:${payload.jti}`;

    const session = await this.redis.get(redisKey);

    if (!session) {
      throw new UnauthorizedException(
        'Refresh token đã bị vô hiệu hóa',
      );
    }

    // Tạo Access Token mới
    const accessToken = await this.jwtService.signAsync(
      {
        sub: payload.sub,
      },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: '15m',
      },
    );

    return {
      accessToken,
    };
  }

  // =========================
  // LOGOUT
  // =========================

  async logout(refreshToken: string) {
    let payload: {
      sub: string;
      jti: string;
    };

    try {
      payload = await this.jwtService.verifyAsync(
        refreshToken,
        {
          secret: process.env.JWT_REFRESH_SECRET,
        },
      );
    } catch {
      return {
        message: 'Đăng xuất thành công',
      };
    }

    const redisKey = `refresh:${payload.sub}:${payload.jti}`;

    // Xóa refresh session
    await this.redis.del(redisKey);

    return {
      message: 'Đăng xuất thành công',
    };
  }
}