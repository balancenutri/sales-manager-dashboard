// // import { Card, CardContent, CardHeader } from "@/components/ui/card";
// // import { Badge } from "@/components/ui/badge";
// // import CustomDatePicker from "@/components/ui/custom-date-picker";
// // import { useState } from "react";
// // import dayjs from "dayjs";

// // export default function CompactPerformanceCard() {
// //   const [selectedDate, setSelectedDate] = useState<Date | null>(null);

// //   const formatCurrency = (amount: number) =>
// //     new Intl.NumberFormat("en-IN", {
// //       style: "currency",
// //       currency: "INR",
// //       maximumFractionDigits: 0,
// //     }).format(amount);

// //   const performanceData = {
// //     name: "Krishna Sidhpura",
// //     source: "Google Ads",
// //     bestSource: "Health Score",
// //     leadsAssigned: 124,
// //     consultations: 89,
// //     paymentDetailsShared: 89444,
// //     salesClosed: 42,
// //     revenue: 844444,
// //     hot: 10,
// //     warm: 6,
// //     cold: 15,
// //     toEngage: 12,
// //   };

// //   return (
// //     <Card className="w-full max-w-md">
// //       <CardHeader className="pb-3">
// //         <div className="flex items-center justify-between gap-2">
// //           <div className="flex gap-2 items-center">
// //             <h3 className="font-semibold text-sm leading-none">
// //               {performanceData.name}
// //             </h3>
// //             <Badge variant="default" className="h-5 text-xs">
// //               {performanceData.source}
// //             </Badge>
// //           </div>
// //           <CustomDatePicker
// //             selected={selectedDate}
// //             onChange={(date) => setSelectedDate(date)}
// //             showMonthYearPicker={true}
// //             dateFormat="MM/yyyy"
// //             maxDate={dayjs().toDate()}
// //             className="h-8 w-32"
// //             clearable={true}
// //           />
// //         </div>
// //       </CardHeader>
// //       <CardContent className="pt-2">
// //         <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
// //           {performanceData.bestSource && (
// //             <div>
// //               <p className="text-muted-foreground">Best Source</p>
// //               <p className="font-semibold">{performanceData.bestSource}</p>
// //             </div>
// //           )}
// //           <div>
// //             <p className="text-muted-foreground">Leads Assigned</p>
// //             <p className="font-semibold">{performanceData.leadsAssigned}</p>
// //           </div>
// //           <div>
// //             <p className="text-muted-foreground">Consultation</p>
// //             <p className="font-semibold">{performanceData.consultations}</p>
// //           </div>
// //           <div>
// //             <p className="text-muted-foreground">Payment Details Shared</p>
// //             <p className="font-semibold text-blue-600">
// //               {formatCurrency(performanceData.paymentDetailsShared)}
// //             </p>
// //           </div>
// //           <div>
// //             <p className="text-muted-foreground">Sales Closed</p>
// //             <p className="font-semibold text-green-600">
// //               {performanceData.salesClosed}
// //             </p>
// //           </div>
// //           <div>
// //             <p className="text-muted-foreground">Revenue</p>
// //             <p className="font-semibold">
// //               {formatCurrency(performanceData.revenue)}
// //             </p>
// //           </div>
// //         </div>

// //         <div>
// //           <div className="grid grid-cols-4 border-t-2 mt-2 pt-2">
// //             <div className="flex flex-col justify-center items-center">
// //               <p className="text-muted-foreground">Hot</p>
// //               <p className="font-semibold text-green-600">
// //                 {performanceData.hot}
// //               </p>
// //             </div>
// //             <div className="flex flex-col justify-center items-center">
// //               <p className="text-muted-foreground">Warm</p>
// //               <p className="font-semibold text-green-600">
// //                 {performanceData.warm}
// //               </p>
// //             </div>
// //             <div className="flex flex-col justify-center items-center">
// //               <p className="text-muted-foreground">Cold</p>
// //               <p className="font-semibold text-green-600">
// //                 {performanceData.cold}
// //               </p>
// //             </div>
// //             <div className="flex flex-col justify-center items-center">
// //               <p className="text-muted-foreground">To Engage</p>
// //               <p className="font-semibold text-green-600">
// //                 {performanceData.toEngage}
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //       </CardContent>
// //     </Card>
// //   );
// // }

// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import CustomDatePicker from "@/components/ui/custom-date-picker";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import { useState } from "react";
// import dayjs from "dayjs";
// import { useGetAssignedLeadPerformanceAllQuery } from "@/service/dashboard/api";

// export default function CompactPerformanceCard() {
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null);

