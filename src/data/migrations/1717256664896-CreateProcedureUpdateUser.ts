import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProcedureUpdateUser1717256664896 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE PROCEDURE UpdateUser(
            @id INT,
            @password NVARCHAR(250),
            @avatar NVARCHAR(250),
            @isUpdate INT OUTPUT
        )
        AS
        BEGIN
            DECLARE @rowCount INT;
        
            UPDATE [dbo].[user] SET password = @password, avatar = @avatar WHERE id = @id
            SET @rowCount = @@ROWCOUNT;
        
            IF @rowCount > 0
            BEGIN
                SET @isUpdate = 1;
            END
            ELSE
            BEGIN
                SET @isUpdate = 0;
            END
        END
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP PROCEDURE UpdateUser;
        `)
    }

}
