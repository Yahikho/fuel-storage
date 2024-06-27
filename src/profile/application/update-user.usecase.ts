import { HttpException, HttpStatus } from "@nestjs/common";
import { ProfileRepository } from "../domain/repositories/profile.repository";
import { AddAvatarService } from "../infrastructure/services/add-avatar.service";
import { UserUpdateInputModel } from "../domain/models/user-update-dto.model";
import { ValidaPasswordsService } from "../domain/services/valida-passwords.service";
import { CryptPassword } from "../../shared/config/crypt-password";

export class UpdateUserUseCase {

    constructor(private readonly profileRepository: ProfileRepository) { }

    async execute(userUpdate: UserUpdateInputModel, file?: Express.Multer.File) {
        try {

            let isUpdate = false
            const user = await this.profileRepository.getUserById(userUpdate.id)
            let urlAvatar: string = user.avatar

            if (userUpdate.password) {
                const validaPasswordsService =
                    new ValidaPasswordsService(user.password, userUpdate.oldPassword, userUpdate.password, userUpdate.confirmPassword)

                const errorsToValidatePassword = await validaPasswordsService.execute()

                if (errorsToValidatePassword.length) {
                    return {
                        code: HttpStatus.BAD_REQUEST,
                        response: false,
                        message: errorsToValidatePassword.toString()
                    }
                }

                isUpdate = true
            }

            if (file) {
                const ext = file.originalname.split('.').pop().toLowerCase()

                if (['jpeg', 'jpg', 'png'].includes(ext)) {

                    const addAvatarService = new AddAvatarService(`${user.user_name}.${ext}`)

                    const uploadFile = await addAvatarService.putObject(file)

                    if (uploadFile) {
                        urlAvatar = uploadFile
                    }

                    isUpdate = true
                } else {
                    return {
                        code: HttpStatus.BAD_REQUEST,
                        response: false,
                        message: 'file must be (jpg, jpeg, png)',
                    }
                }

            }

            if (isUpdate) {
                const updateUser = await this.profileRepository.udateUser({
                    id: userUpdate.id,
                    password: userUpdate.password ? await CryptPassword.hash(userUpdate.password) : user.password,
                    avatar: urlAvatar
                })

                if (updateUser) {
                    return {
                        code: HttpStatus.CREATED,
                        response: true,
                        message: 'User update was successful',
                        data: {
                            url_avatar: urlAvatar
                        }
                    }
                }

                return {
                    code: HttpStatus.INTERNAL_SERVER_ERROR,
                    response: false,
                    message: 'Something happened with the update.',
                }
            }

            return {
                code: HttpStatus.BAD_REQUEST,
                response: false,
                message: 'There are nothing to update.',
            }

        } catch (err) {
            console.log(err)
            throw new HttpException({
                response: false,
                message: 'Error -> UpdateUserUseCase'
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}