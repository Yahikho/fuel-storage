import { InjectRepository } from "@nestjs/typeorm";
import { UserCreatenModel } from "src/auth/domain/models/user-create.model";
import { UserSiginModel } from "src/auth/domain/models/user-sigin.model";
import { UserOutputModel } from "src/auth/domain/models/user-output.model";
import { UserModel } from "src/auth/domain/models/user.model";
import { User } from "src/data/entities/user.entity";
import { Repository } from "typeorm";
import { UserRepository } from "src/auth/domain/repositories/user.respository";

export class UserRepositoryStorage implements UserRepository {

    constructor(@InjectRepository(User) private readonly userEntity: Repository<User>) { }

    async findByUser(user: UserSiginModel): Promise<UserModel> {
        return await this.userEntity.findOne({
            where: { ...user }
        })
    }

    async create(user: UserCreatenModel): Promise<UserOutputModel> {
        const userCreated = await this.userEntity
            .createQueryBuilder()
            .insert()
            .into(User)
            .values({ ...user })
            .returning('*')
            .execute()

        return userCreated.raw
    }
}