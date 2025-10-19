import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { EditPostDto } from './dto/update-post.dot';

interface RequestWithUser extends Request {
  user: {
    userId: string;
    email: string;
  };
}

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
  DeletePost(@Param('id') id: string, @Req() req: RequestWithUser) {
    return this.postService.DeletePost(id, req?.user?.userId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  UpdatePost(@Param('id') id: string, @Body() updatePostDto: EditPostDto, @Req() req: RequestWithUser) {
    return this.postService.UpdatePost(id, updatePostDto, req?.user?.userId);
  }
}
