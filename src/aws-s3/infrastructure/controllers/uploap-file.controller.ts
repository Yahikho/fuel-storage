import { Controller, Post, Res, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../../shared/guards/jwt-auth.guard";
import { FilesInterceptor } from "@nestjs/platform-express";
import { CreateObjectUseCase } from "src/aws-s3/application/creeate-object.usecase";
import { Response } from "express";
import { CurrentUserDecorator } from "src/shared/docorators/CurrentUser.decorator";

@ApiTags('aws-s3/upload')
@Controller('aws-s3')
export class UploadFileController {

    constructor(private readonly createObjectUseCase: CreateObjectUseCase) { }

    @ApiBody({})
    @Post('upload')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FilesInterceptor('files'))
    async UploadFile(
        @CurrentUserDecorator() user: { userId: number },
        @UploadedFiles() files: Array<Express.Multer.File>,
        @Res() res: Response,
    ) {
        const { code, ...response } = await this.createObjectUseCase.execute(user.userId, files)
        res.status(code).json(response)
    }
}