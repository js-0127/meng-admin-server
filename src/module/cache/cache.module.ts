import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient } from 'redis';

@Global()
@Module({
   providers:[{
    provide: 'DEFAULT',
    async useFactory(configService: ConfigService){
      const client = createClient({
      ...configService.get('redis')
      })
      await client.connect();
      return client;
    },
    inject:[ConfigService]
  },
  {
    provide: 'PUBLISH',
    async useFactory(configService: ConfigService){
      const client = createClient({
        ...configService.get('publish')
      })
      await client.connect()
      return client;
    },
    inject:[ConfigService]
  },
  {
    provide: 'SUBSCRIBE',
    async useFactory(configService: ConfigService){
      const client = createClient({
       ...configService.get('subscribe')
      })
      await client.connect()
      return client;
    },
    inject:[ConfigService]
  }

],
  exports: ['DEFAULT', 'PUBLISH', 'SUBSCRIBE']
}, 

)
export class CacheModule {}