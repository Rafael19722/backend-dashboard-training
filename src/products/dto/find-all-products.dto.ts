import { IsOptional, IsInt, Min, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FindAllProductsDto {
    @ApiPropertyOptional({ description: 'Actual page', example: 1 })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number = 1;

    @ApiPropertyOptional({ description: 'Items per page', example: 10 })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    limit?: number = 10

    @ApiPropertyOptional({ description: 'Filter per category', example: 'electronics' })
    @IsOptional()
    @IsString()
    category?: string;

    @ApiPropertyOptional({ description: 'search for title', example: 'Gamer' })
    @IsOptional()
    @IsString()
    search?: string;
}