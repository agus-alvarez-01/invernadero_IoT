import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMetricDto } from '../models/dto/create-metric.dto';
import { MetricsRepository } from 'src/repositories/metrics.repository';
import { SensorsRepository } from 'src/repositories/sensors.repository';

@Injectable()
export class MetricsService {
  constructor(
    private readonly metricsRepository: MetricsRepository,
    private readonly sensorsRepository: SensorsRepository,
  ) {}

  async registerMetrics(idDevice: string, dto: CreateMetricDto) {
    // 2. Mapeamos las métricas del DTO a un formato clave-valor para iterarlas fácilmente
    const mapMetrics = {
      temp: dto.temp,
      airHum: dto.airHum,
      soilHum: dto.soilHum,
      waterLevel: dto.waterLevel,
    };

    // 3. Iteramos cada métrica recibida para guardarla en su respectivo sensor
    for (const [sensorType, value] of Object.entries(mapMetrics)) {
      // Buscamos el sensor asociado a este dispositivo en la BD
      const sensor = await this.sensorsRepository.findByDeviceAndType(
        idDevice,
        sensorType,
      );

      if (!sensor) {
        // Opción A: Lanzar error si no existe (Exige aprovisionamiento previo en /handshake)
        console.warn(
          `[Advertencia] El sensor ${sensorType} no está registrado para el dispositivo ${idDevice}`,
        );
        continue;

        // Opción B (Alternativa): Podrías crearlo automáticamente acá si no querés hacer handshake previo
      }

      // Guardamos el registro histórico en la tabla 'metrics' asociada a ese idSensor
      await this.metricsRepository.saveMetric(value, new Date(), sensor.id);
    }

    return {
      status: 'success',
      message: 'Métricas históricas almacenadas con éxito',
    };
  }

  async getLatestMetric(
    idDevice: string,
    sensorTypes: string[],
  ): Promise<any[]> {
    if (sensorTypes.length === 0) return [];

    return await this.metricsRepository.findLatestMetrics(
      idDevice,
      sensorTypes,
    );
  }

  async getHistoryBySensorType(
    idDevice: string,
    sensorType: string,
    timeframe: string,
  ): Promise<any[]> {
    return await this.metricsRepository.findHistoryMetrics(
      idDevice,
      sensorType,
      timeframe,
    );
  }
}
