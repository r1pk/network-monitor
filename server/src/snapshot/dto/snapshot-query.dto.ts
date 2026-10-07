import { IsDateString, IsOptional } from 'class-validator';

export class SnapshotQueryDto {
  @IsOptional()
  @IsDateString()
  since?: string = new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString();
}
