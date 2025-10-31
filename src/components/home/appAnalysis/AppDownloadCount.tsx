import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { keyString } from "@/lib/utils";
import { useGetAppDownloadsCountQuery } from "@/service/dashboard/api";
import { useState } from "react";
import AppDownloadData from "./dataTables/AppDownloadData";
import { ArrowDown, ArrowUp } from "lucide-react";

type DeviceType = "" | "android" | "ios";

export default function AppDownloadCount() {
  const [selected, setSelected] = useState<DeviceType>("");
  const { data } = useGetAppDownloadsCountQuery({
    filter: selected == "" ? undefined : selected,
  });

  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const skeletonArray = Array(5).fill(null);

  const compareWithPrevious = (key: string, total: number, data: any) => {
    const compareMap: Record<string, string> = {
      last_24_hours_count: "last_24_to_48_hours_count",
      last_48_hours_count: "last_48_to_96_hours_count",
      last_72_hours_count: "last_72_to_144_hours_count",
      last_7_days_count: "last_7_to_14_days_count",
      this_month_count: "last_month_count",
    };

    const previousKey = compareMap[key];
    if (!previousKey || !data?.[previousKey]) return null;

    const prevValue = data[previousKey].lead + data[previousKey].oc;
    const trendUp = total > prevValue;

    return trendUp ? (
      <ArrowUp className="size-4 text-green-500 ml-1" />
    ) : (
      <ArrowDown className="size-4 text-red-500 ml-1" />
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center space-y-6">
        <h2 className="text-xl font-bold my-4">App Download Counts</h2>
        <Tabs defaultValue={selected} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger
              className="cursor-pointer"
              value=""
              onClick={() => setSelected("")}
            >
              All
            </TabsTrigger>
            <TabsTrigger
              className="cursor-pointer"
              value={"android"}
              onClick={() => setSelected("android")}
            >
              Android
            </TabsTrigger>
            <TabsTrigger
              className="cursor-pointer"
              value="ios"
              onClick={() => setSelected("ios")}
            >
              IOS
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Card className="">
        <div className="flex justify-between items-center px-4 -my-3">
          {!data?.data
            ? skeletonArray.map((_, index: number) => (
                <div
                  className="flex items-center justify-between mt-1 gap-2"
                  key={index}
                >
                  <Skeleton className="h-4 w-26 rounded-md" />
                  <Skeleton className="h-4 w-10 rounded-md" />
                </div>
              ))
            : Object.entries(data?.data).map(
                ([period, value]) => {
                  if (
                  [
                    "last_24_to_48_hours_count",
                    "last_48_to_96_hours_count",
                    "last_72_to_144_hours_count",
                    "last_7_to_14_days_count",
                    "last_month_count",
                  ].includes(period)
                )
                  return null;
                  const total = value.lead + value.oc;

                   return (
                    <div className="text-sm flex items-center gap-0">
                      <span className="mr-2 font-semibold">
                        {keyString(period?.replace("_count", " Installs"))} :
                      </span>
                      <span
                        className="font-bold cursor-pointer"
                        onClick={() =>
                          setSelectedTime(period?.replace("_hours_count", ""))
                        }
                      >
                        {total}
                      </span>
                      {compareWithPrevious(period, total, data?.data)}
                    </div>
                  )
                }
              )}
        </div>
      </Card>
      <Dialog open={!!selectedTime} onOpenChange={() => setSelectedTime(null)}>
        <DialogContent className="min-w-[90vw]">
          <CardHeader>
            <CardTitle>{keyString("App Download Data")}</CardTitle>
          </CardHeader>
          {selectedTime && (
            <AppDownloadData selected={selectedTime} device={selected} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
