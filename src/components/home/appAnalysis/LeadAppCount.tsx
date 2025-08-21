import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { keyString } from "@/lib/utils";
import { useGetAllLeadWithAppCountQuery } from "@/service/dashboard/api";
import { Skeleton } from "@/components/ui/skeleton";

export default function LeadAppCount() {
  const { data, isFetching } = useGetAllLeadWithAppCountQuery();

  console.log({ data, isFetching });

  const skeletonArray = Array(4).fill(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lead App Count</CardTitle>
        {/* <CardDescription>Important user actions within the app</CardDescription> */}
      </CardHeader>
      <CardContent className="space-y-3">
        {isFetching || !data?.data
          ? skeletonArray.map((_, index: number) => (
              <div
                key={index}
                className="flex items-center justify-between border-b pb-2"
              >
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-20" />
              </div>
            ))
          : Object.entries(data.data).map(([key, value]) => {
              return (
                <div
                  className="flex items-center justify-between border-b pb-2"
                  key={key}
                >
                  <div className="flex items-center space-x-3">
                    {/* <Icon className="h-4 w-4 text-orange-500" /> */}
                    <span className="font-medium">{keyString(key)}</span>
                  </div>
                  <div className="font-semibold text-lg">{value}</div>
                </div>
              );
            })}
      </CardContent>
    </Card>
  );
}
