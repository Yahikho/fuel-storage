import { HttpException, HttpStatus } from "@nestjs/common";
import { UserRepository } from "src/auth/domain/repositories/user.respository";
import { VerifiedEmailService } from "src/auth/domain/services/verified-email.service"; 

export class EmailVerifiedUseCase {

    constructor(private readonly userRepository: UserRepository) { }

    async execute(code: number, iduser: number) {
        try {

            const emailVerified = await this.userRepository.getByUser(code,iduser)

            const  isValidEmailVerified = VerifiedEmailService.execute(emailVerified)

            if(isValidEmailVerified){
                const resultEmailVerified = await this.userRepository.validaEmailByUser(code, iduser)
                
                if(resultEmailVerified){
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
            console.log(err)
            throw new HttpException({
                response: false,
                message: 'Error: EmailVerified'
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}