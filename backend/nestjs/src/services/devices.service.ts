import { Injectable } from '@nestjs/common';

@Injectable()
export class DevicesService {
<<<<<<< HEAD
  constructor() {}
=======
  constructor(
    private readonly deviceRepository: DevicesRepository,
    // private readonly mqttService: MqttService <-- Opcional: Para enviarle la orden al ESP32 por MQTT
    // private readonly websocketGateway: InvernaderoGateway <-- Opcional: Para avisar a Next.js
  ) {}

  async changePumpStatus(idDevice: string, nuevoEstado: boolean) {
    // 1. Buscar si el dispositivo existe en Postgres
    const dispositivo = await this.deviceRepository.findOne({
      where: { id: idDevice },
    });

    if (!dispositivo) {
      throw new NotFoundException(
        `El dispositivo con ID ${idDevice} no existe en la base de datos.`,
      );
    }

    // 2. Actualizar el estado en el objeto de la entidad
    dispositivo.pumpStatus = nuevoEstado;

    // 3. Guardar el cambio en la base de datos
    const dispositivoActualizado =
      await this.deviceRepository.save(dispositivo);

    console.log(
      `[NestJS] Bomba del dispositivo [${idDevice}] cambiada a: ${nuevoEstado ? 'ENCENDIDO' : 'APAGADO'}`,
    );

    // 4. PASO COMUNICACIÓN IoT (Opcional pero recomendado para tu entrega)
    // Acá notificás al hardware que tiene que prender el relé

    return dispositivoActualizado;
  }
>>>>>>> e08e2a6f0decb27159d59e42a5ae334a3b3e9f3b
}
