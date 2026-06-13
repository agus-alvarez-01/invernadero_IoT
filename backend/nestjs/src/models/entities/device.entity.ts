import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Sensor } from './../entities/sensor.entity';

@Entity('devices')
export class Device {
  @PrimaryColumn()
  id: string; // El idDevice (ej: "ESP32-INV-01")

  @Column()
  name: string; // Ej: "Maceta Tomates"

  @Column({ default: false })
  pumpStatus: boolean; // Para saber si está regando

  // Un dispositivo tiene MUCHOS sensores
  @OneToMany(() => Sensor, (sensor) => sensor.device)
  sensors: Sensor[];
}
