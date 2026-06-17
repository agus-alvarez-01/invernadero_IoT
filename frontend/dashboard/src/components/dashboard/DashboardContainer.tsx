"use client";

import { Box, SimpleGrid, Heading, Stat, Text } from "@chakra-ui/react";
import { HumidityChart } from "@/components/charts/HumidityChart";
import { Metric } from "@/types/main.types";
import { useLatestMetrics } from "@/hooks/useLatestMetrics";
import { useHistoryMetrics } from "@/hooks/useHistoryMetrics";

const mockSummaryCards = [
  { type: "temp", label: "Temperatura", value: "24.5 °C" },
  { type: "airHum", label: "Humedad del Aire", value: "62 %" },
  { type: "soilHum", label: "Humedad del Suelo", value: "45 %" },
  { type: "waterLevel", label: "Nivel de Agua", value: "80 %" },
];

interface DashboardContainerProps {
  initialHistoryData: Metric[];
}

export function DashboardContainer({
  initialHistoryData,
}: DashboardContainerProps) {
  const latest = useLatestMetrics("ESP32-INV-01", [
    "soilHum",
    "temp",
    "airHum",
    "waterLevel",
  ]);

  const history = useHistoryMetrics("ESP32-INV-01", "temp");

  return (
    <Box p={6} maxWidth="100vw" mx="auto">
      <Heading size="lg" mb={6} color="gray.800">
        Panel de Monitoreo ESP32
      </Heading>

      <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} gap={6}>
        {latest.metrics.map((card, i) => (
          <Box
            key={i}
            p={5}
            borderWidth={1}
            borderColor="gray.200"
            borderRadius="xl"
            shadow="md"
          >
            <Stat.Root>
              <Stat.Label color="gray.400" fontSize="sm">
                {card.sensorType}
              </Stat.Label>
              <Stat.ValueText fontSize="2xl" fontWeight="bold">
                {card.value} {card.sensorType == "temp" ? "°C" : "%"}
              </Stat.ValueText>
              <Stat.HelpText color="gray.400" fontSize="xs" mb={0}>
                ESP32-INV-01
              </Stat.HelpText>
            </Stat.Root>
          </Box>
        ))}
      </SimpleGrid>

      <Text w="100%" textAlign="right" mt={2} mb={8}>
        Ultima actualizacion:{" "}
        {new Date(latest.metrics[0]?.date).toLocaleTimeString()}
      </Text>

      <SimpleGrid columns={{ base: 1 }} gap={6}>
        <Box
          p={6}
          borderWidth={1}
          borderColor="gray.200"
          borderRadius="xl"
          shadow="md"
        >
          <Heading size="md" mb={6} color="blue.300">
            Historial de Humedad del Aire (Datos del Servidor Mock)
          </Heading>
          <Box height="300px">
            <HumidityChart data={history.history} />
          </Box>
        </Box>
      </SimpleGrid>
    </Box>
  );
}
