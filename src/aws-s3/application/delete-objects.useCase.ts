import { HttpException, HttpStatus } from "@nestjs/common";
import { UserRepository } from "../domain/repositories/user-repository";
import { DeleteObjectDto } from "../infrastructure/dto/delete-object.dto";
import { DeleteObjectsService } from "../infrastructure/services/delete-objects.service";

export class DeleteObjectsUseCase {

    constructor(private readonly userRepository: UserRepository) { }

    async execute(userId: number, objects: DeleteObjectDto) {
        try {
            const credentialsAWS = await this.userRepository.getUserById(userId)

            const deleteObjectsService = new DeleteObjectsService(credentialsAWS)

            const { Deleted } = await deleteObjectsService.deleteObject(objects.objects)

            if (Deleted) {
                return {
                    code: HttpStatus.CREATED,
                    response: true,
                    message: '',
                    data: Deleted
                }
            }

            return {
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                response: false,
                message: 'Error to deleted Keys in buckets AWS S3.'
            }

        } catch (err) {
            throw new HttpException({
                reponse: false,
                message: 'Error -> DeleteObjectUseCase'
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}