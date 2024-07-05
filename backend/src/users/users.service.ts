import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User } from 'src/schemas/User.schema';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userModel.findOne({ username: createUserDto.username });
    if (existingUser) {
      throw new HttpException('Username already exists', 400);
    }
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }


  getUsers() {
    const users = this.userModel.find()
    return users
  }

  // getUserById(id: string){
  //   return this.userModel.findById(id)
  // }

  getUserById(id: string){
    const isValidId = mongoose.Types.ObjectId.isValid(id)
    if(!isValidId) throw new HttpException('User Not Found', 404)
    return this.userModel.findById(id)
  }

  updateUser(id: string,updateUserDto: UpdateUserDto){
    return this.userModel.findByIdAndUpdate(id,updateUserDto,{ new: true })
  }

  deleteUser(id: string){
    return this.userModel.findByIdAndDelete(id)
  }
}