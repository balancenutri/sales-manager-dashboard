import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";
import { useState } from "react";
import { useGetSalesTriggerQuery } from "@/service/dashboard/api";

interface LeadMetricsData {
  hot: {
    count: number;
    dayWiseData: {
      day3: { engagement: number; conversions: number; clicks: number };
      day5: { engagement: number; conversions: number; clicks: number };
      day7: { engagement: number; conversions: number; clicks: number };
    };
  };
  warm: {
    count: number;
    dayWiseData: {
      day3: { engagement: number; conversions: number; clicks: number };
      day5: { engagement: number; conversions: number; clicks: number };
      day7: { engagement: number; conversions: number; clicks: number };
    };
  };
}

interface SimpleLeadMetricsProps {
  data: LeadMetricsData;
}

export default function StatusWiseMetrics({ data }: SimpleLeadMetricsProps) {
  const [hoveredLead, setHoveredLead] = useState<"hot" | "warm" | null>(null);

  const { data: salesData } = useGetSalesTriggerQuery();
  console.log({ salesData });

  const DetailedInfo = ({
    type,
    leadData,
  }: {
    type: "hot" | "warm";
    leadData: any;
  }) => (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-4 z-10 animate-in slide-in-from-top-2 duration-200">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-base capitalize flex items-center">
          {type} Trigger
        </h4>
        <Badge
          variant={type === "hot" ? "destructive" : "secondary"}
          className="text-xs"
        >
          {leadData.count} leadsssss
        </Badge>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {(type == "hot" ? ["3rd", "5th", "7th"] : ["10th", "12th", "15th"]).map(
          (item) => (
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-3">
              <div className="text-center mb-2">
                <Badge variant="outline" className="text-xs mb-2">
                  {item} Day
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-center text-xs">
                  {/* <div className="flex items-center">
                  <TrendingUp className="h-3 w-3 text-blue-500 mr-1" />
                  <span>Engagement</span>
                </div> */}
                  <span className="font-bold text-center text-blue-600">
                    1000
                  </span>
                </div>
              </div>
            </div>
          )
        )}
      </div>

      {/* <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Performance Trend</span>
          <span className="text-green-600 font-medium flex items-center">
            <TrendingUp className="h-3 w-3 mr-1" />+{Math.round(Math.random() * 20 + 5)}% vs previous period
          </span>
        </div>
      </div> */}
    </div>
  );

  return (
    <Card className="w-full">
      <CardContent className="px-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold">Sales Trigger</h3>
          </div>
          <Badge variant="outline" className="text-sm">
            Total: {data.hot.count + data.warm.count} leads
          </Badge>
        </div>
        <div className="grid grid-cols-2 gap-6">
          {/* Hot Leads */}
          <div
            className="relative"
            onMouseEnter={() => setHoveredLead("hot")}
            onMouseLeave={() => setHoveredLead(null)}
          >
            <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800 hover:shadow-lg transition-all duration-300 cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {/* <div className="p-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-full">
                    <Flame className="h-5 w-5 text-white" />
                  </div> */}
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                      Hot Trigger
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      High engagement
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-red-600">
                    {data.hot.count}
                  </div>
                </div>
              </div>
            </div>

            {hoveredLead === "hot" && (
              <DetailedInfo type="hot" leadData={data.hot} />
            )}
          </div>

          {/* Warm Leads */}
          <div
            className="relative"
            onMouseEnter={() => setHoveredLead("warm")}
            onMouseLeave={() => setHoveredLead(null)}
          >
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-800 hover:shadow-lg transition-all duration-300 cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {/* <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-400 rounded-full">
                    <Thermometer className="h-5 w-5 text-white" />
                  </div> */}
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                      Warm Trigger
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Moderate engagement
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-yellow-600">
                    {data.warm.count}
                  </div>
                </div>
              </div>
            </div>

            {hoveredLead === "warm" && (
              <DetailedInfo type="warm" leadData={data.warm} />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
