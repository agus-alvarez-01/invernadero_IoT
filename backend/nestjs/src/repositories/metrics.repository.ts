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
    timeframe: string,
  ): Promise<any[]> {
    // 1. Initialize the query building target columns
    const query = this.repo
      .createQueryBuilder('metric')
      .innerJoin('metric.sensor', 'sensor')
      .innerJoin('sensor.device', 'device')
      .select([
        'metric.id AS "id"',
        'metric.value AS "value"',
        'metric.date AS "date"',
      ])
      .where('device.id = :idDevice', { idDevice })
      .andWhere('sensor.type = :sensorType', { sensorType })
      .orderBy('metric.date', 'ASC'); // Oldest to newest for frontend lines

    // 2. Dynamically inject SQL timestamp limits depending on timeframe query
    if (timeframe === 'today') {
      const startOfToday = new Date();
      startOfToday.setHours(0, 0, 0, 0); // 00:00:00 local time
      query.andWhere('metric.date >= :startOfToday', { startOfToday });
    }
    if (timeframe === 'week') {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7); // 7 days back
      query.andWhere('metric.date >= :oneWeekAgo', { oneWeekAgo });
    }

    // 3. Execute query bypassing ORM entity hydration for ultimate speed
    return query.getRawMany();
  }
}
