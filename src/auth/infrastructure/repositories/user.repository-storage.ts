import { InjectEntityManager, InjectRepository } from "@nestjs/typeorm";
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
            SELECT * FROM dbo.GetUserBySignin('${user.user_name}', '${user.user_name}', '${user.password}')
        `)
        return result[0]
    }

    async create(user: UserCreatenModel): Promise<UserOutputModel> {

        const result: UserOutputModel = await this.maganer.query(`
            EXEC [dbo].[InsertUser] '${user.user_name}','${user.email}','${user.password}', '${user.avatar}'
        `)

        return result

        /*const userCreated = await this.userEntity
            .createQueryBuilder()
            .insert()
            .into(User)
            .values({ ...user })
            .returning('*')
            .execute()

        return userCreated.raw*/
    }
}