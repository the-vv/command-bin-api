import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import { idTransformer } from 'src/utils/mongoose-utils';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({
    versionKey: false,
    timestamps: true,
    toJSON: {
        transform: idTransformer
    }
})
export class Category extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    userId: string;

    @Prop()
    description: string;

}

export const categorySchema = SchemaFactory.createForClass(Category);
