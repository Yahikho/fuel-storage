import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.setGlobalPrefix(configService.get<string>('DAFAULT_PATH_API'))

  const config = new DocumentBuilder()
    .setTitle('API fuel-storage / by Yahiko')
    .setDescription('Rest API about cloud storage with AWS')
    .setVersion('0.1.0')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  const port = configService.get<number>('APP_PORT')
  await app.listen(port);
}
bootstrap();
