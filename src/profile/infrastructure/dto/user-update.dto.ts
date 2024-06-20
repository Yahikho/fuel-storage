import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsStrongPassword } from "class-validator";

export class UserUpdateDto {

    @ApiProperty({ description: 'Old user password ' })
    @IsOptional()
    @IsString()
    oldPassword: string

    @ApiProperty({ description: 'New user password' })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minNumbers: 1,
        minUppercase: 1,
        minSymbols: 1
    })
    password: string

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minNumbers: 1,
        minUppercase: 1,
        minSymbols: 1
    })
    @ApiProperty({ description: 'Confirm user password' })
    confirmPassword: string
}