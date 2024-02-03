import { Module } from '@nestjs/common';
import { QueueProcessor } from './QueueProcessor.service';
import { RedisModule } from 'src/redis/redis.module';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [RedisModule, UserModule],
  providers: [QueueProcessor, UserService],
  exports: [QueueProcessor], 
})
export class QueueProcessorModule {}