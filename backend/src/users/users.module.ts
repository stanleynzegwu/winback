import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/User.schema';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{
        name: User.name,
        schema: UserSchema,
    }])
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtService],
})
export class UserModule {}