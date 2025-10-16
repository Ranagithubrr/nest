import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Get()
  GetAllPosts() {
    return this.postService.GetAllPosts();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  CreatePost(@Body() createPostDto: CreatePostDto) {
    return this.postService.CreatePost(createPostDto);
  }
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  DeletePost(@Param('id') id: string) {
    return this.postService.DeletePost(id);
  }
}
