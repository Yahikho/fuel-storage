import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserSiginModel } from "src/auth/domain/models/user-sigin.model";
import { UserModel } from "src/auth/domain/models/user.model";

@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService: JwtService,
    ) { }

    async validaUser(user: UserModel, userInput: UserSiginModel) {
        if (user && user.password === userInput.password) {
            return user;
        }
        return null;
    }

    async signin(user: UserModel) {
        const payload = { username: user.user_name, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        }
    }
}