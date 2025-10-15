import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

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
}
