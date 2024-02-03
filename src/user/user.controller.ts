import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService ) {}

  @Get('pubSubRedisTest')
  pubSubRedisTest() {      
    return this.userService.pubSubRedisTest();
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(@Req() request: any) {
    const keyName = `${request.path}${JSON.stringify(request.query)}`    
    return this.userService.findAll(keyName);
  }

  @Get(':userId')
  findOne(@Param('userId') userId: number) {
    return this.userService.findOne(userId);
  }

  @Patch(':userId')
  update(@Param('userId') userId: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(userId, updateUserDto);
  }

  @Delete(':userId')
  remove(@Param('userId') userId: number) {
    return this.userService.remove(userId);
  }
 
  @Post('addUserInfila')
  addUserInfila(@Body() createUserDto: CreateUserDto) {
    return this.userService.addUserInfila(createUserDto);
  }
  
}
