import { Body, Controller, Post, Res, UseGuards } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { EmailVerifiedDto } from "../dto/email-verified.dto";
import { EmailVerifiedUseCase } from "src/auth/application/usecases/email-verified.usecase";
import { CurrentUserDecorator } from "src/shared/docorators/CurrentUser.decorator";
import { UserModel } from "src/auth/domain/models/user.model";
import { JwtAuthGuard } from "src/shared/guards/jwt-auth.guard";

@ApiTags('auth/email-verified')
@Controller('auth')
export class EmailVerifiedController {

    constructor(private readonly emailVerifiedUseCase: EmailVerifiedUseCase) { }

    @ApiBody({ type: EmailVerifiedDto, description: 'Valida email user' })
    @Post('email-verified')
    @UseGuards(JwtAuthGuard)
    async emailVerified(
        @Res() res: Response,
        @Body() body: EmailVerifiedDto,
        @CurrentUserDecorator() userid: { userId: number }
    ) {
        const { code, ...response } = await this.emailVerifiedUseCase.execute(body.code, userid.userId)
        res.status(code).json(response)
    }
}