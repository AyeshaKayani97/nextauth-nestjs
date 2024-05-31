import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // app.use(morgan('dev'));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(8000);
}
bootstrap();
