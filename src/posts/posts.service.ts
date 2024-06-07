import { HttpException, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { ValidationService } from '../common/validation.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { CreatePostsRequest, PostsResponse } from 'src/model/posts.model';
import { Post, User } from '@prisma/client';
import { PostsValidation } from './posts.validation';

@Injectable()
export class PostsService {
  constructor(
    private validationService: ValidationService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private prismaService: PrismaService,
  ) {}

  async create(
    user: User,
    request: CreatePostsRequest,
  ): Promise<PostsResponse> {
    this.logger.debug(
      `PostsService.create(${JSON.stringify(user)}, ${JSON.stringify(request)})`,
    );

    const createRequest: CreatePostsRequest = this.validationService.validate(
      PostsValidation.CREATE,
      request,
    );

    const posts = await this.prismaService.post.create({
      data: {
        ...createRequest,
        user: {
          connect: {
            username: user.username,
          },
        },
      },
    });

    return this.toPostsResponse(posts);
  }

  toPostsResponse(posts: Post): PostsResponse {
    return {
      title: posts.title,
      content: posts.content,
      author: posts.author,
      id: posts.id,
    };
  }

  async checkPostsMustExists(author: string, postsId: number): Promise<Post> {
    const posts = await this.prismaService.post.findFirst({
      where: {
        author: author,
        id: postsId,
      },
    });

    if (!posts) {
      throw new HttpException('Post is not found', 404);
    }

    return posts;
  }

  async get(user: User, postsId: number): Promise<PostsResponse> {
    const posts = await this.prismaService.post.findFirst({
      where: {
        author: user.username,
        id: postsId,
      },
    });

    if (!posts) {
      throw new HttpException('Post is not found', 404);
    }

    return this.toPostsResponse(posts);
  }
}
