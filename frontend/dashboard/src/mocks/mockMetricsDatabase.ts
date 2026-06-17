import { Metric } from "@/types/main.types";

export const mockMetricsDatabase: Metric[] = [
  // Temperatura
  { sensorType: "temp", value: 22.1, date: new Date("2026-06-01T08:00:00Z") },
  { sensorType: "temp", value: 22.8, date: new Date("2026-06-01T09:00:00Z") },
  { sensorType: "temp", value: 23.4, date: new Date("2026-06-01T10:00:00Z") },
  { sensorType: "temp", value: 24.2, date: new Date("2026-06-01T11:00:00Z") },
  { sensorType: "temp", value: 25.1, date: new Date("2026-06-01T12:00:00Z") },

  // Humedad Aire
  { sensorType: "airHum", value: 60, date: new Date("2026-06-01T08:00:00Z") },
  { sensorType: "airHum", value: 58, date: new Date("2026-06-01T09:00:00Z") },
  { sensorType: "airHum", value: 55, date: new Date("2026-06-01T10:00:00Z") },
  { sensorType: "airHum", value: 57, date: new Date("2026-06-01T11:00:00Z") },
  { sensorType: "airHum", value: 62, date: new Date("2026-06-01T12:00:00Z") },

  // Humedad Suelo
  { sensorType: "soilHum", value: 40, date: new Date("2026-06-01T08:00:00Z") },
  { sensorType: "soilHum", value: 42, date: new Date("2026-06-01T09:00:00Z") },
  { sensorType: "soilHum", value: 41, date: new Date("2026-06-01T10:00:00Z") },
  { sensorType: "soilHum", value: 44, date: new Date("2026-06-01T11:00:00Z") },
  { sensorType: "soilHum", value: 46, date: new Date("2026-06-01T12:00:00Z") },

  // Nivel Agua
  { sensorType: "waterLevel", value: 80, date: new Date("2026-06-01T08:00:00Z") },
  { sensorType: "waterLevel", value: 79, date: new Date("2026-06-01T09:00:00Z") },
  { sensorType: "waterLevel", value: 78, date: new Date("2026-06-01T10:00:00Z") },
  { sensorType: "waterLevel", value: 77, date: new Date("2026-06-01T11:00:00Z") },
  { sensorType: "waterLevel", value: 76, date: new Date("2026-06-01T12:00:00Z") },
];
