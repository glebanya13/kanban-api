import { ApiProperty } from '@nestjs/swagger';

export class DatabaseModel {
  @ApiProperty()
  id: string;
}
