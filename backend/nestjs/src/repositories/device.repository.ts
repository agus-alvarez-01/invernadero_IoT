import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Device } from 'src/models/entities/device.entity';
import { CreateDeviceDto } from 'src/models/dto/create-device.dto';

@Injectable()
export class DevicesRepository {
  constructor(
    @InjectRepository(Device)
    private readonly repo: Repository<Device>,
  ) {}

  async findOne(query: any): Promise<Device> {
    return this.repo.findOne(query);
  }

  async save(dto: CreateDeviceDto): Promise<Device> {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }
}
