import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Device } from 'src/models/entities/device.entity';
import { Metric } from 'src/models/entities/metric.entity';
import { Sensor } from 'src/models/entities/sensor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Device)
    private readonly deviceRepo: Repository<Device>,
    @InjectRepository(Sensor)
    private readonly sensorRepo: Repository<Sensor>,
    @InjectRepository(Metric)
    private readonly metricRepo: Repository<Metric>,
  ) {}

  async onApplicationBootstrap() {
    console.log('---------------------------------------------------------');
    console.log('[Seeder] Checking initial mock data for development...');

    const mockDeviceId = 'ESP32-INV-01';

    // 1. Verify if the target device already exists to avoid duplication
    const deviceExists = await this.deviceRepo.findOne({
      where: { id: mockDeviceId },
    });

    if (!deviceExists) {
      console.log(
        `[Seeder] Device ${mockDeviceId} not found. Initializing development environment...`,
      );

      // Create core device tracking entity
      const newDevice = this.deviceRepo.create({
        id: mockDeviceId,
        name: 'Tomato Greenhouse (Mock)',
        pumpStatus: false,
      });
      const savedDevice = await this.deviceRepo.save(newDevice);

      // 2. Register hardware sensors and map references for historical linking
      const baseSensorsConfig = [
        { type: 'temp', pin: 'GPIO23' },
        { type: 'airHum', pin: 'GPIO23' },
        { type: 'soilHum', pin: 'GPIO34' },
        { type: 'waterLevel', pin: 'GPIO5' },
      ];

      const createdSensorsMap: { [key: string]: Sensor } = {};

      for (const config of baseSensorsConfig) {
        const newSensor = this.sensorRepo.create({
          type: config.type,
          pin: config.pin,
          device: savedDevice,
        });
        const savedSensor = await this.sensorRepo.save(newSensor);
        createdSensorsMap[config.type] = savedSensor;
        console.log(
          `[Seeder] Sensor [${config.type}] successfully registered.`,
        );
      }

      // 3. GENERATE HISTORICAL TELEMETRY (Simulating the last 3 hours of data)
      console.log(
        '[Seeder] Generating realistic historical metrics for chart population...',
      );

      const now = new Date();
      const recordsCount = 36; // Generates 1 record every 5 minutes (3 hours total)
      const metricsToSave: Metric[] = [];

      for (let i = recordsCount; i > 0; i--) {
        // Calculate timestamp back into the past via 5-minute blocks
        const measurementDate = new Date(now.getTime() - i * 5 * 60 * 1000);

        // Generate values using a sine wave oscillation factor for realistic fluctuations
        const waveFactor = Math.sin(i * 0.5);

        const tempVal = parseFloat((24.5 + waveFactor * 1.2).toFixed(1));
        const airHumVal = parseFloat((60.0 - waveFactor * 3.5).toFixed(1));
        const soilHumVal = parseFloat(
          (45.2 - (recordsCount - i) * 0.1).toFixed(1),
        ); // Gradual drying trend
        const waterLevelVal = parseFloat(
          (92.5 - (recordsCount - i) * 0.05).toFixed(1),
        ); // Minimal volume drop

        // Push standard metric schemas referencing mapped database sensors
        metricsToSave.push(
          this.metricRepo.create({
            value: tempVal,
            date: measurementDate,
            sensor: createdSensorsMap['temp'],
          }),
        );
        metricsToSave.push(
          this.metricRepo.create({
            value: airHumVal,
            date: measurementDate,
            sensor: createdSensorsMap['airHum'],
          }),
        );
        metricsToSave.push(
          this.metricRepo.create({
            value: soilHumVal,
            date: measurementDate,
            sensor: createdSensorsMap['soilHum'],
          }),
        );
        metricsToSave.push(
          this.metricRepo.create({
            value: waterLevelVal,
            date: measurementDate,
            sensor: createdSensorsMap['waterLevel'],
          }),
        );
      }

      // Bulk insert everything at once for heavy runtime performance optimization
      await this.metricRepo.save(metricsToSave);
      console.log(
        `[Seeder] Success! ${metricsToSave.length} historical metric entries seeded into PostgreSQL.`,
      );
      console.log(
        '[Seeder] Database environment successfully populated for local testing!',
      );
    } else {
      console.log(
        `[Seeder] Device ${mockDeviceId} already exists in database. Skipping seed operations.`,
      );
    }
    console.log('---------------------------------------------------------');
  }
}
