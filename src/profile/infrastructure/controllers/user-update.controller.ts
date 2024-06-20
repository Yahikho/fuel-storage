import { Body, Controller, HttpException, HttpStatus, ParseFilePipeBuilder, Post, Res, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { UpdateUserUseCase } from "src/profile/application/update-user.usecase";
import { JwtAuthGuard } from "src/shared/guards/jwt-auth.guard";
import { UserUpdateDto } from "../dto/user-update.dto";
import { Response } from "express";
import { CurrentUserDecorator } from "src/shared/docorators/CurrentUser.decorator";
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { FileInterceptor } from "@nestjs/platform-express";

@ApiTags('profile/update-user')
@Controller('profile')
export class UserUpdateController {

    constructor(private readonly updateUserUseCase: UpdateUserUseCase) { }

    @ApiBody({ type: UserUpdateDto, description: 'Update user' })
    @UseInterceptors(FileInterceptor('file'))
    @Post('update-user')
    @UseGuards(JwtAuthGuard)
    async userUpdate(
        @UploadedFile() file: Express.Multer.File | null,
        @Body() body: any,
        @Res() res: Response,
        @CurrentUserDecorator() user: { userId: number },
    ) {
        const createUserDto = plainToInstance(UserUpdateDto, body);
        const errors = await validate(createUserDto);

        if (errors.length > 0) {
            throw new HttpException({
                response: false,
                message:
                    errors.map(error => error.constraints)
                        .map(objeto => Object.values(objeto))
                        .reduce((acum, valAct) => acum.concat(valAct), [])
            }, HttpStatus.BAD_REQUEST)
        }

        const { code, ...response } = await this.updateUserUseCase.execute({ ...body, id: user.userId }, file)
        res.status(code).json(response)
    }
}