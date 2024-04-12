import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsEmpty, IsNotEmpty, IsOptional, IsString, IsStrongPassword, Matches, MaxLength, MinLength, isNotEmpty, isString } from "class-validator"

export class SingupDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(15)
    @Matches(/^\S*$/, {
        message: 'user_name must not contain spaces.'
    })
    user_name: string

    @ApiProperty()
    @IsString()
    @IsEmail()
    @Matches(/^\S*$/, {
        message: 'email must not contain spaces.'
    })
    @IsNotEmpty()
    email: string

    @ApiProperty()
    @IsString()
    @IsOptional()
    avatar?: string

    @ApiProperty()
    @IsNotEmpty()
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minNumbers: 1,
        minUppercase: 1,
        minSymbols: 1
    })
    password: string
}