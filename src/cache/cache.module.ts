import { Global, Module } from '@nestjs/common';
import { createClient } from 'redis';

@Global()
@Module({
   providers:[{
    provide: 'DEFAULT',
    async useFactory(){
      const client = createClient({
        socket: {
          host: 'localhost',
          port: 6379,
        },
        database: 0
      })
      await client.connect();
      return client;
    },
  },
  {
    provide: 'PUBLISH',
    async useFactory(){
      const client = createClient({
        socket: {
          host: 'localhost',
          port: 6379,
        },
        database: 1
      })
      await client.connect()
      return client;
    }
  },
  {
    provide: 'SUBSCRIBE',
    async useFactory(){
      const client = createClient({
        socket: {
          host: 'localhost',
          port: 6379,
        },
        database: 2
      })
      await client.connect()
      return client;
    }
  }

],
  exports: ['DEFAULT', 'PUBLISH', 'SUBSCRIBE']
}, 

)
export class CacheModule {}