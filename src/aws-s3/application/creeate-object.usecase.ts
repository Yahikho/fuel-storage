import { HttpException, HttpStatus } from "@nestjs/common";
import { UserRepository } from "../domain/repositories/user-repository";

export class CreateObjectUseCase {

    constructor(private readonly userRepository: UserRepository) { }

    async execute(userId: number, files: Array<Express.Multer.File>) {
        try {
            const creedentialsAWS = await this.userRepository.getUserById(userId)

            console.log(creedentialsAWS)
            return {
                code: HttpStatus.OK,
                response: true,
                message: 'Ok'
            }
        } catch (err) {
            throw new HttpException({
                response: false,
                message: 'Error -> CreateObjectUseCase'
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}