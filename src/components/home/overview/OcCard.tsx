import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Users, ArrowUp, UserCheck } from "lucide-react";
import { mockData } from "@/lib/data";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useGetLeadManagementQuery } from "@/service/dashboard/api";
import { Skeleton } from "@/components/ui/skeleton";
import AssignedLead from "./leadCard/AssignedLead";

export default function OcCard() {
  const [modalType, setModalType] = useState<
    "assigned" | "unassigned" | "sales" | "revenue" | "team" | null
  >(null);
  const [showLeadsModal, setShowLeadsModal] = useState<boolean>(false);

  const handleLeadsClick = (type: "assigned" | "unassigned") => {
    setModalType(type);
    setShowLeadsModal(true);
  };

  const { data: leadManagementData } = useGetLeadManagementQuery();

  return (
    <div className="space-y-6">
      <Card className="cursor-pointer hover:shadow-md transition-shadow h-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">OC Management</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="space-y-3">
          <div
            className="flex items-center justify-between p-2 rounded-lg bg-green-50 hover:bg-green-100 transition-colors cursor-pointer"
            onClick={() => handleLeadsClick("assigned")}
          >
            <div>
              <p className="text-sm text-muted-foreground">Assigned</p>
              {leadManagementData?.data ? (
                <p className="text-xl font-bold text-green-700">
                  {leadManagementData?.data.assigned_leads}
                </p>
              ) : (
                <Skeleton className="h-5 w-20 mt-2" />
              )}
            </div>
            <ArrowUp className="h-4 w-4 text-green-500" />
          </div>
          <div
            className="flex items-center justify-between p-2 rounded-lg bg-orange-50 hover:bg-orange-100 transition-colors cursor-pointer"
            onClick={() => handleLeadsClick("unassigned")}
          >
            <div>
              <p className="text-sm text-muted-foreground">Unassigned</p>
              {leadManagementData?.data ? (
                <p className="text-xl font-bold text-orange-700">
                  {leadManagementData?.data.unassigned_leads}
                </p>
              ) : (
                <Skeleton className="h-5 w-20 mt-2" />
              )}
            </div>
            <UserCheck className="h-4 w-4 text-orange-500" />
          </div>
        </CardContent>
      </Card>
      <Dialog open={showLeadsModal} onOpenChange={setShowLeadsModal}>
        <DialogContent
          className={`${modalType === "assigned" ? "min-w-6xl" : ""}`}
        >
          <DialogHeader>
            <DialogTitle>
              {modalType === "assigned"
                ? "Assigned Leads - Counsellor Performance"
                : "Unassigned Leads - Source Breakdown"}
            </DialogTitle>
            <DialogDescription>
              {modalType === "assigned"
                ? "Detailed performance metrics for each counsellor including consultation and sales ratios"
                : "Source-wise distribution of unassigned leads"}
            </DialogDescription>
          </DialogHeader>

          {modalType === "assigned" ? (
            <AssignedLead />
          ) : (
            <div className="space-y-4">
              {Object.entries(mockData.leadsSources.unassigned).map(
                ([source, count]) => {
                  const percentage = (
                    (count / mockData.overview.unassignedLeads) *
                    100
                  ).toFixed(1);
                  return (
                    <div
                      key={source}
                      className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                        <span className="capitalize font-medium">
                          {source.replace(/([A-Z])/g, " $1").trim()}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-lg">{count}</div>
                        <div className="text-xs text-muted-foreground">
                          {percentage}%
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
              <div className="pt-4 border-t">
                <div className="flex justify-between items-center font-semibold">
                  <span>Total Unassigned Leads</span>
                  <span className="text-xl">
                    {mockData.overview.unassignedLeads}
                  </span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
