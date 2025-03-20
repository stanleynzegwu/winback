import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps:true })
export class Campaign {
    @Prop()
    name: string;

    @Prop()
    description: string

    @Prop()
    date: string;

    @Prop()
    campaignImages: string[]; 

    @Prop({
      type: String,
      enum: ['draft', 'ongoing', 'completed'], // Limiting to the 3 possible values
      default: 'draft', // Default value
    })
    status: 'draft' | 'ongoing' | 'completed'; // TypeScript type definition
}

export const CampaignSchema =  SchemaFactory.createForClass(Campaign);