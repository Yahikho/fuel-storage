import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserCreatenModel } from "../../domain/models/user-create.model";
import { UserRepository } from "../../domain/repositories/user.respository";
import { CryptPassword } from "../../../shared/config/crypt-password";
import { SingUpUserAWSService } from "src/auth/infrastructure/services/signup-user-aws.service";
import { CreateBucketAWSService } from "src/auth/infrastructure/services/create-bucket-aws.service";
import { CreatePolicyAWSService } from "src/auth/infrastructure/services/create-policy-aws.service";
import { SignInUseCase } from "./signin.usecase";
import { JwtService } from "@nestjs/jwt";

@Injectable()

export class SignUpUseCase {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService,
    ) { }

    async execute(user: UserCreatenModel) {
        try {
            const userExist = await this.userRepository.findByUserOrEmail(user.user_name, user.email)
            if (userExist) {
                return {
                    code: HttpStatus.CONFLICT,
                    response: false,
                    message: 'The username or email is already used.'
                }
            } else {
                const dataAWS = await this.registerAWS(user.user_name)
                if (dataAWS.access_key_id_aws && dataAWS.secret_access_key_aws) {
                    user.password = await CryptPassword.hash(user.password)
                    user.user_name = user.user_name.toLocaleLowerCase()
                    user.email = user.email.toLocaleLowerCase()

                    user.access_key_id_aws = dataAWS.access_key_id_aws
                    user.secret_access_key_aws = dataAWS.secret_access_key_aws

                    const userCreated = await this.userRepository.create(user)
                    if (userCreated) {
                        const createCodeEmailVerified = await this.userRepository.createCodeEmailVerified(userCreated.id)

                        if (createCodeEmailVerified) {
                            return {
                                code: HttpStatus.CREATED,
                                response: true,
                                message: 'User has be created',
                                data: {
                                    email: user.email,
                                    code: createCodeEmailVerified.code
                                }
                            }
                        } else {
                            return {
                                code: HttpStatus.INTERNAL_SERVER_ERROR,
                                response: false,
                                message: 'Error to generated code email verified.'
                            }
                        }
                    } else {
                        return {
                            code: HttpStatus.CONFLICT,
                            response: false,
                            message: 'The user was not created, try again.'
                        }
                    }
                } else {
                    return {
                        code: HttpStatus.INTERNAL_SERVER_ERROR,
                        response: false,
                        message: 'Error with AWS.'
                    }
                }
            }
        } catch (err) {
            throw new HttpException({
                response: false,
                message: 'Error -> SignUpUseCase'
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    private async registerAWS(username: string) {
        const singUpUserAWSService = new SingUpUserAWSService(username)
        await singUpUserAWSService.signUpUser()

        const infoUserAWS = await singUpUserAWSService.createAccesKey()

        if (infoUserAWS) {
            const createBucketAWSService = new CreateBucketAWSService(username)

            const createBucket = await createBucketAWSService.createBucket()

            if (createBucket) {
                const createPolicyAWSService = new CreatePolicyAWSService(username)

                const createPolicy = await createPolicyAWSService.createPolicy()

                const attachPolicy = await createPolicyAWSService.attachPolicy(createPolicy.Policy.Arn)

                if (attachPolicy) {
                    return {
                        access_key_id_aws: infoUserAWS.AccessKey.AccessKeyId,
                        secret_access_key_aws: infoUserAWS.AccessKey.SecretAccessKey,
                    }
                }
            }

        }

        return {
            access_key_id_aws: '',
            secret_access_key_aws: '',
        }
    }

}