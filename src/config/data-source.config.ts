import { ConfigModule, ConfigService } from "@nestjs/config";
import { DataSource, DataSourceOptions } from "typeorm";

ConfigModule.forRoot({
    envFilePath: `.${process.env.NODE_ENV}.env`
});

const configService = new ConfigService();

export const dataConfigOptions: DataSourceOptions = {
    type: 'mssql',
    host: configService.get<string>('DATA_BASE_MSSQL_HOST'),
    username: configService.get<string>('DATA_BASE_MSSQL_USER'),
    password: configService.get<string>('DATA_BASE_MSSQL_PASWORD'),
    port: parseInt(configService.get<string>('DATA_BASE_MSSQL_PORT')),
    database: configService.get<string>('DATA_BASE_MSSQL_DB'),
    //entities: ['dist/data/entities/*.entity.js'],
    migrations: ['dist/data/migrations/*.js'],
    migrationsTableName: 'migrations',
    extra: {
        trustServerCertificate: true,
    }
}
const dataConfig = new DataSource(dataConfigOptions)
export default dataConfig