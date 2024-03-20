import { ApiProperty } from "@nestjs/swagger"

export class UserSiginModel {
    @ApiProperty({ description: 'User name' })
    user_name?: string
    @ApiProperty({ description: 'email user' })
    email?: string
    @ApiProperty({ description: 'password user' })
    password: string
}