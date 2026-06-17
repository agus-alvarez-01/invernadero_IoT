/**
 * This file holds all TypeScript interfaces matching the backend API response shapes.
 *
 * - {@link SensorReading} — shape returned by GET /sensors (id, sensorId, temperature, humidity, createdAt)
 * - {@link Alert} — alert payload for the dashboard (sensorId, message, severity, triggeredAt)
 */

export type sensorType = "temp" | "waterLevel" | "airHum" | "soilHum";

export type AlertSeverity = "low" | "medium" | "high";

export interface Metric {
  sensorType: sensorType;
  value: number;
  date: Date;
}

export interface Alert {
  sensorId: string;
  message: string;
  severity: AlertSeverity;
  triggeredAt: string;
}

/** Props for chart/widget components — keeps components free of inline type definitions. */
export interface TemperatureChartProps {
  data: Metric[];
}

export interface HumidityChartProps {
  data: Metric[];
}

export interface SensorComparisonChartProps {
  data: Metric[];
}

export interface LatestReadingCardProps {
  reading: Metric;
}

export interface AlertBadgeProps {
  alert: Alert;
}
