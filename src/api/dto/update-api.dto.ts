import { PartialType } from '@nestjs/swagger';
import { CreateApiDto } from './create-api.dto';

export class UpdateApiDto extends PartialType(CreateApiDto) {}
