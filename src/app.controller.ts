import { Controller, Get, Post } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {

    constructor(private readonly prisma: PrismaService) {}

    @Post('test-create')
    async createTestProduct() {
        const product = await this.prisma.product.create({
            data: {
                title: 'Monitor Ultrawide',
                price: 1500.50,
                category: 'Eletronic',
                imageUrl: 'http://link-of-monitor/monitor.png',
            },
        });
        return { message: 'Product Created!', product };
    }

    @Get('test-list')
    async listProducts() {
        const products = await this.prisma.product.findMany();
        return { count: products.length, products };
    }
}