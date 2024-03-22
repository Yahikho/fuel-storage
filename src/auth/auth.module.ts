import { Module } from "@nestjs/common";
import { SiginController } from "./infrastructure/controllers/singin.controller";
import { SignInUseCase } from "./application/usecases/signin.usecase";
import { UserRepositoryStorage } from "./infrastructure/repositories/user.repository-storage";
import { EntityManager, QueryRunner } from "typeorm";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { InjectEntityManager } from "@nestjs/typeorm";

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: 'TEST',
            signOptions: { expiresIn: '60s' }
        })
    ],
    providers: [
        UserRepositoryStorage,
        {
            provide: SignInUseCase,
            useFactory: (
                entityManager: EntityManager,
                jwtService: JwtService
            ) => {
                const userRepositoryStorage = new UserRepositoryStorage(entityManager)
                return new SignInUseCase(userRepositoryStorage, jwtService)
            }, inject: [EntityManager, JwtService]
        }
    ],
    controllers: [SiginController]
})

export class AuthModule { }