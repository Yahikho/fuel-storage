import { Module } from "@nestjs/common";
import { SigninController } from "./infrastructure/controllers/singin.controller";
import { SignInUseCase } from "./application/usecases/signin.usecase";
import { UserRepositoryStorage } from "./infrastructure/repositories/user.repository-storage";
import { EntityManager } from "typeorm";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { LocalStrategy } from "../shared/strategies/local.strategy";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "../shared/strategies/jwt.strategy";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { SignupController } from "./infrastructure/controllers/singup.controller";
import { SignUpUseCase } from "./application/usecases/signup.usecase";
import { EmailVerifiedController } from "./infrastructure/controllers/email-verified.controller";
import { EmailVerifiedUseCase } from "./application/usecases/email-verified.usecase";

@Module({
    imports: [
        PassportModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => {
                return {
                    secret: configService.get<string>('JWT_SECRET_KEY'),
                    signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') },
                }
            }, inject: [ConfigService]
        }), ConfigModule
    ],
    providers: [
        UserRepositoryStorage,
        LocalStrategy,
        JwtStrategy,
        {
            provide: SignInUseCase,
            useFactory: (
                entityManager: EntityManager,
                jwtService: JwtService
            ) => {
                const userRepositoryStorage = new UserRepositoryStorage(entityManager)
                return new SignInUseCase(userRepositoryStorage, jwtService)
            }, inject: [EntityManager, JwtService]
        },
        {
            provide: SignUpUseCase,
            useFactory: (
                entityManager: EntityManager,
                jwtService: JwtService
            ) => {
                const userRepositoryStorage = new UserRepositoryStorage(entityManager)
                return new SignUpUseCase(userRepositoryStorage, jwtService)
            }, inject: [EntityManager, JwtService]
        },
        {
            provide: EmailVerifiedUseCase,
            useFactory: (entityManager: EntityManager) => {
                const userRepositoryStorage = new UserRepositoryStorage(entityManager)
                return new EmailVerifiedUseCase(userRepositoryStorage)
            }, inject: [EntityManager]
        }
    ],
    controllers: [
        SigninController,
        SignupController,
        EmailVerifiedController,
    ]
})

export class AuthModule { }