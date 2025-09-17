import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PieChart } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import PitchedHistory from "./PitchedDetails";

interface SimpleRowMetricsData {
  hot: {
    count: number;
    dayWiseData: {
      day3: { engagement: number; conversions: number; clicks: number };
      day5: { engagement: number; conversions: number; clicks: number };
      day7: { engagement: number; conversions: number; clicks: number };
    };
  };
  warm: {
    count: number;
    dayWiseData: {
      day3: { engagement: number; conversions: number; clicks: number };
      day5: { engagement: number; conversions: number; clicks: number };
      day7: { engagement: number; conversions: number; clicks: number };
    };
  };
  salesProjection: {
    totalPitched: {
      count: number;
      amount: number;
      rateShared: { units: number; amount: number };
      linkShared: { units: number; amount: number };
    };
    toPay: {
      count: number;
      amount: number;
      rateShared: { units: number; amount: number };
      linkShared: { units: number; amount: number };
    };
    payLater: {
      count: number;
      amount: number;
      rateShared: { units: number; amount: number };
      linkShared: { units: number; amount: number };
    };
  };
}

interface SimpleLeadMetricsProps {
  data: SimpleRowMetricsData;
}

export default function SalesProjection({ data }: SimpleLeadMetricsProps) {
  const [hoveredCard, setHoveredCard] = useState<
    "total" | "to_pay" | "pay_later" | null
  >(null);

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  console.log({ openDialog });

  const SalesHoverDetails = ({
    type,
    salesData,
  }: {
    type: string;
    salesData: any;
  }) => (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border p-4 z-20 animate-in slide-in-from-top-2 duration-200 min-w-[250px]">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-lg capitalize">{type}</h4>
        <Badge variant="outline" className="text-xs">
          {salesData.count} leads
        </Badge>
      </div>

      <div className="space-y-4">
        {/* Rate Shared */}
        <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="flex items-center space-x-2">
            {/* <div className="p-1.5 bg-blue-500 rounded-lg">
              <Share className="h-3 w-3 text-white" />
            </div> */}
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {type == "total" ? "Rate Shared" : "Today"}
            </span>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-blue-600">
              {salesData.rateShared.units}
            </div>
            <div className="text-xs text-green-600 font-semibold">
              ₹{salesData.rateShared.amount.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Link Shared */}
        <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <div className="flex items-center space-x-2">
            {/* <div className="p-1.5 bg-purple-500 rounded-lg">
              <Link className="h-3 w-3 text-white" />
            </div> */}
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {type == "total" ? "Link Shared" : "Tomorrow"}
            </span>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-purple-600">
              {salesData.linkShared.units}
            </div>
            <div className="text-xs text-green-600 font-semibold">
              ₹{salesData.linkShared.amount.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Card className="w-full">
      <CardContent className="px-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <PieChart className="h-5 w-5 text-green-600" />
            <h3 className="text-base font-semibold">Sales Projection</h3>
          </div>
          {/* <Badge variant="outline" className="text-sm">
              Total: {totalLeads} leads
            </Badge> */}
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Total Pitched */}
          <div
            className="relative"
            onMouseEnter={() => setHoveredCard("total")}
            onClick={() => setOpenDialog(true)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200 hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {/* <div className="p-2 bg-blue-500 rounded-full">
                    <PieChart className="h-5 w-5  text-white" />
                  </div> */}
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Total Pitched
                    </h4>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-blue-600">
                    {data.salesProjection.totalPitched.count}
                  </div>
                  <div className="text-sm text-green-600 font-semibold">
                    ₹{data.salesProjection.totalPitched.amount.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
            {hoveredCard === "total" && (
              <SalesHoverDetails
                type="Total Pitched"
                salesData={data.salesProjection.totalPitched}
              />
            )}
          </div>

          {/* To Pay */}
          <div
            className="relative"
            onMouseEnter={() => setHoveredCard("to_pay")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200 hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {/* <div className="p-2 bg-green-500 rounded-full">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div> */}
                  <div>
                    <h4 className="font-semibold text-gray-800">To Pay</h4>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">
                    {data.salesProjection.toPay.count}
                  </div>
                  <div className="text-sm text-green-600 font-semibold">
                    ₹{data.salesProjection.toPay.amount.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
            {hoveredCard === "to_pay" && (
              <SalesHoverDetails
                type="To Pay"
                salesData={data.salesProjection.toPay}
              />
            )}
          </div>

          {/* Pay Later */}
          <div
            className="relative"
            // onMouseEnter={() => setHoveredCard("pay_later")}
            // onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg p-4 border border-orange-200 hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {/* <div className="p-2 bg-orange-500 rounded-full">
                    <Clock className="h-5 w-5 text-white" />
                  </div> */}
                  <div>
                    <h4 className="font-semibold text-gray-800">Pay Later</h4>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-orange-600">
                    {data.salesProjection.payLater.count}
                  </div>
                  <div className="text-sm text-green-600 font-semibold">
                    ₹{data.salesProjection.payLater.amount.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
            {hoveredCard === "pay_later" && (
              <SalesHoverDetails
                type="Pay Later"
                salesData={data.salesProjection.payLater}
              />
            )}
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
    </Card>
  );
}
