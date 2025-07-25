"use client"

import { RefreshCw, MessageSquare, Bell, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

interface HeaderProps {
  timeRange: string
  onTimeRangeChange: (value: string) => void
  showChatbot?: boolean
  onToggleChatbot?: () => void
}

export default function Header({ timeRange, onTimeRangeChange, showChatbot = false, onToggleChatbot }: HeaderProps) {
  const { toast } = useToast()

  const handleRefresh = () => {
    toast({
      title: "Data Refreshed",
      description: "Critical metrics updated with latest inventory data.",
    })
  }

  return (
    <header className="bg-white shadow-sm border-b border-slate-200">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-amul-red to-red-600 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">MD Command Center</h1>
              <p className="text-sm text-slate-600 flex items-center">
                <Activity className="w-4 h-4 mr-1 text-green-500" />
                Real-time Inventory & Fulfillment Intelligence
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Select value={timeRange} onValueChange={onTimeRangeChange}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                <SelectItem value="last-quarter">Last Quarter</SelectItem>
                <SelectItem value="last-year">Last Year</SelectItem>
              </SelectContent>
            </Select>

            {/* AI Assistant Status - Always Active */}
            <div className="flex items-center space-x-2 px-3 py-2 bg-green-50 border border-green-200 rounded-lg">
              <MessageSquare className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">AI Assistant</span>
              <Badge className="bg-green-500 text-white text-xs px-2 py-0.5 animate-pulse">Live</Badge>
            </div>

            <Button variant="outline" className="relative bg-transparent">
              <Bell className="w-4 h-4 mr-2" />
              Critical Alerts
              <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5">3</Badge>
            </Button>

            <Button onClick={handleRefresh} className="bg-amul-red hover:bg-red-700 text-white">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh Data
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
