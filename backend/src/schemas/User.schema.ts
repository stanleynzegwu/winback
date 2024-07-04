import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User {
    @Prop({ unique: true, required: true })
    username: string;

    @Prop({ required: false })
    displayName?: string;

    @Prop({ required: false })
    avatarurl?: string;

    @Prop({ type: String, enum: ['admin', 'editor', 'volunteer', 'member'], default: 'member' })
    role?: 'admin' | 'editor' | 'volunteer' | 'member'
}

export const UserSchema =  SchemaFactory.createForClass(User);