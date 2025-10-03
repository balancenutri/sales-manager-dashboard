import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import PitchedHistory from "./PitchedDetails";
import { useGetSalesProjectionQuery } from "@/service/dashboard/api";
import PageVisitModal from "./PageVisitModal";

export default function SalesProjection() {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<null | number>(null);
  const { data } = useGetSalesProjectionQuery();

  return (
    <Card className="w-full">
      <CardContent className="px-6">
        <div className="grid grid-cols-6 gap-6">
          {/* Total Pitched */}
          <div onClick={() => setOpenDialog(true)}>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200 hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div>
                    <h4 className="font-semibold text-gray-800">Rate Shared</h4>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-blue-600">
                    {data?.data.rate_shared.units}
                  </div>
                  <div className="text-sm text-black font-semibold">
                    ₹{data?.data.rate_shared.amount.toLocaleString("en-IN")}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200 hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div>
                    <h4 className="font-semibold text-gray-800">Link Shared</h4>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-blue-600">
                    {data?.data.link_shared.units}
                  </div>
                  <div className="text-sm text-green-600 font-semibold">
                    ₹{data?.data.link_shared.amount.toLocaleString("en-IN")}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* To Pay */}
          <div>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200 hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div>
                    <h4 className="font-semibold text-gray-800">To Pay</h4>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-blue-600">
                    {data?.data.total_to_pay.units}
                  </div>
                  <div className="text-sm text-black font-semibold">
                    ₹{data?.data.total_to_pay.amount.toLocaleString("en-IN")}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200 hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div>
                    <h4 className="font-semibold text-gray-800">Pay Later</h4>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-blue-600">
                    {data?.data.pay_later.units}
                  </div>
                  <div className="text-sm text-black font-semibold">
                    ₹{data?.data.pay_later.amount.toLocaleString("en-IN")}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Pay Later */}
          <div onClick={() => setOpenModal(1)}>
            <div className="bg-gradient-to-r flex items-center h-full from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200 hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-center w-full justify-between">
                <div className="flex items-center space-x-3">
                  <div>
                    <h4 className="font-semibold text-gray-800">Page Visit</h4>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-blue-600">
                    {data?.data.page_visits.total_page_visits}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div onClick={() => setOpenModal(2)}>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200 hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Checkout Vist
                    </h4>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-blue-600">
                    {data?.data.page_visits.total_checkout_visits}
                  </div>
                  <div className="text-sm text-black font-semibold">
                    ₹
                    {data?.data.page_visits.total_checkout_amount.toLocaleString(
                      "en-IN"
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent
          onInteractOutside={(e: React.MouseEvent | Event) =>
            e.preventDefault()
          }
          className="min-w-[80vw]"
        >
          <DialogHeader>
            <DialogTitle>Pitched History</DialogTitle>
          </DialogHeader>
          <PitchedHistory />
        </DialogContent>
      </Dialog>
      <Dialog open={!!openModal} onOpenChange={() => setOpenModal(null)}>
        <DialogContent
          onInteractOutside={(e: React.MouseEvent | Event) =>
            e.preventDefault()
          }
          className="min-w-[80vw]"
        >
          <DialogHeader>
            <DialogTitle>
              {openModal == 1 ? "Page Visits" : "Checkout Visit"}
            </DialogTitle>
          </DialogHeader>
          <PageVisitModal id={openModal} />
        </DialogContent>
      </Dialog>
    </Card>
  );
}
// import { Card, CardContent } from "@/components/ui/card";
// import { PieChart } from "lucide-react";
// import { useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import PitchedHistory from "./PitchedDetails";
// import { useGetSalesProjectionQuery } from "@/service/dashboard/api";

// export default function SalesProjection() {
//   const [hoveredCard, setHoveredCard] = useState<
//     "total" | "to_pay" | "pay_later" | null
//   >(null);

//   const [openDialog, setOpenDialog] = useState<boolean>(false);
//   const { data } = useGetSalesProjectionQuery();

//   console.log(data);

//   console.log({ openDialog });

//   const SalesHoverDetails = ({
//     type,
//     salesData,
//   }: {
//     type: string;
//     salesData: any;
//   }) => (
//     <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border p-4 z-20 animate-in slide-in-from-top-2 duration-200 min-w-[250px]">
//       <div className="flex items-center justify-between mb-4">
//         <h4 className="font-semibold text-lg capitalize">{type}</h4>
//         {/* <Badge variant="outline" className="text-xs">
//           {salesData.count} leads
//         </Badge> */}
//       </div>

//       {console.log({ salesData })}

//       {salesData?.linkShared && salesData?.rateShared && (
//         <div className="space-y-4">
//           {/* Rate Shared */}
//           <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
//             <div className="flex items-center space-x-2">
//               {/* <div className="p-1.5 bg-blue-500 rounded-lg">
//               <Share className="h-3 w-3 text-white" />
//             </div> */}
//               <span className="font-medium text-gray-700 dark:text-gray-300">
//                 {type == "Total Pitched" ? "Rate Shared" : "Today"}
//               </span>
//             </div>
//             <div className="text-right">
//               <div className="text-lg font-bold text-blue-600">
//                 {salesData?.rateShared.units}
//               </div>
//               <div className="text-xs text-green-600 font-semibold">
//                 ₹{salesData?.rateShared.amount.toLocaleString("en-IN")}
//               </div>
//             </div>
//           </div>

