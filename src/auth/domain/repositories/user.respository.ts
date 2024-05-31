import { EmailVerifiedModel } from "../models/email-verified.model";
import { UserCreatenModel } from "../models/user-create.model";
import { UserOutputModel } from "../models/user-output.model";
import { UserSiginModel } from "../models/user-sigin.model";
import { UserModel } from "../models/user.model";

export interface UserRepository {
    create(user: UserCreatenModel): Promise<UserOutputModel | null>
    findByUser(user: UserSiginModel): Promise<UserModel | null>
    findByUserOrEmail(username: string, email: string): Promise<number>
    createCodeEmailVerified(id: number): Promise<EmailVerifiedModel>
    validaEmailByUser(code: number, iduser: number): Promise<number>
    getByUser(code: number): Promise<EmailVerifiedModel>
}