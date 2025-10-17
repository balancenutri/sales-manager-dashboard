import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useGetSalesTriggerQuery } from "@/service/dashboard/api";
import { keyString } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import SalesTriggerData from "../dataTables/SalesTriggerData";

export default function StatusWiseMetrics() {
  const [hoveredSection, setHoveredSection] = useState<
    "hot" | "warm" | "engage" | "downgrade" | null
  >(null);

  const { data } = useGetSalesTriggerQuery();
  const [selected, setSelected] = useState<"hot" | "warm" | "cold" | null>(
    null
  );

  const DetailedInfo = ({
    type,
    leadData,
  }: {
    type: "hot" | "warm" | "engage" | "downgrade";
    leadData?: { [key: string]: number };
  }) => (
    <div className="absolute left-0 top-full right-0 mt-2 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 p-2 z-10 animate-in slide-in-from-left-2 duration-200 min-w-48">
      <div className="flex items-center justify-between mb-2">
        <h4 className="pl-1 font-medium text-base capitalize">
          {type === "engage"
            ? "To Engage"
            : type === "downgrade"
            ? "Downgrades"
            : `${type} `}
        </h4>
      </div>

      <div className="space-y-2 mx-1">
        {leadData &&
          Object.entries(leadData).map(
            ([key, value]) =>
              key !== "total" && (
                <div
                  key={key}
                  className="flex items-center justify-between py-1 px-2 bg-blue-50 rounded text-sm"
                >
                  <span className="font-medium">{keyString(key)}</span>
                  <span className="font-semibold text-blue-600">{value}</span>
                </div>
              )
          )}
      </div>
    </div>
  );

  return (
    <Card className="w-full ">
      <CardHeader>
        <CardTitle>Consultation Done (Unconverted)</CardTitle>
      </CardHeader>
      <CardContent className="px-3">
        <div className="grid grid-cols-3 gap-2">
          <div
            className="relative"
            onMouseEnter={() => setHoveredSection("hot")}
            onMouseLeave={() => setHoveredSection(null)}
            onClick={() => setSelected("hot")}
          >
            <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-lg p-2 border border-red-200 dark:border-red-800 hover:shadow-md transition-all duration-300 cursor-pointer">
              <div className="text-center">
                <h4 className="font-medium text-base text-gray-800 dark:text-gray-200">
                  Hot
                </h4>
                <div className="text-xl font-bold">
                  {data?.data?.hot_triggers?.total}
                </div>
              </div>
            </div>
            {hoveredSection === "hot" && (
              <DetailedInfo type="hot" leadData={data?.data?.hot_triggers} />
            )}
          </div>

          <div
            className="relative"
            onMouseEnter={() => setHoveredSection("warm")}
            onMouseLeave={() => setHoveredSection(null)}
            onClick={() => setSelected("warm")}
          >
            <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg p-2 border border-yellow-200 dark:border-yellow-800 hover:shadow-md transition-all duration-300 cursor-pointer">
              <div className="text-center">
                <h4 className="font-medium text-base text-gray-800 dark:text-gray-200">
                  Warm
                </h4>
                <div className="text-xl font-bold">
                  {data?.data?.warm_triggers?.total}
                </div>
              </div>
            </div>
            {hoveredSection === "warm" && (
              <DetailedInfo type="warm" leadData={data?.data.warm_triggers} />
            )}
          </div>

          <div
            className="relative"
            onMouseEnter={() => setHoveredSection("engage")}
            onMouseLeave={() => setHoveredSection(null)}
            onClick={() => setSelected("cold")}
          >
            <div className="bg-gradient-to-r from-red-50 to-orange-50  dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-2 border border-green-200 dark:border-green-800 hover:shadow-md transition-all duration-300 cursor-pointer">
              <div className="text-center">
                <h4 className="font-medium text-base text-gray-800 dark:text-gray-200">
                  Cold
                </h4>
                <div className="text-xl font-bold">{data?.data?.to_engage}</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="min-w-[90vw]">
          <CardHeader>
            <CardTitle>{keyString(selected ?? "")}</CardTitle>
          </CardHeader>

          {selected && <SalesTriggerData selected={selected} />}
        </DialogContent>
      </Dialog>
    </Card>
  );
}
