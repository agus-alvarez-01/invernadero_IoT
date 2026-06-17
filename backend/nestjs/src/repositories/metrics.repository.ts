import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Metric } from 'src/models/entities/metric.entity';
import { IMetricsRepository } from 'src/ports/out/IMetricsRepository.interface';

@Injectable()
export class MetricsRepository implements IMetricsRepository {
  constructor(
    @InjectRepository(Metric)
    private readonly repo: Repository<Metric>,
  ) {}

  async saveMetric(
    value: number,
    date: Date,
    sensorId: string,
  ): Promise<Metric> {
    return this.repo.save({
      value,
      date,
      sensor: { id: sensorId },
    });
  }

  /**
   * Pulls the single absolute newest entry in PostgreSQL for each requested sensor type
   */
  async findLatestMetrics(
    idDevice: string,
    sensorTypes: any,
  ): Promise<Metric[]> {
    return (
      this.repo
        .createQueryBuilder('metric')
        .innerJoin('metric.sensor', 'sensor')
        .innerJoin('sensor.device', 'device')
        .distinctOn(['sensor.type'])
        .select([
          'sensor.type AS "sensorType"',
          'metric.value AS "value"',
          'metric.date AS "date"',
        ])
        .where('device.id = :idDevice', { idDevice })
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        .andWhere('sensor.type IN (:...sensorTypes)', { sensorTypes })
        .orderBy('sensor.type', 'ASC')
        .addOrderBy('metric.date', 'DESC')
        .getRawMany()
    );
  }

  /**
   * Pulls structural historical metrics via QueryBuilder (Highly optimized raw select)
   */
  async findHistoryMetrics(
    idDevice: string,
    sensorType: string,
  ): Promise<any[]> {
    const query = this.repo
      .createQueryBuilder('metric')
      .innerJoin('metric.sensor', 'sensor')
      .innerJoin('sensor.device', 'device')
      .select([
        // 1. Promediamos el valor y lo casteamos a float/number
        'AVG(metric.value) AS "value"',

        // 2. Truncamos la fecha al minuto (Ejemplo para PostgreSQL)
        'DATE_TRUNC(\'minute\', metric.date) AS "date"',
      ])
      .where('device.id = :idDevice', { idDevice })
      .andWhere('sensor.type = :sensorType', { sensorType })
      // 3. Agrupamos por la fecha truncada al minuto
      .groupBy("DATE_TRUNC('minute', metric.date)")
      // 4. Ordenamos por el grupo de fecha
      .orderBy("DATE_TRUNC('minute', metric.date)", 'DESC')
      .limit(20);

    // Ejecuta la query sin mapeo de entidades
    return query.getRawMany();
  }
}
