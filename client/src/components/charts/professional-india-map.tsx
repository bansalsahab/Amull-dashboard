"use client"

import { useState } from "react"

interface RegionData {
  name: string
  value: number
  color: string
  coordinates: string
}

const regionData: RegionData[] = [
  { name: "North", value: 2.8, color: "#ef4444", coordinates: "M150,50 L250,50 L250,150 L150,150 Z" },
  { name: "West", value: 1.9, color: "#f97316", coordinates: "M50,150 L150,150 L150,250 L50,250 Z" },
  { name: "East", value: 2.4, color: "#ef4444", coordinates: "M250,150 L350,150 L350,250 L250,250 Z" },
  { name: "South", value: 1.6, color: "#f59e0b", coordinates: "M150,250 L250,250 L250,350 L150,350 Z" },
  { name: "Central", value: 2.1, color: "#f97316", coordinates: "M150,150 L250,150 L250,250 L150,250 Z" },
]

export default function ProfessionalIndiaMap() {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null)

  return (
    <div className="w-full h-full flex items-center justify-center bg-slate-50 rounded-lg">
      <div className="relative">
        <svg width="400" height="400" viewBox="0 0 400 400" className="w-full h-full max-w-sm">
          {regionData.map((region) => (
            <g key={region.name}>
              <path
                d={region.coordinates}
                fill={region.color}
                stroke="#ffffff"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-200 hover:opacity-80"
                onMouseEnter={() => setHoveredRegion(region.name)}
                onMouseLeave={() => setHoveredRegion(null)}
              />
              <text
                x={
                  region.name === "North"
                    ? 200
                    : region.name === "West"
                      ? 100
                      : region.name === "East"
                        ? 300
                        : region.name === "South"
                          ? 200
                          : 200
                }
                y={
                  region.name === "North"
                    ? 100
                    : region.name === "West"
                      ? 200
                      : region.name === "East"
                        ? 200
                        : region.name === "South"
                          ? 300
                          : 200
                }
                textAnchor="middle"
                className="fill-white text-xs font-semibold pointer-events-none"
              >
                {region.name}
              </text>
              <text
                x={
                  region.name === "North"
                    ? 200
                    : region.name === "West"
                      ? 100
                      : region.name === "East"
                        ? 300
                        : region.name === "South"
                          ? 200
                          : 200
                }
                y={
                  region.name === "North"
                    ? 115
                    : region.name === "West"
                      ? 215
                      : region.name === "East"
                        ? 215
                        : region.name === "South"
                          ? 315
                          : 215
                }
                textAnchor="middle"
                className="fill-white text-xs font-bold pointer-events-none"
              >
                ₹{region.value}M
              </text>
            </g>
          ))}
        </svg>

        {hoveredRegion && (
          <div className="absolute top-4 right-4 bg-white p-3 rounded-lg shadow-lg border">
            <div className="text-sm font-semibold">{hoveredRegion} Region</div>
            <div className="text-xs text-slate-600">
              Lost Sales: ₹{regionData.find((r) => r.name === hoveredRegion)?.value}M
            </div>
          </div>
        )}

        <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-lg border">
          <div className="text-xs font-semibold mb-2">Lost Sales Value</div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span className="text-xs">High (&gt;₹2.5M)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-orange-500 rounded"></div>
              <span className="text-xs">Medium (&gt;₹1.5M &amp; &lt;₹2.5M)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded"></div>
              <span className="text-xs">Low (&lt;₹1.5M)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
