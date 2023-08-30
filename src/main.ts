import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swager Connect
  const config = new DocumentBuilder()
    .setTitle('Budget API')
    .setDescription('The budget API description')
    .setVersion('1.0')
    .addTag('Budget')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // for validation like class-validator
  app.useGlobalPipes(new ValidationPipe({
    // whitelist needs to check only that params that we have, and disallow other custom params
    whitelist: true,
    // transform allows nest to use dto as a response type object
    transform: true,
    transformOptions: {
      enableImplicitConversion: true
    },
  }),
  );
  await app.listen(3000);
}
bootstrap();
