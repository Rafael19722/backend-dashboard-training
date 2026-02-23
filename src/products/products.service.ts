import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter } from 'prom-client';
import { PromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';

@Injectable()
export class ProductsService {
  constructor(
    private readonly prisma: PrismaService,
    @InjectMetric('products_created_total')
    private readonly productsCounter: Counter<string>,
  ) {}

  async generateDescription(productName: string) {
    
    const prompt = PromptTemplate.fromTemplate(
      "Você é um especialista em marketing. Crie uma descrição curta e vendedora para o produto: {product}. Não precisa me confirmar que entendeu, apenas me dê a descrição curta,"
    );

    const model = new ChatGoogleGenerativeAI({
      model: "gemini-2.5-flash",
      temperature: 0.7,
    });

    const parser = new StringOutputParser();

    const chain = prompt.pipe(model).pipe(parser);

    const result = await chain.invoke({ product: productName });
    
    return { description: result };
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

    if (!product.description) {
      const aiResponse = await this.generateDescription(product.title);

      const updateProduct = await this.prisma.product.update({
        where: { id },
        data: {
          description: aiResponse.description,
        },
      });

      return updateProduct;
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
