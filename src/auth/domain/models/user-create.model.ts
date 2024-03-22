import { ApiProperty } from "@nestjs/swagger"

export class UserCreatenModel {
    @ApiProperty({ description: 'User name' })
    user_name: string
    @ApiProperty({ description: 'email user' })
    email: string
    @ApiProperty({ description: 'avatar path user' })
    avatar?: string
    @ApiProperty({ description: 'password user' })
    password: string
}