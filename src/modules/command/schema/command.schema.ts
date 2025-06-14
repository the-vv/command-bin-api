import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import { idTransformer } from 'src/utils/mongoose-utils';

export type CommandDocument = HydratedDocument<Command>;

@Schema({
    versionKey: false,
    timestamps: true,
    toJSON: {
        transform: idTransformer
    }
})
export class Command extends Document {
    @Prop({ required: true })
    command: string;

    @Prop({ required: true })
    userId: string;

    @Prop()
    description: string;
}

export const commandSchema = SchemaFactory.createForClass(Command);
