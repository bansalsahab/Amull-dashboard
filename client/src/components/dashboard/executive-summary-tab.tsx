"use client"

import { useState, useEffect } from "react"
import EnhancedKPICard from "@/components/dashboard/enhanced-kpi-card"
import CriticalKPICard from "@/components/dashboard/critical-kpi-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, TrendingUp, Target, Award, Activity, BarChart3, AlertCircle, Eye, Filter } from "lucide-react"

interface ExecutiveSummaryTabProps {
  timeRange: string
}

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

interface CriticalKPI {
  id: string
  name: string
  value: number
  unit: string
  status: "critical" | "warning" | "good"
  change: number
  target?: number
  description: string
  impact: string
  affectedSKUs?: string[]
  lastUpdated: string
  drillDownData?: any
}

interface Alert {
  type: string
  message: string
  impact: string
  action: string
  priority: string
}

export default function ExecutiveSummaryTab({ timeRange }: ExecutiveSummaryTabProps) {
  const [activeView, setActiveView] = useState("critical-overview")
  const [isLoading, setIsLoading] = useState(true)
  const [kpiData, setKpiData] = useState<KPI[]>([])
  const [selectedKPI, setSelectedKPI] = useState<string | null>(null)

  // Critical KPIs for MD Dashboard
  const criticalKPIs: CriticalKPI[] = [
    {
      id: "isdi",
      name: "Inventory Sync Delay Impact Index",
      value: 2.4,
      unit: "score",
      status: "warning",
      change: 0.3,
      target: 1.5,
      description: "Measures impact of inventory sync delays on order fulfillment",
      impact: "₹1.2M potential revenue loss",
      affectedSKUs: ["Milk 1L", "Butter 500g", "Cheese Slices"],
      lastUpdated: "2 mins ago",
      drillDownData: {
        byRegion: { North: 2.8, West: 2.1, East: 2.6, South: 2.0 },
        byProduct: { Milk: 2.9, Butter: 2.3, Cheese: 1.8, Yogurt: 2.1 },
      },
    },
    {
      id: "overbooking",
      name: "Order Overbooking Ratio",
      value: 8.7,
      unit: "%",
      status: "critical",
      change: 1.2,
      target: 5.0,
      description: "Percentage of orders exceeding available inventory",
      impact: "Customer satisfaction risk",
      affectedSKUs: ["Ice Cream 1L", "Paneer 200g"],
      lastUpdated: "1 min ago",
      drillDownData: {
        byChannel: { Retail: 9.2, Wholesale: 7.8, Online: 10.1 },
        trend: [6.2, 7.1, 8.3, 8.7],
      },
    },
    {
      id: "fill_rate_variance",
      name: "Live Fill Rate Variance",
      value: -3.2,
      unit: "%",
      status: "critical",
      change: -1.8,
      target: 0,
      description: "Real-time deviation from expected fill rates",
      impact: "₹800K daily revenue impact",
      affectedSKUs: ["Milk 500ml", "Lassi 200ml"],
      lastUpdated: "30 sec ago",
      drillDownData: {
        byTime: { Morning: -2.1, Afternoon: -3.8, Evening: -2.9 },
        byLocation: { Mumbai: -4.1, Delhi: -2.8, Bangalore: -2.9 },
      },
    },
    {
      id: "acceptance_lag",
      name: "Order Acceptance vs Inventory Refresh Lag",
      value: 4.2,
      unit: "minutes",
      status: "warning",
      change: 0.8,
      target: 2.0,
      description: "Time gap between order acceptance and inventory update",
      impact: "Operational efficiency concern",
      lastUpdated: "1 min ago",
      drillDownData: {
        bySystem: { ERP: 3.8, WMS: 4.6, POS: 4.1 },
        peakHours: [5.2, 4.8, 3.9, 4.2],
      },
    },
    {
      id: "order_drop_rate",
      name: "Order Drop Rate",
      value: 2.1,
      unit: "%",
      status: "good",
      change: -0.4,
      target: 3.0,
      description: "Percentage of orders cancelled due to inventory issues",
      impact: "Within acceptable limits",
      lastUpdated: "3 mins ago",
      drillDownData: {
        reasons: { "Stock-out": 45, Quality: 25, Logistics: 30 },
        trend: [2.8, 2.5, 2.3, 2.1],
      },
    },
    {
      id: "expired_risk",
      name: "Expired Inventory Risk Index",
      value: 6.8,
      unit: "score",
      status: "critical",
      change: 2.1,
      target: 4.0,
      description: "Risk assessment of inventory expiration impact",
      impact: "₹2.1M inventory at risk",
      affectedSKUs: ["Yogurt 400g", "Milk 1L", "Paneer 500g"],
      lastUpdated: "5 mins ago",
      drillDownData: {
        byCategory: { Dairy: 7.2, Frozen: 6.1, Fresh: 7.5 },
        expiryTimeline: { "24h": 15, "48h": 28, "72h": 42 },
      },
    },
    {
      id: "forecast_error",
      name: "Forecast Error During Inventory Lag",
      value: 12.3,
      unit: "%",
      status: "warning",
      change: 1.5,
      target: 8.0,
      description: "Forecasting accuracy during inventory synchronization delays",
      impact: "Planning reliability concern",
      lastUpdated: "4 mins ago",
      drillDownData: {
        byProduct: { Seasonal: 15.2, Staple: 9.8, Premium: 13.1 },
        accuracy: [88.2, 87.1, 86.9, 87.7],
      },
    },
  ]

  // Load KPI data
  useEffect(() => {
    const loadKPIData = async () => {
      setIsLoading(true)
      try {
        const response = await fetch("/data/kpis.json")
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setKpiData(data)
      } catch (error) {
        console.error("Failed to load KPI data, using mock data:", error)
        const mockData = getMockKPIData()
        setKpiData(mockData)
      } finally {
        setIsLoading(false)
      }
    }
    loadKPIData()
  }, [timeRange])

  // Mock KPI data as fallback
  const getMockKPIData = (): KPI[] => {
    return [
      {
        id: 25,
        name: "Market Share",
        unit: "%",
        section: "Strategic Performance",
        description: "Amul's share in the Indian dairy market.",
        value: 42.5,
        trend: "up",
        change: 0.8,
        target: 45.0,
        priority: "critical",
        benchmark: "Leader in category",
      },
      {
        id: 26,
        name: "Revenue Growth Rate",
        unit: "%",
        section: "Strategic Performance",
        description: "Year-over-year revenue growth rate.",
        value: 8.2,
        trend: "up",
        change: 1.2,
        target: 10.0,
        priority: "high",
        benchmark: "Industry: 6-8%",
      },
      {
        id: 21,
        name: "Gross Profit Margin",
        unit: "%",
        section: "Financial Health",
        description: "Percentage of revenue retained after cost of goods sold.",
        value: 32.8,
        trend: "up",
        change: 1.5,
        target: 35.0,
        priority: "high",
        benchmark: "Industry: 28-30%",
      },
    ]
  }

  // Generate dynamic critical alerts based on KPI data
  const getCriticalAlerts = (): Alert[] => {
    const alerts: Alert[] = []

    criticalKPIs.forEach((kpi) => {
      if (kpi.status === "critical") {
        alerts.push({
          type: kpi.id,
          message: `${kpi.name}: ${kpi.value}${kpi.unit} - Critical threshold exceeded`,
          impact: kpi.impact,
          action: `Immediate attention required - ${kpi.affectedSKUs?.length || 0} SKUs affected`,
          priority: "critical",
        })
      }
    })

    return alerts.slice(0, 3)
  }

  const criticalAlerts = getCriticalAlerts()

  // Group critical KPIs by category
  const riskKPIs = criticalKPIs.filter((kpi) => ["isdi", "expired_risk", "overbooking"].includes(kpi.id))

  const performanceKPIs = criticalKPIs.filter((kpi) =>
    ["fill_rate_variance", "order_drop_rate", "acceptance_lag"].includes(kpi.id),
  )

  const forecastKPIs = criticalKPIs.filter((kpi) => ["forecast_error"].includes(kpi.id))

  const handleKPIClick = (kpiId: string) => {
    setSelectedKPI(selectedKPI === kpiId ? null : kpiId)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-12rem)]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amul-red mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading critical metrics...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Executive Dashboard Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 flex items-center">
            <Target className="w-8 h-8 mr-3 text-amul-red" />
            Real-Time Operations Command Center
          </h2>
          <p className="text-slate-600 mt-1">Critical inventory & fulfillment metrics for immediate action</p>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter by Region
          </Button>
          <Button variant="outline" size="sm">
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </Button>
          <Badge className="bg-green-100 text-green-800 px-3 py-1">
            Live • Updated {new Date().toLocaleTimeString()}
          </Badge>
        </div>
      </div>

      {/* Critical Business Alerts - Always Visible */}
      {criticalAlerts.length > 0 && (
        <Card className="border-red-200 bg-gradient-to-r from-red-50 to-orange-50 shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold text-red-800 flex items-center">
                <AlertTriangle className="w-6 h-6 mr-3 animate-pulse" />🚨 IMMEDIATE ATTENTION REQUIRED
              </CardTitle>
              <Badge variant="destructive" className="text-sm px-3 py-1">
                {criticalAlerts.length} Critical Issues
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {criticalAlerts.map((alert, index) => (
                <div
                  key={index}
                  className="flex items-start p-4 bg-white rounded-lg border-l-4 border-red-500 shadow-sm hover:shadow-md transition-shadow"
                >
                  <AlertCircle className="w-5 h-5 text-red-500 mt-1 mr-3 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="font-semibold text-red-900 text-sm">{alert.message}</div>
                    <div className="text-xs text-red-700 mt-1">
                      <span className="font-medium">Impact:</span> {alert.impact}
                    </div>
                    <div className="text-xs text-red-700">
                      <span className="font-medium">Action:</span> {alert.action}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Critical KPIs Dashboard - Main Focus */}
      <div className="space-y-8">
        {/* Risk Management KPIs */}
        <Card className="shadow-lg border-orange-200">
          <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
            <CardTitle className="text-xl font-bold flex items-center text-orange-800">
              <AlertTriangle className="w-6 h-6 mr-3 text-orange-600" />🔥 RISK MANAGEMENT - Immediate Action Required
            </CardTitle>
            <p className="text-sm text-orange-700">High-impact metrics requiring MD oversight</p>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {riskKPIs.map((kpi) => (
                <CriticalKPICard
                  key={kpi.id}
                  kpi={kpi}
                  onClick={() => handleKPIClick(kpi.id)}
                  isSelected={selectedKPI === kpi.id}
                  size="large"
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance KPIs */}
        <Card className="shadow-lg border-blue-200">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardTitle className="text-xl font-bold flex items-center text-blue-800">
              <Activity className="w-6 h-6 mr-3 text-blue-600" />⚡ OPERATIONAL PERFORMANCE - Live Monitoring
            </CardTitle>
            <p className="text-sm text-blue-700">Real-time fulfillment and efficiency metrics</p>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {performanceKPIs.map((kpi) => (
                <CriticalKPICard
                  key={kpi.id}
                  kpi={kpi}
                  onClick={() => handleKPIClick(kpi.id)}
                  isSelected={selectedKPI === kpi.id}
                  size="large"
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Forecast KPIs */}
        <Card className="shadow-lg border-purple-200">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
            <CardTitle className="text-xl font-bold flex items-center text-purple-800">
              <TrendingUp className="w-6 h-6 mr-3 text-purple-600" />📊 FORECAST INTELLIGENCE - Predictive Insights
            </CardTitle>
            <p className="text-sm text-purple-700">Planning accuracy and demand prediction</p>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
              {forecastKPIs.map((kpi) => (
                <CriticalKPICard
                  key={kpi.id}
                  kpi={kpi}
                  onClick={() => handleKPIClick(kpi.id)}
                  isSelected={selectedKPI === kpi.id}
                  size="large"
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Drill-down Details */}
        {selectedKPI && (
          <Card className="shadow-xl border-slate-300 bg-slate-50">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Detailed Analysis: {criticalKPIs.find((k) => k.id === selectedKPI)?.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Add drill-down charts and details here */}
                <div className="p-4 bg-white rounded-lg">
                  <h4 className="font-medium mb-2">Regional Breakdown</h4>
                  <div className="space-y-2">
                    {Object.entries(criticalKPIs.find((k) => k.id === selectedKPI)?.drillDownData?.byRegion || {}).map(
                      ([region, value]) => (
                        <div key={region} className="flex justify-between items-center">
                          <span className="text-sm">{region}</span>
                          <span className="font-medium">{value}</span>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                <div className="p-4 bg-white rounded-lg">
                  <h4 className="font-medium mb-2">Affected SKUs</h4>
                  <div className="space-y-1">
                    {criticalKPIs
                      .find((k) => k.id === selectedKPI)
                      ?.affectedSKUs?.map((sku, idx) => (
                        <Badge key={idx} variant="outline" className="mr-2 mb-1">
                          {sku}
                        </Badge>
                      ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Supporting Strategic Metrics */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center text-slate-700">
              <Award className="w-5 h-5 mr-2" />
              Supporting Strategic Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {kpiData.slice(0, 3).map((kpi) => (
                <EnhancedKPICard key={kpi.id} kpi={kpi} size="medium" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
