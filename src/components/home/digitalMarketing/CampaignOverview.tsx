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
  // DialogDescription,
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
import { useState } from "react";
import AddCampaignForm from "./campaign/AddCampaign";
import { useGetAllCampaignsQuery } from "@/service/dashboard/api";
import { keyString } from "@/lib/utils";
import ViewCampaign from "./campaign/ViewCampaign";

export default function CampaignOverview() {
  const { data } = useGetAllCampaignsQuery();
  const [selectedCampaign, setSelectedCampaign] = useState<number | null>(null);

  const [showCampaignSnapshotModal, setShowCampaignSnapshotModal] =
    useState<boolean>(false);

  const [addCampaignModal, setAddCampaignModal] = useState<boolean>(false);

  const handleCampaignClick = (campaign: number) => {
    setSelectedCampaign(campaign);
    setShowCampaignSnapshotModal(true);
  };
  return (
    <div>
      <div className="space-y-6 mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Campaigns Overview</h2>
          {/* <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div> */}
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
                {!data?.data || data?.data?.length < 1 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center py-6 text-muted-foreground"
                    >
                      No Campaigns Found
                    </TableCell>
                  </TableRow>
                ) : (
                  data.data.map((campaign) => (
                    <TableRow
                      key={campaign.id}
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => handleCampaignClick(campaign.id)}
                    >
                      <TableCell className="font-medium">
                        {campaign.name}
                      </TableCell>
                      <TableCell>{keyString(campaign.type_name)}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            campaign.status.toLowerCase() === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }
                        >
                          {keyString(campaign.status)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {campaign.lead_generated}
                      </TableCell>
                      <TableCell className="text-right">
                        ₹{campaign.revenue_generated}K
                      </TableCell>
                    </TableRow>
                  ))
                )}
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
            <DialogTitle className="text-center">Campaign Snapshot</DialogTitle>
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
          <AddCampaignForm
            modalControl={() => setAddCampaignModal(false)}
            data={null}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
