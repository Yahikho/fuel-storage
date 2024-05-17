import { Body, Controller, Post, Res, UseGuards } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { DeleteObjectsUseCase } from "src/aws-s3/application/delete-objects.useCase";
import { DeleteObjectDto } from "../dto/delete-object.dto";
import { CurrentUserDecorator } from "src/shared/docorators/CurrentUser.decorator";
import { Response } from "express";
import { JwtAuthGuard } from "src/shared/guards/jwt-auth.guard";

@ApiTags('aws-s3/delete-objects')
@Controller('aws-s3')
export class DeleteObjectsController {

    constructor(private readonly deleteObjectsUseCase: DeleteObjectsUseCase) { }

    @ApiBody({ type: DeleteObjectDto })
    @UseGuards(JwtAuthGuard)
    @Post('delete-objects')
    async deleteObject(
        @Body() body: DeleteObjectDto,
        @CurrentUserDecorator() user: { userId: number },
        @Res() res: Response
    ) {
        const { code, ...response } = await this.deleteObjectsUseCase.execute(user.userId, body)
        res.status(code).json(response)
    }
}