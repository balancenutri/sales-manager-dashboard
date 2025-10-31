import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetCounsellorDataByIdQuery } from "@/service/dashboard/api";
import { LayoutDashboard, MessageSquareMore } from "lucide-react";

export default function CounsellorCard({ counsellorId }: { counsellorId: number; }) {
  //   const getPerformanceTag = (conversionRate: number) => {
  //     if (conversionRate >= benchmark) {
  //       return { tag: "Excellent", color: "bg-green-500 text-white" };
  //     } else if (conversionRate >= benchmark * 0.95) {
  //       return { tag: "Good", color: "bg-teal-500 text-white" };
  //     } else if (conversionRate >= avg * 1.05) {
  //       return { tag: "Fair", color: "bg-yellow-500 text-white" };
  //     } else if (conversionRate >= avg * 0.95) {
  //       return { tag: "Poor", color: "bg-orange-500 text-white" };
  //     } else {
  //       return { tag: "High Risk", color: "bg-red-500 text-white" };
  //     }
  //   };

  const { data, isFetching } = useGetCounsellorDataByIdQuery(counsellorId);

  console.log({ data, isFetching });
  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-3">
          <div className="flex-1">
            <CardTitle className="text-lg">{data?.data.crm_user}</CardTitle>
            <Badge className={"bg-green-500 text-white"}>{"Good"}</Badge>
          </div>
          <div className="p-2 bg-gradient-to-r from-blue-300 to-blue-500 rounded-full">
            <MessageSquareMore className="h-5 w-5 text-white" />
          </div>
          <div className="p-2 bg-gradient-to-r from-blue-300 to-blue-500 rounded-full">
            <LayoutDashboard className="h-5 w-5 text-white" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-2 rounded-md bg-blue-50 text-blue-800 text-sm font-medium">
          <span>Best Source:</span>
          <span>Referral</span>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Leads Assigned</p>
            <p className="font-semibold">{data?.data.leads_assigned}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Consultations</p>
            <p className="font-semibold">{data?.data.consultations}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Sales Closed</p>
            <p className="font-semibold">₹{data?.data.sales_amount}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Revenue</p>
            <p className="font-semibold">₹{data?.data.revenue}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Total Sales Opportunity</p>
            <p className="font-semibold">₹7867</p>
          </div>
          <div>
            <p className="text-muted-foreground">Payment Details Shared</p>
            <p className="font-semibold">₹{data?.data.suggested_amount}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center text-sm pt-2 border-t">
          <div>
            <p className="">L:C</p>
            <p className="font-semibold text-red-500">{data?.data["l:c"]}%</p>
          </div>
          <div>
            <p className="">C:S</p>
            <p className="font-semibold text-red-500">{data?.data["c:s"]}%</p>
          </div>
          <div>
            <p className="">L:S</p>
            <p className="font-semibold text-red-500">{data?.data["l:s"]}%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}



// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { useGetCounsellorDataByIdQuery } from "@/service/dashboard/api";
// import { LayoutDashboard, MessageSquareMore } from "lucide-react";

// export default function CounsellorCard({
//   counsellorId,
// }: {
//   counsellorId: number;
// }) {
//   //   const getPerformanceTag = (conversionRate: number) => {
//   //     if (conversionRate >= benchmark) {
//   //       return { tag: "Excellent", color: "bg-green-500 text-white" };
//   //     } else if (conversionRate >= benchmark * 0.95) {
//   //       return { tag: "Good", color: "bg-teal-500 text-white" };
//   //     } else if (conversionRate >= avg * 1.05) {
//   //       return { tag: "Fair", color: "bg-yellow-500 text-white" };
//   //     } else if (conversionRate >= avg * 0.95) {
//   //       return { tag: "Poor", color: "bg-orange-500 text-white" };
//   //     } else {
//   //       return { tag: "High Risk", color: "bg-red-500 text-white" };
//   //     }
//   //   };

//   const { data } = useGetCounsellorDataByIdQuery(counsellorId);

//   const leadBreakdown = [
//     {
//       name: "Leads with Medical Conditions",
//       approached: 30,
//       consultation: 27,
//       closed: 8,
//       lc: 90.0,
//       cs: 29.6,
//       ls: 26.67,
//     },
//     {
//       name: "Stage 4 with no medical conditions",
//       approached: 0,
//       consultation: 0,
//       closed: 0,
//       lc: 0.0,
//       cs: 0.0,
//       ls: 0.0,
//     },
//     {
//       name: "NRI Leads",
//       approached: 18,
//       consultation: 13,
//       closed: 5,
//       lc: 72.22,
//       cs: 38.5,
//       ls: 27.78,
//     },
//     {
//       name: "Stage 1/2 (body toning & stayfit active)",
//       approached: 1,
//       consultation: 0,
//       closed: 0,
//       lc: 0.0,
//       cs: 0.0,
//       ls: 0.0,
//     },
//   ];

