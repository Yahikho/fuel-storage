import { Module } from "@nestjs/common";
import { UserRepositoryStorage } from "./infrastructure/repositories/user.repository-store";
import { UpdateUserUseCase } from "./application/update-user.usecase";
import { EntityManager } from "typeorm";
import { UserUpdateController } from "./infrastructure/controllers/user-update.controller";

@Module({
    providers: [
        UserRepositoryStorage,
        {
            provide: UpdateUserUseCase,
            useFactory: (entityManager: EntityManager) => {
                const userRepositoryStorage = new UserRepositoryStorage(entityManager)
                return new UpdateUserUseCase(userRepositoryStorage)
            }, inject: [EntityManager]
        }
    ],
    controllers: [
        UserUpdateController
    ]
})

export class ProfileModule { }