import type { Metric } from "@/types/main.types";

export const mockHumidityData: Metric[] = [
    { sensorType: "airHum", value: 45, date: new Date("2026-06-06T00:30:00Z") },
    { sensorType: "airHum", value: 50, date: new Date("2026-06-06T00:35:00Z") },
    { sensorType: "airHum", value: 15, date: new Date("2026-06-06T00:40:00Z") },
    { sensorType: "airHum", value: 50, date: new Date("2026-06-06T00:45:00Z") },
    { sensorType: "airHum", value: 30, date: new Date("2026-06-06T00:50:00Z") },
    { sensorType: "airHum", value: 20, date: new Date("2026-06-06T00:55:00Z") },
    { sensorType: "airHum", value: 40, date: new Date("2026-06-06T01:00:00Z") },
    { sensorType: "airHum", value: 50, date: new Date("2026-06-06T01:05:00Z") },


];