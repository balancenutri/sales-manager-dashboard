import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetNotificationEngagementQuery } from "@/service/dashboard/api";
import { useState } from "react";
import NotificationEngagement from "./leadPerformance/NotificationEngagement";
import TopNotifications from "./leadPerformance/TopNotifications";

export default function NotificationEngagments() {
  const [selected, setSelected] = useState("active");
  const { data: notificationData, isFetching } =
    useGetNotificationEngagementQuery({
      filter: selected,
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
                value="all"
                onClick={() => setSelected("all")}
              >
                All
              </TabsTrigger>
              <TabsTrigger
                className="cursor-pointer"
                value="active"
                onClick={() => setSelected("active")}
              >
                Promotional
              </TabsTrigger>
              <TabsTrigger
                className="cursor-pointer"
                value="oc"
                onClick={() => setSelected("oc")}
              >
                Transaction
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Tabs defaultValue={selected} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger
                className="cursor-pointer"
                value="all"
                onClick={() => setSelected("all")}
              >
                All
              </TabsTrigger>
              <TabsTrigger
                className="cursor-pointer"
                value="active"
                onClick={() => setSelected("active")}
              >
                Today
              </TabsTrigger>
              <TabsTrigger
                className="cursor-pointer"
                value="oc"
                onClick={() => setSelected("oc")}
              >
                Yesterday
              </TabsTrigger>
              <TabsTrigger
                className="cursor-pointer"
                value="lead"
                onClick={() => setSelected("lead")}
              >
                Weekly
              </TabsTrigger>
              <TabsTrigger
                className="cursor-pointer"
                value="lead"
                onClick={() => setSelected("lead")}
              >
                Monthly
              </TabsTrigger>
            </TabsList>
          </Tabs>
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