//   const sourceData = [
//     {
//       source: "SOCIAL MEDIA",
//       subsources: [
//         {
//           name: "SMO Leads",
//           approached: 8,
//           consultation: 5,
//           closed: 1,
//           lc: 62.5,
//           cs: 20.0,
//           ls: 12.5,
//         },
//         {
//           name: "SME Leads",
//           approached: 6,
//           consultation: 5,
//           closed: 5,
//           lc: 83.33,
//           cs: 100.0,
//           ls: 83.33,
//         },
//       ],
//     },
//     {
//       source: "DIRECT LEADS",
//       subsources: [
//         {
//           name: "Consultation",
//           approached: 1,
//           consultation: 1,
//           closed: 0,
//           lc: 100.0,
//           cs: 0.0,
//           ls: 0.0,
//         },
//         {
//           name: "Phone Enquiry",
//           approached: 1,
//           consultation: 1,
//           closed: 0,
//           lc: 100.0,
//           cs: 0.0,
//           ls: 0.0,
//         },
//         {
//           name: "Whatsapp",
//           approached: 15,
//           consultation: 10,
//           closed: 3,
//           lc: 66.67,
//           cs: 30.0,
//           ls: 20.0,
//         },
//         {
//           name: "Reference",
//           approached: 4,
//           consultation: 3,
//           closed: 2,
//           lc: 75.0,
//           cs: 66.7,
//           ls: 50.0,
//         },
//       ],
//     },
//     {
//       source: "CAMPAIGN LEADS",
//       subsources: [
//         {
//           name: "Meta Ad",
//           approached: 27,
//           consultation: 3,
//           closed: 0,
//           lc: 11.11,
//           cs: 0.0,
//           ls: 0.0,
//         },
//         {
//           name: "IWD",
//           approached: 3,
//           consultation: 2,
//           closed: 1,
//           lc: 66.67,
//           cs: 50.0,
//           ls: 33.33,
//         },
//       ],
//     },
//     {
//       source: "WEBSITE & APP LEADS",
//       subsources: [
//         {
//           name: "Web HS Leads",
//           approached: 2,
//           consultation: 0,
//           closed: 0,
//           lc: 0.0,
//           cs: 0.0,
//           ls: 0.0,
//         },
//         {
//           name: "App Leads",
//           approached: 7,
//           consultation: 0,
//           closed: 0,
//           lc: 0.0,
//           cs: 0.0,
//           ls: 0.0,
//         },
//       ],
//     },
//   ];

