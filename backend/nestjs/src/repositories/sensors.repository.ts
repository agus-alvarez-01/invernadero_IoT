import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sensor } from '../models/entities/sensor.entity';
import { CreateSensorDto } from '../models/dto/create-sensor.dto';

@Injectable()
export class SensorsRepository {
  constructor(
    @InjectRepository(Sensor)
    private readonly repo: Repository<Sensor>,
  ) {}

  async save(dto: CreateSensorDto): Promise<Sensor> {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  //Busca un sensor que pertenezca a un dispositivo y coincida con el tipo
  async findByDeviceAndType(
    idDevice: string,
    type: string,
  ): Promise<Sensor | null> {
    return this.repo.findOne({
      where: {
        type: type,
        device: { id: idDevice },
      },
    });
  }
}
