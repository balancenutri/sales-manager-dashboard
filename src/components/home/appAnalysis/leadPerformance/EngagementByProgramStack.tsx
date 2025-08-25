import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ProgramEngagement } from "@/lib/types";

export default function EngagementByProgramStack({
  data,
}: {
  data: ProgramEngagement[] | undefined;
}) {
  return (
    <Card className="shadow-lg border-0 bg-white">
      <CardHeader>
        <CardTitle className="text-md font-semibold">
          Engagement by Program Stack
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data?.map((stack, index) => (
            <div
              key={index}
              className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {stack.program_category}
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Engagement Rate</span>
                  <span className="text-xl font-bold text-indigo-600">
                    {stack.engagement_percentage}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">
                    Total Notifications
                  </span>
                  <span className="font-medium">
                    {stack.total_notifications}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">
                    Seen Notifications
                  </span>
                  <span className="font-medium text-indigo-600">
                    {stack.seen_notifications}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
