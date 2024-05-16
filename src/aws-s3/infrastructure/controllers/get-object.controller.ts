import { Body, Controller, Post, Res, UseGuards } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { GetObjectUseCase } from "src/aws-s3/application/get-object.usecase";
import { CurrentUserDecorator } from "src/shared/docorators/CurrentUser.decorator";
import { JwtAuthGuard } from "src/shared/guards/jwt-auth.guard";
import { GetObjectDto } from "../dto/get-object.dto";

@ApiTags('aws-s3/get-object')
@Controller('aws-s3')
export class GetObjectController {

    constructor(private readonly getObjectUseCase: GetObjectUseCase) { }

    @ApiBody({ type: GetObjectDto, description: 'Body get Object.' })
    @Post('get-object')
    @UseGuards(JwtAuthGuard)
    async getObject(
        @Body() body: GetObjectDto,
        @CurrentUserDecorator() user: { userId: number },
        @Res() res: Response
    ) {
        const { code, ...response } = await this.getObjectUseCase.execute(user.userId, body.key)
        res.status(code).json(response)
    }
}