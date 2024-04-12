import { UserCreatenModel } from "../models/user-create.model";
import { UserOutputModel } from "../models/user-output.model";
import { UserSiginModel } from "../models/user-sigin.model";
import { UserModel } from "../models/user.model";

export interface UserRepository {
    create(user: UserCreatenModel): Promise<UserOutputModel>
    findByUser(user: UserSiginModel): Promise<UserModel>
    findByUserOrEmail(username: string, email: string): Promise<number>
}