import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGetDailySourceWiseLeadsQuery } from "@/service/dashboard/api";
import type { DailyLeadData } from "@/lib/types";
import DailySourceWiseAllLeads from "./DailySourceWiseAllLeads";

interface GroupedByDate {
  [date: string]: {
    totalLeads: number;
    bySource: { [source: string]: number };
    byCounsellor: { [counsellor: string]: { [source: string]: number } };
    entries: DailyLeadData[];
  };
}

export default function DailySourceWiseLeads() {
  const [showAllPopup, setShowAllPopup] = useState(false);

  const { data } = useGetDailySourceWiseLeadsQuery();

  const groupedData = useMemo(() => {
    const grouped: GroupedByDate = {};

    data?.data?.forEach((item) => {
      const dateStr = new Date(item.lead_date).toLocaleDateString("en-IN", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      });

      if (!grouped[dateStr]) {
        grouped[dateStr] = {
          totalLeads: 0,
          bySource: {},
          byCounsellor: {},
          entries: [],
        };
      }

      grouped[dateStr].totalLeads += item.total_leads;
      grouped[dateStr].bySource[item.source_name] =
        (grouped[dateStr].bySource[item.source_name] || 0) + item.total_leads;

      if (!grouped[dateStr].byCounsellor[item.counsellor_name]) {
        grouped[dateStr].byCounsellor[item.counsellor_name] = {};
      }
      grouped[dateStr].byCounsellor[item.counsellor_name][item.source_name] =
        (grouped[dateStr].byCounsellor[item.counsellor_name][
          item.source_name
        ] || 0) + item.total_leads;

      grouped[dateStr].entries.push(item);
    });

    return grouped;
  }, [data]);

  const sortedDates = Object.keys(groupedData).sort((a, b) => {
    const dateA = new Date(a).getTime();
    const dateB = new Date(b).getTime();
    return dateB - dateA;
  });

  const last7Dates = sortedDates
    .slice(0, 7)
    .filter((item) => !item.includes("Sun"));
  const allCounsellors = Array.from(
    new Set(data?.data?.map((item) => item.counsellor_name))
  ).sort();

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-2">
          <h2 className="text-lg font-medium ">Daily Leads Overview</h2>
        </div>
        {sortedDates.length > 7 && (
          <Button
            onClick={() => setShowAllPopup(true)}
            variant="outline"
            className="whitespace-nowrap"
          >
            View All
          </Button>
        )}
      </div>

      <Card className="overflow-hidden">
        <CardContent className="p-0 -mt-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 w-32">
                    Counsellor
                  </th>
                  {last7Dates.map((date) => (
                    <th
                      key={date}
                      className="px-4 py-3 text-center text-sm font-semibold text-gray-900 min-w-[200px]"
                    >
                      <div className="text-xs font-medium text-gray-600">
                        {date}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Total: {groupedData[date].totalLeads} Leads
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allCounsellors.map((counsellor, idx) => (
                  <tr
                    key={counsellor}
                    className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 border-r border-gray-200">
                      {counsellor}
                    </td>
                    {last7Dates.map((date) => {
                      const sources =
                        groupedData[date]?.byCounsellor[counsellor] || {};
                      const totalLeads = Object.values(sources).reduce(
                        (a, b) => a + b,
                        0
                      );

                      return (
                        <td
                          key={`${counsellor}-${date}`}
                          className="px-4 py-3 text-sm border-r border-gray-200 last:border-r-0"
                        >
                          {totalLeads > 0 ? (
                            <div className="space-y-1">
                              <div className="text-xs space-y-1 max-h-24 overflow-y-auto">
                                {Object.entries(sources).map(
                                  ([source, count]) => (
                                    <div
                                      key={source}
                                      className="flex justify-between gap-2"
                                    >
                                      <span className="text-gray-800">
                                        {source}:
                                      </span>
                                      <span className="font-medium text-gray-900">
                                        {count}
                                      </span>
                                    </div>
                                  )
                                )}
                              </div>
                              <div className="font-semibold text-blue-600 mb-2">
                                {totalLeads} Leads
                              </div>
                            </div>
                          ) : (
                            <span className="text-gray-600 text-xs">
                              Lead Not Assigned
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      {/* 
      <Dialog open={showAllPopup} onOpenChange={setShowAllPopup}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="sticky top-0">
            <DialogTitle>All Daily Leads Data</DialogTitle>
          </DialogHeader>

          <DailySourceWiseAllLeads groupedData={groupedData} />
        </DialogContent>
      </Dialog> */}

      <Dialog open={showAllPopup} onOpenChange={setShowAllPopup}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
          {/* Sticky header */}
          <div className="sticky top-0 bg-white z-50 border-b p-4">
            <div className="flex items-center justify-between">
              <DialogTitle>All Daily Leads Data</DialogTitle>

              <DialogClose className="cursor-pointer text-gray-600 hover:text-black">
                ✕
              </DialogClose>
            </div>
          </div>

          <div className="p-4">
            <DailySourceWiseAllLeads groupedData={groupedData} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
