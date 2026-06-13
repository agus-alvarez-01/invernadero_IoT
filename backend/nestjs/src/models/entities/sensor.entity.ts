import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Device } from './device.entity';
import { Metric } from './../entities/metric.entity';

@Entity('sensors')
export class Sensor {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: string;

  @Column()
  type: string; // Ej: "TEMPERATURA", "HUMEDAD_SUELO", "NIVEL_AGUA"

  @Column({ nullable: true })
  pin: string; // Opcional: para saber a qué pin del ESP32 está conectado

  // Muchos sensores pertenecen a UN dispositivo
  @ManyToOne(() => Device, (device) => device.sensors, { onDelete: 'CASCADE' })
  device: Device;

  // Un sensor genera MUCHAS métricas (historial)
  @OneToMany(() => Metric, (metric) => metric.sensor)
  metrics: Metric[];
}
