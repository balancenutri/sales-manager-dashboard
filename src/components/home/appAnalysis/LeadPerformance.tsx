// import { selectPeriod } from "@/features/period/periodSlice";
// import { useGetClientPerformanceQuery } from "@/service/dashboard/api";
// import { useSelector } from "react-redux";
// import dayjs from "dayjs";
// import isoWeek from "dayjs/plugin/isoWeek";
// // import NotificationEngagement from "./leadPerformance/NotificationEngagement";
// // import WeeklyEngagement from "./leadPerformance/WeeklyEngagement";
// // import AppUpdateStatus from "./leadPerformance/AppUpdateStatus";
// // import TopNotifications from "./leadPerformance/TopNotifications";
// // import EngagementByProgramStack from "./leadPerformance/EngagementByProgramStack";
// import { useState } from "react";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// dayjs.extend(isoWeek);

// export default function LeadPerformance() {
//   const [selected, setSelected] = useState("active");
//   const getDateRange = (
//     filter: "today" | "this_week" | "mtd" | "this_quarter"
//   ): string => {
//     const today = dayjs();

//     if (filter === "today") {
//       const dateStr = today.format("YYYY-MM-DD");
//       return `${dateStr}, ${dateStr}`;
//     }

//     if (filter === "this_week") {
//       const startOfWeek = today.startOf("isoWeek").format("YYYY-MM-DD");
//       const endOfWeek = today.endOf("isoWeek").format("YYYY-MM-DD");
//       return `${startOfWeek}, ${endOfWeek}`;
//     }

//     if (filter === "mtd") {
//       const startOfMonth = today.startOf("month").format("YYYY-MM-DD");
//       const endOfMonth = today.endOf("month").format("YYYY-MM-DD");
//       return `${startOfMonth}, ${endOfMonth}`;
//     }

//     if (filter === "this_quarter") {
//       const threeMonthsAgo = today.subtract(2, "month").startOf("month");
//       const endOfCurrentMonth = today.endOf("month");

//       return `${threeMonthsAgo.format(
//         "YYYY-MM-DD"
//       )}, ${endOfCurrentMonth.format("YYYY-MM-DD")}`;
//     }

//     return "";
//   };

//   const filter = useSelector(selectPeriod);
//   console.log({ filter });
//   const { data: engagementData, isLoading } = useGetClientPerformanceQuery({
//     time_range: getDateRange("this_quarter"),
//     user_status: ["Active", "Oc", "Lead"],
//   });

//   if (isLoading) {
//     return (
//       <div className="space-y-6 p-6">
//         <div className="animate-pulse">
//           <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {[1, 2, 3, 4].map((i) => (
//               <div key={i} className="h-80 bg-gray-200 rounded-lg"></div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // const metrics = engagementData?.data;
//   // const notificationData = metrics?.notificationSeenInApp;
//   // const programStackData = metrics?.engagementByProgramStack;

//   // const weeklyEngagementData =
//   //   metrics?.weeklyEngagementTrend?.map((item) => ({
//   //     week: `Week ${item.week_number}`,
//   //     engagement: Number.parseFloat(item.engagement_percentage),
//   //     notifications: item.total_notifications,
//   //     seen: Number.parseInt(item.seen_notifications, 10),
//   //   })) || [];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="space-y-8">
//         <div className="flex justify-between items-center">
//           <h2 className="text-xl font-bold text-gray-900">
//             Notification Engagement
//           </h2>
//           <Tabs defaultValue={selected} className="space-y-6">
//             <TabsList className="grid w-full grid-cols-4">
//               <TabsTrigger
//                 className="cursor-pointer"
//                 value="all"
//                 onClick={() => setSelected("all")}
//               >
//                 All Lead
//               </TabsTrigger>
//               <TabsTrigger
//                 className="cursor-pointer"
//                 value="active"
//                 onClick={() => setSelected("active")}
//               >
//                 Active
//               </TabsTrigger>
//               <TabsTrigger
//                 className="cursor-pointer"
//                 value="oc"
//                 onClick={() => setSelected("oc")}
//               >
//                 OC
//               </TabsTrigger>
//               <TabsTrigger
//                 className="cursor-pointer"
//                 value="lead"
//                 onClick={() => setSelected("lead")}
//               >
//                 Lead
//               </TabsTrigger>
//             </TabsList>
//           </Tabs>
//         </div>

