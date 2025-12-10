import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { AssignedLeadPerformanceAll } from "@/lib/types";
import { useState } from "react";
import { formatCurrency, keyString } from "@/lib/utils";
import dayjs from "dayjs";
import CounsellorIndividualPerformance from "../overview/counsellorPerformance/CounsellorIndividualPerformance";
import { Button } from "@/components/ui/button";
import CounsellorDailyPerformance from "../overview/counsellorPerformance/CounsellorDailyPerformance";
import { CounsellorAverageTooltip } from "../common/CounsellorAverageTooltip";

export default function AllCounsellorCard({
  performanceData,
  benchmarkData,
  averageData,
  type,
}: {
  performanceData: AssignedLeadPerformanceAll;
  benchmarkData: {
    "l:c": number;
    "c:s": number;
    "l:s": number;
  };
  averageData: {
    "l:c": number;
    "c:s": number;
    "l:s": number;
  };
  type: boolean;
}) {
  const [openModal, setOpenModal] = useState<{
    id: number | undefined;
    type: string | null;
  }>();

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
            {type && <Button
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
            </Button>}
          </div>
        </CardHeader>

        <CardContent className="-mt-4">
          <div className="grid grid-cols-3 gap-3 text-sm">
            {type && <div>
              <p className="text-muted-foreground">Best Source</p>
              <p className="font-semibold">
                {performanceData.best_source_performance || "N/A"}
              </p>
            </div>}

            {type && <div>
              <p className="text-muted-foreground">Leads Assigned</p>
              <p className="font-semibold">{performanceData.leads_assigned}</p>
            </div>}

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
            {type && <div>
              <p className="text-muted-foreground">Avg. Sal. Cycle</p>
              <p className="font-semibold text-green-400">
                {Math.ceil(Number(performanceData.avg_conversion_time_days))}{" "}
                days
              </p>
            </div>}
            {!type && <div>
              <p className="text-muted-foreground">C:S</p>
              <p className="font-semibold text-green-400">
                {performanceData["c:s"]}
              </p>
            </div>}
          </div>

          {/* ✅ RATIO SECTION */}
          {type && <CounsellorAverageTooltip
            averageData={averageData}
            benchmarkData={benchmarkData}
            performanceData={performanceData}
          />}

          <div className={`grid ${type ? "grid-cols-4" : "grid-cols-3"} border-t-2 mt-3 pt-4`}>
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
            {type && <div className="flex flex-col justify-center items-center">
              <p className="text-sm">To Engage</p>
              <p className="font-semibold text-green-600">
                {performanceData.lead_assigned_sales_status_count.to_engage}
              </p>
            </div>}
          </div>
        </CardContent>
      </Card>

      {type && <Dialog open={!!openModal} onOpenChange={() => setOpenModal(undefined)}>
        <DialogContent className="min-w-[90vw] max-h-[90vh] overflow-scroll">
          <CardHeader>
            <CardTitle>
              {keyString(performanceData?.crm_user)} {openModal?.type == "daily" ? "Daily Performance" : "Activity Table"} (
              {dayjs().format("MMM YYYY")})
            </CardTitle>
          </CardHeader>
          {openModal?.type == "daily" ? (
            <CounsellorDailyPerformance id={openModal?.id} />
          ) : (
            <CounsellorIndividualPerformance mentorId={openModal?.id} />
          )}
        </DialogContent>
      </Dialog>}
    </>
  );
}
