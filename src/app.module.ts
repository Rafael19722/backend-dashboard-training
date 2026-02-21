import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino'; 
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    LoggerModule.forRoot({
      pinoHttp: {
        transport: process.env.NODE_ENV !== 'production'
          ? { target: 'pino-pretty', options: { colorize: true } }
          : undefined,
      },
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
