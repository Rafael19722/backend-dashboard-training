import { Controller, Post, Body, Res, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Response } from 'express';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private jwtService: JwtService) {}

    @Post('login')
    async login(
        @Body() body: LoginDto,
        @Res({ passthrough: true }) response: Response
    ) {
        if (body.email !== 'admin@loja.com' || body.password !== '123456') {
            throw new UnauthorizedException('Invalid Credentials');
        }

        const payload = { sub: 1, role: 'admin' };
        const token = await this.jwtService.signAsync(payload);

        response.cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60,
        });

        return { message: 'Login with success!' };
    }

    @Post('logout')
    async logout(@Res({ passthrough: true }) response: Response) {
        response.clearCookie('access_token');
        return { message: 'Logout with success!' };
    }
}