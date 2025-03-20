import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CampaignModule } from './campaign/campaign.module';
import { MediaHubModule } from './media-hub/mediaHub.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DB_STRING'),
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    CampaignModule,
    MediaHubModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}