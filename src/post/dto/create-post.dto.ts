import { IsMongoId, IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CreatePostDto {
    @IsString()
    @IsNotEmpty()
    title: string;


    @IsString()
    @IsNotEmpty()
    description: string;


    @IsString()
    @IsNotEmpty()
    @IsUrl()
    thumbnail: string;

    @IsString()
    @IsNotEmpty()
    author: string;

    @IsString()
    @IsNotEmpty()
    @IsMongoId()
    authorId: string;

}