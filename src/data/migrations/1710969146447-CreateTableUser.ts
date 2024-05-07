import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableUser1710969146447 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE [user] (
            id INT PRIMARY KEY IDENTITY(1,1),
            user_name VARCHAR(100) UNIQUE NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(250) NOT NULL,
            avatar VARCHAR(250) NULL,
            verified BIT NOT NULL DEFAULT 0,
			access_key_id_aws VARCHAR(25) NOT NULL,
			secret_access_key_aws VARCHAR(100) NOT NULL,
            created_at DATETIME2 DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME2 NULL
        );
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE [user] 
        `)
    }

}
