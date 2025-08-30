import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ClientPerformanceData } from "@/lib/types";

export default function TopNotifications({
  data, title
}: {
  data: ClientPerformanceData | undefined;
  title: string;
}) {
  return (
    <Card className="shadow-lg border-0 bg-white">
      <CardHeader>
        <div className="flex items-center space-x-3">
          {/* <Bell className="h-6 w-6" /> */}
          <CardTitle className="text-md font-semibold">
            {title}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {data?.topNotifications?.length === 0 ? (
          <div className="text-center py-8">
            {/* <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" /> */}
            <p className="text-gray-500">No notifications data available</p>
          </div>
        ) : (
          <div className="space-y-4">
            {data?.topNotifications?.map((notification, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-purple-600">
                      {index + 1}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-900 line-clamp-2">
                    {notification.title}
                  </span>
                </div>
                <div className="flex-shrink-0 text-right">
                  <div className="text-lg font-bold text-purple-600">
                    {title === "Top Performing Notification" ? "34.36%" : "6.75%"}
                  </div>
                  <div className="text-xs text-gray-500">{"open"}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