//         {/* <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
//           <NotificationEngagement data={notificationData} />
//           <div className="col-span-2">
//             <TopNotifications
//               data={metrics}
//               title="Top Performing Notification"
//             />
//           </div>
//           <div className="col-span-2">
//             <TopNotifications
//               data={metrics}
//               title="Low Performing Notification"
//             />
//           </div>
//         </div> */}
//       </div>
//     </div>
//   );
// }

// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
// // import { selectPeriod } from "@/features/period/periodSlice";
// // import { useGetClientPerformanceQuery } from "@/service/dashboard/api";
// // import { TrendingDown, TrendingUp } from "lucide-react";
// // import { useSelector } from "react-redux";
// // import {
// //   Area,
// //   AreaChart,
// //   Cell,
// //   Pie,
// //   PieChart,
// //   ResponsiveContainer,
// //   XAxis,
// //   YAxis,
// //   LabelList,
// //   Legend,
// // } from "recharts";
// // import dayjs from "dayjs";
// // import isoWeek from "dayjs/plugin/isoWeek";

// // dayjs.extend(isoWeek);

// // export default function LeadPerformance() {

// // const getDateRange = (filter: "today" |"this_week" | "mtd" | "this_quarter") : string => {
// //   const today = dayjs();

// //   if (filter === "today") {
// //     const dateStr = today.format("YYYY-MM-DD");
// //     return `${dateStr}, ${dateStr}`;
// //   }

// //   if (filter === "this_week") {
// //     const startOfWeek = today.startOf("isoWeek").format("YYYY-MM-DD");
// //     const endOfWeek = today.endOf("isoWeek").format("YYYY-MM-DD");
// //     return `${startOfWeek}, ${endOfWeek}`;
// //   }

// //   if (filter === "mtd") {
// //     const startOfMonth = today.startOf("month").format("YYYY-MM-DD");
// //     const endOfMonth = today.endOf("month").format("YYYY-MM-DD");
// //     return `${startOfMonth}, ${endOfMonth}`;
// //   }

// //   if (filter === "this_quarter") {
// //     const threeMonthsAgo = today.subtract(2, "month").startOf("month");
// //     const endOfCurrentMonth = today.endOf("month");

// //     return `${threeMonthsAgo.format("YYYY-MM-DD")}, ${endOfCurrentMonth.format("YYYY-MM-DD")}`;
// //   }

// //   return "";
// // }

// //   const filter = useSelector(selectPeriod);
// //   console.log({ filter });
// //   const { data: engagementData, isLoading } = useGetClientPerformanceQuery({
// //     time_range: getDateRange(filter),
// //     user_status: ["Active", "Oc", "Lead"],
// //   });

// //   if (isLoading) {
// //     return (
// //       <div className="space-y-6 p-6">
// //         <div className="animate-pulse">
// //           <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// //             {[1, 2, 3, 4].map((i) => (
// //               <div key={i} className="h-80 bg-gray-200 rounded-lg"></div>
// //             ))}
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   const metrics = engagementData?.data;
// //   const notificationData = metrics?.notificationSeenInApp;

// //   const weeklyEngagementData =
// //     metrics?.weeklyEngagementTrend?.map((item) => ({
// //       week: `Week ${item.week_number}`,
// //       engagement: Number.parseFloat(item.engagement_percentage),
// //       notifications: item.total_notifications,
// //       seen: Number.parseInt(item.seen_notifications, 10),
// //     })) || [];

// //   const appVersionData = [
// //     {
// //       name: "Updated",
// //       value: metrics?.appVersionStats?.updated || 0,
// //       percentage: Number.parseFloat(
// //         metrics?.appVersionStats?.updatedPercentage || "0"
// //       ),
// //       fill: "#10b981",
// //     },
// //     {
// //       name: "Not Updated",
// //       value: metrics?.appVersionStats?.notUpdated || 0,
// //       percentage: Number.parseFloat(
// //         metrics?.appVersionStats?.notUpdatedPercentage || "0"
// //       ),
// //       fill: "#f59e0b",
// //     },
// //   ];

