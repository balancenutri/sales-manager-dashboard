import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { keyString } from "@/lib/utils";
import { useGetLeadRiskAndMissesQuery } from "@/service/dashboard/api";
import { useState } from "react";
import RiskAndOdsData from "../dataTables/RiskAndOdsData";

type SelectedKeys =
  | "balance_payment_overdue"
  | "engagement_missed"
  | "follow_up_missed"
  | "cross_call_OD"
  | "calls_missed";

export default function RiskMissesAndOds() {
  const { data, isFetching } = useGetLeadRiskAndMissesQuery();

  const hiddenKey: string[] = [
    "consultation_feedback_missed",
    "additional_questions_pending",
    "leads_without_app",
  ];

  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div>
      <Card>
        <CardContent>
          <div className="grid grid-cols-5 gap-4">
            {data?.data &&
              !isFetching &&
              Object.entries(data?.data)
                .filter(([key]) => !hiddenKey.includes(key))
                .map(([key, value]) => (
                  <div
                    className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200 hover:shadow-md transition-all cursor-pointer"
                    onClick={() => setSelected(key as string)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div>
                          <h4 className="font-semibold text-gray-800">
                            {keyString(key)}
                          </h4>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-blue-600">
                          {value}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </CardContent>
      </Card>
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="min-w-[90vw]">
          <CardHeader>
            <CardTitle>{keyString(selected ?? "")}</CardTitle>
          </CardHeader>

          <RiskAndOdsData selected={selected as SelectedKeys} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
