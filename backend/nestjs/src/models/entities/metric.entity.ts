import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Sensor } from './sensor.entity';

@Entity('metrics')
export class Metric {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: string; // Usamos BigInt porque esta tabla acumulará muchísimos registros en semanas

  @Column('float')
  value: number; // El valor de la medición (ej: 24.5, 60.2)

  @CreateDateColumn()
  date: Date; // Guardamos la fecha explícita (sirve para offline/tiempo real)

  // Muchas métricas pertenecen a UN sensor
  @ManyToOne(() => Sensor, (sensor) => sensor.metrics, { onDelete: 'CASCADE' })
  sensor: Sensor;
}
