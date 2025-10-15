import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './schema/post.schema';
import { Model } from 'mongoose';

@Injectable()
export class PostService {

    constructor(@InjectModel(Post.name) private readonly postModel: Model<Post>) { }

    async GetAllPosts() {
        try {
            return await this.postModel.find();
        } catch {
            throw new BadRequestException()
        }
    }

    CreatePost(createPostDto: CreatePostDto) {
        return createPostDto
    }
}
