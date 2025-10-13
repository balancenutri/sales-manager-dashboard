import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { keyString } from "@/lib/utils";
import { useGetSalesAlertQuery } from "@/service/dashboard/api";
import { useState } from "react";
import SalesAlertData from "../dataTables/SalesAlertData";

type SelectedApi =
  | "wallet_expiring_tomorrow"
  | "HOT_lead_with_negative_feedback"
  | "good_weight_loss"
  | "HOT_followups_pending"
  | "milestone"
  | "leads_with_e_kit_pro"
  | null;

export default function SalesAlert() {
  const { data, isFetching } = useGetSalesAlertQuery();

  const [selected, setSelected] = useState<string | null>(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Alert</CardTitle>
        <CardDescription>Counsellor Sales Alert</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {isFetching || !data?.data
          ? Array(5)
              .fill(null)
              .map((_, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b pb-2"
                >
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-5 w-20" />
                </div>
              ))
          : Object.entries(data?.data).map(([key, value]) => {
              return (
                <div
                  className="flex items-center justify-between border-b pb-2 cursor-pointer"
                  key={key}
                  onClick={() => setSelected(key)}
                >
                  <div className="flex items-center space-x-3">
                    <span className="font-medium text-sm">
                      {keyString(key)}
                    </span>
                  </div>
                  <div className="font-semibold text-sm">
                    {value != null && !isNaN(Number(value)) ? (
                      value
                    ) : (
                      <Skeleton className="h-6" />
                    )}
                  </div>
                </div>
              );
            })}
      </CardContent>
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="min-w-[90vw]">
          <CardHeader>
            <CardTitle>{keyString(selected ?? "")}</CardTitle>
          </CardHeader>
          <SalesAlertData selected={selected as SelectedApi} />
        </DialogContent>
      </Dialog>
    </Card>
  );
}
