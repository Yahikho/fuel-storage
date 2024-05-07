import { S3Client } from "@aws-sdk/client-s3"
import { ConfigService } from "@nestjs/config"

export class PutObjectAWSService {

    private configService: ConfigService
    private client: S3Client

    constructor() {
       
    }

    async putObject() {

    }
}