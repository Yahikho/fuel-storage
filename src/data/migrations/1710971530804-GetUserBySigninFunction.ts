import { MigrationInterface, QueryRunner } from "typeorm";

export class GetUserBySigninFunction1710971530804 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE FUNCTION dbo.GetUserBySignin (
            @value NVARCHAR(100),
            @password NVARCHAR(300)
        )
        RETURNS TABLE
        AS
        RETURN (
            SELECT *
            FROM [user]
            WHERE
                (user_name = @value OR email = @value)
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
