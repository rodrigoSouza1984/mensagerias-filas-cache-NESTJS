import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserBullService } from './user-bull.service';
import { CreateUserBullDto } from './dto/create-user-bull.dto';
import { UpdateUserBullDto } from './dto/update-user-bull.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('user-bull')
export class UserBullController {
  constructor(private readonly userBullService: UserBullService) {}

  @Get()
  findAll() {
    return this.userBullService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userBullService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserBullDto: UpdateUserBullDto) {
    return this.userBullService.update(+id, updateUserBullDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userBullService.remove(+id);
  }

  @Post()
  addUserInfila(@Body() createUserDto: CreateUserDto) {
    return this.userBullService.addUserInfila(createUserDto);
  }
}
