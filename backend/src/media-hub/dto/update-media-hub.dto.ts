import { PartialType } from '@nestjs/mapped-types';
import { CreateMediaHubDto } from './create-media-hub.dto';

export class UpdateMediaHubDto extends PartialType(CreateMediaHubDto) {}
