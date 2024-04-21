import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, Max, Min } from "class-validator";

export class EmailVerifiedDto {

    @ApiProperty({ description: 'Code to validated email user.' })
    @IsNotEmpty()
    @IsNumber()
    @Max(9999)
    @Min(1000)
    code: number

}