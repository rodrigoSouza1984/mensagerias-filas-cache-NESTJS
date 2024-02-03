import { Module, forwardRef } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ConfigBullProvider } from './config-bull.provider';
import { UserFilasProcessor } from './users-fila-consumer-processor';
import { UserBullModule } from 'src/user-bull/user-bull.module';

@Module({
  imports: [    
    forwardRef(() => UserBullModule),
    BullModule.forRootAsync({useClass: ConfigBullProvider }),
    BullModule.registerQueue({
      name: 'users',
    }),
    
    BullModule.registerQueue({
      name: 'fila2',
    }),
  ],  
 
  providers: [UserFilasProcessor],
  exports: [BullModule],
})
export class FilasBullModule {}