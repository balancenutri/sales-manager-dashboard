import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import type { WebsitePerformanceKey } from "@/lib/types";
import { keyString } from "@/lib/utils";
import { useGetWebsitePerformanceQuery } from "@/service/dashboard/api";

import {
  // Activity,
  BarChart2,
  CheckCircle2,
  Clock,
  // Eye,
  Globe,
  LineChart,
  MousePointerClick,
  Target,
  TrendingDown,
  // TrendingUp,
  UserPlus,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";

type IconTypes = {
  [key: string]: LucideIcon;
};
// type IconTypes = {
//   [key in WebsitePerformanceKey]: LucideIcon;
// };

export default function WebsitePerformance() {
  const [selected, setSelected] = useState<"" | "bn" | "cleanse">("");
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

  // const allIcons: IconTypes = {
  //   page_view: Eye,
  //   bounce_rate: TrendingUp,
  //   total_engagement: Users,
  //   unique_engagement: Activity,
  //   leads_from_website: UserPlus,
  //   avg_session_duration: Activity,
  // };
const allIcons: IconTypes = {
  active_users: Users,
  new_users: UserPlus,
  avg_engagement_time: Clock,
  impressions: BarChart2,
  clicks: MousePointerClick,
  ctr: LineChart,
  position: Target,
  bounce_rate: TrendingDown,
  leads_from_website: Globe,
  leads_converted: CheckCircle2,
};


  const cleanseData = {
    active_users: "0 | 0",
    new_users: "0 | 0",
    avg_engagement_time: "0 | 0",
    impressions: "0 | 0",
    clicks: "0 | 0",
    ctr: "0 | 0",
    position: "0 | 0",
    bounce_rate: "0 | 0",
    leads_from_website: "0 | 0",
    leads_converted: "0 | 0",
  };
  const allData = {
    active_users: "153 | 217",
    new_users: "98 | 134",
    avg_engagement_time: "45 | 67",
    impressions: "1230 | 1423",
    clicks: "342 | 387",
    ctr: "2.3 | 2.6",
    position: "4.1 | 3.9",
    bounce_rate: "56.2 | 53.7",
    leads_from_website: "23 | 29",
    leads_converted: "8 | 11",
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <div>
            <CardTitle>Website Performance</CardTitle>
            <CardDescription className="mt-1">
              Traffic, engagement, and leads from the website
            </CardDescription>
          </div>
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
                value={"bn"}
                onClick={() => setSelected("bn")}
              >
                BN
              </TabsTrigger>
              <TabsTrigger
                className="cursor-pointer"
                value="cleanse"
                onClick={() => setSelected("cleanse")}
              >
                Cleanse
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      {data?.data ? (
        <CardContent className="space-y-3">
          <div className="grid grid-cols-3 gap-3">
            {Object.entries(selected == "cleanse" ? cleanseData : allData).map(
              ([key, value], idx) => {
                const Icon = allIcons[key];
                return (
                  <div
                    className="flex justify-between py-3 px-4 bg-muted rounded-lg"
                    key={idx}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="h-4 w-4 text-purple-500" />
                      <span className="font-medium">{keyString(key)}</span>
                    </div>
                    <div className="font-semibold text-lg">
                      {value?.replaceAll(".00", "")}
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </CardContent>
      ) : (
        <div className="grid grid-cols-3 gap-3 mx-6">{SkeletonArray}</div>
      )}
    </Card>
  );
}
