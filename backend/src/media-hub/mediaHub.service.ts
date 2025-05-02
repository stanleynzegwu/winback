import { Injectable } from '@nestjs/common';
import { CreateMediaHubDto } from './dto/create-media-hub.dto';
import { UpdateMediaHubDto } from './dto/update-media-hub.dto';
import { InjectModel } from '@nestjs/mongoose';
import { MediaHub } from '../schemas/MediaHub.schema';
import { Model } from 'mongoose';

@Injectable()
export class MediaHubService {
  constructor(@InjectModel(MediaHub.name) private mediaHubModel: Model<MediaHub>) {}

  async create(createMediaHubDto: CreateMediaHubDto): Promise<MediaHub> {
    const newMediaImages = new this.mediaHubModel({
      ...createMediaHubDto,
    });

    // Save the new user
    const savedMediaImages = (await newMediaImages.save()).toObject() as MediaHub;

    return savedMediaImages
  }

  findAll() {
    const mediaImages = this.mediaHubModel.find().sort({ createdAt: -1 })
    return mediaImages
  }

  findOne(id: number) {
    return `This action returns a #${id} mediaHub`;
  }

  update(id: string,  updateMediaHubDto:  UpdateMediaHubDto) {
    return  this.mediaHubModel.findByIdAndUpdate(id,updateMediaHubDto,{ new: true })
  }

  remove(id: string) {
    return this.mediaHubModel.findByIdAndDelete(id)
  }
}
