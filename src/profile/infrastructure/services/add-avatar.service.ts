import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { ConfigService } from "@nestjs/config"

export class AddAvatarService {
    private readonly client: S3Client
    private readonly configService: ConfigService
    private nameFile: string

    constructor(nameFile: string) {
        this.configService = new ConfigService();
        this.nameFile = nameFile
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
            Key: this.nameFile
        }

        const command = new PutObjectCommand(input)
        if (await this.client.send(command)) {
            return `https://${this.configService.get<string>('AWS_BUCKET_AVATARS')}.s3.${this.configService.get<string>('AWS_REGION')}.amazonaws.com/${this.nameFile}`
        }
        return null
    }
}