import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { keyString } from "@/lib/utils";
import { useGetAppDownloadsCountQuery } from "@/service/dashboard/api";

export default function AppDownloadCount() {
  const { data, isFetching } = useGetAppDownloadsCountQuery();

  const skeletonArray = Array(5).fill(null);

  console.log(data?.data);
  return (
    <div>
      <h2 className="text-2xl font-bold my-4">App Download Counts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 overflow-x-auto pb-4">
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
                {/* Added min-w to ensure cards don't shrink too much */}
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
                    {/* Changed from Organic Conversions */}
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
      </div>
    </div>
  );
}
