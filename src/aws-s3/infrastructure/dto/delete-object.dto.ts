import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsString, ValidateNested } from "class-validator";



export class DeleteObjectDto {

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => KeyDto)
    @ApiProperty({ description: 'Arrays to the objects to be deleted.' })
    objects: KeyDto[]
}

class KeyDto {
    @IsString()
    Key: string;
}