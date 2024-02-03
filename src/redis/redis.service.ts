import { Injectable } from '@nestjs/common';
import Redis, { Redis as RedisClient } from 'ioredis';


@Injectable()
export class RedisService {
    private readonly redisClient: RedisClient;
    private readonly redisClientForPublish: RedisClient;
    

    constructor() {
        this.redisClient = new Redis({
            host: process.env.REDIS_HOST,
            port: Number(process.env.REDIS_PORT)
        });

        this.redisClient.on('error', (err) => {
            console.log('Error on Redis');
            console.log(err);
            process.exit(1);
        });

        this.redisClient.on('connect', () => {
            console.log('Redis connected!');
        });

        // Configurar o cliente para publicação
        this.redisClientForPublish = new Redis();
        this.redisClientForPublish.on('connect', () => {
            console.log('Connected to Redis for publishing');
        });

    }

    async setValue(key: string, value: string): Promise<string> {
        await this.redisClient.set(key, value);
        return 'Value set successfully';
    }

    async setValueWithExpirate(key: string, seconds: number, value: string): Promise<string> {
        await this.redisClient.setex(key, seconds, value);
        return 'Value set with expiration successfully';
    }

    async getValue(key: string): Promise<string | null> {
        return await this.redisClient.get(key);
    }

    async publish(channel: string, message: any): Promise<any> {
        console.log(channel, message, 8888888)
        return await this.redisClientForPublish.publish(channel, JSON.stringify(message));
    }

    subscribe(channel: string, callback: (message: any) => void): void {
        this.redisClient.subscribe(channel, (err, count) => {
            if (err) {
                console.error('Error subscribing to channel:', err);
                return;
            }
            console.log(`Subscribed to channel ${channel}`);
        });

        this.redisClient.on('message', (subChannel, message) => {
            console.log(message, 777, subChannel)
            if (subChannel === channel) {
                callback(JSON.parse(message));
            }
        });
    }


    async addItemInFilaRedis(nameFila: string, itemAddFila: string) {
        await this.redisClient.lpush(nameFila, itemAddFila)
        //-> fila tipo fifo usa lpush e lpop
    }

    async removeItemInFilaRedis(nameFila: string) {
        return await this.redisClient.lpop(nameFila);
        //lpop -> retira o 1 elemento add a fila 
        //rpop -> retira o ultimo elemento add a fila
    }

    async lengthFila(nameFila: string) {
        const lengthFila = await this.redisClient.llen(nameFila)
        console.log(lengthFila)
        return lengthFila
    }

    

    

}