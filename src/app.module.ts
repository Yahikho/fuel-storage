import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configEnvironment from './shared/config/config.environment';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { AWSS3Module } from './aws-s3/aws-s3.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      load: [configEnvironment],
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mssql',
        host: configService.get<string>('DATA_BASE_MSSQL_HOST'),
        username: configService.get<string>('DATA_BASE_MSSQL_USER'),
        password: configService.get<string>('DATA_BASE_MSSQL_PASWORD'),
        port: parseInt(configService.get<string>('DATA_BASE_MSSQL_PORT')),
        database: configService.get<string>('DATA_BASE_MSSQL_DB'),
        //entities: ['dist/data/entities/*.entity.js'],
        migrations: ['dist/data/migrations/*.migration.js'],
        migrationsTableName: 'migrations',
        extra: {
          trustServerCertificate: true,
        }
      }),
      inject: [ConfigService]
    }),

    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('EMAIL_HOST'),
          port: configService.get<number>('EMAIL_PORT'),
          secure: false,
          auth: {
            user: configService.get<string>('EMAIL_USER'),
            pass: configService.get<string>('EMAIL_PASS'),
          }
        }
      }),
      inject: [ConfigService]
    }),
    AWSS3Module,
    ProfileModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
