import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ActiveAppCount } from "@/lib/types";
import { keyString } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, type Dispatch, type SetStateAction } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import AppActivityTooltip from "./AppActivityTooltip";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogContent } from "@/components/ui/dialog";
import AppAnalysisData from "../dataTables/AppAnalysisData";

type PeriodType = "overall" | "last_24_hours" | "last_48_hours" | "mtd";

export default function AppCountCard({
  data,
  title,
  period,
  setPeriod,
  fetching,
}: {
  data?: ActiveAppCount;
  title: string;
  period?: string;
  setPeriod?: Dispatch<SetStateAction<PeriodType>>;
  fetching: boolean;
}) {
  const SkeletonArray = Array(5)
    .fill(null)
    .map((_, index: number) => (
      <div
        key={index}
        className="flex items-center justify-between border-b pb-2"
      >
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-5 w-20" />
      </div>
    ));

  const [filter, setFilter] = useState<string | null>(null);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{title}</CardTitle>
          {period && setPeriod && (
            <Select
              value={period}
              onValueChange={(val: PeriodType) => setPeriod(val)}
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last_24_hours">Last 24 Hours</SelectItem>
                <SelectItem value="last_48_hours">Last 48 Hours</SelectItem>
                <SelectItem value="mtd">This Month</SelectItem>
                <SelectItem value="overall">OverAll</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {data && !fetching
          ? Object.entries(data).map(([key, value]) => {
              return (
                ![
                  "current_versions",
                  "with_app_active_user",
                  "with_app_inactive_user",
                  "on_new_app_not_updated",
                  "on_old_app_not_updated",
                ].includes(key) && (
                  <div
                    className="flex items-center justify-between border-b pb-2"
                    key={key} onClick={() => setFilter(key)}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="font-medium">{keyString(key)}</span>
                    </div>
                    <div className="font-semibold text-lg">
                      {key === "with_app" ? (
                        <AppActivityTooltip
                          withApp={value as number}
                          withActivity={data?.with_app_active_user as number}
                          withoutActivity={
                            data?.with_app_inactive_user as number
                          }
                          type="activity"
                        />
                      ) : key === "not_updated" ? (
                        <AppActivityTooltip
                          withApp={value as number}
                          withActivity={data?.on_new_app_not_updated as number}
                          withoutActivity={
                            data?.on_old_app_not_updated as number
                          }
                          type="not_updated"
                        />
                      ) : (
                        (value as number)
                      )}
                    </div>
                  </div>
                )
              );
            })
          : SkeletonArray}
      </CardContent>

      <Dialog open={!!filter} onOpenChange={() => setFilter(null)}>
        <DialogContent className="min-w-[90vw]">
          <CardHeader>
            <CardTitle>{keyString("App Download Data")}</CardTitle>
          </CardHeader>
          {filter && (
            <AppAnalysisData selected={filter} type={title?.split(" ")[0]?.toLowerCase()} period={period} />
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
}
