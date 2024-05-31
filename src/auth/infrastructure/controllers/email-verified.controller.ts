import { Body, Controller, Post, Res, UseGuards } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { EmailVerifiedDto } from "../dto/email-verified.dto";
import { EmailVerifiedUseCase } from "../../application/usecases/email-verified.usecase";

@ApiTags('auth/email-verified')
@Controller('auth')
export class EmailVerifiedController {

    constructor(private readonly emailVerifiedUseCase: EmailVerifiedUseCase) { }

    @ApiBody({ type: EmailVerifiedDto, description: 'Valida email user' })
    @Post('email-verified')
    async emailVerified(
        @Res() res: Response,
        @Body() body: EmailVerifiedDto,
    ) {
        const { code, ...response } = await this.emailVerifiedUseCase.execute(body.code)
        res.status(code).json(response)
    }
}