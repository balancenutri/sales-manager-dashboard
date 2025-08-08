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
import ViewCampaign from "./campaign/ViewCampaign";
import AddCampaignForm from "./campaign/AddCampaign";

export default function CampaignOverview() {
  const [selectedCampaign, setSelectedCampaign] = useState<
    (typeof mockData.campaigns)[0] | null
  >(null);

  const [showCampaignSnapshotModal, setShowCampaignSnapshotModal] =
    useState<boolean>(false);

  const [addCampaignModal, setAddCampaignModal] = useState<boolean>(false);

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
          <CardHeader className="flex justify-between">
            <div>
              <CardTitle>Campaign List</CardTitle>
              <CardDescription>
                Click on a campaign to view its snapshot
              </CardDescription>
            </div>
            <Button variant="outline" onClick={() => setAddCampaignModal(true)}>
              Add Campaign
            </Button>
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
        <DialogContent className="min-w-4xl">
          <DialogHeader>
            <DialogTitle>Campaign Snapshot</DialogTitle>
            <DialogDescription>
              Detailed snapshot of the selected campaign's performance
            </DialogDescription>
          </DialogHeader>
          <ViewCampaign selectedCampaign={selectedCampaign} />
        </DialogContent>
      </Dialog>
      <Dialog open={addCampaignModal} onOpenChange={setAddCampaignModal}>
        <DialogContent
          onInteractOutside={(e: React.MouseEvent | Event) =>
            e.preventDefault()
          }
        >
          <DialogHeader>
            <DialogTitle>Add Campaign</DialogTitle>
          </DialogHeader>
          <AddCampaignForm />
        </DialogContent>
      </Dialog>
    </div>
  );
}
