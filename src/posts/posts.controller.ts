import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostDetailsDto } from './dto/postDetails.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getPosts() {
    return this.postsService.posts();
  }

  @Get(':id')
  getPost(@Param('id', ParseIntPipe) id: number) {
    return id;
    return this.postsService.post(id);
  }

  @Post('user/:id')
  createPost(
    @Param('id', ParseIntPipe) id: number,
    @Body() postDetails: PostDetailsDto,
  ) {
    return this.postsService.createPost(id, postDetails);
  }
}
