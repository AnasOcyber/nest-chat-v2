import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway(3002, { cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() private server: Server;
  constructor(private readonly chatService: ChatService) {}

  private activeUsers: Set<string> = new Set();

  handleConnection(client: Socket) {
    this.activeUsers.add(client.id);
    this.server.emit('activeUsers', Array.from(this.activeUsers));
  }

  handleDisconnect(client: Socket) {
    this.activeUsers.delete(client.id);
    this.server.emit('activeUsers', Array.from(this.activeUsers));
  }

  @SubscribeMessage('message')
  async handleMessage(client: Socket, payload: { message: string }) {
    const chat = await this.chatService.create(client.id, payload.message);
    this.server.emit('reply', chat);

    client.emit('deliveryConfirmation', { messageId: payload.message });
  }

  @SubscribeMessage('typing')
  async handleTyping(client: Socket) {
    this.server.emit('typing', `${client.id} - typing...`);
  }

  @SubscribeMessage('stopTyping')
  async handleStopTyping(client: Socket) {
    this.server.emit('stopTyping', `${client.id} - typing...`);
  }
}
