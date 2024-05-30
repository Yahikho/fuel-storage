import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';

async function bootstrap() {

  const app = await NestFactory.create(AppModule, { cors: true });

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

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    exceptionFactory: (errors) => {
      //customize response request when class-validators act
      throw new HttpException({
        response: false,
        message:
          errors.map(error => error.constraints)
            .map(objeto => Object.values(objeto))
            .reduce((acum, valAct) => acum.concat(valAct), [])
      }, HttpStatus.BAD_REQUEST)
    }
  }))

  await app.listen(port);
}
bootstrap();
