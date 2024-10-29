import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', // Allow all origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // Specify which methods are allowed
    allowedHeaders: '*', // Allow all headers
  });
  const config = new DocumentBuilder()
    .setTitle('Movies API')
    .setDescription('API documentation')
    .setVersion('1.0').addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT', // Optional: use 'JWT' to indicate the format
      },
      'JWT-auth', // This name ('JWT-auth') will be used to reference the Bearer token
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(4001);
}

bootstrap();