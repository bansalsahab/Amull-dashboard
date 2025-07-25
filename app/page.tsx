import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Home() {
  return (
    <main className="container mx-auto p-6">
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Amul Executive Dashboard</h1>
          <p className="text-gray-600">Real-time inventory and distribution intelligence</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                ISDI
                <Badge variant="destructive">Critical</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87.2%</div>
              <p className="text-sm text-gray-500">Target: 95%</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Fill Rate
                <Badge variant="secondary">Warning</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">92.5%</div>
              <p className="text-sm text-gray-500">Target: 98%</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Overbooking
                <Badge variant="destructive">Critical</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12.8%</div>
              <p className="text-sm text-gray-500">Target: &lt;5%</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
