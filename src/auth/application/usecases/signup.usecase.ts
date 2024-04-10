import { Injectable } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { UserCreatenModel } from "src/auth/domain/models/user-create.model";
import { UserRepository } from "src/auth/domain/repositories/user.respository";

@Injectable()

export class SignUpUseCase {

    constructor(
        private readonly userRepository: UserRepository,
    ) { }

    async execute(user: UserCreatenModel) {

        try {
            const userCreated = await this.userRepository.create(user)


        } catch (err) {
            console.error(err)
        }

    }
}