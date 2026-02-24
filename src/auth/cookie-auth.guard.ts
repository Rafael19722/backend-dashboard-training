import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CookieAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const token = request.cookies?.access_token;

        if (!token) {
            throw new UnauthorizedException('You must be loged in (Cookie not found).');
        }

        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_SECRET || 'senha-super-secreta-do-admin',
            });

            request['user'] = payload;
        } catch {
            throw new UnauthorizedException('Expired Session ou invalid.');
        }

        return true;
    }
}