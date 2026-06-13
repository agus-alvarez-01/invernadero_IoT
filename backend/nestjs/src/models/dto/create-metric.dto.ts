import { IsNumber, IsOptional } from 'class-validator';

export class CreateMetricDto {
  @IsNumber()
  temp: number;

  @IsNumber()
  airHum: number;

  @IsNumber()
  soilHum: number;

  @IsNumber()
  waterLevel: number;
}
