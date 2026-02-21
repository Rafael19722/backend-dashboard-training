import { IsString, IsNumber, IsUrl, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
    @ApiProperty({
        description: 'The name of the product',
        example: 'Teclado Mecânico',
    })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({
        description: 'The price in USD/BRL',
        example: 350.50,
    })
    @IsNumber()
    price: number;

    @ApiProperty({
        description: 'Product category',
        example: 'Periféricos',
    })
    @IsString()
    @IsNotEmpty()
    category: string;

    @ApiProperty({
        description: 'URL of the product image',
        example: 'https://minhaloja.com/imagens/teclado.jpg',
    })
    @IsUrl()
    @IsNotEmpty()
    imageUrl: string;
}
