import { Body, Controller, Post, Res } from "@nestjs/common";
import { ApiBody, ApiParam, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { SignInUseCase } from "src/auth/application/usecases/signin.usecase";
import { SigInDto } from "../dto/sigin.dto";

@ApiTags('auth/signin')
@Controller('auth')
export class SiginController {

    constructor(private readonly signInUseCase: SignInUseCase) { }

    @ApiBody({ type: SigInDto, description: 'SignIn Body' })
    @Post('signin')
    async signIn(
        @Res() res: Response,
        @Body() body: SigInDto
    ) {
        const { code, ...response } = await this.signInUseCase.execute(body)
        res.status(code).json(response)
    }

}