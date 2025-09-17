import * as React from "react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

type RangeMode = "date" | "month"

interface RangePickerProps {
  mode?: RangeMode
  value?: { from?: Date; to?: Date }
  onChange?: (range: { from?: Date; to?: Date }) => void
}

const MONTHS = [
  "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"
]

export function RangePicker({ mode = "date", value, onChange }: RangePickerProps) {
  const [internalRange, setInternalRange] = React.useState<{ from?: Date; to?: Date }>(value ?? {})
  const range = value ?? internalRange

  const updateRange = (newRange: { from?: Date; to?: Date }) => {
    setInternalRange(newRange)
    onChange?.(newRange)
  }

  const renderLabel = () => {
    if (range.from) {
      if (range.to) {
        return `${format(range.from, mode === "month" ? "MMM yyyy" : "LLL dd, y")} → ${format(
          range.to,
          mode === "month" ? "MMM yyyy" : "LLL dd, y"
        )}`
      }
      return format(range.from, mode === "month" ? "MMM yyyy" : "LLL dd, y")
    }
    return `Pick a ${mode === "month" ? "month range" : "date range"}`
  }

  return (
    <div className="grid gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn("w-[280px] justify-start text-left font-normal")}
          >
            {renderLabel()}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-4" align="start">
          {mode === "date" ? (
            <Calendar
              mode="range"
              selected={
                range.from
                  ? { from: range.from, to: range.to } // ✅ Only pass when from is defined
                  : undefined
              }
              onSelect={(r: any) => updateRange(r)}
              numberOfMonths={2}
            />
          ) : (
            <div className="flex flex-col gap-4">
              {/* Year selection */}
              <div className="flex items-center gap-2">
                <span className="text-sm">Year:</span>
                <select
                  className="border rounded px-2 py-1"
                  value={range.from?.getFullYear() ?? new Date().getFullYear()}
                  onChange={(e) => {
                    const year = parseInt(e.target.value, 10)
                    updateRange({ from: new Date(year, 0), to: range.to })
                  }}
                >
                  {Array.from({ length: 10 }).map((_, i) => {
                    const year = new Date().getFullYear() - 5 + i
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    )
                  })}
                </select>
              </div>

              {/* Month grid */}
              <div className="grid grid-cols-3 gap-2">
                {MONTHS.map((m, i) => (
                  <Button
                    key={m}
                    variant={
                      range.from?.getMonth() === i ? "default" : "outline"
                    }
                    onClick={() =>
                      updateRange({
                        from: new Date(range.from?.getFullYear() ?? new Date().getFullYear(), i),
                        to: range.to,
                      })
                    }
                  >
                    {m}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  )
}
