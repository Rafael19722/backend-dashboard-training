import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter } from 'prom-client';
import { PromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';

@Injectable()
export class ProductsService {
  constructor(
    private readonly prisma: PrismaService,
    @InjectMetric('products_created_total')
    private readonly productsCounter: Counter<string>,
  ) {}

  async generateDescription(productName: string) {
    /* Exemplo de como seria em produção
    const prompt = PromptTemplate.fromTemplate(
      "Você é um especialista em marketing. Crie uma descrição curta e vendedora para o produto: {product}"
    );

    const model = new ChatOpenAI({ apiKey: 'api-key', modelName: 'gpt-4' });

    const parser = new StringOutputParser();

    const chain = prompt.pipe(model).pipe(parser);

    const result = await chain.invoke({ product: productName });
    
    return { description: result }
    */
    return { description: `O produto '${productName}' é a escolha perfeita para quem busca qualidade e alta performance. Aprovete nossa oferta exclusiva!` };
  }

  async create(createProductDto: CreateProductDto) {
    const product = await this.prisma.product.create({
      data: createProductDto,
    });

    this.productsCounter.inc()

    return product;
  }

  async findAll() {
    return this.prisma.product.findMany();
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    await this.findOne(id);

    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.product.delete({
      where: { id },
    });
  }
}
