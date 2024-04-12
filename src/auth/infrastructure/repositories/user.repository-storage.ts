import { InjectEntityManager } from "@nestjs/typeorm";
import { UserCreatenModel } from "src/auth/domain/models/user-create.model";
import { UserSiginModel } from "src/auth/domain/models/user-sigin.model";
import { UserOutputModel } from "src/auth/domain/models/user-output.model";
import { UserModel } from "src/auth/domain/models/user.model";
import { EntityManager } from "typeorm";
import { UserRepository } from "src/auth/domain/repositories/user.respository";

export class UserRepositoryStorage implements UserRepository {

    constructor(@InjectEntityManager() private readonly maganer: EntityManager) { }

    async findByUser(user: UserSiginModel): Promise<UserModel> {

        const result: UserModel[] = await this.maganer.query(`
            SELECT * FROM dbo.GetUserBySignin('${user.value}', '${user.password}')
        `)
        return result[0]
    }

    async create(user: UserCreatenModel): Promise<UserOutputModel> {

        const result: UserOutputModel = await this.maganer.query(`
            EXEC [dbo].[InsertUser] '${user.user_name}','${user.email}','${user.password}', '${user.avatar}'
        `)

        return result
    }

    async findByUserOrEmail(username: string, email: string): Promise<number> {

        const result: [{ total: number }] = await this.maganer.query(`
            SELECT dbo.ValidaUniqueUser('${username}', '${email}') AS total
        `)
        return result[0].total
    }
}