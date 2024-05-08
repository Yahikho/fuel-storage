import { Body, Controller, Post, Res, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../../shared/guards/jwt-auth.guard";
import { FilesInterceptor } from "@nestjs/platform-express";
import { CreateObjectUseCase } from "../../application/create-object.usecase";
import { Response } from "express";
import { CurrentUserDecorator } from "../../../shared/docorators/CurrentUser.decorator";
import { NewObjectDto } from "../dto/new-object.dto";

@ApiTags('aws-s3/new-abject')
@Controller('aws-s3')
export class NewObjectController {

    constructor(private readonly createObjectUseCase: CreateObjectUseCase) { }

    @ApiBody({ description: 'Upload files and folder property', type: NewObjectDto })
    @Post('new-abject')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FilesInterceptor('files'))
    async UploadFile(
        @CurrentUserDecorator() user: { userId: number },
        @UploadedFiles() files: Array<Express.Multer.File>,
        @Res() res: Response,
        @Body() body: { folder: string }
    ) {
        const { code, ...response } = await this.createObjectUseCase.execute(user.userId, files, body.folder)
        res.status(code).json(response)
    }
}