import {  PutObjectCommand, S3Client  } from "@aws-sdk/client-s3"
import { ConfigService } from "@nestjs/config"

export class AddAvatarService {
    private readonly client: S3Client
    private readonly configService: ConfigService

    constructor() {
        this.configService = new ConfigService();

        this.client = new S3Client({
            //User credentials other than AWS root user
            region: this.configService.get<string>('AWS_REGION'),
            credentials: {
                accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
                secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY')
            }
        })
    }

    async putObject(file: Express.Multer.File) {
        const input = {
            Body: file.buffer,
            Bucket: this.configService.get<string>('AWS_BUCKET_AVATARS'),
            Key: 'other.jpeg'
        }

        const command = new PutObjectCommand(input)
        return await this.client.send(command)
    }
}