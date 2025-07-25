"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { ArrowUp, ArrowDown, AlertTriangle, TrendingUp, CheckCircle2, Clock, Eye, BarChart3 } from "lucide-react"
import { ResponsiveContainer, AreaChart, Area } from "recharts"

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

interface CriticalKPICardProps {
  kpi: CriticalKPI
  onClick?: () => void
  isSelected?: boolean
  size?: "small" | "medium" | "large"
}

export default function CriticalKPICard({ kpi, onClick, isSelected = false, size = "medium" }: CriticalKPICardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical":
        return {
          bg: "bg-gradient-to-br from-red-50 to-red-100",
          border: "border-red-300",
          text: "text-red-800",
          badge: "bg-red-500 text-white",
          icon: "text-red-600",
          pulse: "animate-pulse",
        }
      case "warning":
        return {
          bg: "bg-gradient-to-br from-orange-50 to-yellow-100",
          border: "border-orange-300",
          text: "text-orange-800",
          badge: "bg-orange-500 text-white",
          icon: "text-orange-600",
          pulse: "",
        }
      case "good":
        return {
          bg: "bg-gradient-to-br from-green-50 to-emerald-100",
          border: "border-green-300",
          text: "text-green-800",
          badge: "bg-green-500 text-white",
          icon: "text-green-600",
          pulse: "",
        }
      default:
        return {
          bg: "bg-gradient-to-br from-slate-50 to-slate-100",
          border: "border-slate-300",
          text: "text-slate-800",
          badge: "bg-slate-500 text-white",
          icon: "text-slate-600",
          pulse: "",
        }
    }
  }

  const getTrendIcon = (change: number, status: string) => {
    if (change > 0) {
      return status === "critical" || status === "warning" ? (
        <ArrowUp className="w-4 h-4 text-red-600" />
      ) : (
        <ArrowUp className="w-4 h-4 text-green-600" />
      )
    } else if (change < 0) {
      return status === "critical" || status === "warning" ? (
        <ArrowDown className="w-4 h-4 text-green-600" />
      ) : (
        <ArrowDown className="w-4 h-4 text-red-600" />
      )
    }
    return null
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "critical":
        return <AlertTriangle className="w-5 h-5 text-red-600" />
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-orange-600" />
      case "good":
        return <CheckCircle2 className="w-5 h-5 text-green-600" />
      default:
        return <BarChart3 className="w-5 h-5 text-slate-600" />
    }
  }

  const formatValue = (value: number, unit: string) => {
    if (unit === "score") return value.toFixed(1)
    if (unit === "%") return `${value.toFixed(1)}%`
    if (unit === "minutes") return `${value.toFixed(1)}m`
    return `${value}${unit}`
  }

  const colors = getStatusColor(kpi.status)
  const progress = kpi.target ? Math.min(100, Math.abs((kpi.value / kpi.target) * 100)) : 0

  // Generate sample trend data for sparkline
  const trendData = Array.from({ length: 12 }, (_, i) => ({
    index: i,
    value: kpi.value + (Math.random() - 0.5) * (kpi.value * 0.2),
  }))

  return (
    <Card
      className={`
        ${colors.bg} ${colors.border} border-2 shadow-lg hover:shadow-xl 
        transition-all duration-300 cursor-pointer transform hover:scale-105
        ${isSelected ? "ring-4 ring-blue-300 scale-105" : ""}
        ${colors.pulse}
        ${size === "large" ? "p-6" : size === "medium" ? "p-4" : "p-3"}
      `}
      onClick={onClick}
    >
      <CardHeader className={`pb-3 ${size === "small" ? "p-2" : "p-4"}`}>
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className={`p-2 rounded-lg bg-white shadow-sm ${colors.pulse}`}>{getStatusIcon(kpi.status)}</div>
            <div className="flex-1">
              <CardTitle
                className={`${colors.text} ${size === "large" ? "text-lg" : "text-base"} font-bold leading-tight`}
              >
                {kpi.name}
              </CardTitle>
              <p className={`text-xs ${colors.text} opacity-75 mt-1`}>{kpi.description}</p>
            </div>
          </div>
          <Badge className={`${colors.badge} text-xs font-semibold px-2 py-1 ${colors.pulse}`}>
            {kpi.status.toUpperCase()}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className={`${size === "small" ? "p-2" : "p-4"} pt-0`}>
        <div className="space-y-4">
          {/* Main Value Display */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className={`${size === "large" ? "text-4xl" : "text-3xl"} font-bold ${colors.text}`}>
                {formatValue(kpi.value, kpi.unit)}
              </span>
              <div className="flex items-center space-x-1">
                {getTrendIcon(kpi.change, kpi.status)}
                <span
                  className={`text-sm font-semibold ${
                    kpi.change > 0
                      ? kpi.status === "critical" || kpi.status === "warning"
                        ? "text-red-600"
                        : "text-green-600"
                      : kpi.change < 0
                        ? kpi.status === "critical" || kpi.status === "warning"
                          ? "text-green-600"
                          : "text-red-600"
                        : "text-slate-600"
                  }`}
                >
                  {kpi.change > 0 ? "+" : ""}
                  {kpi.change.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>

          {/* Target Progress */}
          {kpi.target && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-slate-600">
                <span>Target: {formatValue(kpi.target, kpi.unit)}</span>
                <span>{progress.toFixed(0)}%</span>
              </div>
              <Progress
                value={progress}
                className="h-2"
                style={{
                  // @ts-ignore
                  "--progress-background":
                    kpi.status === "critical" ? "#ef4444" : kpi.status === "warning" ? "#f97316" : "#10b981",
                }}
              />
            </div>
          )}

          {/* Impact Assessment */}
          <div className={`p-3 rounded-lg bg-white bg-opacity-50 border ${colors.border}`}>
            <div className="flex items-start space-x-2">
              <TrendingUp className={`w-4 h-4 mt-0.5 ${colors.icon}`} />
              <div>
                <p className={`text-xs font-semibold ${colors.text}`}>Business Impact</p>
                <p className={`text-xs ${colors.text} opacity-80`}>{kpi.impact}</p>
              </div>
            </div>
          </div>

          {/* Affected SKUs */}
          {kpi.affectedSKUs && kpi.affectedSKUs.length > 0 && (
            <div className="space-y-2">
              <p className={`text-xs font-semibold ${colors.text}`}>Affected Products ({kpi.affectedSKUs.length})</p>
              <div className="flex flex-wrap gap-1">
                {kpi.affectedSKUs.slice(0, 3).map((sku, idx) => (
                  <Badge key={idx} variant="outline" className={`text-xs ${colors.text} ${colors.border}`}>
                    {sku}
                  </Badge>
                ))}
                {kpi.affectedSKUs.length > 3 && (
                  <Badge variant="outline" className={`text-xs ${colors.text} ${colors.border}`}>
                    +{kpi.affectedSKUs.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Mini Trend Chart */}
          <div className="h-16 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id={`gradient-${kpi.id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor={
                        kpi.status === "critical" ? "#ef4444" : kpi.status === "warning" ? "#f97316" : "#10b981"
                      }
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor={
                        kpi.status === "critical" ? "#ef4444" : kpi.status === "warning" ? "#f97316" : "#10b981"
                      }
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={kpi.status === "critical" ? "#ef4444" : kpi.status === "warning" ? "#f97316" : "#10b981"}
                  strokeWidth={2}
                  fill={`url(#gradient-${kpi.id})`}
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-1 text-xs text-slate-500">
              <Clock className="w-3 h-3" />
              <span>{kpi.lastUpdated}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              className={`text-xs px-3 py-1 h-auto ${colors.text} ${colors.border} hover:bg-white`}
              onClick={(e) => {
                e.stopPropagation()
                onClick?.()
              }}
            >
              <Eye className="w-3 h-3 mr-1" />
              Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