// //   const renderCustomizedLabel = (props: any) => {
// //     const { cx, cy, midAngle, innerRadius, outerRadius, percentage } = props;
// //     const RADIAN = Math.PI / 180;
// //     const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
// //     const x = cx + radius * Math.cos(-midAngle * RADIAN);
// //     const y = cy + radius * Math.sin(-midAngle * RADIAN);

// //     return (
// //       <text
// //         x={x}
// //         y={y}
// //         fill="white"
// //         // textAnchor={x > cx ? "end" : "end"}
// //         textAnchor="middle"
// //         dominantBaseline="central"
// //         fontSize={14}
// //         fontWeight="600"
// //         className="px-2"
// //       >
// //         {`${percentage.toFixed(1)}%`}
// //       </text>
// //     );
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       <div className="space-y-8">
// //         <div className="space-y-2">
// //           <h2 className="text-xl font-bold text-gray-900">
// //             Client Engagement Dashboard
// //           </h2>
// //           {/* <p className="text-lg text-gray-600 max-w-2xl mx-auto">
// //             Monitor user engagement metrics, notification performance, and app
// //             adoption rates
// //           </p> */}
// //         </div>

// //         <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
// //           {/* Notification Seen in App - Enhanced card */}
// //           <Card className="shadow-lg border-0 bg-white">
// //             <CardHeader>
// //               <div className="flex items-center space-x-3">
// //                 {/* <Bell className="h-6 w-6" /> */}
// //                 <CardTitle className="text-md font-semibold">
// //                   Notification Engagement
// //                 </CardTitle>
// //               </div>
// //             </CardHeader>
// //             <CardContent>
// //               <div className="text-center space-y-6">
// //                 <div className="space-y-2">
// //                   <div className="text-5xl font-bold text-cyan-600">
// //                     {notificationData?.seenPercentage}%
// //                   </div>
// //                   <p className="text-sm text-gray-500">
// //                     Overall engagement rate
// //                   </p>
// //                 </div>

// //                 <div className="space-y-4">
// //                   <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
// //                     <span className="text-sm font-medium text-gray-700">
// //                       Total Sent
// //                     </span>
// //                     <span className="text-lg font-bold text-gray-900">
// //                       {notificationData?.totalNotifications?.toLocaleString()}
// //                     </span>
// //                   </div>
// //                   <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
// //                     <span className="text-sm font-medium text-gray-700">
// //                       Total Seen
// //                     </span>
// //                     <span className="text-lg font-bold text-cyan-600">
// //                       {notificationData?.seenNotifications?.toLocaleString()}
// //                     </span>
// //                   </div>
// //                   <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
// //                     <span className="text-sm font-medium text-gray-700">
// //                       Trend
// //                     </span>
// //                     <div className="flex items-center space-x-2">
// //                       {Number.parseFloat(notificationData?.trend || "0") >=
// //                       0 ? (
// //                         <TrendingUp className="h-4 w-4 text-green-500" />
// //                       ) : (
// //                         <TrendingDown className="h-4 w-4 text-red-500" />
// //                       )}
// //                       <span
// //                         className={`text-sm font-bold ${
// //                           Number.parseFloat(notificationData?.trend || "0") >= 0
// //                             ? "text-green-500"
// //                             : "text-red-500"
// //                         }`}
// //                       >
// //                         {notificationData?.trend}%
// //                       </span>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </CardContent>
// //           </Card>

