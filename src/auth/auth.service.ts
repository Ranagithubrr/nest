import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {

    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) { }

    async GetUsers() {
        return 'this returns all users'
    }

    async CreateUser(createUserDto: CreateUserDto) {
        if (!createUserDto) {
            throw new BadRequestException('User data is required');
        }
        const userExist = await this.userModel.findOne({ email: createUserDto.email });
        if (userExist) {
            throw new BadRequestException("User already exist");
        }
        try {
            const user = await this.userModel.create(createUserDto);
            return {
                message: 'User created successfully',
                data: user,
            };
        } catch {
            throw new BadRequestException('Failed to create user');
        }
    }

    async LoginUser(loginDto: LoginDto) {
        if (!loginDto) {
            throw new BadRequestException("Credentials must be provided")
        }
        const user = await this.userModel.findOne({ email: loginDto.email });
        if (!user) {
            throw new UnauthorizedException("Invalid Credentials")
        }
        if (user.password !== loginDto.password) {
            throw new UnauthorizedException("Invalid Credentials")
        }
        const { password, ...userWithoutPassword } = user.toObject();
        return {
            message: "Login Success",
            user: userWithoutPassword
        }
    }
}
