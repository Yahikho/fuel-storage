import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertUserSP1711052370304 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE PROCEDURE dbo.InsertUser(
            @user_name NVARCHAR(100),
            @email NVARCHAR(100),
            @password NVARCHAR(250),
            @avatar NVARCHAR(250) = NULL)
        AS
            BEGIN 
        
            INSERT INTO dbo.[user] (user_name,email,password,avatar)
            VALUES (@user_name,@email,@password,@avatar);
        
            DECLARE @idUserCreated INT;
            SET @idUserCreated = SCOPE_IDENTITY();
        
            SELECT id,user_name,email,avatar FROM dbo.[user] WHERE id = @idUserCreated;
        
        END 
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        DROP PROCEDURE dbo.InsertUser
        `)
    }

}