//   const { data, isLoading } = useGetAssignedLeadPerformanceAllQuery({
//     start_date: "",
//     end_date: "",
//   });

//   console.log({ data, isLoading });

//   const formatCurrency = (amount: number) =>
//     new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//       maximumFractionDigits: 0,
//     }).format(amount);

//   const performanceData = {
//     name: "Krishna Sidhpura",
//     source: "Google Ads",
//     bestSource: "Health Score",
//     leadsAssigned: 124,
//     consultations: 89,
//     paymentDetailsShared: 89444,
//     salesClosed: 42,
//     revenue: 844444,
//     hot: 10,
//     warm: 6,
//     cold: 15,
//     toEngage: 12,
//   };

//   const ratio = (a: number, b: number) => (b === 0 ? "0" : (a / b).toFixed(2));

//   return (
//     <Card className="w-full max-w-md">
//       <CardHeader className="pb-3">
//         <div className="flex items-center justify-between gap-2">
//           <div className="flex gap-2 items-center">
//             <h3 className="font-semibold text-sm leading-none">
//               {performanceData.name}
//             </h3>
//             <Badge variant="default" className="h-5 text-xs">
//               Fair
//             </Badge>
//           </div>
//           <CustomDatePicker
//             selected={selectedDate}
//             onChange={(date) => setSelectedDate(date)}
//             showMonthYearPicker
//             dateFormat="MM/yyyy"
//             maxDate={dayjs().toDate()}
//             className="h-8 w-32"
//             clearable
//           />
//         </div>
//       </CardHeader>

//       <CardContent className="-mt-4">
//         {/* ✅ TABS SECTION */}
//         {/* <Tabs defaultValue="all" className="w-full mb-3">
//           <TabsList className="grid grid-cols-4 w-full">
//             <TabsTrigger value="all">All</TabsTrigger>
//             <TabsTrigger value="fl">FL</TabsTrigger>
//             <TabsTrigger value="ol">OL</TabsTrigger>
//             <TabsTrigger value="oc">OC</TabsTrigger>
//           </TabsList>

//           <TabsContent value="all" className="mt-4">
//           </TabsContent>
//         </Tabs> */}
//           {/* ✅ ALL TAB (show everything) */}

//             <div className="grid grid-cols-3 gap-3 text-sm">
//               <div>
//                 <p className="text-muted-foreground">Best Source</p>
//                 <p className="font-semibold">{performanceData.bestSource}</p>
//               </div>

//               <div>
//                 <p className="text-muted-foreground">Leads Assigned</p>
//                 <p className="font-semibold">{performanceData.leadsAssigned}</p>
//               </div>

//               <div>
//                 <p className="text-muted-foreground">Consultation</p>
//                 <p className="font-semibold">{performanceData.consultations}</p>
//               </div>

//               <div>
//                 <p className="text-muted-foreground">Payment Shared</p>
//                 <p className="font-semibold text-blue-600">
//                   {formatCurrency(performanceData.paymentDetailsShared)}
//                 </p>
//               </div>

//               <div>
//                 <p className="text-muted-foreground">Sales Closed</p>
//                 <p className="font-semibold text-green-600">
//                   {performanceData.salesClosed}
//                 </p>
//               </div>

//               <div>
//                 <p className="text-muted-foreground">Revenue</p>
//                 <p className="font-semibold">
//                   {formatCurrency(performanceData.revenue)}
//                 </p>
//               </div>
//             </div>
//         {/* ✅ RATIO SECTION */}
//         <div className="mt-3 p-3 rounded-lg bg-gray-50 border text-sm">
//           <div className="grid grid-cols-3 text-center">
//             <div>
//               <p className="text-muted-foreground text-xs">L : C</p>
//               <p className="font-semibold">
//                 {ratio(
//                   performanceData.leadsAssigned,
//                   performanceData.consultations
//                 )}{" "}
//                 %
//               </p>
//             </div>
//             <div>
//               <p className="text-muted-foreground text-xs">C : S</p>
//               <p className="font-semibold">
//                 {ratio(
//                   performanceData.consultations,
//                   performanceData.salesClosed
//                 )}{" "}
//                 %
//               </p>
//             </div>
//             <div>
//               <p className="text-muted-foreground text-xs">L : S</p>
//               <p className="font-semibold">
//                 {ratio(
//                   performanceData.leadsAssigned,
//                   performanceData.salesClosed
//                 )}{" "}
//                 %
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* ✅ HOT / WARM / COLD / ENGAGE */}
//         <div className="grid grid-cols-4 border-t-2 mt-3 pt-2">
//           <div className="flex flex-col justify-center items-center">
//             <p className="text-muted-foreground">Hot</p>
//             <p className="font-semibold text-green-600">
//               {performanceData.hot}
//             </p>
//           </div>
//           <div className="flex flex-col justify-center items-center">
//             <p className="text-muted-foreground">Warm</p>
//             <p className="font-semibold text-green-600">
//               {performanceData.warm}
//             </p>
//           </div>
//           <div className="flex flex-col justify-center items-center">
//             <p className="text-muted-foreground">Cold</p>
//             <p className="font-semibold text-green-600">
//               {performanceData.cold}
//             </p>
//           </div>
//           <div className="flex flex-col justify-center items-center">
//             <p className="text-muted-foreground">To Engage</p>
//             <p className="font-semibold text-green-600">
//               {performanceData.toEngage}
//             </p>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { AssignedLeadPerformanceAll } from "@/lib/types";
import { useState } from "react";
import CounsellorDailyPerformance from "../overview/counsellorPerformance/CounsellorDailyPerformance";
import { keyString } from "@/lib/utils";
import dayjs from "dayjs";

