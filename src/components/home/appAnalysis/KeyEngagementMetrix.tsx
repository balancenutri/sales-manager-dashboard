import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { keyString } from "@/lib/utils";
import { useGetKeyEngagementMatricsQuery } from "@/service/dashboard/api";
import {
  BookText,
  HeartHandshake,
  PhoneCall,
  ShoppingCart,
} from "lucide-react";
import type { KeyEngagement } from "@/lib/types";
import type { LucideIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

type EngagementIcon = {
  [K in keyof KeyEngagement]: LucideIcon;
};

export default function KeyEngagementMetrix() {
  const { data, isFetching } = useGetKeyEngagementMatricsQuery();

  const allIcons: EngagementIcon = {
    hs_taken: HeartHandshake,
    consultation_booked: PhoneCall,
    program_page_visits: BookText,
    checkout_page_visits: ShoppingCart,
  };

  console.log({ data, isFetching });

  const skeletonArray = Array(4).fill(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Key Engagement Metrics</CardTitle>
        <CardDescription>Important user actions within the app</CardDescription>
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
              const Icon = allIcons[key] || BookText;
              return (
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center space-x-3">
                    <Icon className="h-4 w-4 text-orange-500" />
                    <span className="font-medium">{keyString(key)}</span>
                  </div>
                  <div className="font-semibold text-lg">
                    {value.today_count} | {value.monthly_count}
                  </div>
                </div>
              );
            })}
      </CardContent>
    </Card>
  );
}
