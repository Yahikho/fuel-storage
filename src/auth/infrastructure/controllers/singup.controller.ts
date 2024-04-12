import { Body, Controller, Post, Res } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { SignUpUseCase } from "src/auth/application/usecases/signup.usecase";
import { SingupDto } from "../dto/sigup.dto";

@ApiTags('auth/signup')
@Controller('auth')

export class SignupController {

    constructor(private readonly signUpUseCase: SignUpUseCase) { }

    @ApiBody({ type: SingupDto, description: 'SignUp Body' })
    @Post('signup')
    async signUp(
        @Res() res: Response,
        @Body() body: SingupDto
    ) {
        const { code, ...response } = await this.signUpUseCase.execute(body)
        res.status(code).json(response)
    }
}