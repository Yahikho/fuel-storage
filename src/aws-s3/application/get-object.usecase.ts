import { HttpException, HttpStatus } from "@nestjs/common"
import { UserRepository } from "../domain/repositories/user-repository"
import { GetObjectAwsService } from "../infrastructure/services/get-object-aws.service"
import { Readable } from "stream"

export class GetObjectUseCase {

    constructor(private readonly userRepository: UserRepository) { }

    async execute(userId: number, key: string) {
        try {
            const credentialsAWS = await this.userRepository.getUserById(userId)

            const getObjectAwsService = new GetObjectAwsService(credentialsAWS)

            const { Body } = await getObjectAwsService.getObject(key)

            if (Body) {
                return {
                    code: HttpStatus.OK,
                    response: true,
                    message: '',
                    data: await Body.transformToByteArray()
                }
            }
            return {
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                response: false,
                message: 'Error to get object.'
            }


        } catch (err) {
            throw new HttpException({
                response: false,
                message: 'Error -> GetObjectUseCase'
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}