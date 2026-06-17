import { renderHook, waitFor } from "@testing-library/react";
import { useRealtimeMetrics } from "../useRealtimeMetrics";
import { getLatestReadings } from "@/services/metrics.service";

jest.mock("@/services/metrics.service");

describe("useRealtimeMetrics", () => {
  it("fetches realtime data", async () => {
    (getLatestReadings as jest.Mock).mockResolvedValue([
      {
        sensorType: "temp",
        value: 25,
        date: new Date(),
      },
    ]);

    const { result } = renderHook(() =>
      useRealtimeMetrics(
        "ESP32-INV-01",
        ["temp"]
      )
    );

    await waitFor(() =>
      expect(result.current.loading).toBe(false)
    );

    expect(result.current.metrics[0].value).toBe(25);
  });
});
