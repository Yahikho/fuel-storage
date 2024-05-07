import { AttachUserPolicyCommand, CreatePolicyCommand, IAMClient } from "@aws-sdk/client-iam";
import { ConfigService } from "@nestjs/config";

export class CreatePolicyAWSService {

    private username: string
    private configService: ConfigService
    private client: IAMClient

    constructor(username: string) {
        this.configService = new ConfigService();

        this.username = username

        this.client = new IAMClient({
            //User credentials other than AWS root user
            region: this.configService.get<string>('AWS_REGION'),
            credentials: {
                accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
                secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY')
            }
        })
    }

    async createPolicy() {

        const policyDoc = {
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Effect": "Allow",
                    "Action": "s3:GetBucketVersioning",
                    "Resource": [
                        "arn:aws:s3:::fuel-storage-avatars",
                        `arn:aws:s3:::${this.username}`
                    ]
                },
                {
                    "Effect": "Allow",
                    "Action": [
                        "s3:GetObject",
                        "s3:PutObject",
                        "s3:DeleteObject"
                    ],
                    "Resource": [
                        "arn:aws:s3:::fuel-storage-avatars/*",
                        `arn:aws:s3:::${this.username}/*`
                    ]
                },
                {
                    "Effect": "Allow",
                    "Action": [
                        "s3:ListBucket"
                    ],
                    "Resource": [
                        "arn:aws:s3:::fuel-storage-avatars",
                        `arn:aws:s3:::${this.username}`
                    ]
                }
            ]
        }

        const params = {
            PolicyName: `${this.username}-policy`,
            PolicyDocument: JSON.stringify(policyDoc)
        }

        const command = new CreatePolicyCommand(params)

        return await this.client.send(command);
    }

    async attachPolicy(PolicyArn: string) {

        const params = {
            UserName: this.username,
            PolicyArn
        };

        const command = new AttachUserPolicyCommand(params);

        if (await this.client.send(command)) return true
        return false
    }
}