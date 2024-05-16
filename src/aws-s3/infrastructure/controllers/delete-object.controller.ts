import { Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('aws-s3/delete-object')
@Controller('aws-s3')
export class DeleteObjectController {

    @Post('delete-object')
    async deleteObject(
        
    ) {

    }
}