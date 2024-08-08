import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat, ChatDocument } from './schemas/chat.schema';

@Injectable()
export class ChatService {
  constructor(@InjectModel('Chat') private chatModel: Model<Chat>) {}

  async create(clientId: string, message: String): Promise<ChatDocument> {
    const newChat = await this.chatModel.create({ clientId, message });
    return await newChat.save();
  }

  async findAll(): Promise<ChatDocument[]> {
    return await this.chatModel.find().exec();
  }
}
