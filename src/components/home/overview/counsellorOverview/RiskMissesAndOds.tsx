import { Card, CardContent } from "@/components/ui/card";
import { keyString } from "@/lib/utils";
import { useGetLeadRiskAndMissesQuery } from "@/service/dashboard/api";

export default function RiskMissesAndOds() {
  const { data, isFetching } = useGetLeadRiskAndMissesQuery();

  const hiddenKey: string[] = [
    "consultation_feedback_missed",
    "additional_questions_pending",
    "leads_without_app",
  ];
  return (
    <Card>
      {/* <CardHeader>
        <CardTitle>Risks And Misses</CardTitle>
      </CardHeader> */}
      <CardContent>
        <div className="grid grid-cols-5 gap-4">
          {data?.data &&
            !isFetching &&
            Object.entries(data?.data)
              .filter(([key]) => !hiddenKey.includes(key))
              .map(([key, value]) => (
                <div>
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200 hover:shadow-md transition-all cursor-pointer">
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
                </div>
              ))}
        </div>
      </CardContent>
    </Card>
  );
}
