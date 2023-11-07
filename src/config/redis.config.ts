export default () => ({
    redis: {
        socket: {
            host: 'localhost',
            port: 6379,
          },
          database: 0
    },
    publish: {
        socket: {
            host: 'localhost',
            port: 6379,
          },
          database: 1
    },
    subscribe: {
        socket: {
            host: 'localhost',
            port: 6379,
          },
          database: 2
    }
});
