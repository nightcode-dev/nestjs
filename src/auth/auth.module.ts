import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtStrategy } from './jwt.strategy';
import { User } from './user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  PassportModule.register({
    defaultStrategy:"jwt"
  }),
  JwtModule.register({
    secret:'safePassword',
    signOptions:{
      expiresIn:3600
    }
  })
],
  controllers: [AuthController],
  providers: [AuthService,jwtStrategy],
  exports:[jwtStrategy,PassportModule]
})
export class AuthModule {}
