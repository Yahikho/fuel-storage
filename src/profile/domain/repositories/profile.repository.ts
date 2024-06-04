import { EmailVerifiedModel } from "../models/user-update.model";

export interface ProfileRepository {
    udateUser(userUpdate: EmailVerifiedModel): Promise<number>
}