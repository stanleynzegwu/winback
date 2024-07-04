import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.schema';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  createUser(createUsersDto: CreateUserDto) {
    const newUser = new this.userModel(createUsersDto)
    return newUser.save()
  }

  getUsers() {
    const users = this.userModel.find()
    return users
  }

  getUserById(id: string){
    return this.userModel.findById(id)
  }

  updateUser(id: string,updateUserDto: UpdateUserDto){
    return this.userModel.findByIdAndUpdate(id,updateUserDto,{ new: true })
  }

  deleteUser(id: string){
    return this.userModel.findByIdAndDelete(id)
  }
}