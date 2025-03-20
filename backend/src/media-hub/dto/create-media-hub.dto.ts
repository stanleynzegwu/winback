import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString } from "class-validator";

export class CreateMediaHubDto {
    @IsArray()
    @ArrayNotEmpty() // Ensures the array is not empty
    @IsString({ each: true }) // Ensures each element in the array is a string
    @IsNotEmpty({ each: true }) // Ensures each element is not an empty string
    mediaImages: string[];
}
