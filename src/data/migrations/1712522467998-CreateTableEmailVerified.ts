import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableEmailVerified1712522467998 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE dbo.email_verified(
                id INT PRIMARY KEY IDENTITY(1,1),
                code INT,
                created_at DATETIME2 DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME2 NULL,
                user_id INT NOT NULL,
                FOREIGN KEY (user_id) REFERENCES dbo.[user](id)
            )
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE dbo.email_verified
        `)
    }

}
