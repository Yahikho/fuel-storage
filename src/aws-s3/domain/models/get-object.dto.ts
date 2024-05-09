import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class GetObjectDto{
    
    @IsString()
    @ApiProperty({ description: 'Folder PAth in AWS-S3'})
    prefix: string
}