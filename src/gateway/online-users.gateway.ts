import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';

@WebSocketGateway({
  cors: { origin: "*" },
})
export class OnlineUsersGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private activeUsers = new Set<string>();

  constructor(private authService: AuthService) {}

  async handleConnection(client: any) {
    const userId = client.handshake.query.userId as string;

    if (userId) {
      this.activeUsers.add(userId);
      await this.sendOnlineUsers();
    }
  }

  async handleDisconnect(client: any) {
    const userId = client.handshake.query.userId as string;

    if (userId) {
      this.activeUsers.delete(userId);
      await this.sendOnlineUsers();
    }
  }

  async sendOnlineUsers() {
    const onlineUserIds = Array.from(this.activeUsers);

    // ❗ Fetch full user objects from MongoDB
    const users = await this.authService.findUsersByIds(onlineUserIds);

    this.server.emit("onlineUsers", users);
  }
}
