import { useState, useEffect } from "react";
import { metricsObservable } from "./../class/metricsObserver"; // Import our pure class instance
import { getLatestReadings } from "@/services/metrics.service";
import { Metric, sensorType } from "@/types/main.types";

export const useRealtimeMetrics = (
  idDevice: string,
  sensorTypes: sensorType[],
) => {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const typesQuery = sensorTypes.join(",");

  useEffect(() => {
    const fetchRealTimeData = async () => {
      try {
        const data = await getLatestReadings(idDevice, sensorTypes);

        setMetrics(data);
        setError(null);

        // Notify suscriptors (Observer)
        metricsObservable.notify(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRealTimeData();
    const intervalId = setInterval(fetchRealTimeData, 5000);

    return () => clearInterval(intervalId);
  }, [idDevice, typesQuery]);

  return { metrics, loading, error };
};
