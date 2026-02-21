import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { makeCounterProvider } from '@willsoto/nestjs-prometheus';

@Module({
  controllers: [ProductsController],
  providers: [
    ProductsService,
    makeCounterProvider({
      name: 'products_created_total',
      help: 'Total number of products created in the dashboard',
    }),
  ],
})
export class ProductsModule {}
