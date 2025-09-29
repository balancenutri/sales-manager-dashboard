import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ClientPerformanceData } from "@/lib/types";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";

export default function AppUpdateStatus({
  data,
}: {
  data: ClientPerformanceData | undefined;
}) {
  const appVersionData = [
    {
      name: "Updated",
      value: data?.appVersionStats?.updated || 0,
      percentage: Number.parseFloat(
        data?.appVersionStats?.updatedPercentage || "0"
      ),
      fill: "#10b981",
    },
    {
      name: "Not Updated",
      value: data?.appVersionStats?.notUpdated || 0,
      percentage: Number.parseFloat(
        data?.appVersionStats?.notUpdatedPercentage || "0"
      ),
      fill: "#f59e0b",
    },
  ];

  const renderCustomizedLabel = (props: any) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, percentage } = props;
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        // textAnchor={x > cx ? "end" : "end"}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={14}
        fontWeight="600"
        className="px-2"
      >
        {`${percentage.toFixed(1)}%`}
      </text>
    );
  };
  return (
    <Card className="shadow-lg border-0 bg-white">
      <CardHeader className="pb-2 ">
        <div className="flex items-center space-x-3">
          {/* <Smartphone className="h-6 w-6" /> */}
          <CardTitle className="text-md font-semibold">
            App Update Status
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="">
        <div className="flex flex-col items-center space-y-6">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={appVersionData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                label={renderCustomizedLabel}
                paddingAngle={1}
              >
                {appVersionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value, entry) => (
                  <span className="text-sm font-medium text-gray-700">
                    {value}: {entry?.payload?.value} users
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-xl font-bold text-green-600">
                {data?.appVersionStats?.updatedPercentage}%
              </div>
              <div className="text-sm text-green-700 font-medium">Updated</div>
            </div>
            <div className="text-center p-3 bg-amber-50 rounded-lg">
              <div className="text-xl font-bold text-amber-600">
                {data?.appVersionStats?.notUpdatedPercentage}%
              </div>
              <div className="text-sm text-amber-700 font-medium">
                Not Updated
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
