import { UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { UserSiginModel } from "src/auth/domain/models/user-sigin.model";
import { UserModel } from "src/auth/domain/models/user.model";
import { ValidaUserService } from "src/auth/domain/services/validaUser.service";

export class LocalStrategy extends PassportStrategy(Strategy) {

    constructor(private readonly validaUserService: ValidaUserService) {
        super()
    }

    async validate(userModel: UserModel, userInput: UserSiginModel) {
        const user = this.validaUserService.validaUser(userModel, userInput)
        if (!user) {
            throw new UnauthorizedException({
                respone: false,
                message: '--Error - Signin'
            })
        }

        return user
    }
}