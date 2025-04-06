import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/User.schema';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{
        name: User.name,
        schema: UserSchema,
    }])
  ],
  controllers: [AuthController],
  providers: [AuthService,UsersService, JwtService]
})
export class AuthModule {}
