import { HttpException, HttpStatus } from "@nestjs/common";
import { ProfileRepository } from "../domain/repositories/profile.repository";
import { EmailVerifiedModel } from "../domain/models/user-update.model";

export class UpdateUserUseCase {

    constructor(private readonly profileRepository: ProfileRepository) { }

    async execute(userUpdate: EmailVerifiedModel) {
        try {
            console.log(userUpdate)

            return {
                code: HttpStatus.OK,
                response: true,
                message: '',
                data: userUpdate
            }
        } catch (err) {
            throw new HttpException({
                response: false,
                message: 'Error -> UpdateUserUseCase'
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}