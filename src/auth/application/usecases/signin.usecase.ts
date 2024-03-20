import { JwtService } from "@nestjs/jwt";
import { UserRepository } from "src/auth/domain/repositories/user.respository";

export class SignInUseCase {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService
    ) { }

    async execute() {
        try {

        } catch (err) {
            console.error(err)
        }
    }
}