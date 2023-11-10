import {env} from 'process'
export default () => ({
    minio: {
            isGlobal: true,
            endPoint: env.MINIO_HOST || 'localhost',
            port: env.MINIO_PORT ? Number(env.MINIO_PORT) : 9002,
            useSSL: false,
            accessKey: env.MINIO_ROOT_USER || 'minio',
            secretKey: env.MINIO_ROOT_PASSWORD || 'minio@123',
          },
    bucket: {
      name: 'meng-admin' 
    }
})