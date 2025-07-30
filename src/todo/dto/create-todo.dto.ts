import { IsString, IsBoolean, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTodoDto {
    @ApiProperty({ example: 'Buy groceries'})
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ example: 'demo description'})
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ example: false })
    @IsBoolean()
    @IsNotEmpty()
    completed: boolean;

    @IsOptional()
    createdAt?: Date;

    @IsOptional()
    updatedAt?: Date;
}
