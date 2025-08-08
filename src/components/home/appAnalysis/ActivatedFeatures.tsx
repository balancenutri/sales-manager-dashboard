import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { keyString } from "@/lib/utils";
import { useGetActivatedFeaturesQuery } from "@/service/dashboard/api";
import { Gift, RefreshCw, Ticket, UserPlus } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type ActivatedIcons = {
  [key: string]: LucideIcon;
};
export default function ActivatedFeatures() {
  const allIcons: ActivatedIcons = {
    coupon_code_activated: Ticket,
    leads_with_active_guides: Gift,
    spin_to_win_activated: RefreshCw,
    leads_with_GO_pro: UserPlus,
  };
  const { data, isFetching } = useGetActivatedFeaturesQuery();

  const skeletonArray = Array(4).fill(null);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Activated Features</CardTitle>
        <CardDescription>User activations of key app features</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {isFetching || !data?.data ? (
          skeletonArray.map((_, index: number) => (
              <div
                key={index}
                className="flex items-center justify-between border-b pb-2"
              >
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-20" />
              </div>
            ))
        ) : (
          Object.entries(data?.data).map(([key, value]) => {
            const Icon = allIcons[key] || Ticket;
            return (
              <div className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center space-x-3">
                  <Icon className="h-4 w-4 text-purple-500" />
                  <span className="font-medium">{keyString(key)}</span>
                </div>
                <div className="font-semibold text-lg">{value}</div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
