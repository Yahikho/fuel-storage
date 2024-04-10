import { UserModel } from "../models/user.model";

export class UserVerified {

    static execute(userModel: UserModel) {
        
        if (userModel.verified) {
            return true
        }

        return false
    }
}