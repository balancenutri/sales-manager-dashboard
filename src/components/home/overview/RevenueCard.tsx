import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
// import { useToast } from "@/components/ui/use-toast" // Import useToast
// import { Toaster } from "@/components/ui/toaster" // Import Toaster
import { Target, TrendingUp, ArrowUp } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useGetSalesPerformanceQuery } from "@/service/dashboard/api";
import { Skeleton } from "@/components/ui/skeleton";
import SalesByStack from "./salesPerformance/SalesByStack";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function RevenueCard() {
  const [showRevenueModal, setShowRevenueModal] = useState<boolean>(false);
  const [showSalesModal, setShowSalesModal] = useState<boolean>(false);

  const handleRevenueClick = () => {
    setShowRevenueModal(true);
  };

  const handleSalesClick = () => {
    // setModalType("sales");
    setShowSalesModal(true);
  };

  const { data: salesPerformanceData } = useGetSalesPerformanceQuery();

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      {/* Combined Sales & Revenue Card */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Overall Sales Performance (Lead & OC)
          </CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="space-y-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className="flex items-center justify-between p-2 rounded-lg bg-green-50 hover:bg-green-100 transition-colors cursor-pointer"
                  onClick={handleSalesClick}
                >
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Sales Closed
                    </p>
                    {salesPerformanceData?.data ? (
                      <p className="text-2xl font-bold">
                        {salesPerformanceData?.data.sales_closed}
                      </p>
                    ) : (
                      <Skeleton className="h-5 w-20 mt-2" />
                    )}
                  </div>
                  <ArrowUp className="h-4 w-4 text-green-500" />
                </div>
              </TooltipTrigger>
              <TooltipContent className="p-0 bg-white border border-gray-200 shadow-lg rounded-lg max-w-xs">
                <div className="p-2">
                  <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <h4 className="font-semibold text-gray-900 text-sm">
                      Sales Closed
                    </h4>
                  </div>
                  <div className="grid grid-cols-2 gap-3 m-3">
                    <div className="text-center p-2 bg-green-50 rounded-md">
                      <p className="text-xs text-gray-600 font-medium">
                        Mentor
                      </p>
                      <p className="text-sm font-bold text-green-700">10</p>
                    </div>
                    <div className="text-center p-2 bg-blue-50 rounded-md">
                      <p className="text-xs text-gray-600 font-medium">
                        Counsellor
                      </p>
                      <p className="text-sm font-bold text-blue-700">40</p>
                    </div>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className="flex items-center justify-between p-2 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer"
                  onClick={handleRevenueClick}
                >
                  <div>
                    <p className="text-sm text-muted-foreground">Revenue</p>
                    {salesPerformanceData?.data ? (
                      <p className="text-xl font-bold">
                        ₹ {salesPerformanceData?.data.revenue}
                      </p>
                    ) : (
                      <Skeleton className="h-5 w-20 mt-2" />
                    )}
                  </div>
                  {salesPerformanceData?.data && (
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">
                        Target: ₹{salesPerformanceData?.data.target}
                      </p>
                      <p className="text-xs text-orange-600">
                        Pending: ₹{salesPerformanceData?.data.pending_target}
                      </p>
                    </div>
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent className="p-0 bg-white border border-gray-200 shadow-lg rounded-lg max-w-xs">
                <div className="p-2">
                  <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <h4 className="font-semibold text-gray-900 text-sm">
                      Revenue
                    </h4>
                  </div>
                  <div className="grid grid-cols-2 gap-3 m-3">
                    <div className="text-center p-2 bg-green-50 rounded-md">
                      <p className="text-xs text-gray-600 font-medium">
                        Mentor
                      </p>
                      <p className="text-sm font-bold text-green-700">₹10000</p>
                    </div>
                    <div className="text-center p-2 bg-blue-50 rounded-md">
                      <p className="text-xs text-gray-600 font-medium">
                        Counsellor
                      </p>
                      <p className="text-sm font-bold text-blue-700">₹4000</p>
                    </div>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Revenue Target Progress</span>
              {salesPerformanceData?.data ? (
                <span>
                  {salesPerformanceData?.data.revenue_target_progress}%
                </span>
              ) : (
                <Skeleton className="h-5 w-20 mt-2" />
              )}
            </div>
            <Progress
              value={Number(salesPerformanceData?.data.revenue_target_progress)}
              className="h-2"
            />
          </div>
          <div className="flex items-center justify-between pt-2 border-t">
            <div>
              <p className="text-sm text-muted-foreground">Conversion Rate</p>
              {salesPerformanceData?.data ? (
                <p className="text-lg font-bold text-teal-600">
                  {salesPerformanceData?.data.conversion_rate}%
                </p>
              ) : (
                <Skeleton className="h-3 w-16 mt-2" />
              )}
            </div>
            <TrendingUp className="h-4 w-4 text-teal-500" />
          </div>
        </CardContent>
      </Card>

      <Dialog open={showRevenueModal} onOpenChange={setShowRevenueModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Revenue Breakdown by Stack Type</DialogTitle>
            <DialogDescription>
              Distribution of revenue across different nutrition stacks
            </DialogDescription>
          </DialogHeader>
          <SalesByStack dataType="revenue" />
        </DialogContent>
      </Dialog>

      <Dialog open={showSalesModal} onOpenChange={setShowSalesModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Sales Breakdown by Stack Type</DialogTitle>
            <DialogDescription>
              Distribution of sales across different nutrition stacks
            </DialogDescription>
          </DialogHeader>
          <SalesByStack dataType="sales" />
        </DialogContent>
      </Dialog>
    </div>
  );
}
