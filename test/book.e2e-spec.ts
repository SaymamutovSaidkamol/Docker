import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { PrismaService } from './../src/prisma/prisma.service';

describe('BookController (e2e)', () => {
  let app: INestApplication<App>;
  let book_id: string;
  let prisma: PrismaService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    app.useGlobalPipes(new ValidationPipe());
    prisma = moduleFixture.get(PrismaService);
  });

  it('/book POST', async ()=>{
    let created = await request(app.getHttpServer()).post('/book').send({
      name: "Harry Potr"
    })

    expect(created.body).toHaveProperty('id')
    expect(created.body).toHaveProperty('name')
    book_id = created.body.data.id;
  })

  it('/book/single GET', async () => {
    let one = await request(app.getHttpServer()).get(`/book/${book_id}`);

    expect(one.body.data).toHaveProperty('id');
    expect(one.body.data).toHaveProperty('name', 'Alex');
    expect(one.body.data).toHaveProperty('age', 24);
  });

  it('/book/single PATCH', async () => {
    let one = await request(app.getHttpServer())
      .patch(`/book/${book_id}`)
      .send({ name: 'Akmal' });

    expect(one.body.data).toHaveProperty('id');
    expect(one.body.data).toHaveProperty('name', 'Akmal');
    expect(one.body.data).toHaveProperty('age', 24);
  });

  it('/book/single DELETE', async () => {
    let one = await request(app.getHttpServer()).delete(`/book/${book_id}`);

    expect(one.body.data).toHaveProperty('id');
    expect(one.status).toBe(200);
  });

  it('/book/single not found', async () => {
    let one = await request(app.getHttpServer()).get(`/book/${book_id}`);
    console.log(one)
    expect(one.body.status).toBe(404);
  });

  // it('/ (GET)', () => {
  //   return request(app.getHttpServer())
  //     .get('/')
  //     .expect(200)
  //     .expect('Hello World!');
  // });
});
