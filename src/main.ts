import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API fuel-storage / by Yahiko')
    .setDescription('Rest API about cloud storage with AWS')
    .setVersion('0.1.0')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  const consfiService = app.get(ConfigService)
  const port = consfiService.get('PORT')
  await app.listen(port);
}
bootstrap();
