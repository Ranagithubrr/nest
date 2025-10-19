import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })

export class Post extends Document {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    thumbnail: string;

    @Prop({ required: true })
    author: string;

    @Prop({ required: true })
    authorId: string;
}

export const PostSchema = SchemaFactory.createForClass(Post)