import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { keyString } from "@/lib/utils";
// import {
//   useGetLeadMtdSalesRisksQuery,
//   useGetLeadRiskAndMissesQuery,
// } from "@/service/dashboard/api";

export default function SalesAlert() {
  //   const { data: leadRiskAndMissesData, isFetching: leadRiskAndMissesFetching } =
  //     useGetLeadRiskAndMissesQuery();
  //   const { data: leadSalesRiskData, isFetching: leadSalesRiskFetching } =
  //     useGetLeadMtdSalesRisksQuery();

  const data = {
    lead_with_e_kit_pro: 2,
    good_weight_loss: 1,
    milestone: 2,
    wallet_expiring_tomorrow: 3,
    hot_lead_with_negative_feedback: 4,
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Alert</CardTitle>
        <CardDescription>Counsellor Sales Alert</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {
          // isFetching || !data?.data
          //   ? skeletonArray.map((_, index: number) => (
          //       <div
          //         key={index}
          //         className="flex items-center justify-between border-b pb-2"
          //       >
          //         <Skeleton className="h-5 w-20" />
          //         <Skeleton className="h-5 w-20" />
          //       </div>
          //     ))
          //   :
          Object.entries(data).map(([key, value]) => {
            //   const Icon = allIcons[key] || BookText;
            return (
              <div
                className="flex items-center justify-between border-b pb-2"
                key={key}
              >
                <div className="flex items-center space-x-3">
                  {/* <Icon className="h-4 w-4 text-orange-500" /> */}
                  <span className="font-medium">{keyString(key)}</span>
                </div>
                <div className="font-semibold text-lg">
                  {value ? value : <Skeleton className="h-6" />}
                </div>
              </div>
            );
          })
        }
      </CardContent>
    </Card>
  );
}