// //           {/* Weekly Engagement Trend - Enhanced chart */}
// //           <Card className="lg:col-span-2 shadow-lg border-0 bg-white">
// //             <CardHeader>
// //               <div className="flex items-center space-x-3">
// //                 {/* <Users className="h-6 w-6" /> */}
// //                 <CardTitle className="text-md font-semibold">
// //                   Weekly Engagement Trend
// //                 </CardTitle>
// //               </div>
// //             </CardHeader>
// //             <CardContent>
// //               <ChartContainer
// //                 config={{
// //                   engagement: { label: "Engagement %", color: "#3b82f6" },
// //                 }}
// //                 className="h-[360px]"
// //               >
// //                 <ResponsiveContainer width="100%" height="100%">
// //                   <AreaChart
// //                     data={weeklyEngagementData}
// //                     margin={{ top: 20, right: 20, left: 20, bottom: 10 }}
// //                   >
// //                     <XAxis
// //                       dataKey="week"
// //                       axisLine={false}
// //                       tickLine={false}
// //                       tick={{ fontSize: 12, fill: "#6b7280" }}
// //                     />
// //                     <YAxis
// //                       domain={[0, 50]}
// //                       axisLine={false}
// //                       tickLine={false}
// //                       tick={{ fontSize: 12, fill: "#6b7280" }}
// //                       label={{
// //                         value: "Engagement %",
// //                         angle: -90,
// //                         position: "insideLeft",
// //                       }}
// //                     />
// //                     <ChartTooltip
// //                       content={({ active, payload, label }) => {
// //                         if (active && payload && payload.length) {
// //                           const data = payload[0].payload;
// //                           return (
// //                             <div className="bg-white p-4 border rounded-lg shadow-lg">
// //                               <p className="font-semibold text-gray-900">
// //                                 {label}
// //                               </p>
// //                               <p className="text-blue-600 font-medium">
// //                                 Engagement: {payload[0].value}%
// //                               </p>
// //                               <p className="text-gray-600 text-sm">
// //                                 Total: {data.notifications} notifications
// //                               </p>
// //                               <p className="text-gray-600 text-sm">
// //                                 Seen: {data.seen} notifications
// //                               </p>
// //                             </div>
// //                           );
// //                         }
// //                         return null;
// //                       }}
// //                     />
// //                     <Area
// //                       type="monotone"
// //                       dataKey="engagement"
// //                       stroke="#3b82f6"
// //                       fill="url(#colorGradient)"
// //                       fillOpacity={0.6}
// //                       strokeWidth={3}
// //                     >
// //                       <LabelList
// //                         dataKey="engagement"
// //                         position="top"
// //                         formatter={(value: number) => `${value}%`}
// //                         style={{
// //                           fontSize: 12,
// //                           fontWeight: "600",
// //                           fill: "#1f2937",
// //                         }}
// //                       />
// //                     </Area>
// //                     <defs>
// //                       <linearGradient
// //                         id="colorGradient"
// //                         x1="0"
// //                         y1="0"
// //                         x2="0"
// //                         y2="1"
// //                       >
// //                         <stop
// //                           offset="5%"
// //                           stopColor="#3b82f6"
// //                           stopOpacity={0.8}
// //                         />
// //                         <stop
// //                           offset="95%"
// //                           stopColor="#3b82f6"
// //                           stopOpacity={0.1}
// //                         />
// //                       </linearGradient>
// //                     </defs>
// //                   </AreaChart>
// //                 </ResponsiveContainer>
// //               </ChartContainer>
// //             </CardContent>
// //           </Card>
// //           {/* App Update Status - Enhanced pie chart */}
// //           <Card className="shadow-lg border-0 bg-white">
// //             <CardHeader className="pb-2 ">
// //               <div className="flex items-center space-x-3">
// //                 {/* <Smartphone className="h-6 w-6" /> */}
// //                 <CardTitle className="text-md font-semibold">
// //                   App Update Status
// //                 </CardTitle>
// //               </div>
// //             </CardHeader>
// //             <CardContent className="">
// //               <div className="flex flex-col items-center space-y-6">
// //                 <ResponsiveContainer width="100%" height={250}>
// //                   <PieChart>
// //                     <Pie
// //                       data={appVersionData}
// //                       dataKey="value"
// //                       nameKey="name"
// //                       cx="50%"
// //                       cy="50%"
// //                       innerRadius={60}
// //                       outerRadius={100}
// //                       label={renderCustomizedLabel}
// //                       paddingAngle={1}
// //                     >
// //                       {appVersionData.map((entry, index) => (
// //                         <Cell key={`cell-${index}`} fill={entry.fill} />
// //                       ))}
// //                     </Pie>
// //                     <Legend
// //                       verticalAlign="bottom"
// //                       height={36}
// //                       formatter={(value, entry) => (
// //                         <span className="text-sm font-medium text-gray-700">
// //                           {value}: {entry?.payload?.value} users
// //                         </span>
// //                       )}
// //                     />
// //                   </PieChart>
// //                 </ResponsiveContainer>

