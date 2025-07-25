"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { TrendingUp, AlertTriangle, Send, Bot, User, BarChart3, Target, Zap, Clock } from "lucide-react"

type MessageType = {
  id: string
  sender: "user" | "bot"
  content: string
  timestamp: Date
  metrics?: {
    label: string
    value: string
    change: number
    status?: "critical" | "warning" | "good"
  }[]
  followUps?: string[]
}

interface IntelligentChatbotProps {
  isVisible: boolean
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

export default function IntelligentChatbot({ isVisible }: IntelligentChatbotProps) {
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: "welcome",
      sender: "bot",
      content:
        "🎯 Welcome to your AI Command Center! I'm here to help you monitor critical inventory and fulfillment metrics. Ask me about ISDI, overbooking rates, fill rate variance, or any operational concerns.",
      timestamp: new Date(),
      followUps: [
        "What's our current ISDI score?",
        "Show me SKUs with negative fill rate variance",
        "Which products have high overbooking risk?",
        "Alert me about expired inventory risks",
      ],
    },
  ])

  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [kpiData, setKpiData] = useState<KPI[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  if (!isVisible) return null

  // Load KPI data
  useEffect(() => {
    const loadKPIData = async () => {
      try {
        const response = await fetch("/data/kpis.json")
        const data = await response.json()
        setKpiData(data)
      } catch (error) {
        console.error("Failed to load KPI data:", error)
      }
    }
    loadKPIData()
  }, [])

  // Enhanced quick insights for MD-level queries
  const quickInsights = [
    {
      label: "ISDI Status",
      query: "What's our current ISDI score and which regions are most affected?",
      icon: AlertTriangle,
      color: "text-red-600",
      priority: "critical",
    },
    {
      label: "Overbooking Risk",
      query: "Show me current overbooking ratios and affected SKUs",
      icon: TrendingUp,
      color: "text-orange-600",
      priority: "high",
    },
    {
      label: "Fill Rate Issues",
      query: "Which SKUs have negative fill rate variance right now?",
      icon: BarChart3,
      color: "text-blue-600",
      priority: "high",
    },
    {
      label: "Inventory Lag",
      query: "How is our order acceptance vs inventory refresh lag performing?",
      icon: Clock,
      color: "text-purple-600",
      priority: "medium",
    },
    {
      label: "Expiry Risk",
      query: "Alert me about products at risk of expiration",
      icon: AlertTriangle,
      color: "text-red-500",
      priority: "critical",
    },
    {
      label: "Forecast Accuracy",
      query: "How accurate are our forecasts during inventory lag periods?",
      icon: Target,
      color: "text-indigo-600",
      priority: "medium",
    },
  ]

  // Enhanced response generation for critical KPIs
  const generateResponse = (query: string) => {
    const lowerQuery = query.toLowerCase()

    // ISDI (Inventory Sync Delay Impact Index)
    if (lowerQuery.includes("isdi") || lowerQuery.includes("inventory sync delay")) {
      return {
        content:
          "🚨 ISDI Alert: Current score is 2.4 (Target: <1.5). This indicates significant inventory synchronization delays affecting order fulfillment.",
        metrics: [
          { label: "ISDI Score", value: "2.4", change: 0.3, status: "warning" as const },
          { label: "North Region", value: "2.8", change: 0.5, status: "critical" as const },
          { label: "West Region", value: "2.1", change: 0.1, status: "warning" as const },
          { label: "Revenue Impact", value: "₹1.2M", change: 15.0, status: "critical" as const },
        ],
        followUps: [
          "Which specific SKUs are causing the highest ISDI?",
          "What's the root cause of sync delays?",
          "Show me the action plan to reduce ISDI",
        ],
      }
    }

    // Overbooking Ratio
    if (lowerQuery.includes("overbooking") || lowerQuery.includes("overbook")) {
      return {
        content:
          "⚠️ Critical Overbooking Alert: 8.7% of orders exceed available inventory (Target: <5%). Immediate action required.",
        metrics: [
          { label: "Overbooking Ratio", value: "8.7%", change: 1.2, status: "critical" as const },
          { label: "Ice Cream 1L", value: "12.3%", change: 2.1, status: "critical" as const },
          { label: "Paneer 200g", value: "9.8%", change: 1.5, status: "critical" as const },
          { label: "Online Channel", value: "10.1%", change: 1.8, status: "critical" as const },
        ],
        followUps: [
          "Which channels have highest overbooking?",
          "What's the customer impact?",
          "Emergency inventory allocation needed?",
        ],
      }
    }

    // Fill Rate Variance
    if (lowerQuery.includes("fill rate") || lowerQuery.includes("variance")) {
      return {
        content:
          "🔴 Fill Rate Crisis: -3.2% variance from expected rates. Daily revenue impact: ₹800K. Immediate intervention required.",
        metrics: [
          { label: "Fill Rate Variance", value: "-3.2%", change: -1.8, status: "critical" as const },
          { label: "Milk 500ml", value: "-4.5%", change: -2.1, status: "critical" as const },
          { label: "Lassi 200ml", value: "-3.8%", change: -1.9, status: "critical" as const },
          { label: "Mumbai Region", value: "-4.1%", change: -2.3, status: "critical" as const },
        ],
        followUps: [
          "Which time periods show worst variance?",
          "Root cause analysis needed?",
          "Emergency supply reallocation?",
        ],
      }
    }

    // Order Acceptance Lag
    if (lowerQuery.includes("acceptance lag") || lowerQuery.includes("inventory refresh")) {
      return {
        content:
          "⏱️ System Lag Alert: 4.2 minutes average lag between order acceptance and inventory refresh (Target: <2 min).",
        metrics: [
          { label: "Avg Lag Time", value: "4.2m", change: 0.8, status: "warning" as const },
          { label: "ERP System", value: "3.8m", change: 0.5, status: "warning" as const },
          { label: "WMS System", value: "4.6m", change: 1.1, status: "warning" as const },
          { label: "Peak Hours", value: "5.2m", change: 1.5, status: "critical" as const },
        ],
        followUps: [
          "Which system needs optimization?",
          "Impact on customer experience?",
          "Technical team intervention needed?",
        ],
      }
    }

    // Expired Inventory Risk
    if (lowerQuery.includes("expir") || lowerQuery.includes("risk")) {
      return {
        content: "🚨 CRITICAL: Expired Inventory Risk Index at 6.8 (Target: <4.0). ₹2.1M inventory at immediate risk.",
        metrics: [
          { label: "Risk Index", value: "6.8", change: 2.1, status: "critical" as const },
          { label: "Yogurt 400g", value: "High Risk", change: 0, status: "critical" as const },
          { label: "Milk 1L", value: "Medium Risk", change: 0, status: "warning" as const },
          { label: "24h Expiry", value: "15 SKUs", change: 5, status: "critical" as const },
        ],
        followUps: [
          "Emergency clearance sale needed?",
          "Which locations have highest risk?",
          "Donation/disposal plan required?",
        ],
      }
    }

    // Forecast Error
    if (lowerQuery.includes("forecast") || lowerQuery.includes("accuracy")) {
      return {
        content:
          "📊 Forecast Accuracy Concern: 12.3% error rate during inventory lag periods (Target: <8%). Planning reliability at risk.",
        metrics: [
          { label: "Forecast Error", value: "12.3%", change: 1.5, status: "warning" as const },
          { label: "Seasonal Products", value: "15.2%", change: 2.1, status: "critical" as const },
          { label: "Staple Products", value: "9.8%", change: 0.8, status: "warning" as const },
          { label: "Premium Products", value: "13.1%", change: 1.8, status: "warning" as const },
        ],
        followUps: [
          "Which products need forecast adjustment?",
          "Seasonal demand patterns analysis?",
          "AI model retraining required?",
        ],
      }
    }

    // Order Drop Rate
    if (lowerQuery.includes("drop rate") || lowerQuery.includes("cancelled")) {
      return {
        content: "✅ Order Drop Rate: 2.1% - Within acceptable limits (Target: <3%). Good performance maintained.",
        metrics: [
          { label: "Order Drop Rate", value: "2.1%", change: -0.4, status: "good" as const },
          { label: "Stock-out Drops", value: "45%", change: -2, status: "good" as const },
          { label: "Quality Issues", value: "25%", change: 1, status: "warning" as const },
          { label: "Logistics Issues", value: "30%", change: 0.5, status: "warning" as const },
        ],
        followUps: [
          "Maintain current performance?",
          "Address quality issues?",
          "Logistics optimization opportunities?",
        ],
      }
    }

    // Default response for general queries
    return {
      content:
        "I can help you monitor these critical inventory and fulfillment metrics. What specific area concerns you most right now?",
      followUps: [
        "Show me ISDI status",
        "Check overbooking risks",
        "Fill rate variance analysis",
        "Expired inventory alerts",
      ],
    }
  }

  // Handle sending a message
  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    // Add user message
    const userMessage: MessageType = {
      id: Date.now().toString(),
      sender: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI processing delay
    setTimeout(() => {
      const responseData = generateResponse(userMessage.content)
      const botResponse: MessageType = {
        id: Date.now().toString(),
        sender: "bot",
        content: responseData.content,
        timestamp: new Date(),
        metrics: responseData.metrics,
        followUps: responseData.followUps,
      }
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1000)
  }

  // Handle quick insight button click
  const handleQuickInsight = (query: string) => {
    setInputValue(query)
    setTimeout(() => handleSendMessage(), 100)
  }

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <Card className="w-full h-full flex flex-col overflow-hidden">
      <CardHeader className="pb-3 border-b bg-gradient-to-r from-amul-red to-red-600 text-white">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center">
            <Bot className="w-5 h-5 mr-2" />
            AI Command Center
            <Badge className="ml-2 bg-green-500 text-white hover:bg-green-500 border-0 animate-pulse">Live</Badge>
          </CardTitle>
        </div>
        <p className="text-sm text-red-100">Real-time inventory & fulfillment intelligence</p>
      </CardHeader>

      <CardContent className="flex-1 p-0 flex flex-col">
        {/* Critical Insights Panel */}
        <div className="p-3 border-b bg-slate-50">
          <div className="text-xs font-medium mb-2 text-slate-700">🎯 Critical Metrics Monitor</div>
          <div className="grid grid-cols-2 gap-1">
            {quickInsights.map((insight, index) => {
              const Icon = insight.icon
              return (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className={`text-xs p-2 h-auto bg-white hover:bg-slate-50 ${
                    insight.priority === "critical"
                      ? "border-red-200 hover:border-red-300"
                      : insight.priority === "high"
                        ? "border-orange-200 hover:border-orange-300"
                        : "border-slate-200"
                  }`}
                  onClick={() => handleQuickInsight(insight.query)}
                >
                  <Icon className={`w-3 h-3 mr-1 ${insight.color}`} />
                  <span className="truncate">{insight.label}</span>
                </Button>
              )
            })}
          </div>
        </div>

        {/* Messages area */}
        <ScrollArea className="flex-1 p-3">
          <div className="space-y-3 pr-2">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[90%] rounded-lg p-3 ${
                    message.sender === "user"
                      ? "bg-amul-red text-white"
                      : "bg-white border border-slate-200 text-slate-800 shadow-sm"
                  }`}
                >
                  <div className="flex items-start mb-1">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center mr-2 flex-shrink-0 ${message.sender === "user" ? "bg-white text-amul-red" : "bg-slate-100 text-slate-700"}`}
                    >
                      {message.sender === "user" ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm leading-relaxed">{message.content}</div>

                      {/* Enhanced Metrics display with status indicators */}
                      {message.metrics && (
                        <div className="mt-3 space-y-2">
                          {message.metrics.map((metric, idx) => (
                            <div
                              key={idx}
                              className={`flex justify-between items-center rounded p-2 ${
                                message.sender === "user"
                                  ? "bg-white bg-opacity-10"
                                  : metric.status === "critical"
                                    ? "bg-red-50 border border-red-200"
                                    : metric.status === "warning"
                                      ? "bg-orange-50 border border-orange-200"
                                      : metric.status === "good"
                                        ? "bg-green-50 border border-green-200"
                                        : "bg-slate-50 border border-slate-200"
                              }`}
                            >
                              <div className="flex items-center">
                                {metric.status === "critical" && (
                                  <AlertTriangle className="w-3 h-3 text-red-500 mr-1" />
                                )}
                                {metric.status === "warning" && (
                                  <AlertTriangle className="w-3 h-3 text-orange-500 mr-1" />
                                )}
                                {metric.status === "good" && <Zap className="w-3 h-3 text-green-500 mr-1" />}
                                <span className="text-xs font-medium">{metric.label}</span>
                              </div>
                              <div className="flex items-center">
                                <span className="text-sm font-bold mr-2">{metric.value}</span>
                                <div
                                  className={`flex items-center text-xs ${
                                    metric.change > 0
                                      ? "text-red-500"
                                      : metric.change < 0
                                        ? "text-green-500"
                                        : "text-slate-500"
                                  }`}
                                >
                                  {metric.change > 0 ? "↑" : metric.change < 0 ? "↓" : "→"}
                                  <span>{Math.abs(metric.change)}%</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Follow-up suggestions */}
                      {message.followUps && (
                        <div className="mt-3 flex flex-wrap gap-1">
                          {message.followUps.map((followUp, idx) => (
                            <Button
                              key={idx}
                              variant="outline"
                              size="sm"
                              className={`text-xs py-1 px-2 h-auto ${
                                message.sender === "user"
                                  ? "bg-white text-amul-red border-white"
                                  : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                              }`}
                              onClick={() => handleQuickInsight(followUp)}
                            >
                              {followUp}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
                  <div className="flex items-center space-x-1">
                    <div
                      className="w-2 h-2 rounded-full bg-slate-400 animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <div
                      className="w-2 h-2 rounded-full bg-slate-400 animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <div
                      className="w-2 h-2 rounded-full bg-slate-400 animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input area */}
        <div className="p-3 border-t bg-slate-50">
          <div className="flex space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about ISDI, overbooking, fill rates..."
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1 text-sm"
            />
            <Button
              onClick={handleSendMessage}
              className="bg-amul-red hover:bg-red-700 px-3"
              disabled={!inputValue.trim()}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <div className="text-xs text-slate-500 mt-1 text-center">
            AI powered by real-time inventory data • Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
