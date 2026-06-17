import { render } from "@testing-library/react";
import { HumidityChart } from "../HumidityChart";
import { mockMetricsDatabase } from "@/mocks/mockMetricsDatabase";

describe("HumidityChart", () => {
  it("renders chart component", () => {
    const humidityData =
      mockMetricsDatabase.filter(
        m => m.sensorType === "airHum"
      );

    const { container } = render(
      <HumidityChart data={humidityData} />
    );

    expect(container).toBeTruthy();
  });
});
