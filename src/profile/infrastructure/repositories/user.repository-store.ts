import { EmailVerifiedModel } from "src/profile/domain/models/user-update.model";
import { ProfileRepository } from "../../domain/repositories/profile.repository";
import { InjectEntityManager } from "@nestjs/typeorm";
import { EntityManager } from "typeorm";

export class UserRepositoryStorage implements ProfileRepository {

    constructor(@InjectEntityManager() private readonly manager: EntityManager) { }

    async udateUser(userUpdate: EmailVerifiedModel): Promise<number> {
        const result = await this.manager.query(`
            DECLARE @isValidResult INT;
            EXEC dbo.[UpdateUser] @@userId = ${userUpdate.id}, @@password = ${userUpdate.password}, @@avatar = ${userUpdate.avatar ? userUpdate : null} @isValid = @isValidResult OUTPUT;
            SELECT @isValidResult AS IsValid;
        `)

        console.log(result)

        return result[0]
    }
}