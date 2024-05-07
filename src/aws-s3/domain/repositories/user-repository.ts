import { KeysAccessAWSDto } from "../models/keys-access-aws.dto";

export interface UserRepository{
    getUserById(id: number): Promise<KeysAccessAWSDto | null>
}