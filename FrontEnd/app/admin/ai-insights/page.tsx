"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AIChatInterface } from "@/components/features/ai-chat-interface"
import { MOCK_AI_INSIGHTS, MOCK_PRODUCTS } from "@/lib/mock-data"
import { Sparkles, AlertCircle, Info, CheckCircle, AlertTriangle, Package, TrendingUp } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"

export default function AIInsightsPage() {
  const getIcon = (type: "warning" | "info" | "success" | "critical") => {
    switch (type) {
      case "critical":
        return <AlertTriangle className="h-5 w-5 text-destructive" />
      case "warning":
        return <AlertCircle className="h-5 w-5 text-warning" />
      case "info":
        return <Info className="h-5 w-5 text-primary" />
      case "success":
        return <CheckCircle className="h-5 w-5 text-success" />
    }
  }

  const criticalInsights = MOCK_AI_INSIGHTS.filter((i) => i.type === "critical")
  const warningInsights = MOCK_AI_INSIGHTS.filter((i) => i.type === "warning")
  const infoInsights = MOCK_AI_INSIGHTS.filter((i) => i.type === "info")
  const successInsights = MOCK_AI_INSIGHTS.filter((i) => i.type === "success")

  return (
    <div className="page-container section-spacing">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Sparkles className="h-8 w-8 text-primary" />
          AI-Powered Insights
        </h1>
        <p className="text-muted-foreground">Intelligent recommendations and analytics for your inventory</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-destructive/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-destructive/10 p-3">
                <AlertTriangle className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold">{criticalInsights.length}</p>
                <p className="text-sm text-muted-foreground">Critical</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-warning/10 p-3">
                <AlertCircle className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">{warningInsights.length}</p>
                <p className="text-sm text-muted-foreground">Warnings</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-3">
                <Info className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{infoInsights.length}</p>
                <p className="text-sm text-muted-foreground">Information</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-success/10 p-3">
                <CheckCircle className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{successInsights.length}</p>
                <p className="text-sm text-muted-foreground">Optimal</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <AIChatInterface />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">All Insights</h2>
          <Badge variant="secondary">{MOCK_AI_INSIGHTS.length} Total</Badge>
        </div>

        {MOCK_AI_INSIGHTS.map((insight) => {
          const product = insight.productId ? MOCK_PRODUCTS.find((p) => p.id === insight.productId) : null

          return (
            <Card
              key={insight.id}
              className={
                insight.type === "critical"
                  ? "border-destructive/50"
                  : insight.type === "warning"
                    ? "border-warning/50"
                    : ""
              }
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1">{getIcon(insight.type)}</div>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold">{insight.title}</h3>
                          <Badge
                            variant={
                              insight.type === "critical"
                                ? "destructive"
                                : insight.type === "warning"
                                  ? "warning"
                                  : insight.type === "success"
                                    ? "success"
                                    : "default"
                            }
                          >
                            {insight.type}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {insight.category.replace("_", " ")}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {insight.impact} impact
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{insight.description}</p>
                      </div>
                    </div>

                    {insight.recommendation && (
                      <div className="rounded-lg bg-primary/5 p-3 border border-primary/20">
                        <p className="text-sm">
                          <span className="font-medium">💡 Recommendation:</span> {insight.recommendation}
                        </p>
                      </div>
                    )}

                    {product && (
                      <div className="flex items-center gap-4 text-sm pt-3 border-t flex-wrap">
                        <div className="flex items-center gap-2">
                          <Package className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{product.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            Stock: {product.stock} / Min: {product.reorderLevel}
                          </span>
                        </div>
                        <Button variant="link" size="sm" asChild className="ml-auto p-0 h-auto">
                          <Link href="/admin/products">View Product</Link>
                        </Button>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
                      <span>{format(insight.createdAt, "MMM dd, yyyy HH:mm")}</span>
                      <span>Confidence: {(insight.confidence * 100).toFixed(0)}%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
