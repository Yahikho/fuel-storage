import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserCreatenModel } from "src/auth/domain/models/user-create.model";
import { UserRepository } from "src/auth/domain/repositories/user.respository";
import { CryptPassword } from "src/shared/config/crypt-password";

@Injectable()

export class SignUpUseCase {

    constructor(
        private readonly userRepository: UserRepository,
    ) { }

    async execute(user: UserCreatenModel) {
        try {
            const userExist = await this.userRepository.findByUserOrEmail(user.user_name, user.email)
            if (userExist) {
                return {
                    code: HttpStatus.CONFLICT,
                    response: false,
                    message: 'The username or email is already used.'
                }
            } else {
                user.password = await CryptPassword.hash(user.password)
                user.user_name = user.user_name.toLocaleLowerCase()
                user.email = user.email.toLocaleLowerCase()
                const userCreated = await this.userRepository.create(user)
                if (userCreated) {
                    const createCodeEmailVerified = await this.userRepository.createCodeEmailVerified(userCreated.id)
                    if (createCodeEmailVerified) {
                        return {
                            code: HttpStatus.CREATED,
                            response: true,
                            message: 'User has be created'
                        }
                    } else {
                        return {
                            code: HttpStatus.INTERNAL_SERVER_ERROR,
                            response: false,
                            message: 'Error to generated code email verified.'
                        }
                    }
                    
                } else {
                    return {
                        code: HttpStatus.CONFLICT,
                        response: false,
                        message: 'The user was not created, try again.'
                    }
                }
            }
        } catch (err) {
            console.error(err)
            throw new HttpException({
                response: false,
                message: 'Erro -> SignUpUseCase'
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}