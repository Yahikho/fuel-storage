import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class SigInDto {

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'Value email or username' })
    value: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'Value password' })
    password: string
}