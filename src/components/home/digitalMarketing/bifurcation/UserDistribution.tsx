import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type overall_distribution = {
  lead: number;
  oc: number;
};
export default function UserDistribution({
  data,
}: {
  data?: overall_distribution;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 h-40">
          <div className="flex justify-center items-center flex-col border-r-2">
            <h2 className="text-lg font-medium">Total Leads</h2>
            <p className="text-2xl font-bold">{data?.lead}</p>
          </div>
          <div className="flex justify-center items-center flex-col">
            <h2 className="text-lg font-medium">Total OC</h2>
            <p className="text-2xl font-bold">{data?.oc}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
