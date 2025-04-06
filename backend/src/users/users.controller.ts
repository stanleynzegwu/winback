import { Body, Controller, Delete, Get, HttpException, Param, ParseIntPipe, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import mongoose from 'mongoose';
import { UpdateUserDto } from './dto/UpdateUser.dto';
// import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { JwtGuard } from '../auth/guards/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.usersService.getUsers()
  }

  @UseGuards(JwtGuard)
  @Get(':id') //Get /users/:id
  async getUserById(@Param('id') id){  
    const user = await this.usersService.getUserById(id)
    if(!user) throw new HttpException('User Not Found', 404)
    return user
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto)
  }

  @Patch(':id') //PATCH/ users/:id
  async updateOne(@Param('id') id:string, @Body() updateUserDto: UpdateUserDto){
    const isValidId = mongoose.Types.ObjectId.isValid(id)
    if(!isValidId) throw new HttpException('Invalid Id', 400)
    const updatedUser = await this.usersService.updateUser(id,updateUserDto)
    if(!updatedUser) throw new HttpException('User not found',404)
    return updatedUser
  }

  @Delete(':id')
    async deleteUser(@Param('id') id:string){
    const isValidId = mongoose.Types.ObjectId.isValid(id)
    if(!isValidId) throw new HttpException('Invalid Id', 400)
    const deletedUser = await this.usersService.deleteUser(id)
    if(!deletedUser) throw new HttpException('User not found',404)
        return deletedUser //or you might just return nothing, you just need the status code of 200 to indicate it was deleted
  }
}
