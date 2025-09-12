import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ActiveAppCount, NotUpdatedVersions } from "@/lib/types";
import { keyString } from "@/lib/utils";
import PreviousVersionTooltip from "./PreviousVersionTooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Dispatch, SetStateAction } from "react";
import { Skeleton } from "@/components/ui/skeleton";

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
              console.log({ data });
              return (
                key !== "current_versions" && (
                  <div
                    className="flex items-center justify-between border-b pb-2"
                    key={key}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="font-medium">{keyString(key)}</span>
                    </div>
                    <div className="font-semibold text-lg">
                      {key === "not_updated_versions" ? (
                        <PreviousVersionTooltip
                          versions={value as NotUpdatedVersions}
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
    </Card>
  );
}
