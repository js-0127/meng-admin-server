import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, ConnectedSocket, SubscribeMessage } from '@nestjs/websockets';
import { Server, WebSocket } from 'ws';
import { SocketService } from './socket.service';
import { Inject } from '@nestjs/common';
import { RedisClientType } from 'redis';
import * as http from 'http'
import { SocketMessage, SocketMessageType } from './message';

@WebSocketGateway(
  3001, 
  {
  transports: ['websocket'], 
  cors: {
  origin: '*'
  }
})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect{
  constructor(
        private readonly socketService: SocketService,
        @Inject('REDIS_CLIENT') private readonly redisClient: RedisClientType,
  ){}
  @WebSocketServer()
  server: Server;

  async handleConnection(socket: WebSocket, requset: http.IncomingMessage) {    
    //获取url上面的token参数
    const token = requset.url.split('=').at(-1)    
    if(!token){
      socket.close()
      return;
    }

    const userInfoStr = await this.redisClient.get(`token:${token}`)
    if(!userInfoStr){
      socket.send(JSON.stringify({
         type: SocketMessageType.TokenExpire,
      }))
      socket.close()
      return;
    }
    const userInfo = JSON.parse(userInfoStr)
    this.socketService.addConnect(userInfo.userId, socket)
    

    socket.on('message', (data:Buffer) => {
      this.handleMessage(data)
    })
    
  }
  
  @SubscribeMessage('message')
  handleMessage(data: Buffer) {
    // 当接收到客户端发送的消息时触发
    console.log(data.toString());
    
    try {
      if(typeof data.toString() !== 'object'){
        this.server.clients.forEach((socket) => {
             socket.send(data.toString())
        })
      }
      const message = JSON.parse(data.toString()) as SocketMessage
      console.log(message);
      
      if(message.type === SocketMessageType.Ping) {
        return {
          type: SocketMessageType.Pong
        }
      }
    } catch (error){
      console.error('json parse error', error)
    }
    
  }

  handleDisconnect(@ConnectedSocket() client: WebSocket) {
    // 当客户端断开连接时触发
    this.socketService.deleteConnect(client)
  }
}