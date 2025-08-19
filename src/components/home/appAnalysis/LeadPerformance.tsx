// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
// import { useGetClientPerformanceQuery } from "@/service/dashboard/api";
// // import { useGetEngagementMetricsQuery } from "@/service/engagement/api"
// import { TrendingDown, TrendingUp } from "lucide-react";
// import {
//   Area,
//   AreaChart,
//   Cell,
//   Pie,
//   PieChart,
//   ResponsiveContainer,
//   XAxis,
//   YAxis,
//   LabelList,
// } from "recharts";

// export default function EngagementDashboard() {
//   const { data: engagementData, isLoading } = useGetClientPerformanceQuery({
//     time_range: "2025-08-01,2025-08-31",
//     user_status: ["Lead"],
//   });

//   if (isLoading) {
//     return (
//       <div className="space-y-6">
//         <div className="animate-pulse">
//           <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
//           <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//             {[1, 2, 3, 4].map((i) => (
//               <div key={i} className="h-80 bg-gray-200 rounded"></div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const metrics = engagementData?.data;
//   const notificationData = metrics?.notificationSeenInApp;

//   // Transform weekly engagement data
//   const weeklyEngagementData =
//     metrics?.weeklyEngagementTrend?.map((item) => ({
//       week: `Week ${item.week_number}`,
//       engagement: Number.parseFloat(item.engagement_percentage),
//       notifications: item.total_notifications,
//       seen: Number.parseInt(item.seen_notifications),
//     })) || [];

//   // Transform app version data for pie chart
//   const appVersionData = [
//     {
//       name: "App Updated",
//       value: metrics?.appVersionStats?.updated || 0,
//       percentage: Number.parseFloat(
//         metrics?.appVersionStats?.updatedPercentage || "0"
//       ),
//       fill: "#06b6d4", // cyan-500
//     },
//     {
//       name: "App Not Updated",
//       value: metrics?.appVersionStats?.notUpdated || 0,
//       percentage: Number.parseFloat(
//         metrics?.appVersionStats?.notUpdatedPercentage || "0"
//       ),
//       fill: "#fb923c", // orange-400
//     },
//   ];

//   // Custom label component for pie chart
//   const renderCustomizedLabel = ({
//     cx,
//     cy,
//     midAngle,
//     innerRadius,
//     outerRadius,
//     value,
//     percentage,
//   }) => {
//     const RADIAN = Math.PI / 180;
//     const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//     const x = cx + radius * Math.cos(-midAngle * RADIAN);
//     const y = cy + radius * Math.sin(-midAngle * RADIAN);

//     return (
//       <text
//         x={x}
//         y={y}
//         fill="white"
//         textAnchor={x > cx ? "start" : "end"}
//         dominantBaseline="central"
//         fontSize="12"
//         fontWeight="bold"
//       >
//         {`${value}`}
//       </text>
//     );
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <div>
//           <h2 className="text-2xl font-bold">Client Engagement Metrics</h2>
//           <p className="text-muted-foreground">
//             Monitor user engagement and app performance
//           </p>
//         </div>
//       </div>

