import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User } from 'src/schemas/User.schema';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { hash } from 'bcrypt';

// Define a type that omits the password field from the User schema
type PublicUser = Omit<User, 'password'>;

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  // async createUser(createUserDto: CreateUserDto): Promise<User> {
  //   const existingUser = await this.userModel.findOne({ username: createUserDto.username });
  //   if (existingUser) {
  //     throw new HttpException('Username already exists', 400);
  //   }
  //   const newUser = new this.userModel(createUserDto);
  //   return newUser.save();
  // }

  async createUser(createUserDto: CreateUserDto): Promise<PublicUser> {
    const existingUser = await this.userModel.findOne({ email: createUserDto.email });
    if (existingUser) {
      throw new HttpException('Email already exists', 400);
    }

    // Hash the password before saving
    const hashedPassword = await hash(createUserDto.password, 10);

    // Create the new user with the hashed password
    const newUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });

    // Save the new user
    const savedUser = (await newUser.save()).toObject() as User;

    // Exclude the password from the returned user object
    const { password, ...result } = savedUser
    return result as PublicUser;
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

  getUserByEmail(email: string){
    return this.userModel.findOne({ email })

    // const user = await this.userModel.findOne({ email }).exec();
    // if (!user) {
    //   throw new HttpException('User Not Found', 404);
    // }
    // return user;
  }

  updateUser(id: string,updateUserDto: UpdateUserDto){
    return this.userModel.findByIdAndUpdate(id,updateUserDto,{ new: true })
  }

  deleteUser(id: string){
    return this.userModel.findByIdAndDelete(id)
  }
}