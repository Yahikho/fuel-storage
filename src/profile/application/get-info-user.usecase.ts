import { HttpException, HttpStatus } from "@nestjs/common";
import { ProfileRepository } from "../domain/repositories/profile.repository";

export class GetInfoUserCase {

    constructor(private readonly profileRepository: ProfileRepository) { }

    async execute(id: number) {
        try {
            const user = await this.profileRepository.getUserById(id)

            if (user) {
                return {
                    code: HttpStatus.OK,
                    response: true,
                    message: '',
                    data: {
                        avatar: user.avatar
                    }
                }
            }

            return {
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                response: false,
                message: 'Error to get user info.'
            }
        } catch (err) {
            throw new HttpException({
                response: false,
                message: 'Error -> GetInfoUseCase'
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}