import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { keyString } from "@/lib/utils";

interface MetricCardProps {
  data: Record<string, any>;
}

const MetricCard: React.FC<MetricCardProps> = ({ data }) => {
  return (
    <Card className="shadow-dashboard bg-white">
      <CardHeader>
        <h2 className="text-sm font-semibold text-nowrap">
          {keyString(data?.category)}
        </h2>
      </CardHeader>

      <CardContent>
        {data ? (
          Object.entries(data).map(([key, value], index) => {
            if (["c:s", "l:s", "l:c", "category"].includes(key)) return null;
            return (
              <div
                key={index}
                className="border-b hover:scale-105 transition-transform duration-300 px-2 py-3"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-medium text-gray-800">
                    {keyString(key)}
                  </h2>
                  <p className="text-sm text-gray-500 font-medium">
                    {value || 0}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <>
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="border-b px-2 py-4">
                  <div className="flex items-center justify-between">
                    <Skeleton />
                    <Skeleton />
                  </div>
                </div>
              ))}
          </>
        )}

        {/* Bottom Grid */}
        <div className="grid grid-cols-3 gap-3 mt-3">
          <div className="flex flex-col items-center bg-gray-100 py-2">
            <p className="text-sm font-normal">L:C</p>
            <span className="text-sm font-medium">{data?.["l:c"]} %</span>
          </div>

          <div className="flex flex-col items-center bg-gray-100 py-2">
            <p className="text-sm font-normal">C:S</p>
            <span className="text-sm font-medium">{data?.["c:s"]} %</span>
          </div>

          <div className="flex flex-col items-center bg-gray-100 py-2">
            <p className="text-sm font-normal">L:S</p>
            <span className="text-sm font-medium">{data?.["l:s"]} %</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricCard;
