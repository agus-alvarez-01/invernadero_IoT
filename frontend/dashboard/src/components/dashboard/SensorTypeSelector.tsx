"use client";

import { sensorType } from "@/types/main.types";
import { createListCollection, Select } from "@chakra-ui/react";

const list = createListCollection({
  items: [
    { label: "Temperatura", value: "temp" },
    { label: "Humedad Ambiente", value: "airHum" },
    { label: "Humedad Suelo", value: "soilHum" },
    { label: "Nivel de agua", value: "waterLevel" },
  ],
});

export default function SensorTypeSelector({
  setType,
}: {
  setType: React.Dispatch<React.SetStateAction<sensorType>>;
}) {
  return (
    <Select.Root collection={list} mb={8}>
      <Select.HiddenSelect />
      <Select.Label />

      <Select.Control>
        <Select.Trigger>
          <Select.ValueText />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
          <Select.ClearTrigger />
        </Select.IndicatorGroup>
      </Select.Control>

      <Select.Positioner>
        <Select.Content>
          {list.items.map((item) => (
            <Select.Item
              item={item}
              key={item.value}
              onClick={() => setType(item.value as sensorType)}
            >
              {item.label}
              <Select.ItemIndicator />
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Positioner>
    </Select.Root>
  );
}
