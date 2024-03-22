import { ApiProperty } from "@nestjs/swagger"

export class UserSiginModel {
    @ApiProperty({ description: 'User name or email' })
    value: string
    @ApiProperty({ description: 'password user' })
    password: string
}