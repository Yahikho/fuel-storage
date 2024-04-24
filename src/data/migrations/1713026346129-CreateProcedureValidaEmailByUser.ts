import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProcedureValidaEmailByUser1713026346129 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE PROCEDURE [dbo].[ValidaEmailByUser](
            @code INT,
            @idUser INT,
            @isValid INT OUTPUT
        )
        AS
        BEGIN
            DECLARE @rowCount INT;
        
            DELETE FROM dbo.email_verified WHERE user_id = @idUser AND code = @code;
            SET @rowCount = @@ROWCOUNT;
        
            IF @rowCount > 0
            BEGIN
                SET @isValid = 1;
            END
            ELSE
            BEGIN
                SET @isValid = 0;
            END
        
            IF @isValid = 1
            BEGIN
                UPDATE dbo.[user] SET verified = 1 WHERE id = @idUser;
                SET @rowCount = @@ROWCOUNT;
        
                IF @rowCount > 0
                BEGIN
                    SET @isValid = 1;
                END
                ELSE
                BEGIN
                    SET @isValid = 0;
                END
            END
        END
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP PROCEDURE DBO.ValidaEmailByUser
        `)
    }

}
