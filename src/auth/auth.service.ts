import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(@InjectModel(User.name) private readonly userModel: Model<User>,
        private jwtService: JwtService,
    ) { }

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
            const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
            const user = await this.userModel.create({
                ...createUserDto,
                password: hashedPassword
            });
            const { password, ...userWithoutPassword } = user.toObject();
            return {
                message: 'User created successfully',
                data: userWithoutPassword,
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

        if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
            throw new UnauthorizedException("Invalid Credentials")
        }
        const { password, ...userWithoutPassword } = user.toObject();
        const payload = { email: user.email, name: user.name };

        const access_token = this.jwtService.sign(payload);

        return {
            message: "Login Success",
            user: userWithoutPassword,
            access_token
        }
    }
}
