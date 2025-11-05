import { useGetNotificationEngagementSummaryQuery } from "@/service/dashboard/api";
import type {
  NotificationEngagementSummaryData,
  NotificationDayData,
} from "@/lib/types";

const AppNotificationMarquee = () => {
  const { data, isFetching } = useGetNotificationEngagementSummaryQuery();

  if (isFetching || !data?.data) return null;

  const { today, yesterday } = data.data as NotificationEngagementSummaryData;

  const transformData = (
    dayKey: "today" | "yesterday",
    dayData: NotificationDayData
  ) => {
    return Object.entries(dayData).map(([category, values]) => ({
      type: `${
        dayKey.charAt(0).toUpperCase() + dayKey.slice(1)
      } ${category} Notification`,
      sent: values.total_sent,
      rate: parseFloat(values.open_trend.replace("%", "")),
    }));
  };

  const notifications = [
    ...transformData("yesterday", yesterday),
    ...transformData("today", today),
  ];

  return (
    <div className="relative bg-white border-2 rounded-lg py-2 overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee hover:[animation-play-state:paused]">
        {notifications.map((item, i) => (
          <span key={i} className="mx-8 inline-block text-sm font-medium">
            {item.type}: {item.sent.toLocaleString()} ({item.rate}%)
          </span>
        ))}
        {notifications.map((item, i) => (
          <span key={i} className="mx-8 inline-block text-sm font-medium">
            {item.type}: {item.sent.toLocaleString()} ({item.rate}%)
          </span>
        ))}
      </div>
    </div>
  );
};

export default AppNotificationMarquee;
