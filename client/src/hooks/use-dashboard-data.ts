"use client"

import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"

interface KPI {
  id: number
  name: string
  unit: string
  section: string
  description: string
  value: number
  trend?: string
  change?: number
  target?: number
  priority?: string
  benchmark?: string
}

interface DashboardData {
  valueMap: Record<string, number>
  kpiMeta: Record<string, KPI>
  demandSupply: any[]
  production: any[]
  logistics: any[]
  market: any[]
}

export function useDashboardData() {
  const [data, setData] = useState<DashboardData>({
    valueMap: {},
    kpiMeta: {},
    demandSupply: [],
    production: [],
    logistics: [],
    market: [],
  })

  const { data: queryData, error } = useQuery<DashboardData>({
    queryKey: ["dashboard-data"],
    queryFn: async () => {
      try {
        const response = await fetch("/data/kpis.json")
        const kpis: KPI[] = await response.json()

        const valueMap: Record<string, number> = {}
        const kpiMeta: Record<string, KPI> = {}

        kpis.forEach((kpi) => {
          const key = kpi.name.toLowerCase().replace(/[^a-z0-9]/g, "")
          valueMap[key] = kpi.value
          kpiMeta[key] = kpi
        })

        return {
          valueMap,
          kpiMeta,
          demandSupply: [],
          production: [],
          logistics: [],
          market: [],
        }
      } catch (error) {
        console.error("Failed to load dashboard data:", error)
        // Fallback data
        return {
          valueMap: {
            orderfillrate: 96.0,
            stockoutinstancespersku: 12,
            backordervolume: 2.4,
            forecastaccuracy: 87.3,
            plantutilizationrate: 82.1,
            productioncycletime: 3.9,
            inventoryturnoverratio: 6.8,
            finishedgoodsinventorybysku: 15.2,
            scrapwastagerate: 3.2,
            ontimedispatchrate: 94.5,
            fleetutilization: 78.6,
            averagedeliveryleadtime: 20.3,
            coldchaintemperaturebreachinstances: 2,
            distributorfillrate: 89.1,
            lostsalesvalue: 8.7,
            salesreturnrate: 1.8,
            retailerservicelevel: 8.4,
            competitorstockpresence: 34.2,
            dailydemandspikeresponsetime: 4.2,
          },
          kpiMeta: {},
          demandSupply: [],
          production: [],
          logistics: [],
          market: [],
        }
      }
    },
  })

  useEffect(() => {
    if (queryData) {
      setData(queryData)
    }
  }, [queryData])

  return data
}
