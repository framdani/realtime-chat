import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors(); // to enable two separate application on different ports to interact or share resources
  await app.listen(3000);
}
bootstrap();
