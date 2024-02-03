import { Module } from '@nestjs/common';
import { UserBullService } from './user-bull.service';
import { UserBullController } from './user-bull.controller';
import { FilasBullModule } from 'src/bull-filas/filas-bull.module';
import { UserEntity } from 'src/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [FilasBullModule,TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserBullController],
  providers: [UserBullService],
  exports: [TypeOrmModule, UserBullService],
})
export class UserBullModule {}

  