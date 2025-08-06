import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockData } from "@/lib/data";
import { Download, Filter } from "lucide-react";
import { useState } from "react";

export default function CampaignOverview() {
  const [selectedCampaign, setSelectedCampaign] = useState<
    (typeof mockData.campaigns)[0] | null
  >(null);

  const [showCampaignSnapshotModal, setShowCampaignSnapshotModal] =
    useState<boolean>(false);

  const handleCampaignClick = (campaign: (typeof mockData.campaigns)[0]) => {
    setSelectedCampaign(campaign);
    setShowCampaignSnapshotModal(true);
  };
  return (
    <div>
      <div className="space-y-6 mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Campaigns Overview</h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Campaign List</CardTitle>
            <CardDescription>
              Click on a campaign to view its snapshot
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Leads Generated</TableHead>
                  <TableHead className="text-right">
                    Revenue Generated
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockData.campaigns.map((campaign) => (
                  <TableRow
                    key={campaign.id}
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleCampaignClick(campaign)}
                  >
                    <TableCell className="font-medium">
                      {campaign.name}
                    </TableCell>
                    <TableCell>{campaign.type}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          campaign.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }
                      >
                        {campaign.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {campaign.leadsGenerated}
                    </TableCell>
                    <TableCell className="text-right">
                      ₹{(campaign.revenueGenerated / 1000).toFixed(0)}K
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <Dialog
        open={showCampaignSnapshotModal}
        onOpenChange={setShowCampaignSnapshotModal}
      >
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Campaign Snapshot</DialogTitle>
            <DialogDescription>
              Detailed snapshot of the selected campaign's performance
            </DialogDescription>
          </DialogHeader>
          {selectedCampaign && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div>
                  <p className="text-xl font-semibold">
                    {selectedCampaign.name}
                  </p>
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
        </DialogContent>
      </Dialog>
    </div>
  );
}
