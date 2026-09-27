import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { User } from '../user/entities/user.entity.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),

    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-super-secret-access-key',
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}