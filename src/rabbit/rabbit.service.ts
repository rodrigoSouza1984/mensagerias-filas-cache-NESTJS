import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateRabbitDto } from './dto/update-rabbit.dto';
import { AmqpConnection, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class RabbitService {
  constructor(private amqpConnection: AmqpConnection) {}
  
  async create(data?: any) {      
    let tentativa = data && data.tentativas ? data.tentativas : 0
    const messageFila = {id: 1, tentativas: tentativa, message: 'ola td bem teste nest'}
    await this.amqpConnection.publish('amq.direct', 'nest-exchange-teste-nest', messageFila)
    
  }

  //caso não exista a configuracao de fila e exchange ainda ele cria por aki
  @RabbitSubscribe({
    exchange: 'amq.direct',
    routingKey: 'nest-exchange-teste-nest',
    queue: 'fila-teste-nestjs',    
  })
  consume(msg: any){
    try{
      if(1+1 === 3){
        setTimeout(() =>{
          console.log(msg.tentativas)
        }, 3000)
      }else{
        console.log('666666')
        throw new HttpException('error', HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }catch(err){         
      console.log('errrrrr')

      if(msg.tentativas < 3){
        console.log(msg.tentativas)
        let qtdTentativa = msg.tentativas + 1        
        return this.create({tentativas: qtdTentativa }) 
      }else{
        console.log('fazer algo com msg com mais de 3 tentativas deu erro, jogue para outra fila, ou banco , ou loguer para ver o que fazer')
      }        
    }   

    //modes de leitura da fila
    //ACK (descrata a msg)
    //Nack (descarta a msg ou enfileire novamente)

  }

}
