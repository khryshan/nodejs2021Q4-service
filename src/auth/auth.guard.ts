import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    try {
      const authHeader = request.headers.authorization;

      if (authHeader !== undefined) {
        const [props, token] = authHeader.split(' ');

        if (props !== 'Bearer') {
          throw new UnauthorizedException('Unauthorized user');
        } else {
          const user = this.jwtService.verify(token);
          request.user = user;

          return true;
        }
      } else {
        throw new UnauthorizedException('Unauthorized user');
      }
    } catch (err) {
      throw new UnauthorizedException('Unauthorized user');
    }
  }
}
