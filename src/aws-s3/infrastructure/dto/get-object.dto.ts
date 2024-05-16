import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class GetObjectDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'Key (name) file into AWS S3 bucket.' })
    key: string
}