import { JwtService } from "@nestjs/jwt";
import { UserRepository } from "src/auth/domain/repositories/user.respository";
import { AuthService } from "../services/auth.service";
import { UserSiginModel } from "src/auth/domain/models/user-sigin.model";
import { HttpException, HttpStatus } from "@nestjs/common";
import { CryptPassword } from "../../../shared/config/crypt-password";
import { UserVerified } from "../../domain/services/user-verified.service"

export class SignInUseCase {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService
    ) { }

    async execute(userInput: UserSiginModel) {
        try {
            userInput.password = await CryptPassword.hash(userInput.password)

            const user = await this.userRepository.findByUser(userInput)
            if (user) {

                const authService = new AuthService(this.jwtService)

                const data = await authService.signin(user)

                if (data) {
                    if (UserVerified.execute(user)) {
                        return {
                            code: HttpStatus.OK,
                            response: true,
                            message: 'Success Sigin',
                            data: {
                                access_token: data.access_token
                            }
                        }

                    } else {
                        return {
                            code: HttpStatus.OK,
                            response: false,
                            message: 'User needs to be validated.',
                            data: {
                                access_token: data.access_token
                            }
                        }
                    }
                }

            } else {
                return {
                    code: HttpStatus.UNAUTHORIZED,
                    response: false,
                    message: 'Session variables are incorrect.'
                }
            }
        } catch (err) {
            throw new HttpException({
                response: false,
                message: 'Error -> Auth Sigin'
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}