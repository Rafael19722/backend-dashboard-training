import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET || 'senha-super-secreta-do-admin',
            signOptions: { expiresIn: '1h' },
        }),
    ],
    controllers: [AuthController],
})
export class AuthModule {}