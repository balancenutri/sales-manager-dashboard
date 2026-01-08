import { useState } from "react";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { Upload, Filter } from "lucide-react";

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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

import AddCampaignForm from "./campaign/AddCampaign";
import ViewCampaign from "./campaign/ViewCampaign";
import UploadReportModal from "./campaign/UploadCampaign";
import CustomDatePicker from "@/components/ui/custom-date-picker";

import { useGetAdPerformnaceReportQuery } from "@/service/dashboard/api";
import type { AdPerformanceData } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { getStatusColor, keyString } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

dayjs.extend(advancedFormat);

export default function CampaignOverview() {
  const [filters, setFilters] = useState({
    start_date: null as Date | null,
    end_date: null as Date | null,
    funnel: "",
    objective: "",
    ad_name: "",
  });

  const { data } = useGetAdPerformnaceReportQuery({
    start_date: filters.start_date
      ? dayjs(filters.start_date).format("YYYY-MM-DD")
      : null,
    end_date: filters.end_date
      ? dayjs(filters.end_date).format("YYYY-MM-DD")
      : null,
    funnel: filters.funnel === "all" ? undefined : filters.funnel,
    objective: filters.objective,
    ad_name: filters.ad_name,
  });

  const [selectedCampaign, setSelectedCampaign] =
    useState<AdPerformanceData | null>(null);
  const [showCampaignSnapshotModal, setShowCampaignSnapshotModal] =
    useState(false);
  const [addCampaignModal, setAddCampaignModal] = useState(false);
  const [uploadReportModal, setUploadReportModal] = useState(false);

  const handleCampaignClick = (campaign: AdPerformanceData) => {
    setSelectedCampaign(campaign);
    setShowCampaignSnapshotModal(true);
  };

  return (
    <div>
      <div className="space-y-6 mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Campaigns Overview</h2>

          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-80 space-y-4">
                <h4 className="font-medium">Filters</h4>

                {/* DATE RANGE */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date Range</label>

                  <CustomDatePicker
                    selected={filters.start_date}
                    onChange={(date) =>
                      setFilters((prev) => ({
                        ...prev,
                        start_date: date,
                        end_date:
                          prev.end_date && date && prev.end_date < date
                            ? null
                            : prev.end_date,
                      }))
                    }
                    placeholder="Select start date"
                    className="w-full"
                    clearable
                  />

                  {filters.start_date && (
                    <CustomDatePicker
                      selected={filters.end_date}
                      onChange={(date) =>
                        setFilters((prev) => ({
                          ...prev,
                          end_date: date,
                        }))
                      }
                      placeholder="Select end date"
                      clearable
                    />
                  )}
                </div>

                {/* FUNNEL */}
                {/* <div className="space-y-2">
                  <label className="text-sm font-medium">Funnel</label>
                  <Input
                    placeholder="Enter funnel"
                    value={filters.funnel}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        funnel: e.target.value,
                      }))
                    }
                  />
                </div> */}

                <div className="space-y-2">
                  <label className="text-sm font-medium">Funnel</label>
                  <Select
                    value={filters.funnel ?? "all"}
                    onValueChange={(value) =>
                      setFilters((prev) => ({ ...prev, funnel: value }))
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select funnel" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={"all"}>All</SelectItem>
                      {data?.table_meta_data?.funnels?.map((item) => (
                        <SelectItem value={item}>{keyString(item)}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* OBJECTIVE */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Objective</label>
                  <Input
                    placeholder="Enter objective"
                    value={filters.objective}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        objective: e.target.value,
                      }))
                    }
                  />
                </div>

                {/* AD NAME */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Ad Name</label>
                  <Input
                    placeholder="Search ad name"
                    value={filters.ad_name}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        ad_name: e.target.value,
                      }))
                    }
                  />
                </div>

                {/* CLEAR */}
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() =>
                    setFilters({
                      start_date: null,
                      end_date: null,
                      funnel: "",
                      objective: "",
                      ad_name: "",
                    })
                  }
                >
                  Clear Filters
                </Button>
              </PopoverContent>
            </Popover>

            <Button
              variant="outline"
              onClick={() => setUploadReportModal(true)}
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload Campaign
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
                  <TableHead>Status</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead className="text-right">Amount Spent</TableHead>
                  <TableHead className="text-right">
                    Revenue Generated
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {!data?.data || data.data.length < 1 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6">
                      No Campaigns Found
                    </TableCell>
                  </TableRow>
                ) : (
                  data.data.map((campaign) => (
                    <TableRow
                      key={campaign.id}
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => handleCampaignClick(campaign)}
                    >
                      <TableCell className="font-medium">
                        {campaign.ad_name}
                      </TableCell>
                      <TableCell className="font-medium">
                        <Badge className={getStatusColor(campaign.status)}>
                          {campaign.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {dayjs(campaign.reporting_start).format("Do MMM YYYY")}
                      </TableCell>
                      <TableCell>
                        {dayjs(campaign.reporting_end).format("Do MMM YYYY")}
                      </TableCell>
                      <TableCell className="text-right">
                        ₹ {campaign.amount_spent}
                      </TableCell>
                      <TableCell className="text-right">
                        ₹ {campaign.revenue}
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
          <ViewCampaign
            selectedCampaign={selectedCampaign}
            onClose={() => setShowCampaignSnapshotModal(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={addCampaignModal} onOpenChange={setAddCampaignModal}>
        <DialogContent onInteractOutside={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>Add Campaign</DialogTitle>
          </DialogHeader>
          <AddCampaignForm
            modalControl={() => setAddCampaignModal(false)}
            data={undefined}
          />
        </DialogContent>
      </Dialog>

      <UploadReportModal
        open={uploadReportModal}
        onOpenChange={setUploadReportModal}
      />
    </div>
  );
}
