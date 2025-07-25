"use client"

import { Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface KpiInfoButtonProps {
  description: string
  unit?: string
}

export function KpiInfoButton({ description, unit }: KpiInfoButtonProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0 ml-2">
            <Info className="h-3 w-3" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <div className="max-w-xs">
            <p className="text-sm">{description}</p>
            {unit && <p className="text-xs text-muted-foreground mt-1">Unit: {unit}</p>}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
