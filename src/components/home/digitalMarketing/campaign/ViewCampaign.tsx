import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { mockData } from "@/lib/data";

export default function ViewCampaign({
  selectedCampaign,
}: {
  selectedCampaign: (typeof mockData.campaigns)[0] | null;
}) {
  return (
    <div>
      {selectedCampaign && (
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <div>
              <p className="text-xl font-semibold">{selectedCampaign.name}</p>
              <p className="text-muted-foreground">
                Campaign ID: {selectedCampaign.id}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Key Metrics</CardTitle>
                <CardDescription>
                  Overview of campaign performance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Type</span>
                  <span className="font-semibold text-lg">
                    {selectedCampaign.type}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Status</span>
                  <Badge
                    className={
                      selectedCampaign.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }
                  >
                    {selectedCampaign.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Start Date</span>
                  <span className="font-semibold text-lg">
                    {selectedCampaign.startDate}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">End Date</span>
                  <span className="font-semibold text-lg">
                    {selectedCampaign.endDate}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Ad Spend</span>
                  <span className="font-semibold text-lg">
                    ₹{selectedCampaign.adSpend}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Leads Generated</span>
                  <span className="font-semibold text-lg">
                    {selectedCampaign.leadsGenerated}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Revenue Generated</span>
                  <span className="font-semibold text-lg">
                    ₹{selectedCampaign.revenueGenerated}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Conversion Rate</span>
                  <span className="font-semibold text-lg">
                    {selectedCampaign.conversionRate}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">ROI</span>
                  <span className="font-semibold text-lg">
                    {selectedCampaign.roi}
                  </span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Targeted Users</CardTitle>
                <CardDescription>
                  List of targeted user segments
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {selectedCampaign.usersTargeted.map((user, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <span className="font-medium">{user}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
