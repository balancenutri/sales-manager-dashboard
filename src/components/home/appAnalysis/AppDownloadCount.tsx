import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { keyString } from "@/lib/utils";
import { useGetAppDownloadsCountQuery } from "@/service/dashboard/api";
import { useState } from "react";
import AppDownloadData from "./dataTables/AppDownloadData";

type DeviceType = "" | "android" | "ios";

export default function AppDownloadCount() {
  const [selected, setSelected] = useState<DeviceType>("");
  const { data } = useGetAppDownloadsCountQuery({
    filter: selected == "" ? undefined : selected,
  });

  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const skeletonArray = Array(5).fill(null);

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
            : Object.entries(data?.data).map(([period, data]) => (
                <div className="text-sm">
                  <span className="mr-2 font-semibold">
                    {keyString(period?.replace("_count", " Installs"))} :
                  </span>
                  <span
                    className="font-bold cursor-pointer" 
                    onClick={() => setSelectedTime(period?.replace("_hours_count", ""))}
                  >
                    {data.lead + data.oc}
                  </span>
                </div>
              ))}
        </div>
      </Card>
      <Dialog open={!!selectedTime} onOpenChange={() => setSelectedTime(null)}>
        <DialogContent className="min-w-[90vw]">
          <CardHeader>
            <CardTitle>{keyString("App Download Data")}</CardTitle>
          </CardHeader>
          {selectedTime && <AppDownloadData selected={selectedTime} device={selected} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}
