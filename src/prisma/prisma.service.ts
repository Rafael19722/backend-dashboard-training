import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    //start
    async onModuleInit() {
        await this.$connect();
    }

    //shutdown
    async onModuleDestroy() {
        await this.$disconnect();
    }
}