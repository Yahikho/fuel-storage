import { MigrationInterface, QueryRunner } from "typeorm";

export class ProcedureCreateCodeEmailVerified1712712793397 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE PROCEDURE CreateCodeEmailVerified(
            @UserId INT
        )
        AS
        BEGIN
            DECLARE @NumeroAleatorio INT;
            DECLARE  @Exists INT;
        
            SET @NumeroAleatorio = FLOOR(RAND() * (9999 - 1000 + 1) + 1000);
        
            SELECT @Exists = COUNT(*) FROM dbo.email_verified WHERE code = @NumeroAleatorio;
        
            WHILE  @Exists > 0
            BEGIN
                SET @NumeroAleatorio = FLOOR(RAND() * (9999 - 1000 + 1) + 1000);
                SELECT @Exists = COUNT(*) FROM dbo.email_verified WHERE code = @NumeroAleatorio;
            END
        
            INSERT INTO dbo.email_verified(code,user_id) VALUES (@NumeroAleatorio, @UserId);
            DECLARE @idEmailVerified INT;
            SET @idEmailVerified = SCOPE_IDENTITY();
        
            SELECT * FROM dbo.email_verified WHERE id = @idEmailVerified;
        
        END
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP PROCEDURE dbo.CreateCodeEmailVerified;
        `)
    }

}
