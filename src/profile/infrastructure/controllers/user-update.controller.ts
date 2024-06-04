import { Body, Controller, Post, Res, UseGuards } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { UpdateUserUseCase } from "src/profile/application/update-user.usecase";
import { JwtAuthGuard } from "src/shared/guards/jwt-auth.guard";
import { UserUpdateDto } from "../dto/user-update.dto";
import { Response } from "express";
import { CurrentUserDecorator } from "src/shared/docorators/CurrentUser.decorator";

@ApiTags('profile/update-user')
@Controller('profile')
export class UserUpdateController {

    constructor(private readonly updateUserUseCase: UpdateUserUseCase) { }

    @ApiBody({ type: UserUpdateDto, description: 'Update user' })
    @Post('update-user')
    @UseGuards(JwtAuthGuard)
    async userUpdate(
        @Body() body: UserUpdateDto,
        @Res() res: Response,
        @CurrentUserDecorator() user: { userId: number },
    ) {
        const { code, ...response } = await this.updateUserUseCase.execute({ ...body, id: user.userId })
        res.status(code).json(response)
    }
}