import { Module } from "@nestjs/common";
import { NewObjectController } from "./infrastructure/controllers/new-object.controller";
import { CreateObjectUseCase } from "./application/create-object.usecase";
import { UserRepositoryStorage } from "./infrastructure/repositories/user.respository-storage";
import { EntityManager } from "typeorm";

@Module({
    providers: [
        UserRepositoryStorage,
        {
            provide: CreateObjectUseCase,
            useFactory: (entityManager: EntityManager) => {
                const userRepositoryStorage = new UserRepositoryStorage(entityManager)
                return new CreateObjectUseCase(userRepositoryStorage)
            }, inject: [EntityManager]
        }
    ],
    controllers: [NewObjectController]
})

export class AWSS3Module { }