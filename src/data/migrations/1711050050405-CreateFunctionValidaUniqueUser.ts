import { MigrationInterface, QueryRunner } from "typeorm";

export class ValidaUniqueUserFunction1711050050405 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE FUNCTION dbo.ValidaUniqueUser (
            @userName NVARCHAR(100),
            @email NVARCHAR(100)
        )
        RETURNS INT
        AS
        BEGIN
            DECLARE @userCount INT;
    
            SELECT @userCount = COUNT(*)
            FROM dbo.[user]
            WHERE user_name = @userName OR email = @email;
    
            RETURN @userCount;
        
        END;
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP FUNCTION dbo.ValidaUniqueUser
        `)
    }

}
