"use client"

import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend, type ChartData } from "chart.js"

ChartJS.register(ArcElement, Tooltip, Legend)

interface DonutChartProps {
  data: ChartData<"doughnut">
  centerText?: string
}

export default function DonutChart({ data, centerText }: DonutChartProps) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "white",
        bodyColor: "white",
        borderColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 1,
      },
    },
    cutout: "70%",
  }

  return (
    <div className="relative w-full h-full">
      <Doughnut data={data} options={options} />
      {centerText && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-xl font-bold text-slate-700">{centerText}</div>
          </div>
        </div>
      )}
    </div>
  )
}
