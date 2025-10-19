import { IsOptional, IsString, IsUrl } from 'class-validator';

export class EditPostDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    @IsUrl()
    thumbnail?: string;
}
