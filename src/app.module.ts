import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configEnvironment from './config/config.environment';

@Module({
  imports: [
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
        entities: [__dirname + '**/*.entity{.ts,.js}'],
        migrations: [__dirname + '**/*.migration{.ts,.js}'],
        migrationsTableName: 'migrations',
        synchronize: true,
        extra: {
          trustServerCertificate: true,
        }
      }),
      inject: [ConfigService]
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
