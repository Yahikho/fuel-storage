import { Body, Controller, Post, Res, UseGuards } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { ListObjectUseCase } from "../../application/list-object.usecase";
import { GetObjectDto } from "../../domain/models/get-object.dto";
import { CurrentUserDecorator } from "src/shared/docorators/CurrentUser.decorator";
import { JwtAuthGuard } from "../../../shared/guards/jwt-auth.guard";

@ApiTags('aws-s3/list-object')
@Controller('aws-s3')
export class ListObjectController {

    constructor(private readonly listObjectUseCase: ListObjectUseCase) { }

    @ApiBody({ type: GetObjectDto })
    @Post('list-object')
    @UseGuards(JwtAuthGuard)
    async getObject(
        @CurrentUserDecorator() user: { userId: number },
        @Body() body: GetObjectDto,
        @Res() res: Response
    ) {
        const { code, ...response } = await this.listObjectUseCase.execute(user.userId, body.prefix)
        res.status(code).json(response)
    }
}