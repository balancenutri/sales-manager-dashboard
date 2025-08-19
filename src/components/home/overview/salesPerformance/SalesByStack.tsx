import { useGetSaleByStackQuery } from "@/service/dashboard/api";

export default function SalesByStack({
  dataType,
}: {
  dataType: "sales" | "revenue";
}) {
  const { data, isFetching } = useGetSaleByStackQuery();

  type ProgramCategoryData = {
    program_category: string;
    sales: number;
    revenue: number | string;
  };

  function getTotalSalesAndRevenue(data: ProgramCategoryData[]) {
    return data.reduce(
      (totals, item) => {
        totals.totalSales += item.sales;
        totals.totalRevenue +=
          typeof item.revenue === "string"
            ? parseFloat(item.revenue)
            : item.revenue;
        return totals;
      },
      { totalSales: 0, totalRevenue: 0 }
    );
  }

  const totalData: {
    totalSales: number;
    totalRevenue: number;
  } = data?.data
    ? getTotalSalesAndRevenue(data.data)
    : {
        totalRevenue: 0,
        totalSales: 0,
      };

  console.log(data, isFetching);
  return (
    <div>
      <div className="space-y-4">
        {data?.data &&
          data.data.map((type) => {
            const percentage =
              dataType == "sales"
                ? ((type.sales / totalData.totalSales) * 100).toFixed(1)
                : ((type.revenue / totalData.totalRevenue) * 100).toFixed(1);

            return (
              <div
                key={type.program_category}
                className="flex items-center justify-between p-2 px-4 rounded-lg bg-gray-50"
              >
                <div className="flex items-center space-x-3">
                  {/* <div className={`w-3 h-3 rounded-full`}></div> */}
                  <span className="font-medium">{type.program_category}</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-lg">{dataType === "revenue" ? `₹${type[dataType]}` : type[dataType]}</div>
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
            <p className="text-xl font-bold">{totalData.totalSales}</p>
          </div>
          <div className="text-center">
            <p className="text-muted-foreground">Total Revenue</p>
            <p className="text-xl font-bold">₹{totalData.totalRevenue}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
