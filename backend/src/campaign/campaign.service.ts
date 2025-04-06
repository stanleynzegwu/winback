import { Get, Injectable, Param, Query } from '@nestjs/common';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { Campaign } from '../schemas/Campaign.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CampaignService {
  constructor(@InjectModel(Campaign.name) private campaignModel: Model<Campaign>) {}

  async create(createCampaignDto: CreateCampaignDto): Promise<Campaign> {
    const newCampaign = new this.campaignModel({
      ...createCampaignDto,
    });

    // Save the new user
    const savedCampaign = (await newCampaign.save()).toObject() as Campaign;

    return savedCampaign
  }

  findAll() {
    const campaigns = this.campaignModel.find().sort({ createdAt: -1 })
    return campaigns
  }

  findOne( id: string) {
    return this.campaignModel.findById(id);
  }

  update(id: string, updateCampaignDto: UpdateCampaignDto) {
    return  this.campaignModel.findByIdAndUpdate(id,updateCampaignDto,{ new: true })
  }

  remove(id: string) {
    return this.campaignModel.findByIdAndDelete(id)
  }
}
