import { ApiProperty } from "@nestjs/swagger"

export class UserOutputDto {
    @ApiProperty({ description: 'user_name value' })
    user_name: string

    @ApiProperty({ description: 'Email user' })
    email: string

    @ApiProperty({ description: 'Avatar (Profile image) user' })
    avatar: string
}