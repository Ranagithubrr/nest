import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Get()
  GetAllPosts() {
    return this.postService.GetAllPosts();
  }

  @Post()
  CreatePost(@Body() createPostDto: CreatePostDto) {
    return this.postService.CreatePost(createPostDto);
  }
}
