import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { constants } from './constants';
import { UsersService } from '../users/users.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register(
      {
        secret: constants.secret,
        signOptions: {
          expiresIn : '3600s'
        }
      }
    )
  ],
  providers: [UsersService,AuthService, LocalStrategy,JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