// //                 <div className="grid grid-cols-2 gap-4 w-full">
// //                   <div className="text-center p-3 bg-green-50 rounded-lg">
// //                     <div className="text-xl font-bold text-green-600">
// //                       {metrics?.appVersionStats?.updatedPercentage}%
// //                     </div>
// //                     <div className="text-sm text-green-700 font-medium">
// //                       Updated
// //                     </div>
// //                   </div>
// //                   <div className="text-center p-3 bg-amber-50 rounded-lg">
// //                     <div className="text-xl font-bold text-amber-600">
// //                       {metrics?.appVersionStats?.notUpdatedPercentage}%
// //                     </div>
// //                     <div className="text-sm text-amber-700 font-medium">
// //                       Not Updated
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </CardContent>
// //           </Card>
// //         </div>

// //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
// //           {/* Top Notifications - Enhanced list */}
// //           <Card className="shadow-lg border-0 bg-white">
// //             <CardHeader>
// //               <div className="flex items-center space-x-3">
// //                 {/* <Bell className="h-6 w-6" /> */}
// //                 <CardTitle className="text-md font-semibold">
// //                   Top Performing Notifications
// //                 </CardTitle>
// //               </div>
// //             </CardHeader>
// //             <CardContent>
// //               {metrics?.topNotifications?.length === 0 ? (
// //                 <div className="text-center py-8">
// //                   {/* <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" /> */}
// //                   <p className="text-gray-500">
// //                     No notifications data available
// //                   </p>
// //                 </div>
// //               ) : (
// //                 <div className="space-y-4">
// //                   {metrics?.topNotifications?.map((notification, index) => (
// //                     <div
// //                       key={index}
// //                       className="flex items-center justify-between p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
// //                     >
// //                       <div className="flex items-center space-x-3">
// //                         <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
// //                           <span className="text-sm font-bold text-purple-600">
// //                             {index + 1}
// //                           </span>
// //                         </div>
// //                         <span className="text-sm font-medium text-gray-900 line-clamp-2">
// //                           {notification.title}
// //                         </span>
// //                       </div>
// //                       <div className="flex-shrink-0 text-right">
// //                         <div className="text-lg font-bold text-purple-600">
// //                           {notification.seen_count}
// //                         </div>
// //                         <div className="text-xs text-gray-500">views</div>
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               )}
// //             </CardContent>
// //           </Card>
// //           {metrics?.engagementByProgramStack && (
// //             <Card className="shadow-lg border-0 bg-white">
// //               <CardHeader>
// //                 <CardTitle className="text-md font-semibold">
// //                   Engagement by Program Stack
// //                 </CardTitle>
// //               </CardHeader>
// //               <CardContent>
// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                   {metrics.engagementByProgramStack.map((stack, index) => (
// //                     <div
// //                       key={index}
// //                       className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg"
// //                     >
// //                       <h3 className="text-lg font-semibold text-gray-900 mb-4">
// //                         {stack.program_category}
// //                       </h3>
// //                       <div className="space-y-3">
// //                         <div className="flex justify-between">
// //                           <span className="text-sm text-gray-600">
// //                             Engagement Rate
// //                           </span>
// //                           <span className="text-xl font-bold text-indigo-600">
// //                             {stack.engagement_percentage}%
// //                           </span>
// //                         </div>
// //                         <div className="flex justify-between">
// //                           <span className="text-sm text-gray-600">
// //                             Total Notifications
// //                           </span>
// //                           <span className="font-medium">
// //                             {stack.total_notifications}
// //                           </span>
// //                         </div>
// //                         <div className="flex justify-between">
// //                           <span className="text-sm text-gray-600">
// //                             Seen Notifications
// //                           </span>
// //                           <span className="font-medium text-indigo-600">
// //                             {stack.seen_notifications}
// //                           </span>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </CardContent>
// //             </Card>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
