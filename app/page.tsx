"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, BarChart3, Users, Package, Truck } from "lucide-react"

export default function AmulDashboard() {
  const kpis = [
    {
      title: "ISDI (In-Stock Distribution Index)",
      value: "94.2%",
      target: "95%",
      status: "warning",
      trend: "down",
      change: "-0.8%",
      description: "Product availability across retail outlets",
    },
    {
      title: "Fill Rate",
      value: "96.8%",
      target: "98%",
      status: "good",
      trend: "up",
      change: "+1.2%",
      description: "Order fulfillment efficiency",
    },
    {
      title: "Overbooking %",
      value: "12.3%",
      target: "<10%",
      status: "critical",
      trend: "up",
      change: "+2.1%",
      description: "Excess orders vs capacity",
    },
    {
      title: "Revenue Growth",
      value: "₹2,847 Cr",
      target: "₹2,800 Cr",
      status: "good",
      trend: "up",
      change: "+8.4%",
      description: "Monthly revenue performance",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "bg-green-100 text-green-800 border-green-200"
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Amul Executive Dashboard</h1>
                <p className="text-sm text-gray-500">Real-time operations overview</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Live Data
              </Badge>
              <Button variant="outline" size="sm">
                <BarChart3 className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Executive Summary */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Executive Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpis.map((kpi, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-gray-600">{kpi.title}</CardTitle>
                    <Badge className={getStatusColor(kpi.status)}>
                      {kpi.status === "good" && <CheckCircle className="h-3 w-3 mr-1" />}
                      {kpi.status === "warning" && <AlertTriangle className="h-3 w-3 mr-1" />}
                      {kpi.status === "critical" && <AlertTriangle className="h-3 w-3 mr-1" />}
                      {kpi.status.charAt(0).toUpperCase() + kpi.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl font-bold text-gray-900">{kpi.value}</span>
                      <div
                        className={`flex items-center text-sm ${
                          kpi.trend === "up" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {getTrendIcon(kpi.trend)}
                        <span className="ml-1">{kpi.change}</span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">Target: {kpi.target}</div>
                    <CardDescription className="text-xs">{kpi.description}</CardDescription>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Market Analysis</h3>
                    <p className="text-sm text-gray-500">View regional performance</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Package className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Production Status</h3>
                    <p className="text-sm text-gray-500">Monitor manufacturing</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <Truck className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Logistics Overview</h3>
                    <p className="text-sm text-gray-500">Track distribution</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Alerts Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Critical Alerts</h2>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-4 bg-red-50 rounded-lg border border-red-200">
                  <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-red-900">High Overbooking in Western Region</h4>
                    <p className="text-sm text-red-700">Overbooking at 15.2% - immediate attention required</p>
                    <p className="text-xs text-red-600 mt-1">2 hours ago</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-900">ISDI Below Target in South</h4>
                    <p className="text-sm text-yellow-700">Distribution index at 92.1% - below 95% target</p>
                    <p className="text-xs text-yellow-600 mt-1">4 hours ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
