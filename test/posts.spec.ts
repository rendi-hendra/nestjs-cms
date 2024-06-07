import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { TestService } from './test.service';
import { TestModule } from './test.module';

describe('UserController', () => {
  let app: INestApplication;
  let logger: Logger;
  let testService: TestService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TestModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    logger = app.get(WINSTON_MODULE_PROVIDER);
    testService = app.get(TestService);
  });

  describe('POST /api/posts', () => {
    beforeEach(async () => {
      await testService.deleteAll();

      await testService.createUser();
    });
    it('should be rejected if request is invalid', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/posts')
        .set('Authorization', 'test')
        .send({
          title: '',
          content: '',
        });

      logger.info(response.body);

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });

    it('should be able to create posts', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/posts')
        .set('Authorization', 'test')
        .send({
          title: 'test',
          content: 'test',
        });

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data.title).toBe('test');
      expect(response.body.data.content).toBe('test');
    });
  });

  describe('GET /api/posts/:postsId', () => {
    beforeEach(async () => {
      await testService.deleteAll();

      await testService.createUser();
      await testService.createPosts();
    });

    it('should be rejected if posts is not found', async () => {
      const posts = await testService.getPosts();
      const response = await request(app.getHttpServer())
        .get(`/api/posts/${posts.id + 1}`)
        .set('Authorization', 'test');

      logger.info(response.body);

      expect(response.status).toBe(404);
      expect(response.body.errors).toBeDefined();
    });

    it('should be able to create contact', async () => {
      const posts = await testService.getPosts();
      const response = await request(app.getHttpServer())
        .get(`/api/posts/${posts.id}`)
        .set('Authorization', 'test');

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data.id).toBeDefined();
      expect(response.body.data.title).toBe('test');
      expect(response.body.data.content).toBe('test');
      expect(response.body.data.author).toBe('test');
    });
  });
});
