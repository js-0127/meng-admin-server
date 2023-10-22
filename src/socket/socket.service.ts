import { Injectable } from '@nestjs/common';
import { SocketMessage } from './message';
import {WebSocket} from 'ws'
@Injectable()
export class SocketService {
  connects = new Map()
  /**
   * 添加连接
   * @param userId 用户id
   * @param connect 用户socket连接
   */
  addConnect(userId:string, connect:WebSocket){
    const curConnects = this.connects.get(userId)
    if(curConnects){
      curConnects.push(connect)
    } else {
      this.connects.set(userId, [connect])
    }
  }
 /**
  * 删除连接
  * @param connect 用户socket连接
  */
 deleteConnect(connect: WebSocket){
   const connects = [...this.connects.values()]
   for(let i = 0; i < connects.length; i++){
    const sockets = connects[i]
    const index = sockets.indexOf(connect)
    if(index >= 0){
      sockets.splice(index, 1);
      break
    }
   }
 }

  /**
   * 给指定用户发送消息
   * @param userId 用户id
   * @param data 数据 
   */
 sendMessage<T>(userId: string, data: SocketMessage<T>){
    const clients = this.connects.get(userId)
    if(clients?.length){
        clients.forEach((client:WebSocket) => {
          client.send(JSON.stringify(data))
        })
    } 
 }
}
