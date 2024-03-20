import { MigrationInterface, QueryRunner } from "typeorm";

export class GetUserBySigninFunction1710971530804 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE FUNCTION dbo.GetUserBySignin (
            @userName NVARCHAR(50) = NULL,
            @email NVARCHAR(100) = NULL,
            @password NVARCHAR(50)
        )
        RETURNS TABLE
        AS
        RETURN (
            SELECT *
            FROM [user]
            WHERE 
                (@userName IS NOT NULL AND user_name = @userName)
                OR (@email IS NOT NULL AND email = @email)
                AND password = @password
        );
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP FUNCTION dbo.GetUserBySignin;
        `)
    }

}
