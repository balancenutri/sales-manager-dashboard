import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { useState } from "react";

type IconTypes = {
  [key in WebsitePerformanceKey]: LucideIcon;
};

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

  const allIcons: IconTypes = {
    page_view: Eye,
    bounce_rate: TrendingUp,
    total_engagement: Users,
    unique_engagement: Activity,
    leads_from_website: UserPlus,
    avg_session_duration: Activity,
  };

  const cleanseData = {
    page_view: "0 | 0",
    bounce_rate: "0 | 0",
    total_engagement: "0 | 0",
    unique_engagement: "0 | 0",
    leads_from_website: "0 | 0",
    avg_session_duration: "0 | 0",
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
            {Object.entries(
              selected == "cleanse" ? cleanseData : data.data
            ).map(([key, value], idx) => {
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
                  <div className="font-semibold text-lg">
                    {value?.replaceAll(".00", "")}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      ) : (
        <div className="grid grid-cols-3 gap-3 mx-6">{SkeletonArray}</div>
      )}
    </Card>
  );
}
