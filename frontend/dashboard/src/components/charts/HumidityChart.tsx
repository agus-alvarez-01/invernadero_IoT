"use client";

/**
 * Humidity over time chart (Recharts).
 *
 * - Must have `'use client'`.
 * - Receives `data: SensorReading[]` via props.
 * - Uses a Recharts `LineChart` or `BarChart` for humidity trends (students implement).
 * - Must not call `fetch()` or contain data-fetching logic.
 */

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { HumidityChartProps } from "@/types/main.types";

export function HumidityChart({ data }: HumidityChartProps) {
  const reverseData = [...data].reverse();

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={reverseData}>
        <defs>
          <linearGradient id="humidityGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3182CE" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#3182CE" stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          tickFormatter={(d) => new Date(d).toLocaleTimeString()}
          interval={2}
        />
        <YAxis />
        <Tooltip
          labelFormatter={(d) => {
            const date = new Date(d);
            return isNaN(date.getTime())
              ? "Fecha Inválida"
              : date.toLocaleDateString();
          }}
          contentStyle={{
            backgroundColor: "#11161e",
            borderColor: "#4A5568",
            borderRadius: "8px",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          }}
          itemStyle={{
            color: "#3182CE",
            fontWeight: "bold",
          }}
          labelStyle={{
            color: "#A0AEC0",
          }}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke="url(#humidityGradient)"
          strokeWidth={3}
          dot={{ r: 4, fill: "#3182CE" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
