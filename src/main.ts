import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AppModule, {
    cors: true,
  });
  app.enableCors();
  const config: ConfigService = app.get(ConfigService);
  const port: number = config.get<number>('PORT');

  const configSwagger = new DocumentBuilder()
    .setTitle('Ft Transcendence API')
    .setDescription('The Ft Transcendence API description')
    .setVersion('1.0')
    .addTag('Ft Transcendence')
    .build();

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api', app, document);

  app.useStaticAssets(join(__dirname, '..', 'uploads/profile-images'), {
    prefix: '/profile-images',
  });

  await app.listen(port, () => {
    console.log('[WEB]', config.get<string>('BASE_URL'));
  });
}

bootstrap();
