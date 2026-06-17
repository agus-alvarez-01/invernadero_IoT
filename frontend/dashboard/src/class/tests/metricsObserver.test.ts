import { metricsObservable } from "../metricsObserver";

describe("MetricsObservable", () => {
  it("notifies all subscribers", () => {
    const observer1 = jest.fn();
    const observer2 = jest.fn();

    metricsObservable.subscribe(observer1);
    metricsObservable.subscribe(observer2);

    const payload = [
      {
        sensorType: "temp",
        value: 25,
      },
    ];

    metricsObservable.notify(payload);

    expect(observer1).toHaveBeenCalledWith(payload);
    expect(observer2).toHaveBeenCalledWith(payload);
  });
});
