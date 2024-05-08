import { ApiProperty } from "@nestjs/swagger";

export class NewObjectDto {

    @ApiProperty({ description: 'folder path' })
    folder: string
}