//       <div className="flex flex-wrap gap-6 justify-between">
//         {/* Notification Seen in App */}
//         <Card className="min-w-96">
//           <CardHeader className="pb-3">
//             <CardTitle className="text-base font-medium">
//               Notification Seen in App
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="pt-0">
//             <div className="text-center space-y-4">
//               <div className="text-4xl font-bold text-teal-600">
//                 {notificationData?.seenPercentage}
//               </div>
//               <div className="space-y-3 text-sm">
//                 <div className="flex justify-between border-b-2 pb-2 px-2">
//                   <span className="font-normal text-sm">
//                     Total Notifications:
//                   </span>
//                   <span className="font-medium">
//                     {notificationData?.totalNotifications}
//                   </span>
//                 </div>
//                 <div className="flex justify-between border-b-2 pb-2 px-2">
//                   <span className="font-normal text-sm">
//                     Seen Notifications:
//                   </span>
//                   <span className="font-medium">
//                     {notificationData?.seenNotifications}
//                   </span>
//                 </div>
//                 <div className="flex justify-between items-center px-2">
//                   <span className="text-muted-foreground">Trend:</span>
//                   <div className="flex items-center">
//                     {Number.parseFloat(notificationData?.trend || "0") >= 0 ? (
//                       <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
//                     ) : (
//                       <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
//                     )}
//                     <span
//                       className={`text-sm font-medium ${
//                         Number.parseFloat(notificationData?.trend || "0") >= 0
//                           ? "text-green-500"
//                           : "text-red-500"
//                       }`}
//                     >
//                       {notificationData?.trend}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Weekly Engagement Trend */}
//         <Card className="lg:col-span-2">
//           <CardHeader className="pb-3">
//             <CardTitle className="text-base font-medium">
//               Weekly Engagement Trend
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="pt-0">
//             <ChartContainer
//               config={{
//                 engagement: {
//                   label: "Engagement %",
//                   color: "#06b6d4",
//                 },
//               }}
//               className="h-[280px]"
//             >
//               <ResponsiveContainer width="100%" height="100%">
//                 <AreaChart
//                   data={weeklyEngagementData}
//                   margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
//                 >
//                   <XAxis
//                     dataKey="week"
//                     axisLine={false}
//                     tickLine={false}
//                     tick={{ fontSize: 12 }}
//                   />
//                   <YAxis
//                     domain={[0, 100]}
//                     axisLine={false}
//                     tickLine={false}
//                     tick={{ fontSize: 12 }}
//                   />
//                   <ChartTooltip
//                     content={({ active, payload, label }) => {
//                       if (active && payload && payload.length) {
//                         return (
//                           <div className="bg-white p-2 border rounded shadow-lg">
//                             <p className="text-sm font-medium">{label}</p>
//                             <p className="text-sm text-cyan-600">{`${payload[0].value}%`}</p>
//                           </div>
//                         );
//                       }
//                       return null;
//                     }}
//                   />
//                   <Area
//                     type="monotone"
//                     dataKey="engagement"
//                     stroke="#06b6d4"
//                     fill="#06b6d4"
//                     fillOpacity={0.3}
//                     strokeWidth={3}
//                   >
//                     <LabelList
//                       dataKey="engagement"
//                       position="top"
//                       formatter={(value: any) => `${value}%`}
//                       style={{
//                         fontSize: "12px",
//                         fontWeight: "bold",
//                         fill: "#06b6d4",
//                       }}
//                     />
//                   </Area>
//                 </AreaChart>
//               </ResponsiveContainer>
//             </ChartContainer>
//           </CardContent>
//         </Card>

//         {/* App Update Status */}
//         <Card className="lg:col-span-1">
//           <CardHeader className="pb-3">
//             <CardTitle className="text-base font-medium">
//               App Update Status
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="pt-0">
//             <ChartContainer
//               config={{
//                 updated: {
//                   label: "App Updated",
//                   color: "#06b6d4",
//                 },
//                 notUpdated: {
//                   label: "App Not Updated",
//                   color: "#fb923c",
//                 },
//               }}
//               className="h-[200px]"
//             >
//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie
//                     data={appVersionData}
//                     cx="50%"
//                     cy="50%"
//                     outerRadius={80}
//                     dataKey="value"
//                     labelLine={false}
//                     label={renderCustomizedLabel}
//                   >
//                     {appVersionData.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={entry.fill} />
//                     ))}
//                   </Pie>
//                   <ChartTooltip
//                     content={({ active, payload }) => {
//                       if (active && payload && payload.length) {
//                         const data = payload[0].payload;
//                         return (
//                           <div className="bg-white p-2 border rounded shadow-lg">
//                             <p className="text-sm font-medium">{data.name}</p>
//                             <p className="text-sm">{`${data.value} (${data.percentage}%)`}</p>
//                           </div>
//                         );
//                       }
//                       return null;
//                     }}
//                   />
//                 </PieChart>
//               </ResponsiveContainer>
//             </ChartContainer>
//             <div className="mt-4 space-y-2">
//               {appVersionData.map((item) => (
//                 <div
//                   key={item.name}
//                   className="flex items-center justify-between text-sm"
//                 >
//                   <div className="flex items-center">
//                     <div
//                       className="w-3 h-3 rounded-full mr-2"
//                       style={{ backgroundColor: item.fill }}
//                     />
//                     <span className="text-muted-foreground">{item.name}</span>
//                   </div>
//                   <span className="font-medium">
//                     {item.value} ({item.percentage}%)
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//       <div className="grid lg:grid-cols-4 gap-6">
//         {/* Top Notifications */}
//         <Card className="lg:col-span-2">
//           <CardHeader>
//             <CardTitle>Top Performing Notifications</CardTitle>
//             <CardDescription>Most viewed notification types</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {metrics?.topNotifications?.length == 0 ? (
//                 <p className="text-sm">Notification not found</p>
//               ) : (
//                 metrics?.topNotifications?.map((notification, index) => (
//                   <div
//                     key={index}
//                     className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
//                   >
//                     <div className="flex-1">
//                       <p className="text-sm font-medium truncate">
//                         {notification.title}
//                       </p>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <span className="text-sm text-muted-foreground">
//                         Views:
//                       </span>
//                       <span className="text-sm font-bold">
//                         {notification.seen_count}
//                       </span>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }



