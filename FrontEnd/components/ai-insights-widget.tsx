import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { AIInsight } from "@/lib/types"
import { Sparkles, AlertCircle, Info, CheckCircle } from "lucide-react"
import Link from "next/link"

interface AIInsightsWidgetProps {
  insights: AIInsight[]
}

export function AIInsightsWidget({ insights }: AIInsightsWidgetProps) {
  const getIcon = (type: AIInsight["type"]) => {
    switch (type) {
      case "warning":
        return <AlertCircle className="h-4 w-4 text-warning" />
      case "info":
        return <Info className="h-4 w-4 text-chart-1" />
      case "success":
        return <CheckCircle className="h-4 w-4 text-success" />
    }
  }

  const getVariant = (type: AIInsight["type"]) => {
    switch (type) {
      case "warning":
        return "outline"
      case "info":
        return "secondary"
      case "success":
        return "outline"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-chart-1" />
          AI Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {insights.slice(0, 4).map((insight) => (
            <div key={insight.id} className="rounded-lg border p-3 space-y-2">
              <div className="flex items-start gap-2">
                <div className="mt-0.5">{getIcon(insight.type)}</div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">{insight.title}</p>
                  <p className="text-xs text-muted-foreground">{insight.description}</p>
                </div>
              </div>
            </div>
          ))}
          <Button variant="outline" size="sm" asChild className="w-full bg-transparent">
            <Link href="/admin/ai-insights">
              View All Insights
              <Sparkles className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
