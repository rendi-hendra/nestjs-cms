export class PostsResponse {
  id: number;
  title: string;
  content: string;
  author: string;
}

export class CreatePostsRequest {
  title: string;
  content: string;
}
