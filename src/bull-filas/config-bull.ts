export default {
    redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
    },
    prefix: 'bull-queue',
    defaultJobOptions: {
        attemps: 3,
        removeOnComplete: false,
        backoff: {
            type: 'exponential',
            delay: 1000
        }
    }
}
