
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type userDocument = HydratedDocument<User>;

@Schema({
    versionKey: false,
    timestamps: true,
})
export class User {

    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true, select: false })
    password: string;

}

export const userSchema = SchemaFactory.createForClass(User);
