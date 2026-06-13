import { Module } from '@nestjs/common';
import { SensorsController } from './sensors.controller';
import { ServicesModule } from '../services/services.module';
import { DevicesController } from './device.controller';
import { MetricsController } from './metrics.controller';
@Module({
  imports: [ServicesModule],
  controllers: [SensorsController, DevicesController, MetricsController],
})
export class ControllersModule {}
