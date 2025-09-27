import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useGetSalesTriggerQuery } from "@/service/dashboard/api";
import { keyString } from "@/lib/utils";

export default function StatusWiseMetrics() {
  const [hoveredSection, setHoveredSection] = useState<
    "hot" | "warm" | "engage" | "downgrade" | null
  >(null);

  const { data } = useGetSalesTriggerQuery();

  const DetailedInfo = ({
    type,
    leadData,
  }: {
    type: "hot" | "warm" | "engage" | "downgrade";
    leadData?: { [key: string]: number };
  }) => (
    <div className="absolute left-0 top-full right-0 mt-2 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 p-2 z-10 animate-in slide-in-from-left-2 duration-200 min-w-48">
      <div className="flex items-center justify-between mb-2">
        <h4 className="pl-1 font-medium text-base capitalize">
          {type === "engage"
            ? "To Engage"
            : type === "downgrade"
            ? "Downgrades"
            : `${type} `}
        </h4>
      </div>

      <div className="space-y-2 mx-1">
        {leadData &&
          Object.entries(leadData).map(
            ([key, value]) =>
              key !== "total" && (
                <div
                  key={key}
                  className="flex items-center justify-between py-1 px-2 bg-blue-50 rounded text-sm"
                >
                  <span className="font-medium">{keyString(key)}</span>
                  <span className="font-semibold text-blue-600">{value}</span>
                </div>
              )
          )}
      </div>
    </div>
  );

  return (
    <Card className="w-full ">
      <CardHeader>
        <CardTitle>Consultation Done (Unconverted)</CardTitle>
      </CardHeader>
      <CardContent className="px-3">
        <div className="grid grid-cols-3 gap-2">
          <div
            className="relative"
            onMouseEnter={() => setHoveredSection("hot")}
            onMouseLeave={() => setHoveredSection(null)}
          >
            <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-lg p-2 border border-red-200 dark:border-red-800 hover:shadow-md transition-all duration-300 cursor-pointer">
              <div className="text-center">
                <h4 className="font-medium text-base text-gray-800 dark:text-gray-200">
                  Hot
                </h4>
                <div className="text-xl font-bold">
                  {data?.data?.hot_triggers?.total}
                </div>
              </div>
            </div>
            {hoveredSection === "hot" && (
              <DetailedInfo type="hot" leadData={data?.data?.hot_triggers} />
            )}
          </div>

          <div
            className="relative"
            onMouseEnter={() => setHoveredSection("warm")}
            onMouseLeave={() => setHoveredSection(null)}
          >
            <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg p-2 border border-yellow-200 dark:border-yellow-800 hover:shadow-md transition-all duration-300 cursor-pointer">
              <div className="text-center">
                <h4 className="font-medium text-base text-gray-800 dark:text-gray-200">
                  Warm
                </h4>
                <div className="text-xl font-bold">
                  {data?.data?.warm_triggers?.total}
                </div>
              </div>
            </div>
            {hoveredSection === "warm" && (
              <DetailedInfo type="warm" leadData={data?.data.warm_triggers} />
            )}
          </div>

          <div
            className="relative"
            onMouseEnter={() => setHoveredSection("engage")}
            onMouseLeave={() => setHoveredSection(null)}
          >
            <div className="bg-gradient-to-r from-red-50 to-orange-50  dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-2 border border-green-200 dark:border-green-800 hover:shadow-md transition-all duration-300 cursor-pointer">
              <div className="text-center">
                <h4 className="font-medium text-base text-gray-800 dark:text-gray-200">
                  Cold
                </h4>
                <div className="text-xl font-bold">{data?.data?.to_engage}</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Users } from "lucide-react";
// import { useState } from "react";
// import { useGetSalesTriggerQuery } from "@/service/dashboard/api";
// import { keyString } from "@/lib/utils";

// export default function StatusWiseMetrics() {
//   const [hoveredLead, setHoveredLead] = useState<"hot" | "warm" | null>(null);

//   const { data } = useGetSalesTriggerQuery();
//   console.log({ data });

//   const DetailedInfo = ({
//     type,
//     leadData,
//   }: {
//     type: "hot" | "warm";
//     leadData?: {
//       [key: string]: number;
//     };
//   }) => (
//     <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-4 z-10 animate-in slide-in-from-top-2 duration-200">
//       <div className="flex items-center justify-between mb-3">
//         <h4 className="font-semibold text-base capitalize flex items-center">
//           {type} Trigger
//         </h4>
//       </div>

//       <div className="grid grid-cols-3 gap-4">
//         {leadData &&
//           Object.entries(leadData).map(
//             ([key, value]) =>
//               key !== "total" && (
//                 <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-3">
//                   <div className="text-center mb-2">
//                     <Badge variant="outline" className="text-base mb-2">
//                       {keyString(key)}
//                     </Badge>
//                   </div>
//                   <div className="space-y-2">
//                     <div className="flex items-center justify-center text-xs">
//                       <span className="font-bold text-center text-blue-600">
//                         {value}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               )
//           )}
//       </div>
//     </div>
//   );

//   return (
//     <Card className="w-full">
//       <CardContent className="px-6">
//         <div className="flex items-center justify-between mb-4">
//           <div className="flex items-center space-x-2">
//             <Users className="h-5 w-5 text-blue-600" />
//             <h3 className="text-lg font-semibold">Sales Trigger</h3>
//           </div>
//         </div>
//         <div className="grid grid-cols-2 gap-6">
//           <div
//             className="relative"
//             onMouseEnter={() => setHoveredLead("hot")}
//             onMouseLeave={() => setHoveredLead(null)}
//           >
//             <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800 hover:shadow-lg transition-all duration-300 cursor-pointer">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-3">
//                   <div>
//                     <h4 className="font-semibold text-gray-800 dark:text-gray-200">
//                       Hot Trigger
//                     </h4>
//                     <p className="text-xs text-muted-foreground">
//                       High engagement
//                     </p>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <div className="text-3xl font-bold text-red-600">
//                     {data?.data?.hot_triggers?.total}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {hoveredLead === "hot" && (
//               <DetailedInfo type="hot" leadData={data?.data?.hot_triggers} />
//             )}
//           </div>
//           <div
//             className="relative"
//             onMouseEnter={() => setHoveredLead("warm")}
//             onMouseLeave={() => setHoveredLead(null)}
//           >
//             <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-800 hover:shadow-lg transition-all duration-300 cursor-pointer">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-3">
//                   <div>
//                     <h4 className="font-semibold text-gray-800 dark:text-gray-200">
//                       Warm Trigger
//                     </h4>
//                     <p className="text-xs text-muted-foreground">
//                       Moderate engagement
//                     </p>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <div className="text-3xl font-bold text-yellow-600">
//                     {data?.data?.warm_triggers?.total}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {hoveredLead === "warm" && (
//               <DetailedInfo type="warm" leadData={data?.data.warm_triggers} />
//             )}
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }
