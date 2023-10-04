import { Inject, Injectable } from "@nestjs/common";
import { RedisClientType } from "redis";
import * as NodeRSA from 'node-rsa'
import { R } from "src/utils/common/error";


@Injectable()
export class RsaService {
  
 constructor(@Inject('REDIS_CLIENT') readonly redisClient: RedisClientType ){}
    //获取公钥
    public async getPublicKey(): Promise<string>{
      const key = new NodeRSA({b: 512});
      const publicKey = key.exportKey('public')
      const privateKey = key.exportKey('private')
      await this.redisClient.set(`publicKey:${publicKey}`, privateKey);
      return publicKey
} 
    public async decrypt(publicKey:string, data: string) {
        const privateKey = await this.redisClient.get(`publicKey:${publicKey}`)
        if(!privateKey) {
            throw R.error('私钥解密失败或已失效')
        }

        const decrypt = new NodeRSA(privateKey)
        decrypt.setOptions({encryptionScheme: 'pkcs1'})
        return  decrypt.decrypt(data, 'utf8')
    }
    
}