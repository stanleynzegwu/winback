import { Get, Injectable, Param, Query } from '@nestjs/common';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { Campaign } from 'src/schemas/Campaign.schema';
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

  findOne( id: string) {  // Make sure id is a string
    return this.campaignModel.findById(id);
  }

  update(id: number, updateCampaignDto: UpdateCampaignDto) {
    return `This action updates a #${id} campaign`;
  }

  remove(id: number) {
    return `This action removes a #${id} campaign`;
  }
}
