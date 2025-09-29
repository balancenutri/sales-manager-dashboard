import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetQuickSalesSnapshotQuery } from "@/service/dashboard/api";

export default function SalesSnapshots() {
  const { data: quickData, isFetching } = useGetQuickSalesSnapshotQuery();
  const data = quickData?.data;
  const monthlyData = [
    { name: "Avg. FL / day", value: Math.round(data?.monthly.fl || 0) },
    { name: "Avg. OL / day", value: Math.round(data?.monthly.ol || 0) },
    { name: "Avg. Cons. / day", value: Math.round(data?.monthly.consultations || 0) },
    { name: "Avg. Sale / day", value: `₹${data?.monthly.sales?.toLocaleString("en-IN")}` },
  ];
  const yesterdayData = [
    { name: "Yest. FL", value: Math.round(data?.yesterday.fl || 0) },
    { name: "Yest. OL", value: Math.round(data?.yesterday.ol || 0) },
    { name: "Yest. Cons.", value: Math.round(data?.yesterday.consultations || 0) },
    { name: "Yest. Sale", value: `₹${data?.yesterday.sales?.toLocaleString("en-IN")}` },
  ];

  return (
    <div className="grid grid-cols-2 gap-6">
      <Card className="px-4">
        <div className="grid grid-cols-4 gap-4">
          {monthlyData.map((item) => (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-2 border border-green-200 dark:border-green-800 hover:shadow-md transition-all duration-300 cursor-pointer">
              <div className="text-center">
                <h4 className="font-medium text-base text-gray-800 dark:text-gray-200">
                  {item.name}
                </h4>
                {isFetching ? <Skeleton className="h-5 w-16" /> :<div className="text-xl font-bold">{item.value}</div>}
              </div>
            </div>
          ))}
        </div>
      </Card>
      <Card className="px-4">
        <div className="grid grid-cols-4 gap-4  ">
          {yesterdayData.map((item) => (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-2 border border-green-200 dark:border-green-800 hover:shadow-md transition-all duration-300 cursor-pointer">
              <div className="text-center">
                <h4 className="font-medium text-base text-gray-800 dark:text-gray-200">
                  {item.name}
                </h4>
                {isFetching ? <Skeleton className="h-5 w-16" /> :<div className="text-xl font-bold">{item.value}</div>}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
