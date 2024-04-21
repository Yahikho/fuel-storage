import { HttpException, HttpStatus } from "@nestjs/common";
import { UserRepository } from "src/auth/domain/repositories/user.respository";

export class EmailVerifiedUseCase {

    constructor(private readonly userRepository: UserRepository) { }

    async execute(code: number, iduser: number) {
        try {

            //const resultEmailVerified = await this.userRepository.validaEmailByUser(code, iduser)

            return {
                code: HttpStatus.OK,
                response: true
            }
        } catch (err) {
            throw new HttpException({
                response: false,
                message: 'Error: EmailVerified'
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}