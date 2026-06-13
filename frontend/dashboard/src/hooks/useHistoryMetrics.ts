import { useState, useEffect } from "react";
import { getReadingsBySensor } from "../services/metrics.service"; // 👈 Imported from your centralized service
import { metricsObservable } from "./../class/metricsObserver";
import { Metric, sensorType, timeFrame } from "@/types/main.types";

export const useHistoryMetrics = (
  idDevice: string,
  sensorType: sensorType,
  timeframe: timeFrame = "today",
) => {
  const [history, setHistory] = useState<Metric[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 1. Initial historical data fetching via central service
  useEffect(() => {
    const fetchHistoryData = async () => {
      setLoading(true);
      try {
        // 👈 Using the service function instead of direct fetch
        const data = await getReadingsBySensor(idDevice, sensorType, timeframe);
        setHistory(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || "An error occurred fetching history");
      } finally {
        setLoading(false);
      }
    };

    fetchHistoryData();
  }, [idDevice, sensorType, timeframe]);

  // 2. PURE OBSERVER PATTERN: Subscribe to real-time events via the shared Observable class
  useEffect(() => {
    const unsubscribe = metricsObservable.subscribe((realTimePayload) => {
      // Find if the broadcasted real-time array contains this specific sensor type
      const targetMetric = realTimePayload.find(
        (m: any) => m.sensorType.toLowerCase() === sensorType.toLowerCase(),
      );

      if (targetMetric) {
        // Append the live metric point to the existing history array for dynamic chart updates
        setHistory((prevHistory) => [
          ...prevHistory,
          {
            sensorType: targetMetric.sensorType,
            value: targetMetric.value,
            date: targetMetric.date,
          },
        ]);
      }
    });

    // Unsubscribe from the Observable when the chart component unmounts to prevent memory leaks
    return () => unsubscribe();
  }, [sensorType]);

  return { history, loading, error };
};
