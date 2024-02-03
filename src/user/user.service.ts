import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RedisService } from '../redis/redis.service';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';


@Injectable()
export class UserService {

  constructor(@InjectRepository(UserEntity)
  private userRepository: Repository<UserEntity>,
    private redisService: RedisService, 
    //@InjectQueue('users') private userFilas: Queue   
    
  ) { }
  
  async pubSubRedisTest(){
    const c = this.redisService.subscribe('chanell', (message) => {
      console.log('Mensagem recebida:', message);
      // Faça algo com a mensagem recebida, como notificar o cliente ou processar os dados
    }); 

    const messagePublish = await this.redisService.publish('chanell', 'send a message')

    console.log(messagePublish, 'messagePublish' )   
  }

  async create(createUserDto: CreateUserDto) {
    try {

      let users = []

      for (let i = 1; i < 1000; i++) {
        const user = new UserEntity()

        user.name = createUserDto.name + 'i'
        user.email = createUserDto.email + 'i'
        user.password = createUserDto.password

        console.log(i, 88)

        users.push(user)
      }

      return await this.userRepository.save(users)

    } catch (err) {
      throw err
    }
  }

  async findAll(keyName: string) {
    try {        

      const usersInCash = await this.redisService.getValue('keyName')

      if (usersInCash) {

        console.log('cache')

        return JSON.parse(usersInCash)

      } else {

        const usersInDatabase = await this.userRepository.find()

        //await this.redisService.setValue('user', JSON.stringify(usersInDatabase))

        const setUsersInCash = await this.redisService.setValueWithExpirate('keyName', 10, JSON.stringify(usersInDatabase))

        console.log('dataBase')

        return usersInDatabase

      }

    } catch (err) {
      throw err
    }
  }  

  async findOne(userId: number) {
    try {
      return await this.userRepository.findOne(userId)
    } catch (err) {
      throw err
    }
  }

  async update(userId: number, updateUserDto: UpdateUserDto) {
    try {
      return await this.userRepository.save({ ...updateUserDto, id: Number(userId) })
    } catch (err) {
      throw err
    }
  }

  async remove(userId: number) {
    try {
      return await this, this.userRepository.delete(userId)
    } catch (err) {
      throw err
    }
  }


  // async addUserInfila(createUserDto: CreateUserDto) {
  //   try {

  //     let users = []

  //     for (let i = 1; i < 10; i++) {
  //       const user = new UserEntity()

  //       user.name = createUserDto.name + `${i}`
  //       user.email = createUserDto.email + `${i}`
  //       user.password = createUserDto.password

  //       await this.redisService.addItemInFilaRedis('users', JSON.stringify(user))
  //     }

  //     return this.redisService.lengthFila('users')      

  //   } catch (err) {
  //     throw err
  //   }
  // }

  async addUserInfila(createUserDto: CreateUserDto) {
    try {

      let users = []

      for (let i = 1; i < 10; i++) {
        const user = new UserEntity()

        user.name = createUserDto.name + `${i}`
        user.email = createUserDto.email + `${i}`
        user.password = createUserDto.password

        //await this.adicionarUsuarioAFila( user)        
      }

      return 'ok'

    } catch (err) {
      throw err
    }
  }


  async saveUserInDatabase(user: CreateUserDto){
    try{
      return await this.userRepository.save(user)
    }catch(err){
      throw err
    }
  }


  // async adicionarUsuarioAFila(user: any) {
  //   await this.queue.add('users', user);
  // }

}
