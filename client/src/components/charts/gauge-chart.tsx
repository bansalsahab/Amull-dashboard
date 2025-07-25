"use client"

import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"

ChartJS.register(ArcElement, Tooltip, Legend)

interface GaugeChartProps {
  value: number
  color?: string
  max?: number
}

export default function GaugeChart({ value, color = "#3B82F6", max = 100 }: GaugeChartProps) {
  const data = {
    datasets: [
      {
        data: [value, max - value],
        backgroundColor: [color, "#E2E8F0"],
        borderWidth: 0,
        cutout: "70%",
        circumference: 180,
        rotation: 270,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  }

  return (
    <div className="relative w-full h-full">
      <Doughnut data={data} options={options} />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold" style={{ color }}>
            {value.toFixed(1)}%
          </div>
        </div>
      </div>
    </div>
  )
}
