import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { keyString } from "@/lib/utils";
import { useGetAppUsageOverviewQuery } from "@/service/dashboard/api";
import { Smartphone, Users, XCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export default function AppUsageActivity() {
  const { data, isFetching } = useGetAppUsageOverviewQuery();

  const iconData: { [key: string]: LucideIcon } = {
    total_downloads: Smartphone,
    // lead_with_app: TrendingUp,
    lead_with_app: Users,
    leads_without_app: Users,
    conversion_rate: XCircle,
  };

  const skeletonArray = Array(4).fill(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle>App Usage Overview</CardTitle>
        <CardDescription>
          Key metrics related to app downloads and user base
        </CardDescription>
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
          : data.data.map((item) => {
              const Icon = iconData[item.type] || Smartphone;
              return (
                <div
                  key={item.type}
                  className="flex items-center justify-between border-b pb-2"
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="h-4 w-4 text-teal-500" />
                    <span className="font-medium">{keyString(item.type)}</span>
                  </div>
                  <div className="font-semibold text-lg">
                    {item.today_count} | {item.this_month_count}
                  </div>
                </div>
              );
            })}
      </CardContent>
    </Card>
  );
}