import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { useGetClientPerformanceQuery } from "@/service/dashboard/api";
import { TrendingDown, TrendingUp } from "lucide-react";
import {
  Area,
  AreaChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  LabelList,
} from "recharts";

export default function EngagementDashboard() {
  const { data: engagementData, isLoading } = useGetClientPerformanceQuery({
    time_range: "2025-08-01,2025-08-31",
    user_status: ["Lead"],
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-80 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const metrics = engagementData?.data;
  const notificationData = metrics?.notificationSeenInApp;

  const weeklyEngagementData =
    metrics?.weeklyEngagementTrend?.map((item) => ({
      week: `Week ${item.week_number}`,
      engagement: Number.parseFloat(item.engagement_percentage),
      notifications: item.total_notifications,
      seen: Number.parseInt(item.seen_notifications, 10),
    })) || [];

  const appVersionData = [
    {
      name: "App Updated",
      value: metrics?.appVersionStats?.updated || 0,
      percentage: Number.parseFloat(
        metrics?.appVersionStats?.updatedPercentage || "0"
      ),
      fill: "#06b6d4",
    },
    {
      name: "App Not Updated",
      value: metrics?.appVersionStats?.notUpdated || 0,
      percentage: Number.parseFloat(
        metrics?.appVersionStats?.notUpdatedPercentage || "0"
      ),
      fill: "#fb923c",
    },
  ];

  // Pie chart label with types
  const renderCustomizedLabel = (props: any) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, value } = props;
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {value}
      </text>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Client Engagement Metrics</h2>
          <p className="text-muted-foreground">
            Monitor user engagement and app performance
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-6 justify-between">
        {/* Notification Seen in App */}
        <Card className="min-w-96">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium">
              Notification Seen in App
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-center space-y-4">
              <div className="text-4xl font-bold text-teal-600">
                {notificationData?.seenPercentage}
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b-2 pb-2 px-2">
                  <span className="font-normal text-sm">
                    Total Notifications:
                  </span>
                  <span className="font-medium">
                    {notificationData?.totalNotifications}
                  </span>
                </div>
                <div className="flex justify-between border-b-2 pb-2 px-2">
                  <span className="font-normal text-sm">
                    Seen Notifications:
                  </span>
                  <span className="font-medium">
                    {notificationData?.seenNotifications}
                  </span>
                </div>
                <div className="flex justify-between items-center px-2">
                  <span className="text-muted-foreground">Trend:</span>
                  <div className="flex items-center">
                    {Number.parseFloat(notificationData?.trend || "0") >= 0 ? (
                      <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                    )}
                    <span
                      className={`text-sm font-medium ${
                        Number.parseFloat(notificationData?.trend || "0") >= 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {notificationData?.trend}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Engagement Trend */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium">
              Weekly Engagement Trend
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ChartContainer
              config={{
                engagement: { label: "Engagement %", color: "#06b6d4" },
              }}
              className="h-[280px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={weeklyEngagementData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <XAxis
                    dataKey="week"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis
                    domain={[0, 100]}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                  />
                  <ChartTooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white p-2 border rounded shadow-lg">
                            <p className="text-sm font-medium">{label}</p>
                            <p className="text-sm text-cyan-600">
                              {`${payload[0].value}%`}
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
                    stroke="#06b6d4"
                    fill="#06b6d4"
                    fillOpacity={0.3}
                    strokeWidth={3}
                  >
                    <LabelList
                      dataKey="engagement"
                      position="top"
                      formatter={(value: number) => `${value}%`}
                      style={{
                        fontSize: 12,
                        fontWeight: "bold",
                        fill: "#06b6d4",
                      }}
                    />
                  </Area>
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* App Update Status */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium">App Update Status</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={appVersionData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  label={renderCustomizedLabel}
                  paddingAngle={5}
                >
                  {appVersionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Notifications */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium">Top Notifications</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {metrics?.topNotifications?.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center">
                No Top Notifications Found
              </p>
            ) : (
              <ul className="space-y-2">
                {metrics?.topNotifications?.map((notification, index) => (
                  <li
                    key={index}
                    className="flex justify-between px-2 border-b pb-1"
                  >
                    <span className="text-sm">{notification.title}</span>
                    <span className="font-medium">{notification.seen_count}</span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
