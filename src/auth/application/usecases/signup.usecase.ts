import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserCreatenModel } from "src/auth/domain/models/user-create.model";
import { UserRepository } from "src/auth/domain/repositories/user.respository";

@Injectable()

export class SignUpUseCase {

    constructor(
        private readonly userRepository: UserRepository,
    ) { }

    async execute(user: UserCreatenModel) {
        try {
            const userExist = await this.userRepository.findByUserOrEmail(user.user_name, user.email)
            if (userExist) {
                const userCreated = await this.userRepository.create(user)
                if (userCreated) {
                    return {
                        code: HttpStatus.CREATED,
                        response: true,
                        message: 'User has be created'
                    }
                } else {
                    return {
                        code: HttpStatus.CONFLICT,
                        response: false,
                        message: 'The user was not created, try again.'
                    }
                }
            } else {
                return {
                    code: HttpStatus.CONFLICT,
                    response: false,
                    message: 'The username or email is already used.'
                }
            }
        } catch (err) {
            throw new HttpException({
                response: false,
                message: 'Erro -> SignUpUseCase'
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}