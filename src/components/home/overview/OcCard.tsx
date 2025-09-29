import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Users, ArrowUp, UserCheck, IndianRupee } from "lucide-react";
// import { mockData } from "@/lib/data";
import { useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { DialogDescription } from "@radix-ui/react-dialog";
import { useGetOcManagementQuery } from "@/service/dashboard/api";
import { Skeleton } from "@/components/ui/skeleton";
// import AssignedLead from "./leadCard/AssignedLead";

import CustomDatePicker from "@/components/ui/custom-date-picker";
import dayjs from "dayjs";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function LeadCard() {
  // const [modalType, setModalType] = useState<
  //   "assigned" | "unassigned" | "sales" | "revenue" | "team" | null
  // >(null);
  // const [showLeadsModal, setShowLeadsModal] = useState<boolean>(false);
  // const [selected, setSelected] = useState<"counsellor_data" | "mentor_data">(
  //   "counsellor_data"
  // );

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const { data: ocManagementData } = useGetOcManagementQuery(
    selectedDate
      ? {
          start_date: dayjs(selectedDate).startOf("month").format("YYYY-MM-DD"),
          end_date: dayjs(selectedDate).endOf("month").format("YYYY-MM-DD"),
        }
      : {}
  );

  const ocData = ocManagementData?.data;

  return (
    <div className="space-y-6">
      <Card className="cursor-pointer hover:shadow-md transition-shadow h-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="text-sm font-medium">OC Management</CardTitle>
          </div>
          <CustomDatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            showMonthYearPicker={true}
            dateFormat="MM/yyyy"
            maxDate={dayjs()}
            clearable={true}
          />
        </CardHeader>
        <CardContent className="space-y-3">
          <div
            className="flex items-center justify-between p-2 rounded-lg bg-orange-50 hover:bg-orange-100 transition-colors cursor-pointer"
            // onClick={() => handleLeadsClick("unassigned")}
          >
            <div className="flex items-center gap-2">
              <UserCheck className="h-4 w-4 text-orange-500" />
              <p className="text-sm">Total OC</p>
            </div>
            {ocData ? (
              <p className="text-xl font-bold text-orange-700">{ocData.oc}</p>
            ) : (
              <Skeleton className="h-5 w-20 mt-2" />
            )}
          </div>
          <div
            className="flex items-center justify-between p-2 rounded-lg bg-green-50 hover:bg-green-100 transition-colors cursor-pointer"
            // onClick={() => handleLeadsClick("assigned")}
          >
            <div className="flex items-center gap-2">
              <ArrowUp className="h-4 w-4 text-green-500" />
              <p className="text-sm">Call Done</p>
            </div>
            {ocManagementData?.data ? (
              <p className="text-xl font-bold text-green-700">
                {ocData?.calls}
              </p>
            ) : (
              <Skeleton className="h-5 w-20 mt-2" />
            )}
          </div>
          <div
            className="flex items-center justify-between p-2 rounded-lg bg-green-50 hover:bg-green-100 transition-colors cursor-pointer"
            // onClick={() => handleLeadsClick("assigned")}
          >
            <div className="flex items-center gap-2">
              <ArrowUp className="h-4 w-4 text-green-500" />
              <p className="text-sm">Suggested Program</p>
            </div>
            {ocManagementData?.data ? (
              <p className="text-xl font-bold text-green-700">
                {ocData?.suggested_programs}
              </p>
            ) : (
              <Skeleton className="h-5 w-20 mt-2" />
            )}
          </div>
          <div
            className="flex items-center justify-between p-2 rounded-lg bg-green-50 hover:bg-green-100 transition-colors cursor-pointer"
            // onClick={() => handleLeadsClick("assigned")}
          >
            <div className="flex items-center gap-2">
              <IndianRupee className="h-4 w-4 text-green-500" />
              <p className="text-sm">Sales</p>
            </div>
            {ocManagementData?.data ? (
              <p className="text-xl font-bold text-green-700">
                {ocData?.orders &&
                  `₹${ocData.orders.split("| ")[0]} | ₹${
                    ocData.orders.split("| ")[1]
                  }`}
              </p>
            ) : (
              <Skeleton className="h-5 w-20 mt-2" />
            )}
          </div>
        </CardContent>
      </Card>
      {/* <Dialog open={showLeadsModal} onOpenChange={setShowLeadsModal}>
        <DialogContent
          className={`${modalType === "assigned" ? "min-w-6xl" : ""}`}
        >
          <DialogHeader>
            <div className="flex justify-between items-end">
              <div className="">
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
              </div>

              {modalType === "assigned" && (
                <Tabs defaultValue={selected} className="space-y-6">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger
                      className="cursor-pointer"
                      value={"android"}
                      onClick={() => setSelected("counsellor_data")}
                    >
                      Counsellor
                    </TabsTrigger>
                    <TabsTrigger
                      className="cursor-pointer"
                      value="ios"
                      onClick={() => setSelected("mentor_data")}
                    >
                      Mentor
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              )}
            </div>
          </DialogHeader>

          {modalType === "assigned" ? (
            <AssignedLead selected={selected} selectedDate={selectedDate} />
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
      </Dialog> */}
    </div>
  );
}
