import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ChatDocument = HydratedDocument<Chat>;

@Schema()
export class Chat {
  @Prop()
  clientId: string;

  @Prop()
  message: String;

  @Prop({ type: Date, default: Date.now() })
  createdAt: Date;
}

export const chatSchema = SchemaFactory.createForClass(Chat);
