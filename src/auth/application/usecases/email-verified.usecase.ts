import { HttpException, HttpStatus } from "@nestjs/common";
import { UserRepository } from "../../domain/repositories/user.respository"
import { VerifiedEmailService } from "../../domain/services/verified-email.service";

export class EmailVerifiedUseCase {

    constructor(private readonly userRepository: UserRepository) { }

    async execute(code: number) {
        try {

            const emailVerified = await this.userRepository.getByUser(code)

            const isValidEmailVerified = VerifiedEmailService.execute(emailVerified)

            if (isValidEmailVerified) {

                const resultEmailVerified = await this.userRepository.validaEmailByUser(code, emailVerified.user_id)

                if (resultEmailVerified) {
                    return {
                        code: HttpStatus.CREATED,
                        response: true,
                        message: 'Email verified.',
                    }
                }

                return {
                    code: HttpStatus.UNAUTHORIZED,
                    response: false,
                    message: 'Email validation process was not completed.',
                }
            }

            return {
                code: HttpStatus.UNAUTHORIZED,
                response: false,
                message: 'Code Email verified is defeated or params are not valid, please resend code.',
            }

        } catch (err) {
            throw new HttpException({
                response: false,
                message: 'Error: EmailVerified'
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}