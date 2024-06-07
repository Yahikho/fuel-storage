import { Controller, Get, Res, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { GetInfoUserCase } from "../../application/get-info-user.usecase";
import { JwtAuthGuard } from "src/shared/guards/jwt-auth.guard";
import { Response } from "express";
import { CurrentUserDecorator } from "src/shared/docorators/CurrentUser.decorator";

@ApiTags('profile/get-info-user')
@Controller('profile')
export class GetInfoUserController {

    constructor(private readonly getInfoUserCase: GetInfoUserCase) { }


    @Get('get-info-user')
    @UseGuards(JwtAuthGuard)
    async getInfoUser(
        @CurrentUserDecorator() user: { userId: number },
        @Res() res: Response
    ) {
        const { code, ...response } = await this.getInfoUserCase.execute(user.userId)
        res.status(code).json(response)
    }
}