export default function AllCounsellorCard({
  performanceData,
}: {
  performanceData: AssignedLeadPerformanceAll;
}) {
  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  const [openModal, setOpenModal] = useState<number | undefined>(undefined);

  return (
    <>
      <Card
        className="w-full max-w-md"
        onClick={() => setOpenModal(performanceData?.admin_user_id)}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex gap-2 items-center">
              <h3 className="font-semibold text-sm leading-none">
                {performanceData.crm_user}
              </h3>
              {/* <Badge variant="default" className="h-5 text-xs">
              Fair
            </Badge> */}
            </div>
          </div>
        </CardHeader>

        <CardContent className="-mt-4">
          <div className="grid grid-cols-3 gap-3 text-sm">
            <div>
              <p className="text-muted-foreground">Best Source</p>
              <p className="font-semibold">
                {performanceData.best_source_performance || "N/A"}
              </p>
            </div>

            <div>
              <p className="text-muted-foreground">Leads Assigned</p>
              <p className="font-semibold">{performanceData.leads_assigned}</p>
            </div>

            <div>
              <p className="text-muted-foreground">Consultation</p>
              <p className="font-semibold">{performanceData.consultations}</p>
            </div>

            <div>
              <p className="text-muted-foreground">Sales Closed</p>
              <p className="font-semibold text-green-600">
                {performanceData.sales}
              </p>
            </div>

            <div>
              <p className="text-muted-foreground">Revenue</p>
              <p className="font-semibold text-blue-600">
                {formatCurrency(performanceData.revenue)}
              </p>
            </div>
          </div>

          {/* ✅ RATIO SECTION */}
          <div className="mt-3 p-3 rounded-lg bg-gray-50 border text-sm">
            <div className="grid grid-cols-3 text-center">
              <div>
                <p className="text-muted-foreground text-xs">L : C</p>
                <p className="font-semibold">{performanceData["l:c"]}%</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">C : S</p>
                <p className="font-semibold">{performanceData["c:s"]}%</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">L : S</p>
                <p className="font-semibold">{performanceData["l:s"]}%</p>
              </div>
            </div>
          </div>

          {/* ✅ HOT / WARM / COLD / ENGAGE */}
          <div className="grid grid-cols-4 border-t-2 mt-3 pt-2">
            <div className="flex flex-col justify-center items-center">
              <p className="text-muted-foreground">Hot</p>
              <p className="font-semibold text-green-600">
                {performanceData.lead_assigned_sales_status_count.hot}
              </p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <p className="text-muted-foreground">Warm</p>
              <p className="font-semibold text-green-600">
                {performanceData.lead_assigned_sales_status_count.warm}
              </p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <p className="text-muted-foreground">Cold</p>
              <p className="font-semibold text-green-600">
                {performanceData.lead_assigned_sales_status_count.cold}
              </p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <p className="text-muted-foreground">To Engage</p>
              <p className="font-semibold text-green-600">
                {performanceData.lead_assigned_sales_status_count.to_engage}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!openModal} onOpenChange={() => setOpenModal(undefined)}>
        <DialogContent className="min-w-[90vw]">
          <CardHeader>
            <CardTitle>{keyString(performanceData?.crm_user)} Daily Performance ({dayjs().format("MMM YYYY")})</CardTitle>
          </CardHeader>
          <CounsellorDailyPerformance id={openModal} />
        </DialogContent>
      </Dialog>
    </>
  );
}
