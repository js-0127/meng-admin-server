// websocket.gateway.ts
import {  WebSocketGateway, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage } from '@nestjs/websockets';
import { Server, WebSocket } from 'ws';
import {IncomingMessage} from 'http'
import { SocketMessage, SocketMessageType } from './interface/message';
import { Inject } from '@nestjs/common';
import { RedisClientType } from 'redis';
@WebSocketGateway(3001, {
  cors: {
    origin: '*'
  },  
})
export class SocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  connects = new Map<string, WebSocket[]>([])

  constructor(
    @Inject('DEFAULT') private readonly RedisClient: RedisClientType
  ){}

  afterInit() {
    this.server.emit('message');
  }
  async handleConnection(socket: WebSocket, request:IncomingMessage) {
    const token = request.url.split('=').at(-1)

    if(!token) {
      socket.close()
      return
    }

    const userInfoStr = await this.RedisClient.get(`token:${token}`)
    if(!userInfoStr){
      this.server.clients.forEach((socket) => {
            socket.send(JSON.stringify({
              type: SocketMessageType.TokenExpire
            }))
      })
    }
    const userInfo = JSON.parse(userInfoStr)
    
    this.addConnect(userInfo.userId, socket)


    socket.on('message', (data) => {
      this.handleMessage(data.toString())
      
    })
    
  }

  handleDisconnect(socket: WebSocket) {
     this.deleteConnect(socket)
  }

  /**
   * 添加连接
   * @param userId 用户id
   * @param connect 用户socket连接
   */
 addConnect(userId:string, socket:WebSocket){
         const curConnects = this.connects.get(userId)
         if(curConnects){
          curConnects.push(socket)
         } else {
          this.connects.set(userId, [socket])
         }
 }

 /**
   * 删除连接
   * @param connect 用户socket连接
   */
 

 deleteConnect(connect: WebSocket) {
  const connects = [...this.connects.values()];

  for (let i = 0; i < connects.length; i += 1) {
    const sockets = connects[i];
    const index = sockets.indexOf(connect);
    if (index >= 0) {
      sockets.splice(index, 1);
      break;
    }
  }
}

handleMessage(payload: string) {  
  // 处理客户端发送的消息
  const message = JSON.parse(payload) as SocketMessage;
  // 根据消息类型进行处理逻辑
  // ...
}

sendMessage<T>(userId: string, data: SocketMessage<T>) {
  const sockets = this.connects.get(userId);
  if (sockets?.length) {
    sockets.forEach(socket => {
      socket.send(JSON.stringify(data));
    });
  }
}
}


