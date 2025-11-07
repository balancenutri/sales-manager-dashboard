import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useGetConsultationPendingQuery,
  useGetLeadSolidSalesOpportunityQuery,
  useGetSalesTriggerQuery,
  useGetSolidSalesOpportunityQuery,
} from "@/service/dashboard/api";
import { useState } from "react";
import StatusWiseMetrics from "./StatusWise";

type SalesData = Record<string, Record<string, number>>;

type UserCount = {
  name: string;
  count: number;
};
export default function KeySalesAlert() {
  const { data } = useGetSalesTriggerQuery();
  const { data: leadSolidSalesData } = useGetLeadSolidSalesOpportunityQuery();

  const { data: solidSalesData } = useGetSolidSalesOpportunityQuery();

  const { data: consultationPending } = useGetConsultationPendingQuery();
  //   const { data: unconvertedLeads } = useGetUnconvertedLeadsQuery();

  const totalSalesOpp =
    leadSolidSalesData?.data &&
    Object.values(leadSolidSalesData?.data).filter(val => typeof val !== "string").reduce(
      (sum, value) => sum + value,
      0
    );

  // const totalSalesOpp =
  //   leadSolidSalesData?.data &&
  //   Object.entries(leadSolidSalesData.data)
  //     .filter(([key]) => key !== "cart_not_paid")
  //     .reduce((sum, [, value]) => sum + value, 0);

  const [hoveredSection, setHoveredSection] = useState<
    "hot" | "warm" | "engage" | "downgrade" | null
  >(null);

  function transformSalesData(data: SalesData): UserCount[] {
    const userCounts: Record<string, number> = {};

    for (const section of Object.values(data)) {
      for (const [name, count] of Object.entries(section)) {
        userCounts[name] = (userCounts[name] || 0) + count;
      }
    }

    return Object.entries(userCounts).map(([name, count]) => ({
      name,
      count,
    }));
  }

  const transformedData = transformSalesData(solidSalesData?.data || {});

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {/* Total Sales Opportunity */}
      <Card>
        <CardHeader>{/* <CardTitle>Key Sales Alerts</CardTitle> */}</CardHeader>
        <CardContent className="grid grid-cols-2 gap-4 text-center">
          <div
            className="relative"
            onMouseEnter={() => setHoveredSection("hot")}
            onMouseLeave={() => setHoveredSection(null)}
          >
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-2 border border-green-200 dark:border-green-800 hover:shadow-md transition-all duration-300 cursor-pointer">
              <div className="text-center">
                <h4 className="font-medium text-base text-gray-800 dark:text-gray-200">
                  Total Sales Opportunities
                </h4>
                <div className="text-xl font-bold">{totalSalesOpp}</div>
              </div>
            </div>
            {hoveredSection == "hot" && (totalSalesOpp || 0) > 0 && (
              <div className="absolute left-0 top-full right-0 mt-2 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 p-2 z-10 animate-in slide-in-from-left-2 duration-200 min-w-48">
                <div className="grid grid-cols-3 gap-2">
                  {transformedData.map((item, index) => (
                    <div
                      className="text-center p-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-md"
                      key={index}
                    >
                      <p className="text-xs text-gray-600 font-medium">
                        {item.name}
                      </p>
                      <p className="text-sm font-bold text-green-700">
                        {item.count}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-2 border border-green-200 dark:border-green-800 hover:shadow-md transition-all duration-300 cursor-pointer">
            <div className="text-center">
              <h4 className="font-medium text-base text-gray-800 dark:text-gray-200">
                Total Downgrade
              </h4>
              <div className="text-xl font-bold">
                {(data?.data?.downgrade_counts?.hot_to_warm || 0) +
                  (data?.data?.downgrade_counts?.hot_to_cold || 0) +
                  (data?.data?.downgrade_counts?.warm_to_cold || 0)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Unconverted Leads */}
      <StatusWiseMetrics />

      <Card>
        <CardHeader>
          <CardTitle>Consultation Pending</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-2 border border-green-200 dark:border-green-800 hover:shadow-md transition-all duration-300 cursor-pointer">
            <div className="text-center">
              <h4 className="font-medium text-base text-gray-800 dark:text-gray-200">
                To Engage
              </h4>
              <div className="text-xl font-bold">
                {consultationPending?.data?.to_engage}
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-2 border border-green-200 dark:border-green-800 hover:shadow-md transition-all duration-300 cursor-pointer">
            <div className="text-center">
              <h4 className="font-medium text-base text-gray-800 dark:text-gray-200">
                Connected
              </h4>
              <div className="text-xl font-bold">
                {consultationPending?.data?.connected}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
