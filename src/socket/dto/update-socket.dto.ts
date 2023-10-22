import { PartialType } from '@nestjs/mapped-types';
import { CreateSocketDto } from './create-socket.dto';

export class UpdateSocketDto extends PartialType(CreateSocketDto) {
  id: number;
}
