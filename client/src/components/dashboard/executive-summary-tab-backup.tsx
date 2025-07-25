import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { LineChart } from "@/components/charts/line-chart"
import { BarChart } from "@/components/charts/bar-chart"
import { useDashboardData } from "@/hooks/use-dashboard-data"
import { KpiInfoButton } from "@/components/ui/kpi-info-button"
import { GaugeChart } from "@/components/charts/gauge-chart"
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Clock, Package, Truck, DollarSign } from "lucide-react"

export default function ExecutiveSummaryTabBackup() {
  const { data: dashboardData, isLoading } = useDashboardData()

  if (isLoading) {
    return <div className="p-6">Loading...</div>
  }

  const kpis = [
    {
      title: "ISDI (In-Stock Distribution Index)",
      value: "87.2%",
      target: "95%",
      status: "warning",
      trend: "down",
      change: "-2.3%",
      icon: Package,
      description: "Percentage of SKUs available across distribution network",
    },
    {
      title: "Fill Rate",
      value: "92.5%",
      target: "98%",
      status: "warning",
      trend: "up",
      change: "+1.2%",
      icon: CheckCircle,
      description: "Order fulfillment rate across all channels",
    },
    {
      title: "Overbooking %",
      value: "12.8%",
      target: "<5%",
      status: "critical",
      trend: "up",
      change: "+3.1%",
      icon: AlertTriangle,
      description: "Percentage of orders exceeding available inventory",
    },
    {
      title: "Stockout Duration",
      value: "4.2 days",
      target: "<2 days",
      status: "critical",
      trend: "up",
      change: "+0.8 days",
      icon: Clock,
      description: "Average time products remain out of stock",
    },
    {
      title: "Distribution Coverage",
      value: "78.5%",
      target: "85%",
      status: "warning",
      trend: "up",
      change: "+2.1%",
      icon: Truck,
      description: "Geographic coverage of distribution network",
    },
    {
      title: "Revenue Impact",
      value: "₹2.3Cr",
      target: "<₹1Cr",
      status: "critical",
      trend: "up",
      change: "+₹0.5Cr",
      icon: DollarSign,
      description: "Revenue loss due to stockouts and inefficiencies",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical":
        return "text-red-600 bg-red-50 border-red-200"
      case "warning":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "good":
        return "text-green-600 bg-green-50 border-green-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? TrendingUp : TrendingDown
  }

  const getTrendColor = (trend: string, status: string) => {
    if (status === "critical" || status === "warning") {
      return trend === "up" ? "text-red-500" : "text-green-500"
    }
    return trend === "up" ? "text-green-500" : "text-red-500"
  }

  return (
    <div className="space-y-6">
      {/* Executive Summary Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Executive Dashboard</h2>
        <p className="text-gray-600">Real-time inventory and distribution intelligence for strategic decision making</p>
      </div>

      {/* Critical KPIs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpis.map((kpi, index) => {
          const IconComponent = kpi.icon
          const TrendIcon = getTrendIcon(kpi.trend)

          return (
            <Card key={index} className={`border-l-4 ${getStatusColor(kpi.status)} hover:shadow-lg transition-shadow`}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <IconComponent className="h-5 w-5" />
                    <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                  </div>
                  <KpiInfoButton description={kpi.description} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">{kpi.value}</span>
                    <Badge
                      variant={
                        kpi.status === "critical" ? "destructive" : kpi.status === "warning" ? "secondary" : "default"
                      }
                    >
                      {kpi.status.toUpperCase()}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Target: {kpi.target}</span>
                    <div className={`flex items-center space-x-1 ${getTrendColor(kpi.trend, kpi.status)}`}>
                      <TrendIcon className="h-4 w-4" />
                      <span>{kpi.change}</span>
                    </div>
                  </div>

                  <Progress
                    value={kpi.status === "critical" ? 25 : kpi.status === "warning" ? 60 : 85}
                    className="h-2"
                  />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>ISDI Trend (Last 30 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart data={dashboardData?.demandSupply || []} title="ISDI Performance" height={300} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fill Rate by Region</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart data={dashboardData?.logistics || []} title="Regional Performance" height={300} />
          </CardContent>
        </Card>
      </div>

      {/* Performance Gauge */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Distribution Health Score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <GaugeChart value={72} title="Health Score" subtitle="Based on all KPIs" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
