import { Module } from "@nestjs/common";
import { UploadFileController } from "./infrastructure/controllers/uploap-file.controller";
import { CreateObjectUseCase } from "./application/creeate-object.usecase";
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
    controllers: [UploadFileController]
})

export class AWSS3Module { }