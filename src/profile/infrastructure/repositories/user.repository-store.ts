import { EmailVerifiedModel } from "src/profile/domain/models/user-update.dto";
import { ProfileRepository } from "../../domain/repositories/profile.repository";
import { InjectEntityManager } from "@nestjs/typeorm";
import { EntityManager } from "typeorm";
import { UserModel } from "../../domain/models/user.model";

export class UserRepositoryStorage implements ProfileRepository {

    constructor(@InjectEntityManager() private readonly manager: EntityManager) { }

    async udateUser(userUpdate: EmailVerifiedModel): Promise<number> {
        const result = await this.manager.query(`
            DECLARE @isValidResult INT;
            EXEC dbo.UpdateUser @id = ${userUpdate.id}, @password = '${userUpdate.password}', @avatar = '${userUpdate.avatar}', @isUpdate = @isValidResult OUTPUT;
            SELECT @isValidResult AS IsUpdate;
        `)
        return result[0].IsUpdate
    }

    async getUserById(id: number): Promise<UserModel | null> {
        const result = await this.manager.query(`
            SELECT * FROM dbo.GetUserById(${id})
        `)
        if (result) {
            return result[0]
        }
        return null
    }
}