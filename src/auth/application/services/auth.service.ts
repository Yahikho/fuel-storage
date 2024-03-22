import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserSiginModel } from "src/auth/domain/models/user-sigin.model";
import { UserModel } from "src/auth/domain/models/user.model";
import { CryptPassword } from "src/config/crypt-password";

@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService: JwtService,
    ) { }

    async signIn(userModel: UserModel, userInput: UserSiginModel): Promise<{ access_token: string }> {

        if (userModel.password !== userInput.password) {
            return { access_token: '' }
        }

        const payload = { sub: userModel.id, username: userModel.user_name }

        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }
}