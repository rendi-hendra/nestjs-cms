import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { UserModule } from './user/user.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [CommonModule, UserModule, PostsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
