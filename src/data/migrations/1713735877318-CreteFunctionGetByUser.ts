import { MigrationInterface, QueryRunner } from "typeorm";

export class CreteFunctionGetByUser1713735877318 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE FUNCTION GetByUser(
            @code INT
        )
        RETURNS TABLE
        AS
        RETURN (
        SELECT * FROM dbo.email_verified WHERE code = @code)        
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP FRUNCTION getByUser;
        `)
    }

}
