import { Badge } from "@/components/ui/badge";
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
import { keyString } from "@/lib/utils";
import { useGetCampaignDetailsQuery } from "@/service/dashboard/api";
import { skipToken } from "@reduxjs/toolkit/query";
import AddCampaignForm from "./AddCampaign";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ViewCampaign({
  selectedCampaign,
}: {
  selectedCampaign: number | null;
}) {
  console.log({ selectedCampaign });
  const { data } = useGetCampaignDetailsQuery(
    selectedCampaign !== null ? { campaign_id: selectedCampaign } : skipToken
  );

  const [updateCampaign, setUpdateCampaign] = useState<boolean>(false);

  return (
    <div>
      {data?.data && (
        <div className="space-y-3">
          <div className="flex items-center space-x-4">
            <div className="flex justify-between w-full">
              <p className="text-xl font-semibold">{data.data.campaignName}</p>
              <Button
                variant={"outline"}
                onClick={(): void => setUpdateCampaign(true)}
              >
                Update
              </Button>
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
                  <span className="font-semibold">
                    {keyString(data.data.campaignTypeName)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Status</span>
                  <Badge
                    className={
                      data.data.campaignStatus.toLowerCase() === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }
                  >
                    {keyString(data.data.campaignStatus)}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Start Date</span>
                  <span className="font-semibold">
                    {data.data.campaignStartDate}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">End Date</span>
                  <span className="font-semibold">
                    {data.data.campaignEndDate}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Ad Spend</span>
                  <span className="font-semibold">
                    ₹{data.data.campaignAdSpend}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Leads Generated</span>
                  <span className="font-semibold">
                    {data.data.leadsGenerated}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Revenue Generated</span>
                  <span className="font-semibold">
                    ₹{data.data.revenueGenerated}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Conversion Rate</span>
                  <span className="font-semibold">
                    {data.data?.digitalMarketing?.conversions}%
                  </span>
                </div>
              </CardContent>
            </Card>
            <div>
              <Card className="my-2">
                <CardHeader className="mb-0 pb-0">
                  <CardTitle>Targeted Users</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {data.data?.targetUsers?.program_name?.length > 0 && (
                    <div>
                      <h2 className="text-base font-semibold">Programs</h2>
                      {data.data.targetUsers.program_name.map((item) => (
                        <Badge variant={"outline"} className="mr-2">
                          {keyString(item)}
                        </Badge>
                      ))}
                    </div>
                  )}
                  {data.data?.targetUsers?.gender?.length > 0 && (
                    <div>
                      <h2 className="text-base font-semibold">Gender</h2>
                      {data.data.targetUsers.gender.map((item) => (
                        <Badge variant={"outline"} className="mr-2">
                          {keyString(item)}
                        </Badge>
                      ))}
                    </div>
                  )}
                  {data.data?.targetUsers?.age_group?.length > 0 && (
                    <div>
                      <h2 className="text-base font-semibold">Age Group</h2>
                      {data.data.targetUsers.age_group.map((item) => (
                        <Badge variant={"outline"} className="mr-2">
                          {keyString(item)}
                        </Badge>
                      ))}
                    </div>
                  )}
                  {data.data?.targetUsers?.health_conditions?.length > 0 && (
                    <div>
                      <h2 className="text-base font-semibold">Health Issues</h2>
                      {data.data.targetUsers.health_conditions.map((item) => (
                        <Badge variant={"outline"} className="mr-2">
                          {keyString(item)}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Digital Marketing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-2">
                    <div>
                      <span className="text-sm font-medium">Impression: </span>
                      <span className="text-sm font-medium">{data.data.digitalMarketing?.impressions || 0}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Reach: </span>
                      <span className="text-sm font-medium">{data.data.digitalMarketing?.reach || 0}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Clicks: </span>
                      <span className="text-sm font-medium">{data.data.digitalMarketing?.clicks || 0}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium">CTR: </span>
                      <span className="text-sm font-medium">{data.data.digitalMarketing?.ctr || 0}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}

      <Dialog open={updateCampaign} onOpenChange={setUpdateCampaign}>
        <DialogContent
          onInteractOutside={(e: React.MouseEvent | Event) =>
            e.preventDefault()
          }
        >
          <DialogHeader>
            <DialogTitle>Update Campaign</DialogTitle>
          </DialogHeader>
          <AddCampaignForm
            modalControl={() => setUpdateCampaign(false)}
            data={{
              ad_spend: data?.data.campaignAdSpend || 0,
              age_group: data?.data?.targetUsers?.age_group || [],
              clicks: data?.data?.digitalMarketing?.clicks || 0,
              conversions: data?.data?.digitalMarketing?.conversions || 0,
              ctr: data?.data?.digitalMarketing?.ctr || 0,
              end_date: data?.data?.campaignEndDate || "",
              gender: data?.data?.targetUsers?.age_group || [],
              health_conditions:
                data?.data?.targetUsers?.health_conditions || [],
              impressions: data?.data?.digitalMarketing?.impressions || 0,
              name: data?.data?.campaignName || "",
              program_name: data?.data?.targetUsers?.program_name || [],
              reach: data?.data?.digitalMarketing?.reach || 0,
              start_date: data?.data?.campaignStartDate || "",
              status: data?.data?.campaignStatus || "",
              type: String(data?.data?.campaignType) || "",
            }}
            campaignId={selectedCampaign}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

// 8180889355
