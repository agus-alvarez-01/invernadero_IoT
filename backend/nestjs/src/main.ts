import { NestFactory } from '@nestjs/core';
import { SwaggerModule, OpenAPIObject } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as path from 'path';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 1. Quita automáticamente cualquier propiedad que no esté en el DTO
      forbidNonWhitelisted: true, // 2. Lanza un error 400 si el payload contiene propiedades no permitidas
      transform: true, // 3. Transforma los tipos del payload a los tipos reales del DTO
    }),
  );

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // 1. Apuntar al archivo JSON
  const jsonPath = path.resolve(process.cwd(), 'openapi.json');

  // 2. Leer y parsear el archivo
  const fileContent = fs.readFileSync(jsonPath, 'utf8');

  const swaggerDocument = JSON.parse(fileContent) as OpenAPIObject;

  // 3. Inicializar Swagger UI en la ruta /api-docs

  SwaggerModule.setup('api-docs', app, swaggerDocument);

  await app.listen(process.env.NESTJS_PORT ?? 3000);
}
bootstrap();
