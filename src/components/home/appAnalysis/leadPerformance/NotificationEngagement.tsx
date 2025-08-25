import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { NotificationSeenInApp } from "@/lib/types";
import { TrendingDown, TrendingUp } from "lucide-react";

export default function NotificationEngagement({
  data,
}: {
  data: NotificationSeenInApp | undefined;
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
            <div className="text-5xl font-bold text-cyan-600">
              {data?.seenPercentage}%
            </div>
            <p className="text-sm text-gray-500">Overall engagement rate</p>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">
                Total Sent
              </span>
              <span className="text-lg font-bold text-gray-900">
                {data?.totalNotifications?.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">
                Total Seen
              </span>
              <span className="text-lg font-bold text-cyan-600">
                {data?.seenNotifications?.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">Trend</span>
              <div className="flex items-center space-x-2">
                {Number.parseFloat(data?.trend || "0") >= 0 ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
                <span
                  className={`text-sm font-bold ${
                    Number.parseFloat(data?.trend || "0") >= 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {data?.trend}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
