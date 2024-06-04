import { HttpException, HttpStatus } from "@nestjs/common";
import { ProfileRepository } from "../domain/repositories/profile.repository";
import { AddAvatarService } from "../infrastructure/services/add-avatar.service";
import { UserUpdateInputModel } from "../domain/models/user-update-dto.model";

export class UpdateUserUseCase {

    constructor(private readonly profileRepository: ProfileRepository) { }

    async execute(userUpdate: UserUpdateInputModel, file: Express.Multer.File) {
        try {

            const user = await this.profileRepository.getUserById(userUpdate.id)

            console.log(user)

            const addAvatarService = new AddAvatarService()

            const uploadFile = await addAvatarService.putObject(file)

            console.log(uploadFile)

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