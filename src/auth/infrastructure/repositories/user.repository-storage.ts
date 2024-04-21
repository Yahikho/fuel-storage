import { InjectEntityManager } from "@nestjs/typeorm";
import { UserCreatenModel } from "src/auth/domain/models/user-create.model";
import { UserSiginModel } from "src/auth/domain/models/user-sigin.model";
import { UserOutputModel } from "src/auth/domain/models/user-output.model";
import { UserModel } from "src/auth/domain/models/user.model";
import { EntityManager } from "typeorm";
import { UserRepository } from "src/auth/domain/repositories/user.respository";
import { EmailVerifiedModel } from "src/auth/domain/models/email-verified.model";

export class UserRepositoryStorage implements UserRepository {

    constructor(@InjectEntityManager() private readonly maganer: EntityManager) { }

    async findByUser(user: UserSiginModel): Promise<UserModel> {

        const result: UserModel[] = await this.maganer.query(`
            SELECT * FROM dbo.GetUserBySignin('${user.value}', '${user.password}')
        `)
        return result[0]
    }

    async create(user: UserCreatenModel): Promise<UserOutputModel> {

        const result = await this.maganer.query(`
            EXEC [dbo].[InsertUser] '${user.user_name}','${user.email}','${user.password}', '${user.avatar}'
        `)
        return result[0]
    }

    async findByUserOrEmail(username: string, email: string): Promise<number> {

        const result: [{ total: number }] = await this.maganer.query(`
            SELECT dbo.ValidaUniqueUser('${username}', '${email}') AS total
        `)
        return result[0].total
    }

    async createCodeEmailVerified(id: number): Promise<EmailVerifiedModel> {
        const result = await this.maganer.query(`
            EXEC dbo.CreateCodeEmailVerified ${id}
        `)

        return result[0]
    }

    async validaEmailByUser(code: number, iduser: number): Promise<number> {
        const result = await this.maganer.query(`
            EXEC dbo.ValidaEmailByUser ${code}, ${iduser}
        `)

        return result[0]
    }

    async getByUser(code: number, id: number): Promise<EmailVerifiedModel> {
        const result = await this.maganer.query(`
            SELECT * FROM GetByUser(${id}, ${code});
        `)

        console.log(result)
        return result[0]
    }
}