/**
 * ALGORITMO: Clasificación de estado del suelo (Humedad)
 * Recibe el porcentaje de humedad del suelo y devuelve su estado agronómico.
 */
export function clasificarSuelo(humedad: number): string {
  if (humedad < 30) {
    return 'Seco - Requiere riego';
  }

  if (humedad >= 30 && humedad <= 70) {
    return 'Óptimo';
  }

  return 'Inundado';
}

/**
 * ALGORITMO: Detección de umbral crítico del tanque de agua
 * Devuelve true si el nivel de agua baja del 15% (nivel crítico para la bomba).
 */
export function isTankLevelCritical(nivel: number): boolean {
  return nivel < 15;
}
