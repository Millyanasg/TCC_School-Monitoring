import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import type { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { TokenPayload } from './TokenPayload';

@Injectable()
export class JwtStrategyParent extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  private static logger = new Logger(JwtStrategyParent.name);
  constructor(@Inject(ConfigService) config: ConfigService) {
    const JWT_SECRET = config.getOrThrow('JWT_SECRET');

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET,
      passReqToCallback: true,
    });
  }

  public validate(req: Request, payload: TokenPayload) {
    const refreshTokenHeader = req.headers?.authorization as string;
    const refreshTokenCookie = req.cookies?.refresh_token as string;

    const refreshToken = refreshTokenHeader
      ? refreshTokenHeader.split(' ')[1]
      : refreshTokenCookie;

    if (!refreshToken) {
      throw new HttpException('No refresh token', HttpStatus.UNAUTHORIZED);
    }

    if (payload.type !== 'parent') {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    return {
      ...payload,
      refreshToken,
    };
  }
}

export function useParentUser() {
  return AuthGuard('jwt-refresh');
}
