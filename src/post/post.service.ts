import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
            throw new BadRequestException("Failed to fetch posts")
        }
    }

    async CreatePost(createPostDto: CreatePostDto) {
        try {
            const post = await this.postModel.create(createPostDto)
            return {
                message: "post created successfully",
                data: post
            }
        } catch {
            throw new BadRequestException("Failed to create post")
        }
    }

    async DeletePost(id: string) {
        const post = await this.postModel.findByIdAndDelete(id);
        if (!post) {
            throw new NotFoundException("Post not found");
        }
        return {
            message: "Post deleted successfully",
            data: post
        };
    }

}
