import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot(''),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}