/**
 * ALGORITMO 1: Filtro Estadístico de Anomalías y Ruido Eléctrico (LKV Avanzado)
 * Compara la nueva lectura con la última válida. Si la variación supera un porcentaje
 * umbral en un corto tiempo, se considera ruido eléctrico del sensor.
 */
export function isAnomalousReading(
  currentValue: number,
  lastValidValue: number | null,
  maxPercentageChange: number = 0.5, // Tolera hasta un 50% de cambio abrupto
): boolean {
  // Si es la primera lectura de la historia, no hay contra qué comparar; se acepta.
  if (lastValidValue === null || lastValidValue === 0) return false;

  const absoluteDifference = Math.abs(currentValue - lastValidValue);
  const percentageChange = absoluteDifference / Math.abs(lastValidValue);

  // Si el cambio porcentual es mayor al umbral, es una anomalía (ruido)
  return percentageChange > maxPercentageChange;
}

/**
 * ALGORITMO 2: Agregación por Ventana Temporal (Media Móvil Simple)
 * Toma un historial de números y suaviza la curva devolviendo los promedios flotantes.
 */
export function calculateMovingAverage(
  data: number[],
  windowSize: number = 5,
): number[] {
  if (data.length === 0) return [];
  if (windowSize <= 1) return data;

  const result: number[] = [];

  for (let i = 0; i < data.length; i++) {
    // Definimos el inicio de la ventana para no salirnos del array
    const start = Math.max(0, i - windowSize + 1);
    const subset = data.slice(start, i + 1);

    const sum = subset.reduce((acc, val) => acc + val, 0);
    result.push(Number((sum / subset.length).toFixed(2)));
  }

  return result;
}

/**
 * ALGORITMO 3: Cálculo del Punto de Rocío (Dew Point) y Alerta de Condensación
 * Aplica la Fórmula de Magnus-Tetens para estimar la temperatura de condensación.
 */
export interface DewPointResult {
  dewPoint: number;
  status: 'NORMAL' | 'RIESGO_DE_HONGOS';
}

export function calculateDewPoint(
  temperature: number,
  humidity: number,
): DewPointResult {
  // Constantes de Magnus-Tetens para rangos normales de la atmósfera
  const a = 17.625;
  const b = 243.04;

  // Ecuación logarítmica basada en la humedad relativa
  const alpha =
    (a * temperature) / (b + temperature) + Math.log(humidity / 100);
  const dewPoint = (b * alpha) / (a - alpha);

  const roundedDewPoint = Number(dewPoint.toFixed(2));

  // Regla de Negocio: Si la temperatura ambiente está a menos de 2°C del punto de rocío,
  // el agua empezará a condensarse en las hojas (Alto riesgo de hongos).
  const status =
    temperature - roundedDewPoint <= 2.0 ? 'RIESGO_DE_HONGOS' : 'NORMAL';

  return {
    dewPoint: roundedDewPoint,
    status,
  };
}
