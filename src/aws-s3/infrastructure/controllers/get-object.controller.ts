import { Body, Controller, Post, Res, UseGuards } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { GetObjectDto } from "src/aws-s3/domain/models/get-object.dto";
import { CurrentUserDecorator } from "src/shared/docorators/CurrentUser.decorator";
import { JwtAuthGuard } from "src/shared/guards/jwt-auth.guard";

@ApiTags('aws-s3/get-object')
@Controller('aws-s3')
export class GetObjectController {

    constructor() { }

    @ApiBody({ type: GetObjectDto })
    @Post('get-object')
    @UseGuards(JwtAuthGuard)
    async getObject(
        @CurrentUserDecorator() user: { userId: number },
        @Res() res: Response
    ) {
        return true
    }
}