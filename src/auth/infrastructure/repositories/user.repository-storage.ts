import { InjectEntityManager } from "@nestjs/typeorm";
import { UserCreatenModel } from "../../domain/models/user-create.model";
import { UserSiginModel } from "../../domain/models/user-sigin.model";
import { UserOutputModel } from "../../domain/models/user-output.model";
import { UserModel } from "../../domain/models/user.model";
import { EntityManager } from "typeorm";
import { UserRepository } from "../../domain/repositories/user.respository";
import { EmailVerifiedModel } from "../../domain/models/email-verified.model";

export class UserRepositoryStorage implements UserRepository {

    constructor(@InjectEntityManager() private readonly maganer: EntityManager) { }

    async findByUser(user: UserSiginModel): Promise<UserModel | null> {

        const result: UserModel[] | null = await this.maganer.query(`
            SELECT * FROM dbo.GetUserBySignin('${user.value}', '${user.password}')
        `)
        if (result) {
            return result[0]
        }
        return null
    }

    async create(user: UserCreatenModel): Promise<UserOutputModel | null> {

        const result: UserOutputModel[] | null = await this.maganer.query(`
            EXEC [dbo].[InsertUser] '${user.user_name}','${user.email}','${user.password}', '${user.access_key_id_aws}', '${user.secret_access_key_aws}'
        `)

        if (result) {
            return result[0]
        }
        return null
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
            DECLARE @isValidResult INT;
            EXEC dbo.ValidaEmailByUser @code = ${code}, @idUser = ${iduser}, @isValid = @isValidResult OUTPUT;
            SELECT @isValidResult AS IsValid;
        `)

        return result[0].IsValid
    }

    async getByUser(code: number, id: number): Promise<EmailVerifiedModel> {
        const result = await this.maganer.query(`
            SELECT * FROM GetByUser(${id}, ${code});
        `)
        return result[0]
    }
}