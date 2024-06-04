import { UserModel } from "src/aws-s3/domain/models/user.model";
import { UserRepository } from "../../domain/repositories/user-repository";
import { EntityManager } from "typeorm";
import { InjectEntityManager } from "@nestjs/typeorm";

export class UserRepositoryStorage implements UserRepository {

    constructor(@InjectEntityManager() private readonly maganer: EntityManager) { }

    async getUserById(id: number): Promise<UserModel | null> {
        const result = await this.maganer.query(`
            SELECT * FROM dbo.GetUserById(${id})
        `)
        if (result) {
            return result[0]
        }
        return null
    }

}