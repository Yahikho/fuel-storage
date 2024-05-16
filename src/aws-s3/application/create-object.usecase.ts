import { HttpException, HttpStatus } from "@nestjs/common";
import { UserRepository } from "../domain/repositories/user-repository";
import { PutObjectAWSService } from "../infrastructure/services/put-object-aws.service";

export class CreateObjectUseCase {

    constructor(private readonly userRepository: UserRepository) { }

    async execute(userId: number, files: Array<Express.Multer.File>, folder: string) {
        try {
            const credentialsAWS = await this.userRepository.getUserById(userId)

            const putObjectAWSService = new PutObjectAWSService(credentialsAWS)

            let objectCreated = true
            for (const file of files) {
                const res = await putObjectAWSService.putObject(file, folder)
                if (!res) {
                    objectCreated = false
                    break
                }
            }

            if (objectCreated) {
                return {
                    code: HttpStatus.OK,
                    response: true,
                    message: 'Ok'
                }
            }
            return {
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                response: false,
                message: 'Error to created Object.'
            }
        } catch (err) {
            throw new HttpException({
                response: false,
                message: 'Error -> CreateObjectUseCase'
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}