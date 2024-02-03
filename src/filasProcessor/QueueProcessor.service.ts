import { Injectable } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';
import { UserService } from '../user/user.service';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Injectable()
export class QueueProcessor {
  constructor(
    private readonly redisService: RedisService,
    private readonly userService: UserService,
  ) {}

  async processarFilaUsuarios() {    
    while (true) {
        
      const usuarioJSON = await this.redisService.removeItemInFilaRedis('users');      
      if (usuarioJSON) {        
        const usuario = JSON.parse(usuarioJSON);

        try{
            await this.userService.saveUserInDatabase(usuario);
        }catch(err){
            const addUserAgainCauseError = await this.redisService.addItemInFilaRedis('users', JSON.stringify(usuarioJSON))
        }
        
      } else {        
        // Se a fila estiver vazia, esperar um curto período de tempo
        await this.esperar(1000); // Espera 1 segundo antes de verificar a fila novamente
      }
    }
  }

  private async esperar(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  @Process()
  async processarFilaDeUsuarios(job: Job<unknown>) {
    console.log(job, 8888)
    // Lógica para processar o trabalho (job) da fila de usuários
  }
}