"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronRight, Copy, Check } from "lucide-react"
import type { Body } from "@/lib/types"

interface BodyRawDataProps {
  body: Body
}

export function BodyRawData({ body }: BodyRawDataProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(body, null, 2))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Failed to copy:", error)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            Raw Data
            <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)} className="p-1 h-auto">
              {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          </CardTitle>
          {isExpanded && (
            <Button variant="outline" size="sm" onClick={handleCopy} className="bg-transparent">
              {copied ? <Check className="mr-2 h-3 w-3" /> : <Copy className="mr-2 h-3 w-3" />}
              {copied ? "Copied!" : "Copy JSON"}
            </Button>
          )}
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{JSON.stringify(body, null, 2)}</code>
          </pre>
        </CardContent>
      )}
    </Card>
  )
}
