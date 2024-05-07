import { Body, Controller, Post, Res } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { SignUpUseCase } from "../../application/usecases/signup.usecase";
import { SingupDto } from "../dto/sigup.dto";
import { MailerService } from "@nestjs-modules/mailer";

@ApiTags('auth/signup')
@Controller('auth')

export class SignupController {

    constructor(
        private readonly signUpUseCase: SignUpUseCase,
        private readonly mailerService: MailerService
    ) { }

    @ApiBody({ type: SingupDto, description: 'SignUp Body' })
    @Post('signup')
    async signUp(
        @Res() res: Response,
        @Body() body: SingupDto
    ) {
        const { code, ...response } = await this.signUpUseCase.execute(body)
        // const { code, data, ...response } = await this.signUpUseCase.execute(body)
        // if (code === 201) {
        //     await this.mailerService.sendMail({
        //         to: data.email,
        //         subject: 'Verificaction code',
        //         html: `<p>Hey, this is your code <strong>${data.code}</strong> to verify your email address.</p>`
        //     }).catch((err) => {
        //         console.log(`Error email -> ${err}`)
        //     })
        // }

        res.status(code).json(response)
    }
}