import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
// import { useToast } from "@/components/ui/use-toast" // Import useToast
// import { Toaster } from "@/components/ui/toaster" // Import Toaster
import { Target, TrendingUp, ArrowUp } from "lucide-react";
import { mockData } from "@/lib/data";
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

  const { data: salesPerformanceData } =
    useGetSalesPerformanceQuery();

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      {/* Combined Sales & Revenue Card */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Sales Performance
          </CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="space-y-3">
          <div
            className="flex items-center justify-between p-2 rounded-lg bg-green-50 hover:bg-green-100 transition-colors cursor-pointer"
            onClick={handleSalesClick}
          >
            <div>
              <p className="text-sm text-muted-foreground">Sales Closed</p>
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
          <div className="space-y-4">
            {Object.entries(mockData.salesTypes).map(([type, count]) => {
              const percentage = (
                (count / mockData.overview.totalSales) *
                100
              ).toFixed(1);
              const getStackColor = (stackType: string) => {
                switch (stackType) {
                  case "basicStack":
                    return "bg-blue-500";
                  case "specialStack":
                    return "bg-green-500";
                  case "platinumStack":
                    return "bg-purple-500";
                  default:
                    return "bg-gray-500";
                }
              };
              const getStackName = (stackType: string) => {
                switch (stackType) {
                  case "basicStack":
                    return "Basic Stack";
                  case "specialStack":
                    return "Special Stack";
                  case "platinumStack":
                    return "Platinum Stack";
                  default:
                    return type;
                }
              };
              return (
                <div
                  key={type}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-3 h-3 rounded-full ${getStackColor(type)}`}
                    ></div>
                    <span className="font-medium">{getStackName(type)}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-lg">{count}</div>
                    <div className="text-xs text-muted-foreground">
                      {percentage}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="pt-4 border-t">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center">
                <p className="text-muted-foreground">Total Sales</p>
                <p className="text-xl font-bold">
                  {mockData.overview.totalSales}
                </p>
              </div>
              <div className="text-center">
                <p className="text-muted-foreground">Total Revenue</p>
                <p className="text-xl font-bold">
                  ₹{(mockData.overview.revenue / 1000).toFixed(0)}K
                </p>
              </div>
            </div>
          </div>
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
          <div className="space-y-4">
            {Object.entries(mockData.salesTypes).map(([type, count]) => {
              const percentage = (
                (count / mockData.overview.totalSales) *
                100
              ).toFixed(1);
              const getStackColor = (stackType: string) => {
                switch (stackType) {
                  case "basicStack":
                    return "bg-blue-500";
                  case "specialStack":
                    return "bg-green-500";
                  case "platinumStack":
                    return "bg-purple-500";
                  default:
                    return "bg-gray-500";
                }
              };
              const getStackName = (stackType: string) => {
                switch (stackType) {
                  case "basicStack":
                    return "Basic Stack";
                  case "specialStack":
                    return "Special Stack";
                  case "platinumStack":
                    return "Platinum Stack";
                  default:
                    return type;
                }
              };
              return (
                <div
                  key={type}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-3 h-3 rounded-full ${getStackColor(type)}`}
                    ></div>
                    <span className="font-medium">{getStackName(type)}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-lg">{count}</div>
                    <div className="text-xs text-muted-foreground">
                      {percentage}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="pt-4 border-t">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center">
                <p className="text-muted-foreground">Total Sales</p>
                <p className="text-xl font-bold">
                  {mockData.overview.totalSales}
                </p>
              </div>
              <div className="text-center">
                <p className="text-muted-foreground">Total Revenue</p>
                <p className="text-xl font-bold">
                  ₹{(mockData.overview.revenue / 1000).toFixed(0)}K
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
