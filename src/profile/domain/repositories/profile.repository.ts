import { EmailVerifiedModel } from "../models/user-update.dto";
import { UserModel } from "../models/user.model";

export interface ProfileRepository {
    udateUser(userUpdate: EmailVerifiedModel): Promise<number>
    getUserById(id: number): Promise<UserModel>
}