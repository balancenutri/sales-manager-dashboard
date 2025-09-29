import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { keyString } from "@/lib/utils";
import { useGetAppDownloadsCountQuery } from "@/service/dashboard/api";
import { useState } from "react";

type DeviceType = "" | "android" | "ios";

export default function AppDownloadCount() {
  const [selected, setSelected] = useState<DeviceType>("");
  const { data } = useGetAppDownloadsCountQuery({
    filter: selected == "" ? undefined : selected,
  });

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
                    {keyString(period?.replace("_count", " Downloads"))} :
                  </span>
                  <span className="font-bold">{data.lead + data.oc}</span>
                </div>
              ))}
        </div>
      </Card>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 overflow-x-auto pb-4">
        {isFetching || !data?.data
          ? skeletonArray.map((_, index: number) => (
              <Card key={index} className="relative">
                <CardContent className="space-y-4 mt-4">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-16 rounded-md" />
                    <Skeleton className="h-4 w-10 rounded-md" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-16 rounded-md" />
                    <Skeleton className="h-4 w-10 rounded-md" />
                  </div>
                  <hr />
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-16 rounded-md" />
                    <Skeleton className="h-4 w-10 rounded-md" />
                  </div>
                </CardContent>
              </Card>
            ))
          : Object.entries(data?.data).map(([period, data]) => (
              <Card key={period} className="min-w-[200px]">
                {" "}
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium capitalize">
                    {keyString(period?.replace("_count", " Downloads"))}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Lead</span>
                    <span className="font-semibold text-base">{data.lead}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">OC</span>{" "}
                    <span className="font-semibold text-base">{data.oc}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t">
                    <span className="font-medium">Total</span>
                    <span className="font-semibold text-lg">
                      {data.lead + data.oc}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
      </div> */}
    </div>
  );
}
