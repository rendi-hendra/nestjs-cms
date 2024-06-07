import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostsRequest, PostsResponse } from '../model/posts.model';
import { WebResponse } from '../model/web.model';
import { Auth } from '../common/auth.decorator';
import { User } from '@prisma/client';

@Controller('/api/posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post()
  @HttpCode(200)
  async create(
    @Auth() user: User,
    @Body() request: CreatePostsRequest,
  ): Promise<WebResponse<PostsResponse>> {
    const result = await this.postsService.create(user, request);
    return {
      data: result,
    };
  }

  @Get('/:postsId')
  @HttpCode(200)
  async get(
    @Auth() user: User,
    @Param('postsId', ParseIntPipe) postsId: number,
  ): Promise<WebResponse<PostsResponse>> {
    const result = await this.postsService.get(user, postsId);
    return {
      data: result,
    };
  }
}
