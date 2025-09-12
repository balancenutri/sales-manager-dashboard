import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCampaignOverviewQuery } from "@/service/dashboard/api";
import { Activity, Eye, TrendingUp, UserPlus, Users } from "lucide-react";

export default function CampaignDetails() {
  const { data, isFetching } = useGetCampaignOverviewQuery();

  console.log({ data });

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
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Campaign Details</CardTitle>
          <CardDescription>Campaign Overview</CardDescription>
        </CardHeader>
        {data?.data && !isFetching ? (
          <CardContent>
            <div className="grid grid-cols-3 gap-3">
              <div className="flex justify-between py-3 px-4 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  <Eye className="h-4 w-4 text-purple-500" />
                  <span className="font-medium">No. of Champaign (Active)</span>
                </div>
                <div className="font-semibold text-lg">
                  {data.data[0].active_count}
                </div>
              </div>
              <div className="flex justify-between py-3 px-4 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  <Users className="h-4 w-4 text-purple-500" />
                  <span className="font-medium">Ad Spend</span>
                </div>
                <div className="font-semibold text-lg">
                  {data.data[0].total_ad_spend}
                </div>
              </div>
              <div className="flex justify-between py-3 px-4 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  <Activity className="h-4 w-4 text-orange-500" />
                  <span className="font-medium">Total Impressions</span>
                </div>
                <div className="font-semibold text-lg">
                  {data.data[0].total_impressions}
                </div>
              </div>
              <div className="flex justify-between py-3 px-4 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="font-medium">Total Reach</span>
                </div>
                <div className="font-semibold text-lg">
                  {data.data[0].total_reach}
                </div>
              </div>
              <div className="flex justify-between py-3 px-4 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="font-medium">Total CTR</span>
                </div>
                <div className="font-semibold text-lg">
                  {data.data[0].total_ctr}%
                </div>
              </div>
              <div className="flex justify-between py-3 px-4 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="font-medium">Total CAC</span>
                </div>
                <div className="font-semibold text-lg">
                  {data.data[0].total_cac}
                </div>
              </div>
              <div className="flex justify-between py-3 px-4 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  <Activity className="h-4 w-4 text-orange-500" />
                  <span className="font-medium">Lead Generated</span>
                </div>
                <div className="font-semibold text-lg">
                  {data.data[0].leads_generated}
                </div>
              </div>
              <div className="flex justify-between py-3 px-4 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  <UserPlus className="h-4 w-4 text-teal-500" />
                  <span className="font-medium">Revenue Generated</span>
                </div>
                <div className="font-semibold text-lg">
                  {data.data[0].revenue_generated}
                </div>
              </div>
            </div>
          </CardContent>
        ) : (
          <div className="grid grid-cols-3 gap-3 mx-6">{SkeletonArray}</div>
        )}
      </Card>
    </div>
  );
}
