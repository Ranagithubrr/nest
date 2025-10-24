import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './schema/post.schema';
import { Model } from 'mongoose';
import { EditPostDto } from './dto/update-post.dot';

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

    async GetSinglePost(id: string) {
        try {
            const post = await this.postModel.findById(id);
            if (!post) {
                throw new NotFoundException("Post not found");
            }
            return post;
        } catch {
            throw new BadRequestException("Failed to fetch post");
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

    async DeletePost(id: string, userId: string) {
        const post = await this.postModel.findById(id);
        if (!post) {
            throw new NotFoundException("Post not found");
        }

        if (post.authorId.toString() !== userId) {
            throw new ForbiddenException("You are not authorized to delete this post");
        }

        await post.deleteOne();

        return {
            message: "Post deleted successfully",
            data: post,
        };
    }


    async UpdatePost(id: string, updatePostDto: EditPostDto, userId: string) {
        const post = await this.postModel.findById(id);
        if (!post) {
            throw new NotFoundException("Post not found");
        }

        if (post.authorId.toString() !== userId) {
            throw new ForbiddenException("You are not authorized to update this post");
        }

        Object.assign(post, updatePostDto);
        await post.save();

        return {
            message: "Post updated successfully",
            data: post,
        };
    }


    async GetAllPostsByUser(userId: string) {
        try {
            return await this.postModel.find({ authorId: userId });
        } catch {
            throw new BadRequestException("Failed to fetch posts for the user")
        }
    }
}