//   const DataCard = (data: any) => {
//     return (
//       <div className="bg-white p-3 rounded-lg border border-slate-200">
//         <p className="font-semibold text-slate-900 text-sm mb-2">{data?.data?.name}</p>
//         <div className="grid grid-cols-3 gap-2 text-xs mb-2">
//           <div>
//             <p className="text-slate-600 font-medium text-center">Approached</p>
//             <p className="font-bold text-slate-900 text-center">{data?.data?.approached}1</p>
//           </div>
//           <div>
//             <p className="text-slate-600 font-medium text-center">Consultation</p>
//             <p className="font-bold text-slate-900 text-center">{data?.data?.consultation}</p>
//           </div>
//           <div>
//             <p className="text-slate-600 font-medium text-center">Closed</p>
//             <p className="font-bold text-slate-900 text-center">{data?.data?.closed}</p>
//           </div>
//         </div>
//         <div className="grid grid-cols-3 gap-2 text-xs pt-2 border-t border-slate-200 text-center">
//           <div>
//             <p className="text-slate-600 font-medium text-center">L:C</p>
//             <p className="font-bold text-red-500 text-center">{data?.data?.lc}%</p>
//           </div>
//           <div>
//             <p className="text-slate-600 font-medium text-center">C:S</p>
//             <p className="font-bold text-red-500 text-center">{data?.data?.cs}%</p>
//           </div>
//           <div>
//             <p className="text-slate-600 font-medium text-center">L:S</p>
//             <p className="font-bold text-red-500 text-center">{data?.data?.ls}%</p>
//           </div>
//         </div>
//       </div>
//     );
//   };
//   return (
//     <Card className="cursor-pointer hover:shadow-md transition-shadow">
//       <CardHeader className="">
//         <div className="flex items-center space-x-3">
//           <div className="flex-1">
//             <CardTitle className="text-lg">{data?.data.crm_user}</CardTitle>
//             <Badge className={"bg-green-500 text-white"}>{"Good"}</Badge>
//           </div>
//           <div className="p-2 bg-gradient-to-r from-blue-300 to-blue-500 rounded-full">
//             <MessageSquareMore className="h-5 w-5 text-white" />
//           </div>
//           <div className="p-2 bg-gradient-to-r from-blue-300 to-blue-500 rounded-full">
//             <LayoutDashboard className="h-5 w-5 text-white" />
//           </div>
//         </div>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         <Tabs
//           defaultValue="overview"
//           className="flex-1 flex flex-col overflow-hidden"
//         >
//           <TabsList className="grid w-full grid-cols-3 bg-slate-100 p-1 rounded-lg mb-4">
//             <TabsTrigger
//               value="overview"
//               className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs"
//             >
//               Overview
//             </TabsTrigger>
//             <TabsTrigger
//               value="leads"
//               className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs"
//             >
//               Lead Breakdown
//             </TabsTrigger>
//             <TabsTrigger
//               value="sources"
//               className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs"
//             >
//               Sources
//             </TabsTrigger>
//           </TabsList>
//           <TabsContent value="overview" className="space-y-6">
//             <div className="flex items-center justify-between p-2 rounded-md bg-blue-50 text-blue-800 text-sm font-medium">
//               <span>Best Source:</span>
//               <span>Referral</span>
//             </div>
//             <div className="grid grid-cols-2 gap-4 text-sm">
//               <div>
//                 <p className="text-muted-foreground">Leads Assigned</p>
//                 <p className="font-semibold">{data?.data.leads_assigned}</p>
//               </div>
//               <div>
//                 <p className="text-muted-foreground">Consultations</p>
//                 <p className="font-semibold">{data?.data.consultations}</p>
//               </div>
//               <div>
//                 <p className="text-muted-foreground">Sales Closed</p>
//                 <p className="font-semibold">₹{data?.data.sales_amount}</p>
//               </div>
//               <div>
//                 <p className="text-muted-foreground">Revenue</p>
//                 <p className="font-semibold">₹{data?.data.revenue}</p>
//               </div>
//               <div>
//                 <p className="text-muted-foreground">Total Sales Opportunity</p>
//                 <p className="font-semibold">₹7867</p>
//               </div>
//               <div>
//                 <p className="text-muted-foreground">Payment Details Shared</p>
//                 <p className="font-semibold">₹{data?.data.suggested_amount}</p>
//               </div>
//             </div>
//             <div className="grid grid-cols-3 gap-2 text-center text-sm pt-2 border-t">
//               <div>
//                 <p className="">L:C</p>
//                 <p className="font-semibold text-red-500">
//                   {data?.data["l:c"]}%
//                 </p>
//               </div>
//               <div>
//                 <p className="">C:S</p>
//                 <p className="font-semibold text-red-500">
//                   {data?.data["c:s"]}%
//                 </p>
//               </div>
//               <div>
//                 <p className="">L:S</p>
//                 <p className="font-semibold text-red-500">
//                   {data?.data["l:s"]}%
//                 </p>
//               </div>
//             </div>
//           </TabsContent>
//           <TabsContent
//             value="leads"
//             className="flex-1 overflow-y-scroll max-h-72"
//           >
//             <div className="space-y-3">
//               {leadBreakdown.map((lead, idx) => (
//                 <DataCard data={lead} key={idx} />
//               ))}
//             </div>
//           </TabsContent>
//           <TabsContent
//             value="sources"
//             className="flex-1 overflow-y-auto max-h-72"
//           >
//             <div className="space-y-4">
//               {sourceData.map((sourceGroup, idx) => (
//                 <div
//                   key={idx}
//                   className="bg-slate-50 p-4 rounded-lg border border-slate-200"
//                 >
//                   <h3 className="font-bold text-xs text-blue-600 mb-3 uppercase tracking-wide">
//                     {sourceGroup.source}
//                   </h3>
//                   <div className="space-y-2">
//                     {sourceGroup.subsources.map((subsource, subIdx) => (
//                       <DataCard data={subsource} key={subIdx} />
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </TabsContent>
//         </Tabs>
//       </CardContent>
//     </Card>
//   );
// }
