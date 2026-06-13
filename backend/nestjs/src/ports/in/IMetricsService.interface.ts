export interface IMetricsService {
  getLatestReadings(idDevice: string, sensorTypes: string[]): Promise<any[]>;
  getHistoryBySensorType(
    idDevice: string,
    sensorType: string,
    timeframe: string,
  ): Promise<any[]>;
}
