import { Injectable } from '@nestjs/common';
import { CreateUserBullDto } from './dto/create-user-bull.dto';
import { UpdateUserBullDto } from './dto/update-user-bull.dto';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/user/dto/create-user.dto';


@Injectable()
export class UserBullService {

  constructor(
    @InjectQueue('users') private usersFila: Queue,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,    
  ) { }


  create(createUserBullDto: CreateUserBullDto) {
    return 'This action adds a new userBull';
  }

  findAll() {
    return `This action returns all userBull`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userBull`;
  }

  update(id: number, updateUserBullDto: UpdateUserBullDto) {
    return `This action updates a #${id} userBull`;
  }

  remove(id: number) {
    return `This action removes a #${id} userBull`;
  }


  //https://rollingglory.com/blog/back-end/queues-using-bull-in-nestjs
  async addUserInfila(createUserDto: CreateUserDto) {
    try {      

      for (let i = 1; i < 2; i++) {
        const user = new UserEntity()

        user.name = createUserDto.name + `${i}`
        user.email = createUserDto.email + `${i}`
        user.password = createUserDto.password      

        this.usersFila.add('users-job', user, {delay: 1000})        
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
}
