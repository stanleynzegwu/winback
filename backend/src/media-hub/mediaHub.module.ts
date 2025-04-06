import { Module } from '@nestjs/common';
import { MediaHubService } from './mediaHub.service';
import { MediaHubController } from './media-hub.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MediaHub, MediaHubSchema } from '../schemas/MediaHub.schema';


@Module({
  imports: [
    MongooseModule.forFeature([{
        name: MediaHub.name,
        schema: MediaHubSchema,
    }])
  ],
  controllers: [MediaHubController],
  providers: [MediaHubService],
})
export class MediaHubModule {}
