'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, TrendingUp } from 'lucide-react'

interface DailyLeadData {
  lead_date: string
  source_name: string
  counsellor_name: string
  total_leads: number
}

interface GroupedByDate {
  [date: string]: {
    totalLeads: number
    bySource: { [source: string]: number }
    byCounsellor: { [counsellor: string]: number }
    entries: DailyLeadData[]
  }
}

export default function DailyLeadsView({ data }: { data: DailyLeadData[] }) {
  const [expandedDate, setExpandedDate] = useState<string | null>(null)
  const [showAll, setShowAll] = useState(false)

  const groupedData = useMemo(() => {
    const grouped: GroupedByDate = {}

    data.forEach((item) => {
      const dateStr = new Date(item.lead_date).toLocaleDateString('en-IN', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })

      if (!grouped[dateStr]) {
        grouped[dateStr] = {
          totalLeads: 0,
          bySource: {},
          byCounsellor: {},
          entries: [],
        }
      }

      grouped[dateStr].totalLeads += item.total_leads
      grouped[dateStr].bySource[item.source_name] =
        (grouped[dateStr].bySource[item.source_name] || 0) + item.total_leads
      grouped[dateStr].byCounsellor[item.counsellor_name] =
        (grouped[dateStr].byCounsellor[item.counsellor_name] || 0) + item.total_leads
      grouped[dateStr].entries.push(item)
    })

    return grouped
  }, [data])

  const sortedDates = Object.keys(groupedData).sort((a, b) => {
    const dateA = new Date(a).getTime()
    const dateB = new Date(b).getTime()
    return dateB - dateA
  })

  const datesToDisplay = showAll ? sortedDates : sortedDates.slice(0, 3)

  return (
    <div className="w-full space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <TrendingUp className="w-6 h-6" />
            Daily Leads Overview
          </h2>
          <p className="text-gray-600">Source-wise leads assigned to counsellors</p>
        </div>
        {sortedDates.length > 3 && (
          <Button
            onClick={() => setShowAll(!showAll)}
            variant={showAll ? "default" : "outline"}
            className="whitespace-nowrap"
          >
            {showAll ? 'Show Last 3 Days' : 'View All'}
          </Button>
        )}
      </div>

      {/* Daily Cards */}
      <div className="space-y-3">
        {datesToDisplay.map((date) => {
          const dayData = groupedData[date]
          const isExpanded = expandedDate === date

          return (
            <Card
              key={date}
              className="cursor-pointer hover:shadow-md transition-shadow border-gray-200"
              onClick={() => setExpandedDate(isExpanded ? null : date)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div>
                      <CardTitle className="text-lg">{date}</CardTitle>
                      <p className="text-sm text-gray-600 mt-1">
                        {dayData.totalLeads} total leads
                      </p>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform text-gray-400 ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </CardHeader>

              {/* Expanded Details - All sources by counsellor */}
              {isExpanded && (
                <CardContent className="pt-0 pb-4 space-y-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-900 mb-3">Sources by Counsellor</p>
                    <div className="space-y-3">
                      {Object.entries(dayData.byCounsellor)
                        .sort(([, a], [, b]) => b - a)
                        .map(([counsellor, totalCount]) => (
                          <div key={counsellor} className="border border-gray-200 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-2">
                              <p className="font-medium text-gray-900">{counsellor}</p>
                              <span className="text-sm font-semibold text-purple-600 bg-purple-50 px-2 py-1 rounded">
                                {totalCount} leads
                              </span>
                            </div>
                            <div className="space-y-1 pl-3 border-l-2 border-purple-200">
                              {dayData.entries
                                .filter((entry) => entry.counsellor_name === counsellor)
                                .reduce(
                                  (acc, entry) => {
                                    const existing = acc.find((e) => e.source_name === entry.source_name)
                                    if (existing) {
                                      existing.total_leads += entry.total_leads
                                    } else {
                                      acc.push(entry)
                                    }
                                    return acc
                                  },
                                  [] as DailyLeadData[]
                                )
                                .sort((a, b) => b.total_leads - a.total_leads)
                                .map((entry) => (
                                  <div key={entry.source_name} className="flex justify-between text-sm">
                                    <span className="text-gray-600">{entry.source_name}</span>
                                    <span className="font-medium text-blue-600">{entry.total_leads}</span>
                                  </div>
                                ))}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )
}
