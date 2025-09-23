import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { keyString } from "@/lib/utils";
import { useGetCampaignOverviewQuery } from "@/service/dashboard/api";
import {
  BarChart2,
  CheckCircle,
  GaugeCircle,
  LineChart,
  MousePointerClick,
  Rocket,
  TrendingUp,
  UserPlus,
  Users,
  IndianRupee,
} from "lucide-react";
import { useState } from "react";
import { type LucideIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type IconTypes = {
  [key: string]: LucideIcon;
};

export default function CampaignDetails() {
  const [selected, setSelected] = useState<"" | "meta" | "google">("");
  const { data, isFetching } = useGetCampaignOverviewQuery({
    filter: selected,
  });

  const SkeletonArray = Array(9)
    .fill(null)
    .map((_, index: number) => (
      <div
        className="flex justify-between py-3 px-4 bg-muted rounded-lg"
        key={index}
      >
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-5 w-20" />
      </div>
    ));

  // const cleanseData = {
  //   total_campaigns: {
  //     active: 2,
  //     inactive: 3,
  //     total: 5,
  //   },
  //   // total_campaigns_inactive: 4,
  //   total_ad_spent: 9647,
  //   impressions: 52780,
  //   reach: 40583,
  //   clicks: 4200,
  //   CPL: 209.07,
  //   CAC: "₹ 9647",
  //   CTR: "7.34%",
  //   total_conversions: 1,
  //   total_leads_generated: 46,
  //   total_revenue_generated: "₹ 1499",
  // };

  const allIcons: IconTypes = {
    total_campaigns: Rocket,
    // total_campaigns_inactive: Rocket,
    total_ad_spent: IndianRupee,
    impressions: BarChart2,
    reach: Users,
    clicks: MousePointerClick,
    CPL: GaugeCircle,
    CAC: TrendingUp,
    CTR: LineChart,
    total_leads_generated: UserPlus,
    total_conversions: CheckCircle,
    total_revenue_generated: IndianRupee,
  };

  const CustomTooltip = (value: {
    active: number;
    inactive: number;
    total: number;
  }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="font-semibold text-red-500 cursor-pointer hover:text-red-700 transition-colors duration-200 px-2 py-1 rounded-md hover:bg-red-50">
            {value?.total}
          </span>
        </TooltipTrigger>
        <TooltipContent className="p-0 bg-white border border-gray-200 shadow-lg rounded-lg max-w-xs z-50">
          <div className="p-4 space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <h4 className="font-semibold text-gray-900 text-sm">
                  Total Campaigns
                </h4>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-2 bg-green-50 rounded-md">
                  <p className="text-xs text-gray-600 font-medium">
                    Active Campaign
                  </p>
                  <p className="text-sm font-bold text-green-700">
                    {value.active}
                  </p>
                </div>
                <div className="text-center p-2 bg-green-50 rounded-md">
                  <p className="text-xs text-gray-600 font-medium">
                    Inactive Campaign
                  </p>
                  <p className="text-sm font-bold text-green-700">
                    {value.inactive}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <CardTitle>Campaign Details</CardTitle>
              <CardDescription className="mt-1">
                Campaign Overview
              </CardDescription>
            </div>
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
                  value={"meta"}
                  onClick={() => setSelected("meta")}
                >
                  Meta
                </TabsTrigger>
                <TabsTrigger
                  className="cursor-pointer"
                  value="google"
                  onClick={() => setSelected("google")}
                >
                  Google
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        {data?.data && !isFetching ? (
          <CardContent>
            <div className="grid grid-cols-3 gap-3">
              {Object.entries(data?.data[0]).map(([key, value]) => {
                const Icon = allIcons[key];
                return (
                  !["active_count", "inactive_count"].includes(key) && (
                    <div className="flex justify-between py-3 px-4 bg-muted rounded-lg">
                      <div className="flex items-center space-x-3">
                        {Icon && <Icon className="h-4 w-4 text-purple-500" />}
                        <span className="font-medium">{keyString(key)}</span>
                      </div>
                      <div className="font-semibold text-lg">
                        {key == "total_count"
                          ? CustomTooltip({
                              active: data?.data[0]?.active_count,
                              inactive: data?.data[0]?.inactive_count,
                              total: data?.data[0]?.total_count,
                            })
                          : value}
                      </div>
                    </div>
                  )
                );
              })}
            </div>
          </CardContent>
        ) : (
          <div className="grid grid-cols-3 gap-3 mx-6">{SkeletonArray}</div>
        )}
      </Card>
    </div>
  );
}
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { useGetCampaignOverviewQuery } from "@/service/dashboard/api";
// import { Activity, Eye, TrendingUp, UserPlus, Users } from "lucide-react";
// import { useState } from "react";

// export default function CampaignDetails() {
//   const { data, isFetching } = useGetCampaignOverviewQuery();

//   const [selected, setSelected] = useState<"" | "bn" | "cleanse">("");
//   console.log({ data });

//   const SkeletonArray = Array(9)
//     .fill(null)
//     .map((_, index: number) => (
//       <div
//         className="flex justify-between py-3 px-4 bg-muted rounded-lg"
//         key={index}
//       >
//         <Skeleton className="h-5 w-20" />
//         <Skeleton className="h-5 w-20" />
//       </div>
//     ));

//   return (
//     <div>
//       <Card>
//         <CardHeader>
//           <div className="flex justify-between">
//             <div>
//               <CardTitle>Campaign Details</CardTitle>
//               <CardDescription className="mt-1">
//                 Campaign Overview
//               </CardDescription>
//             </div>
//             <Tabs defaultValue={selected} className="space-y-6">
//               <TabsList className="grid w-full grid-cols-3">
//                 <TabsTrigger
//                   className="cursor-pointer"
//                   value=""
//                   onClick={() => setSelected("")}
//                 >
//                   All
//                 </TabsTrigger>
//                 <TabsTrigger
//                   className="cursor-pointer"
//                   value={"bn"}
//                   onClick={() => setSelected("bn")}
//                 >
//                   Meta
//                 </TabsTrigger>
//                 <TabsTrigger
//                   className="cursor-pointer"
//                   value="cleanse"
//                   onClick={() => setSelected("cleanse")}
//                 >
//                   Google
//                 </TabsTrigger>
//               </TabsList>
//             </Tabs>
//           </div>
//         </CardHeader>
//         {data?.data && !isFetching ? (
//           <CardContent>
//             <div className="grid grid-cols-3 gap-3">
//               <div className="flex justify-between py-3 px-4 bg-muted rounded-lg">
//                 <div className="flex items-center space-x-3">
//                   <Eye className="h-4 w-4 text-purple-500" />
//                   <span className="font-medium">No. of Champaign (Active)</span>
//                 </div>
//                 <div className="font-semibold text-lg">
//                   {selected === "cleanse" ? 0 : data.data[0].active_count}
//                 </div>
//               </div>
//               <div className="flex justify-between py-3 px-4 bg-muted rounded-lg">
//                 <div className="flex items-center space-x-3">
//                   <Users className="h-4 w-4 text-purple-500" />
//                   <span className="font-medium">Ad Spend</span>
//                 </div>
//                 <div className="font-semibold text-lg">
//                   {selected === "cleanse" ? 0 : data.data[0].total_ad_spend}
//                 </div>
//               </div>
//               <div className="flex justify-between py-3 px-4 bg-muted rounded-lg">
//                 <div className="flex items-center space-x-3">
//                   <Activity className="h-4 w-4 text-orange-500" />
//                   <span className="font-medium">Total Impressions</span>
//                 </div>
//                 <div className="font-semibold text-lg">
//                   {selected === "cleanse" ? 0 : data.data[0].total_impressions}
//                 </div>
//               </div>
//               <div className="flex justify-between py-3 px-4 bg-muted rounded-lg">
//                 <div className="flex items-center space-x-3">
//                   <TrendingUp className="h-4 w-4 text-green-500" />
//                   <span className="font-medium">Total Reach</span>
//                 </div>
//                 <div className="font-semibold text-lg">
//                   {selected === "cleanse" ? 0 : data.data[0].total_reach}
//                 </div>
//               </div>
//               <div className="flex justify-between py-3 px-4 bg-muted rounded-lg">
//                 <div className="flex items-center space-x-3">
//                   <TrendingUp className="h-4 w-4 text-green-500" />
//                   <span className="font-medium">Total CTR</span>
//                 </div>
//                 <div className="font-semibold text-lg">
//                   {selected === "cleanse" ? 0 : data.data[0].total_ctr}%
//                 </div>
//               </div>
//               <div className="flex justify-between py-3 px-4 bg-muted rounded-lg">
//                 <div className="flex items-center space-x-3">
//                   <TrendingUp className="h-4 w-4 text-green-500" />
//                   <span className="font-medium">Total CAC</span>
//                 </div>
//                 <div className="font-semibold text-lg">
//                   {selected === "cleanse" ? 0 : data.data[0].total_cac}
//                 </div>
//               </div>
//               <div className="flex justify-between py-3 px-4 bg-muted rounded-lg">
//                 <div className="flex items-center space-x-3">
//                   <Activity className="h-4 w-4 text-orange-500" />
//                   <span className="font-medium">Lead Generated</span>
//                 </div>
//                 <div className="font-semibold text-lg">
//                   {selected === "cleanse" ? 0 : data.data[0].leads_generated}
//                 </div>
//               </div>
//               <div className="flex justify-between py-3 px-4 bg-muted rounded-lg">
//                 <div className="flex items-center space-x-3">
//                   <UserPlus className="h-4 w-4 text-teal-500" />
//                   <span className="font-medium">Revenue Generated</span>
//                 </div>
//                 <div className="font-semibold text-lg">
//                   {selected === "cleanse" ? 0 : data.data[0].revenue_generated}
//                 </div>
//               </div>
//             </div>
//           </CardContent>
//         ) : (
//           <div className="grid grid-cols-3 gap-3 mx-6">{SkeletonArray}</div>
//         )}
//       </Card>
//     </div>
//   );
// }
