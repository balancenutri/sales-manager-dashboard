import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

type WeeklyEngagementType = {
  week?: string;
  engagement?: number;
  notifications?: number;
  seen?: number;
};

export default function WeeklyEngagement({
  data,
}: {
  data: WeeklyEngagementType[];
}) {
  return (
    <Card className="lg:col-span-2 shadow-lg border-0 bg-white">
      <CardHeader>
        <div className="flex items-center space-x-3">
          {/* <Users className="h-6 w-6" /> */}
          <CardTitle className="text-md font-semibold">
            Weekly Engagement Trend
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            engagement: { label: "Engagement %", color: "#3b82f6" },
          }}
          className="h-[360px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 20, right: 20, left: 20, bottom: 10 }}
            >
              <XAxis
                dataKey="week"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#6b7280" }}
              />
              <YAxis
                domain={[0, 50]}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#6b7280" }}
                label={{
                  value: "Engagement %",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <ChartTooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white p-4 border rounded-lg shadow-lg">
                        <p className="font-semibold text-gray-900">{label}</p>
                        <p className="text-blue-600 font-medium">
                          Engagement: {payload[0].value}%
                        </p>
                        <p className="text-gray-600 text-sm">
                          Total: {data.notifications} notifications
                        </p>
                        <p className="text-gray-600 text-sm">
                          Seen: {data.seen} notifications
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="engagement"
                stroke="#3b82f6"
                fill="url(#colorGradient)"
                fillOpacity={0.6}
                strokeWidth={3}
              >
                <LabelList
                  dataKey="engagement"
                  position="top"
                  formatter={(value: number) => `${value}%`}
                  style={{
                    fontSize: 12,
                    fontWeight: "600",
                    fill: "#1f2937",
                  }}
                />
              </Area>
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
