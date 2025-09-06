import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { WebsitePerformanceKey } from "@/lib/types";
import { keyString } from "@/lib/utils";
import { useGetWebsitePerformanceQuery } from "@/service/dashboard/api";

import {
  Activity,
  Eye,
  TrendingUp,
  UserPlus,
  Users,
  type LucideIcon,
} from "lucide-react";

type IconTypes = {
  [key in WebsitePerformanceKey]: LucideIcon;
};

export default function WebsitePerformance() {
  const { data } = useGetWebsitePerformanceQuery();

  const SkeletonArray = Array(9)
    .fill(null)
    .map((_, index: number) => (
      <div
        className="flex justify-between py-3 px-4 bg-muted rounded-lg"
        key={index}
      >
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-5 w-20" />
      </div>
    ));

  const allIcons: IconTypes = {
    page_view: Eye,
    bounce_rate: TrendingUp,
    total_engagement: Users,
    unique_engagement: Activity,
    leads_from_website: UserPlus,
    avg_session_duration: Activity,
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Website Performance</CardTitle>
        <CardDescription>
          Traffic, engagement, and leads from the website
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {data?.data ? (
          <div className="grid grid-cols-3 gap-3">
            {Object.entries(data.data).map(([key, value], idx) => {
              const Icon = allIcons[key as WebsitePerformanceKey];
              return (
                <div
                  className="flex justify-between py-3 px-4 bg-muted rounded-lg"
                  key={idx}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="h-4 w-4 text-purple-500" />
                    <span className="font-medium">{keyString(key)}</span>
                  </div>
                  <div className="font-semibold text-lg">{value}</div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3 mx-6">{SkeletonArray}</div>
        )}
      </CardContent>
    </Card>
  );
}
