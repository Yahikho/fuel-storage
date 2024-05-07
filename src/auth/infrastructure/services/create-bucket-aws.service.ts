import { S3Client, CreateBucketCommand } from "@aws-sdk/client-s3";
import { ConfigService } from "@nestjs/config";

export class CreateBucketAWSService {

    private nameBucket: string
    private configService: ConfigService
    private client: S3Client

    constructor(nameBucket: string) {

        this.configService = new ConfigService();

        this.nameBucket = nameBucket

        this.client = new S3Client({
            //User credentials other than AWS root user
            region: this.configService.get<string>('AWS_REGION'),
            credentials: {
                accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
                secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY')
            }
        })
    }

    async createBucket() {
        const input = {
            Bucket: this.nameBucket,
        };

        const command = new CreateBucketCommand(input);
        return await this.client.send(command);
    }
}