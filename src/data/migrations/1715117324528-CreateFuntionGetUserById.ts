import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFuntionGetUserById1715117324528 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE FUNCTION [dbo].[GetUserById](
            @id INT
        )
        RETURNS TABLE
        RETURN (SELECT * FROM [dbo].[user] WHERE id = @id)
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        DROP FUNCTION [dbo].[GetUserById];
        `)
    }

}
