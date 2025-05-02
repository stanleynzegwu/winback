import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MediaHubService } from './mediaHub.service';
import { CreateMediaHubDto } from './dto/create-media-hub.dto';
import { UpdateMediaHubDto } from './dto/update-media-hub.dto';

@Controller('media-hub')
export class MediaHubController {
  constructor(private readonly mediaHubService: MediaHubService) {}

  @Post()
  create(@Body() createMediaHubDto: CreateMediaHubDto) {
    return this.mediaHubService.create(createMediaHubDto);
  }

  @Get()
  findAll() {
    return this.mediaHubService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mediaHubService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMediaHubDto: UpdateMediaHubDto) {
    return this.mediaHubService.update(id, updateMediaHubDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mediaHubService.remove(id);
  }
}
