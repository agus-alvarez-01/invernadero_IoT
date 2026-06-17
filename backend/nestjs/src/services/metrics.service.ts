import { Injectable, Logger } from '@nestjs/common';
import { CreateMetricDto } from '../models/dto/create-metric.dto';
import { MetricsRepository } from 'src/repositories/metrics.repository';
import { SensorsRepository } from 'src/repositories/sensors.repository';
import {
  isAnomalousReading,
  calculateDewPoint,
  calculateMovingAverage,
} from 'src/algorithms/climate-math';
import {
  clasificarSuelo,
  isTankLevelCritical,
} from 'src/algorithms/soil-and-tank-math';

@Injectable()
export class MetricsService {
  private readonly logger = new Logger(MetricsService.name);

  constructor(
    private readonly metricsRepository: MetricsRepository,
    private readonly sensorsRepository: SensorsRepository,
  ) {}

  async registerMetrics(idDevice: string, dto: CreateMetricDto) {
    // A. Filtro de Anomalías (Buscamos la última temp usando el método de tu compañero)
    const latestData = await this.metricsRepository.findLatestMetrics(
      idDevice,
      ['temp'],
    );

    console.log(dto);
    // Le decimos explícitamente al linter que confíe en que es un número
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
    const rawValue = latestData.length > 0 ? latestData[0].value : null;
    const lastTemp = rawValue !== null ? Number(rawValue) : null;

    const isAnomaly = isAnomalousReading(dto.temp, lastTemp);
    // B. Procesamiento Matemático
    const dewPointResult = calculateDewPoint(dto.temp, dto.airHum);
    const soilStatus = clasificarSuelo(dto.soilHum);
    const isTankCritical = isTankLevelCritical(dto.waterLevel);

    // C. Reporte en consola
    this.logger.log(`[Dispositivo ${idDevice}] Procesando nuevas métricas...`);
    this.logger.log(
      `Suelo: ${soilStatus} | Tanque Crítico: ${isTankCritical} | Rocío: ${dewPointResult.dewPoint}°C (${dewPointResult.status})`,
    );

    if (isAnomaly) {
      this.logger.warn(
        `¡Anomalía térmica detectada! Nueva: ${dto.temp}°C | Anterior: ${lastTemp}°C. Se descartará este valor.`,
      );
    }

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
  ): Promise<any[]> {
    const history = await this.metricsRepository.findHistoryMetrics(
      idDevice,
      sensorType,
    );

    if (history.length === 0) return [];

    // 1. Extraemos solo los números para pasárselos a tu función
    const rawValues = history.map((item) => item.value);

    // 2. Calculamos los promedios (reutilizando tu función calculateMovingAverage)
    const averages = calculateMovingAverage(rawValues, 5);

    // 3. Creamos el nuevo array mapeando el historial original
    // y reemplazando el valor original por el promedio usando el "index"
    // return history.map((item, index) => ({
    //   value: averages[index], // <-- Aquí asignamos el promedio calculado
    //   date: item.date, // <-- Aquí mantenemos la fecha original de ese registro
    // }));

    return history;
  }
}
