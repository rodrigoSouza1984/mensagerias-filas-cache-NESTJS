import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { RedisModule } from './redis/redis.module';
import { QueueProcessorModule } from './filasProcessor/QueueProcessor.module';
import { UserBullModule } from './user-bull/user-bull.module';
import { FilasBullModule } from './bull-filas/filas-bull.module';
import { RabbitModule } from './rabbit/rabbit.module';


@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT) || 3306,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),   
    UserModule,
    RedisModule,
    QueueProcessorModule,
    UserBullModule,
    FilasBullModule,
    RabbitModule,    
  ],
  controllers: [AppController],
  providers: [AppService],
    
})
export class AppModule {}