//           {/* Link Shared */}
//           <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
//             <div className="flex items-center space-x-2">
//               {/* <div className="p-1.5 bg-purple-500 rounded-lg">
//               <Link className="h-3 w-3 text-white" />
//             </div> */}
//               <span className="font-medium text-gray-700 dark:text-gray-300">
//                 {type == "Total Pitched" ? "Link Shared" : "Tomorrow"}
//               </span>
//             </div>
//             <div className="text-right">
//               <div className="text-lg font-bold text-purple-600">
//                 {salesData?.linkShared.units}
//               </div>
//               <div className="text-xs text-green-600 font-semibold">
//                 ₹{salesData?.linkShared.amount.toLocaleString("en-IN")}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );

//   return (
//     <Card className="w-full">
//       <CardContent className="px-6">
//         <div className="flex items-center justify-between mb-4">
//           <div className="flex items-center space-x-2">
//             <PieChart className="h-5 w-5 text-green-600" />
//             <h3 className="text-base font-semibold">Sales Projection</h3>
//           </div>
//           {/* <Badge variant="outline" className="text-sm">
//               Total: {totalLeads} leads
//             </Badge> */}
//         </div>

//         <div className="grid grid-cols-3 gap-6">
//           {/* Total Pitched */}
//           <div
//             className="relative"
//             onMouseEnter={() => setHoveredCard("total")}
//             onClick={() => setOpenDialog(true)}
//             onMouseLeave={() => setHoveredCard(null)}
//           >
//             <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200 hover:shadow-md transition-all cursor-pointer">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-3">
//                   {/* <div className="p-2 bg-blue-500 rounded-full">
//                     <PieChart className="h-5 w-5  text-white" />
//                   </div> */}
//                   <div>
//                     <h4 className="font-semibold text-gray-800">
//                       Total Pitched
//                     </h4>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <div className="text-lg font-bold text-blue-600">
//                     {data?.data.total_pitched.units}
//                   </div>
//                   <div className="text-sm text-green-600 font-semibold">
//                     ₹{data?.data.total_pitched.amount.toLocaleString("en-IN")}
//                   </div>
//                 </div>
//               </div>
//             </div>
//             {hoveredCard === "total" && (
//               <SalesHoverDetails
//                 type="Total Pitched"
//                 salesData={{
//                   count: data?.data.total_pitched.units,
//                   rateShared: data?.data.rate_shared,
//                   linkShared: data?.data.link_shared,
//                 }}
//               />
//             )}
//           </div>

//           {/* To Pay */}
//           <div
//             className="relative"
//             onMouseEnter={() => setHoveredCard("to_pay")}
//             onMouseLeave={() => setHoveredCard(null)}
//           >
//             <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200 hover:shadow-md transition-all cursor-pointer">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-3">
//                   {/* <div className="p-2 bg-green-500 rounded-full">
//                     <CheckCircle className="h-5 w-5 text-white" />
//                   </div> */}
//                   <div>
//                     <h4 className="font-semibold text-gray-800">To Pay</h4>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <div className="text-xl font-bold text-green-600">
//                     {data?.data.total_to_pay.units}
//                   </div>
//                   <div className="text-sm text-green-600 font-semibold">
//                     ₹{data?.data.total_to_pay.amount.toLocaleString("en-IN")}
//                   </div>
//                 </div>
//               </div>
//             </div>
//             {hoveredCard === "to_pay" && (
//               <SalesHoverDetails
//                 type="To Pay"
//                 salesData={{
//                   count: data?.data.total_to_pay.units,
//                   rateShared: data?.data.today_to_pay,
//                   linkShared: data?.data.tomorrow_to_pay,
//                 }}
//               />
//             )}
//           </div>

//           {/* Pay Later */}
//           <div
//             className="relative"
//             // onMouseEnter={() => setHoveredCard("pay_later")}
//             // onMouseLeave={() => setHoveredCard(null)}
//           >
//             <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg p-4 border border-orange-200 hover:shadow-md transition-all cursor-pointer">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-3">
//                   {/* <div className="p-2 bg-orange-500 rounded-full">
//                     <Clock className="h-5 w-5 text-white" />
//                   </div> */}
//                   <div>
//                     <h4 className="font-semibold text-gray-800">Pay Later</h4>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <div className="text-xl font-bold text-orange-600">
//                     {data?.data.pay_later.units}
//                   </div>
//                   <div className="text-sm text-green-600 font-semibold">
//                     ₹{data?.data.pay_later.amount.toLocaleString("en-IN")}
//                   </div>
//                 </div>
//               </div>
//             </div>
//             {/* {hoveredCard === "pay_later" && (
//               <SalesHoverDetails
//                 type="Pay Later"
//                 salesData={data.salesProjection.payLater}
//               />
//             )} */}
//           </div>
//         </div>
//       </CardContent>

//       <Dialog open={openDialog} onOpenChange={setOpenDialog}>
//         <DialogContent
//           onInteractOutside={(e: React.MouseEvent | Event) =>
//             e.preventDefault()
//           }
//           className="min-w-[80vw]"
//         >
//           <DialogHeader>
//             <DialogTitle>Pitched History</DialogTitle>
//           </DialogHeader>
//           <PitchedHistory />
//         </DialogContent>
//       </Dialog>
//     </Card>
//   );
// }
