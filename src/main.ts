import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//import { QueueProcessor } from './filasProcessor/QueueProcessor.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule) 
  await app.listen(3000);
  
  // const userQueueProcessor = app.get(QueueProcessor);  
  // await userQueueProcessor.processarFilaUsuarios();
}
bootstrap();


