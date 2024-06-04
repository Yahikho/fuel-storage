import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsStrongPassword } from "class-validator";

export class UserUpdateDto {

    @ApiProperty({ description: 'Old user password ' })
    @IsString()
    oldPassword: string

    @ApiProperty({ description: 'New user password' })
    @IsString()
    @IsNotEmpty()
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
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minNumbers: 1,
        minUppercase: 1,
        minSymbols: 1
    })
    @ApiProperty({ description: 'Confirm user password' })
    confirmPassword: string

    @IsString()
    @IsOptional()
    @ApiProperty({ description: 'URL user avatar' })
    avatar?: string
}