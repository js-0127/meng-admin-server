import { env } from "process";

export default () => ({
    redis: {
        socket: {
            host: env.REDIS_HOST || 'localhost',
            port: 6379,
          },
          database: 0
    },
    publish: {
        socket: {
            host: env.REDIS_HOST || 'localhost',
            port: 6379,
          },
          database: 1
    },
    subscribe: {
        socket: {
            host: env.REDIS_HOST|| 'localhost',
            port: 6379,
          },
          database: 2
    }
});
