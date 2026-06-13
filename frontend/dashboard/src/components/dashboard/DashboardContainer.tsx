"use client";

import { Box, SimpleGrid, Heading, Stat, StatLabel, Text, StatNumber, StatHelpText } from "@chakra-ui/react"
import { useRealtimeMetrics } from "@/hooks/useRealtimeMetrics";
import { useHistoryMetrics } from "@/hooks/useHistoryMetrics";
import { HumidityChart } from "@/components/charts/HumidityChart";
import { mockHumidityData } from "@/app/dashboard/mock/mockHumidityData";
import { Metric } from "@/types/main.types";
import Head from "next/head";

const mockSummaryCards = [
  { type: "temp", label: "Temperatura", value: "24.5 °C" },
  { type: "airHum", label: "Humedad del Aire", value: "62 %" },
  { type: "soilHum", label: "Humedad del Suelo", value: "45 %" },
  { type: "waterLevel", label: "Nivel de Agua", value: "80 %" },
];


interface DashboardContainerProps {
    initialHistoryData: Metric[];
}



export function DashboardContainer({ initialHistoryData }: DashboardContainerProps) {
/*
    REALTIMEMETRICS HOOK DISABLED FOR TESTING

    const { metrics, loading, error } = useRealtimeMetrics("ESP32-INV-01", [
    "soilHum",
    "temp",
    "airHum",
    "waterLevel",
  ])
}
*/

    return (
        <Box p={6} maxWidth="1200px" mx="auto">
            <Heading size="lg" mb={6} color="gray.300">
                Panel de Monitoreo ESP32 (mock)
            </Heading>

            <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} gap={6} mb={8}>
                {mockSummaryCards.map((card, i) => (
                    <Box key={i} p={5} bg="gray.800" borderWidth="1px" borderColor="gray.700" borderRadius="xl" shadow="md">
                        <Stat>
                            <StatLabel color="gray.400" fontSize="sm">
                                {card.label}
                            </StatLabel>
                            <StatNumber fontSize="2xl" fontWeight="bold" color="white">
                                {card.value}
                            </StatNumber>
                            <StatHelpText color="gray.400" fontSize="xs" mb={0}>
                                ESP32-INV-01 (Mock)
                            </StatHelpText>
                        </Stat>
                    </Box>
                ))}
            </SimpleGrid>

            <SimpleGrid columns={{ base: 1 }} gap={6}>
                <Box p={6} bg="gray.800" borderWidth="1px" borderColor="gray.700" borderRadius="xl" shadow="md">
                    <Heading size="md" mb={6} color="blue.300">
                        Historial de Humedad del Aire (Datos del Servidor Mock)
                    </Heading>
                    <Box height="300px">
                        <HumidityChart data={initialHistoryData} />
                    </Box>
                </Box>
            </SimpleGrid>
        </Box>
    );
}
