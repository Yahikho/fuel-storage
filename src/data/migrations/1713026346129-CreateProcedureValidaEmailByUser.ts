import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProcedureValidaEmailByUser1713026346129 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE PROCEDURE ValidaEmailByUser(
            @code INT,
            @idUser INT
        )
        AS
        BEGIN
                
            DECLARE @valid INT;
        
            DELETE FROM dbo.email_verified WHERE user_id = @idUser
            AND code = @code;
            
            IF @@ROWCOUNT > 0
            BEGIN
                SET @valid = 1
            END
            ELSE
            BEGIN
                SET @valid = 0
            END
        
            IF @valid = 1
            BEGIN
                UPDATE dbo.[user] SET verified = 1 
                WHERE id = @idUser;
        
                IF @@ROWCOUNT > 0
                BEGIN
                    SET @valid = 1
                END
                ELSE
                BEGIN
                    SET @valid = 0
                END
            END
        
            RETURN @valid
        END
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP PROCEDURE DBO.ValidaEmailByUser
        `)
    }

}
