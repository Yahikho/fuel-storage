import { UserSiginModel } from "../models/user-sigin.model";
import { UserModel } from "../models/user.model";

export class ValidaUserService {

    validaUser(userModel: UserModel, userInput: UserSiginModel): UserModel | null {
        if (userModel.password === userInput.password) {
            return userModel
        }

        return null
    }
}