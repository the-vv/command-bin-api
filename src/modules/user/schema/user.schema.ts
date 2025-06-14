
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { idTransformer } from 'src/utils/mongoose-utils';

export type userDocument = HydratedDocument<User>;

@Schema({
    versionKey: false,
    timestamps: true,
    toJSON: {
        transform: idTransformer
    }
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
