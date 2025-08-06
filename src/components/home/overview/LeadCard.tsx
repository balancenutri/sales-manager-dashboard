import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Users, ArrowUp, UserCheck } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockData } from "@/lib/data";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";

export default function LeadCard() {
  const [modalType, setModalType] = useState<
    "assigned" | "unassigned" | "sales" | "revenue" | "team" | null
  >(null);
  const [showLeadsModal, setShowLeadsModal] = useState<boolean>(false);

  const handleLeadsClick = (type: "assigned" | "unassigned") => {
    setModalType(type);
    setShowLeadsModal(true);
  };

  return (
    <div className="space-y-6">
      <Card className="cursor-pointer hover:shadow-md transition-shadow h-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Lead Management</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="space-y-3">
          <div
            className="flex items-center justify-between p-2 rounded-lg bg-green-50 hover:bg-green-100 transition-colors cursor-pointer"
            onClick={() => handleLeadsClick("assigned")}
          >
            <div>
              <p className="text-sm text-muted-foreground">Assigned</p>
              <p className="text-xl font-bold text-green-700">
                {mockData.overview.assignedLeads}
              </p>
            </div>
            <ArrowUp className="h-4 w-4 text-green-500" />
          </div>
          <div
            className="flex items-center justify-between p-2 rounded-lg bg-orange-50 hover:bg-orange-100 transition-colors cursor-pointer"
            onClick={() => handleLeadsClick("unassigned")}
          >
            <div>
              <p className="text-sm text-muted-foreground">Unassigned</p>
              <p className="text-xl font-bold text-orange-700">
                {mockData.overview.unassignedLeads}
              </p>
            </div>
            <UserCheck className="h-4 w-4 text-orange-500" />
          </div>
        </CardContent>
      </Card>
      <Dialog open={showLeadsModal} onOpenChange={setShowLeadsModal}>
        <DialogContent className={`${modalType === "assigned" ? "min-w-4xl": ""}`}>
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
            <div className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Counsellor</TableHead>
                    <TableHead>Leads Assigned</TableHead>
                    <TableHead>Consultations</TableHead>
                    <TableHead>Sales</TableHead>
                    <TableHead>Lead→Consultation</TableHead>
                    <TableHead>Consultation→Sales</TableHead>
                    <TableHead>Lead→Sales</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockData.counsellors.map((counsellor) => {
                    const leadToConsultationRatio =
                      counsellor.leadsAssigned > 0
                        ? (
                            (counsellor.consultations /
                              counsellor.leadsAssigned) *
                            100
                          ).toFixed(1)
                        : "0.0";
                    const consultationToSalesRatio =
                      counsellor.consultations > 0
                        ? (
                            (counsellor.salesClosed /
                              counsellor.consultations) *
                            100
                          ).toFixed(1)
                        : "0.0";
                    const leadToSalesRatio =
                      counsellor.leadsAssigned > 0
                        ? (
                            (counsellor.salesClosed /
                              counsellor.leadsAssigned) *
                            100
                          ).toFixed(1)
                        : "0.0";

                    return (
                      <TableRow key={counsellor.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={counsellor.avatar || "/placeholder.svg"}
                              />
                              <AvatarFallback>
                                {counsellor.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">
                              {counsellor.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="font-semibold">
                          {counsellor.leadsAssigned}
                        </TableCell>
                        <TableCell className="font-semibold">
                          {counsellor.consultations}
                        </TableCell>
                        <TableCell className="font-semibold">
                          {counsellor.salesClosed}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="bg-blue-50 text-blue-700"
                          >
                            {leadToConsultationRatio}%
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700"
                          >
                            {consultationToSalesRatio}%
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="bg-purple-50 text-purple-700"
                          >
                            {leadToSalesRatio}%
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>

              <div className="pt-4 border-t">
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <p className="text-muted-foreground">
                      Total Leads Assigned
                    </p>
                    <p className="text-2xl font-bold">
                      {mockData.overview.assignedLeads}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-muted-foreground">Total Consultations</p>
                    <p className="text-2xl font-bold">
                      {mockData.counsellors.reduce(
                        (sum, c) => sum + c.consultations,
                        0
                      )}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-muted-foreground">Total Sales</p>
                    <p className="text-2xl font-bold">
                      {mockData.overview.totalSales}
                    </p>
                  </div>
                </div>
              </div>
            </div>
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
