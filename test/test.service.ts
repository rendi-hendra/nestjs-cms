import { PrismaService } from '../src/common/prisma.service';
import { Injectable } from '@nestjs/common';
import { Post, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class TestService {
  constructor(private prismaService: PrismaService) {}

  async deleteAll() {
    await this.deletePosts();
    await this.deleteUser();
  }

  async deleteUser() {
    await this.prismaService.user.deleteMany({
      where: {
        username: 'test',
      },
    });
  }
  async deletePosts() {
    await this.prismaService.post.deleteMany({
      where: {
        title: 'test',
      },
    });
  }

  async getUser(): Promise<User> {
    return await this.prismaService.user.findUnique({
      where: {
        username: 'test',
      },
    });
  }

  async createUser() {
    await this.prismaService.user.create({
      data: {
        username: 'test',
        name: 'test',
        password: await bcrypt.hash('test', 10),
        token: 'test',
      },
    });
  }

  async createPosts() {
    await this.prismaService.post.create({
      data: {
        title: 'test',
        content: 'test',
        author: 'test',
      },
    });
  }

  async getPosts(): Promise<Post> {
    return await this.prismaService.post.findFirst({
      where: {
        title: 'test',
      },
    });
  }
}
