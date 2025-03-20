// import { Module } from '@nestjs/common';
// import { AboutController } from './about.controller';
// import { AboutService } from './about.service';
// import { MongooseModule } from '@nestjs/mongoose';
// import { About, AboutSchema } from '../schemas/About.schema';

// @Module({
//     imports: [
//         MongooseModule.forFeature([{
//             name: About.name,
//             schema: AboutSchema,
//         }])
//       ],
//       controllers: [AboutController],
//       providers: [AboutService]
// })
// export class AboutModule {}

import { Module } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CampaignController } from './campaign.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Campaign, CampaignSchema } from 'src/schemas/Campaign.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
        name: Campaign.name,
        schema: CampaignSchema,
    }])
  ],
  controllers: [CampaignController],
  providers: [CampaignService],
})
export class CampaignModule {}
