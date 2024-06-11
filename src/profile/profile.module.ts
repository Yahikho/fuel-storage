import { Module } from "@nestjs/common";
import { UserRepositoryStorage } from "./infrastructure/repositories/user.repository-store";
import { UpdateUserUseCase } from "./application/update-user.usecase";
import { EntityManager } from "typeorm";
import { UserUpdateController } from "./infrastructure/controllers/user-update.controller";
import { GetInfoUserController } from "./infrastructure/controllers/get-info-user.controller";
import { GetInfoUserCase } from "./application/get-info-user.usecase";
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [ConfigModule],
    providers: [
        UserRepositoryStorage,
        {
            provide: UpdateUserUseCase,
            useFactory: (entityManager: EntityManager) => {
                const userRepositoryStorage = new UserRepositoryStorage(entityManager)
                return new UpdateUserUseCase(userRepositoryStorage)
            }, inject: [EntityManager]
        }, {
            provide: GetInfoUserCase,
            useFactory: (entityManager: EntityManager, configService: ConfigService) => {
                const userRepositoryStorage = new UserRepositoryStorage(entityManager)
                return new GetInfoUserCase(userRepositoryStorage, configService)
            }, inject: [EntityManager, ConfigService]
        }
    ],
    controllers: [
        UserUpdateController,
        GetInfoUserController
    ]
})

export class ProfileModule { }