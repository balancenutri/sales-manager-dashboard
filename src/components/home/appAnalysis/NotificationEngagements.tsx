import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetNotificationEngagementQuery } from "@/service/dashboard/api";
import { useState } from "react";
import NotificationEngagement from "./leadPerformance/NotificationEngagement";
import TopNotifications from "./leadPerformance/TopNotifications";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type PeriodType =  "today" | "this_week" | "yesterday" | "this_month";

export default function NotificationEngagments() {
  const [selected, setSelected] = useState<"" | "p" | "t">("");
  const [period, setPeriod] = useState<PeriodType>("today");
  const { data: notificationData, isFetching } =
    useGetNotificationEngagementQuery({
      type: selected,
      period,
    });
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">
          Notification Engagement
        </h2>
        <div className="flex gap-3">
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
                value="p"
                onClick={() => setSelected("p")}
              >
                Promotional
              </TabsTrigger>
              <TabsTrigger
                className="cursor-pointer"
                value="t"
                onClick={() => setSelected("t")}
              >
                Transaction
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Select
            value={period}
            onValueChange={(val: PeriodType) => setPeriod(val)}
          >
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="yesterday">Yesterday</SelectItem>
              <SelectItem value="this_week">This Week</SelectItem>
              <SelectItem value="this_month">This Month</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <NotificationEngagement
            data={notificationData?.data?.total_notifications}
            fetching={isFetching}
          />
          <div className="col-span-2">
            <TopNotifications
              data={notificationData?.data.top_notifications}
              title="Top Performing Notification"
              fetching={isFetching}
            />
          </div>
          <div className="col-span-2">
            <TopNotifications
              data={notificationData?.data?.less_performing_notifications}
              title="Low Performing Notification"
              fetching={isFetching}
            />
          </div>
        </div>
      }
    </div>
  );
}
