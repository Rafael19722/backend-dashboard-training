import { IsString, IsNumber, IsUrl, IsNotEmpty } from 'class-validator';

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsNumber()
    price: number;

    @IsString()
    @IsNotEmpty()
    category: string;

    @IsUrl()
    @IsNotEmpty()
    imageUrl: string;
}
