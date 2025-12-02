import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { AssignedLeadPerformanceAll } from "@/lib/types";
import { useState } from "react";
import { formatCurrency, keyString } from "@/lib/utils";
import dayjs from "dayjs";
import CounsellorIndividualPerformance from "../overview/counsellorPerformance/CounsellorIndividualPerformance";
import { Button } from "@/components/ui/button";
import CounsellorDailyPerformance from "../overview/counsellorPerformance/CounsellorDailyPerformance";

export default function AllCounsellorCard({
  performanceData,
  benchmarkData,
}: {
  performanceData: AssignedLeadPerformanceAll;
  benchmarkData: {
    "l:c": number;
    "c:s": number;
    "l:s": number;
  };
}) {
  const [openModal, setOpenModal] = useState<{
    id: number | undefined;
    type: string | null;
  }>();

  const performanceLabel = (
    data: string,
    benchmark: number,
    avg: string
  ): string => {
    let value = Number(data);
    let average = Number(avg);
    if (value > benchmark) return "Excellent";
    if (value >= benchmark - 5) return "Good";
    if (value < benchmark - 5 && value <= average + 5 && value > average)
      return "Fair";
    if (value >= average - 5 && value <= average + 5) return "Poor";
    if (value < average) return "High Risk";
    return "Unknown";
  };

  const performanceColor = (
    data: string,
    benchmark: number,
    avg: string
  ): string => {
    let value = Number(data);
    let average = Number(avg);

    if (value > benchmark) return "text-green-700";
    if (value >= benchmark - 5) return "text-green-400";
    if (value < benchmark - 5 && value <= average + 5 && value > average)
      return "text-yellow-700";
    if (value >= average - 5 && value <= average + 5) return "text-orange-500";
    if (value < average) return "text-red-400";
    return "text-red-600";
  };

  return (
    <>
      <Card
        className="w-full max-w-md cursor-pointer"
        onClick={() =>
          setOpenModal({ id: performanceData?.admin_user_id, type: "daily" })
        }
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex gap-2 items-center">
              <h3 className="font-semibold text-sm leading-none">
                {performanceData.crm_user}
              </h3>
            </div>
            <Button
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                setOpenModal({
                  id: performanceData?.admin_user_id,
                  type: "source",
                });
              }}
            >
              View Leads
            </Button>
          </div>
        </CardHeader>

        <CardContent className="-mt-4">
          <div className="grid grid-cols-3 gap-3 text-sm">
            <div>
              <p className="text-muted-foreground">Best Source</p>
              <p className="font-semibold">
                {performanceData.best_source_performance || "N/A"}
              </p>
            </div>

            <div>
              <p className="text-muted-foreground">Leads Assigned</p>
              <p className="font-semibold">{performanceData.leads_assigned}</p>
            </div>

            <div>
              <p className="text-muted-foreground">Consultation</p>
              <p className="font-semibold">{performanceData.consultations}</p>
            </div>

            <div>
              <p className="text-muted-foreground">Sales Closed</p>
              <p className="font-semibold text-green-600">
                {performanceData.sales}
              </p>
            </div>

            <div>
              <p className="text-muted-foreground">Revenue</p>
              <p className="font-semibold text-blue-600">
                {formatCurrency(performanceData.revenue)}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Avg. Sal. Cycle</p>
              <p className="font-semibold text-green-400">
                {Math.ceil(Number(performanceData.avg_conversion_time_days))}{" "}
                days
              </p>
            </div>
          </div>

          {/* ✅ RATIO SECTION */}
          <div className="mt-3 p-3 rounded-lg bg-gray-50 border text-sm">
            <div className="grid grid-cols-3 text-center">
              <div>
                <p className="text-muted-foreground text-xs">L : C</p>
                <p
                  className={`${performanceColor(
                    performanceData["l:c"],
                    benchmarkData["l:c"],
                    performanceData.avg_performance["l:c"]
                  )} font-semibold`}
                >
                  {performanceData["l:c"]}%{" "}
                </p>
                <p>
                  {performanceLabel(
                    performanceData["l:c"],
                    benchmarkData["l:c"],
                    performanceData.avg_performance["l:c"]
                  )}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">C : S</p>
                <p
                  className={`${performanceColor(
                    performanceData["c:s"],
                    benchmarkData["c:s"],
                    performanceData.avg_performance["c:s"]
                  )} font-semibold`}
                >
                  {performanceData["c:s"]}%{" "}
                </p>
                <p>
                  {performanceLabel(
                    performanceData["l:c"],
                    benchmarkData["l:c"],
                    performanceData.avg_performance["l:c"]
                  )}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">L : S</p>
                <p
                  className={`${performanceColor(
                    performanceData["l:s"],
                    benchmarkData["l:s"],
                    performanceData.avg_performance["l:s"]
                  )} font-semibold`}
                >
                  {performanceData["l:s"]}%{" "}
                </p>
                <p>
                  {performanceLabel(
                    performanceData["l:c"],
                    benchmarkData["l:c"],
                    performanceData.avg_performance["l:c"]
                  )}{" "}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 border-t-2 mt-3 pt-4">
            <div className="flex flex-col justify-center items-center">
              <p className="text-sm">Hot</p>
              <p className="font-semibold text-green-600">
                {performanceData.lead_assigned_sales_status_count.hot}
              </p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <p className="text-sm">Warm</p>
              <p className="font-semibold text-green-600">
                {performanceData.lead_assigned_sales_status_count.warm}
              </p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <p className="text-sm">Cold</p>
              <p className="font-semibold text-green-600">
                {performanceData.lead_assigned_sales_status_count.cold}
              </p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <p className="text-sm">To Engage</p>
              <p className="font-semibold text-green-600">
                {performanceData.lead_assigned_sales_status_count.to_engage}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!openModal} onOpenChange={() => setOpenModal(undefined)}>
        <DialogContent className="min-w-[90vw] max-h-[90vh] overflow-scroll">
          <CardHeader>
            <CardTitle>
              {keyString(performanceData?.crm_user)} Daily Performance (
              {dayjs().format("MMM YYYY")})
            </CardTitle>
          </CardHeader>
          {openModal?.type == "daily" ? (
            <CounsellorDailyPerformance id={openModal?.id} />
          ) : (
            <CounsellorIndividualPerformance mentorId={openModal?.id} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
