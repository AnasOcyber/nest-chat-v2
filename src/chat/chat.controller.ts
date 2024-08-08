import { Controller, Get } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatDocument } from './schemas/chat.schema';

@Controller('chats')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Get()
  async findAllMessages(): Promise<ChatDocument[]> {
    return await this.chatService.findAll();
  }
}
