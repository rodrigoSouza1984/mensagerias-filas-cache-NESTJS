import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class AppService {

  constructor(){}
  getHello(): string {
    return 'Hello World!';
  }
}
