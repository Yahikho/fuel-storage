import { Body, Controller, Post, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { SignInUseCase } from "src/auth/application/usecases/signin.usecase";
import { UserSiginModel } from "src/auth/domain/models/user-sigin.model";

@ApiTags('auth/signin')
@Controller('auth')
export class SiginController {

    constructor(private readonly signInUseCase: SignInUseCase) { }

    @Post('signin')
    async signIn(
        @Res() res: Response,
        @Body() body: UserSiginModel
    ) {
        const { code, ...response } = await this.signInUseCase.execute(body)
        res.status(code).json(response)
    }

}