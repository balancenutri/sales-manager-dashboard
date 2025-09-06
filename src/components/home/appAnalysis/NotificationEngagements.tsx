import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetNotificationEngagementQuery } from "@/service/dashboard/api";
import { useState } from "react";
import NotificationEngagement from "./leadPerformance/NotificationEngagement";
import TopNotifications from "./leadPerformance/TopNotifications";

export default function NotificationEngagments() {
  const [selected, setSelected] = useState("active");
  const { data: notificationData } = useGetNotificationEngagementQuery({
    filter: selected,
  });
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Notification Engagement
        </h2>
        <Tabs defaultValue={selected} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger
              className="cursor-pointer"
              value="all"
              onClick={() => setSelected("all")}
            >
              All Lead
            </TabsTrigger>
            <TabsTrigger
              className="cursor-pointer"
              value="active"
              onClick={() => setSelected("active")}
            >
              Active
            </TabsTrigger>
            <TabsTrigger
              className="cursor-pointer"
              value="oc"
              onClick={() => setSelected("oc")}
            >
              OC
            </TabsTrigger>
            <TabsTrigger
              className="cursor-pointer"
              value="lead"
              onClick={() => setSelected("lead")}
            >
              Lead
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {notificationData?.data && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <NotificationEngagement
            data={notificationData?.data?.total_notifications}
          />
          <div className="col-span-2">
            <TopNotifications
              data={notificationData?.data.top_notifications}
              title="Top Performing Notification"
            />
          </div>
          <div className="col-span-2">
            <TopNotifications
              data={notificationData?.data?.less_performing_notifications}
              title="Low Performing Notification"
            />
          </div>
        </div>
      )}
    </div>
  );
}
