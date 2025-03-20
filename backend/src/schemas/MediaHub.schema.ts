import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps:true })
export class MediaHub {
    @Prop()
    mediaImages: string[]; 
}

export const MediaHubSchema =  SchemaFactory.createForClass(MediaHub);