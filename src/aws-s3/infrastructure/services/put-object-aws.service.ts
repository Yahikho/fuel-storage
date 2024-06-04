import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { ConfigService } from "@nestjs/config"
import { UserModel } from "../../domain/models/user.model"

export class PutObjectAWSService {

    private configService: ConfigService
    private client: S3Client
    private credentialsAWS: UserModel

    constructor(credentialsAWS: UserModel) {
        this.credentialsAWS = credentialsAWS
        this.configService = new ConfigService();
        this.client = new S3Client({
            //User credentials other than AWS root user
            region: this.configService.get<string>('AWS_REGION'),
            credentials: {
                accessKeyId: this.credentialsAWS.access_key_id_aws,
                secretAccessKey: this.credentialsAWS.secret_access_key_aws
            }
        })
    }

    async putObject(file: Express.Multer.File | null, folder: string) {
        const input = {
            Body: file ? file.buffer : '',
            Bucket: this.credentialsAWS.user_name,
            Key: file ? `${folder}${file.originalname}` : `${folder}`
        }

        const command = new PutObjectCommand(input)
        return await this.client.send(command)
    }
}