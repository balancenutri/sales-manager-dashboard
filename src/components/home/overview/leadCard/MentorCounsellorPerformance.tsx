import { useGetLeadFunnelQuery } from "@/service/dashboard/api";
import PerformanceCards from "../../cards/PerformanceCard";
import { Card, CardHeader } from "@/components/ui/card";

export default function MentorCounsellorPerformance() {
  const { data } = useGetLeadFunnelQuery();
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Mentor & Counsellor Team Performance</h2>
      <div className="grid grid-cols-2 gap-3">
        <Card>
          <CardHeader>
            <h3 className="font-semibold text-center -my-4 underline">
              Last Month
            </h3>
          </CardHeader>
          {data?.data?.last_month && (
            <PerformanceCards data={data?.data.last_month} />
          )}
        </Card>
        <Card>
          <CardHeader>
            <h3 className="font-semibold text-center -my-4 underline">
              This Month
            </h3>
          </CardHeader>
          {data?.data?.monthly && (
            <PerformanceCards data={data?.data.monthly} />
          )}
        </Card>
      </div>
    </div>
  );
}
