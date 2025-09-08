import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { NotificationEngagementData } from "@/lib/types";
import { TrendingDown, TrendingUp } from "lucide-react";

export default function NotificationEngagement({
  data,
  fetching,
}: {
  data: NotificationEngagementData["total_notifications"] | undefined;
  fetching: boolean;
}) {
  return (
    <Card className="shadow-lg border-0 bg-white">
      <CardHeader>
        <div className="flex items-center space-x-3">
          {/* <Bell className="h-6 w-6" /> */}
          <CardTitle className="text-md font-semibold">
            Notification Engagement
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <div className="text-3xl font-bold text-cyan-600">
              {fetching ? (
                <Skeleton className="h-5 w-16" />
              ) : (
                data?.total_seen &&
                data.total_sent &&
                Number((data?.total_seen * 100) / data?.total_sent).toFixed(2) || 0 + "%"
              )}
              
            </div>
            <p className="text-sm text-gray-500">Overall engagement rate</p>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">
                Total Sent
              </span>
              <span className="text-base font-bold text-gray-900">
                {data?.total_sent}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">
                Total Seen
              </span>
              <span className="text-base font-bold text-cyan-600">
                {data?.total_seen}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">
                Open Trend
              </span>
              <div className="flex items-center space-x-2">
                {Number.parseFloat(data?.open_trend || "0") >= 0 ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
                <span
                  className={`text-sm font-bold ${
                    Number.parseFloat(data?.open_trend || "0") >= 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {data?.open_trend}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
