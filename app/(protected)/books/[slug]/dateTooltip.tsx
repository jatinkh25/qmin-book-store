'use client'

import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

export default function DateTooltip({ content }: { content: string }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            className="text-xs px-3 py-1 rounded-full h-[26px] flex-shrink-0"
          >
            {content}
          </Button>
        </TooltipTrigger>

        <TooltipContent className="bg-primary text-primary-foreground shadow hover:bg-primary/90">
          Publication Date
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
