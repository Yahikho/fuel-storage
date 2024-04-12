import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, Matches } from "class-validator";

export class SigInDto {

    @IsNotEmpty()
    @IsString()
    @Matches(/^\S*$/, {
        message: 'String must not contain spaces.'
    })
    @ApiProperty({ description: 'Value email or username' })
    value: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'Value password' })
    password: string
}