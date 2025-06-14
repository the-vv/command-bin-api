import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { idTransformer } from "src/utils/mongoose-utils";

export type folderDocument = HydratedDocument<Folder>;

@Schema({
    versionKey: false,
    timestamps: true,
        toJSON: {
            transform: idTransformer
        }
})
export class Folder {

    // @Prop({ auto: true, type: String })
    // _id: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true, type: String })
    userId: string;

}

export const folderSchema = SchemaFactory.createForClass(Folder);
