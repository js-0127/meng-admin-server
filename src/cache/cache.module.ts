import { Global, Module } from '@nestjs/common';
import { createClient } from 'redis';

@Global()
@Module({
   providers:[{
    provide: 'REDIS_CLIENT',
    async useFactory(){
      const client = createClient({
        socket: {
          host: process.env.RD_HOST,
          port: parseInt(process.env.RD_PORT),
        },
      })
      await client.connect();
      return client;
    }
  }],
  exports: ['REDIS_CLIENT']
}, 

)
export class CacheModule {}
