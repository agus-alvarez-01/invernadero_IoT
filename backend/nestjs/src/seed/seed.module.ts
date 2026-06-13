import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { Sensor } from 'src/models/entities/sensor.entity';
import { Device } from 'src/models/entities/device.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Metric } from 'src/models/entities/metric.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sensor, Device, Metric])],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
