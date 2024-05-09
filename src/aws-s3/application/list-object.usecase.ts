import { HttpException, HttpStatus } from "@nestjs/common";
import { UserRepository } from "../domain/repositories/user-repository";
import { ListObjectAwsService } from "../infrastructure/services/list-object.aws.service";

export class ListObjectUseCase {

    constructor(private readonly userRepository: UserRepository) { }

    async execute(userId: number, prefix: string) {
        try {

            const credentialsAWS = await this.userRepository.getUserById(userId)

            const getObjectAwsService = new ListObjectAwsService(credentialsAWS)

            const res = await getObjectAwsService.listOfObject(prefix)

            console.log(res)
            return {
                code: HttpStatus.OK,
                response: true,
                message: 'ok'
            }
        } catch (err) {
            throw new HttpException({
                response: false,
                message: 'Error -> GetObjectUseCase'
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}