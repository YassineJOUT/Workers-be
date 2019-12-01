import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { sendMail } from './utilities/sendMail';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3005);
}
bootstrap();
