import { ArrayNotEmpty, IsArray, IsIn, IsNotEmpty, IsString } from "class-validator";

export class CreateCampaignDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description:string;

    @IsString()
    @IsNotEmpty()
    date: string;

    @IsArray()
    @ArrayNotEmpty() // Ensures the array is not empty
    @IsString({ each: true }) // Ensures each element in the array is a string
    @IsNotEmpty({ each: true }) // Ensures each element is not an empty string
    campaignImages: string[];
  
    @IsIn(['draft', 'ongoing', 'completed']) // Ensures status is one of the three possible values
    status: 'draft' | 'ongoing' | 'completed'; // TypeScript type definition

    @IsIn(["Youths", "Medical & Health", "Education", "Widows & Orphans", "Social Economic Empowerment", 
    "Public Awareness", "Save A Soul", "Prison"])
    category:  "Youths" | "Medical & Health" | "Education" | "Widows & Orphans" | "Social Economic Empowerment" | 
    "Public Awareness" | "Save A Soul" | "Prison";
}
