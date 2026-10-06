import { IsDateString, IsOptional } from 'class-validator';

export class SnapshotQueryDto {
  @IsOptional()
  @IsDateString()
  since?: string;
}
