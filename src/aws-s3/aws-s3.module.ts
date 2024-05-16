import { Module } from "@nestjs/common";
import { NewObjectController } from "./infrastructure/controllers/new-object.controller";
import { CreateObjectUseCase } from "./application/create-object.usecase";
import { UserRepositoryStorage } from "./infrastructure/repositories/user.respository-storage";
import { EntityManager } from "typeorm";
import { GetObjectController } from "./infrastructure/controllers/get-object.controller";
import { ListObjectController } from "./infrastructure/controllers/list-object.controller";
import { ListObjectUseCase } from "./application/list-object.usecase";
import { GetObjectUseCase } from "./application/get-object.usecase";

@Module({
    providers: [
        UserRepositoryStorage,
        {
            provide: CreateObjectUseCase,
            useFactory: (entityManager: EntityManager) => {
                const userRepositoryStorage = new UserRepositoryStorage(entityManager)
                return new CreateObjectUseCase(userRepositoryStorage)
            }, inject: [EntityManager]
        },
        {
            provide: GetObjectUseCase,
            useFactory: (entityManager: EntityManager) => {
                const userRepositoryStorage = new UserRepositoryStorage(entityManager)
                return new GetObjectUseCase(userRepositoryStorage)
            }, inject: [EntityManager]
        },
        {
            provide: ListObjectUseCase,
            useFactory: (entityManager: EntityManager) => {
                const userRepositoryStorage = new UserRepositoryStorage(entityManager)
                return new ListObjectUseCase(userRepositoryStorage)
            }, inject: [EntityManager]
        }
    ],
    controllers: [
        NewObjectController,
        GetObjectController,
        ListObjectController
    ]
})

export class AWSS3Module { }