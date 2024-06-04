import { S3Client, DeleteObjectsCommand } from "@aws-sdk/client-s3"
import { ConfigService } from "@nestjs/config"
import { UserModel } from "src/aws-s3/domain/models/user.model"

export class DeleteObjectsService {
    private configService: ConfigService
    private client: S3Client
    private credentialsAWS: UserModel

    constructor(credentialsAWS: UserModel) {
        this.credentialsAWS = credentialsAWS
        this.configService = new ConfigService();
        this.client = new S3Client({
            //User credentials other that AWS root user
            region: this.configService.get<string>('AWS_REGION'),
            credentials: {
                accessKeyId: this.credentialsAWS.access_key_id_aws,
                secretAccessKey: this.credentialsAWS.secret_access_key_aws
            }
        })
    }


    async deleteObject(Objects: Array<{ Key: string }>) {
        const input = {
            Bucket: this.credentialsAWS.user_name,
            Delete: {
                Objects
            },
            "Quiet": false
        }

        const command = new DeleteObjectsCommand(input);
        return await this.client.send(command);
    }
}