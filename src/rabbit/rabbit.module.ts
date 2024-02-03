import { Global, Module } from '@nestjs/common';
import { RabbitService } from './rabbit.service';
import { RabbitController } from './rabbit.controller';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';


@Global()
@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      uri : 'amqp://admin:admin@localhost:5672' ,
    }),
  ],
  controllers: [RabbitController],
  providers: [RabbitService],
  exports: [RabbitMQModule]
})
export class RabbitModule {}
