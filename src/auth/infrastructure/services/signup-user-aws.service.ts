import { IAMClient, CreateUserCommand, CreateAccessKeyCommand, AttachUserPolicyCommand, CreateAccessKeyCommandOutput } from "@aws-sdk/client-iam"
import { ConfigService } from "@nestjs/config"

export class SingUpUserAWSService {

    private readonly client: IAMClient
    private readonly username: string
    private readonly configService: ConfigService

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

    async createAccesKey(): Promise<CreateAccessKeyCommandOutput | null> {

        if (await this.attachPolicy()) {
            const input = {
                UserName: this.username
            }
            const command = new CreateAccessKeyCommand(input)
            const res = await this.client.send(command)
            if (res) return res
            return null
        }

        return null
    }

    async signUpUser() {
        const input = {
            UserName: this.username
        }
        const command = new CreateUserCommand(input)

        await this.client.send(command)
    }

    private async attachPolicy() {
        const params = {
            UserName: this.username,
            PolicyArn: this.configService.get<string>('AWS_POLICY_ARM_STORAGE_AVATARS')
        };

        const command = new AttachUserPolicyCommand(params)

        return await this.client.send(command)
    }

}