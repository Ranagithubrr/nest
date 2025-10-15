import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";

export enum Role {
    ADMIN = 'admin',
    USER = 'user',
}

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    @IsEnum(Role)
    role: Role
}