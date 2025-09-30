import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Users, ArrowUp, UserCheck, IndianRupee } from "lucide-react";
import { mockData } from "@/lib/data";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import {
  useGetLeadManagementQuery,
  useGetOldLeadManagementQuery,
} from "@/service/dashboard/api";
import { Skeleton } from "@/components/ui/skeleton";
import AssignedLead from "./leadCard/AssignedLead";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
// import { RangePicker } from "@/components/ui/range-picker";
// import { Calendar } from "@/components/ui/calendar";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import CustomDatePicker from "@/components/ui/custom-date-picker";
import dayjs from "dayjs";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LeadPosition from "./leadCard/LeadPosition";

export default function LeadCard({ type }: { type: "old" | "new" }) {
  const [modalType, setModalType] = useState<
    "assigned" | "unassigned" | "position" | "revenue" | "team" | null
  >(null);
  const [showLeadsModal, setShowLeadsModal] = useState<boolean>(false);
  const [selected, setSelected] = useState<"counsellor_data" | "mentor_data">(
    "counsellor_data"
  );

  const handleLeadsClick = (types: "assigned" | "unassigned" | "position") => {
    if (type == "new") {
      setModalType(types);
      setShowLeadsModal(true);
    }
  };
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const { data: leadManagementData } = useGetLeadManagementQuery(
    selectedDate
      ? {
          start_date: dayjs(selectedDate).startOf("month").format("YYYY-MM-DD"),
          end_date: dayjs(selectedDate).endOf("month").format("YYYY-MM-DD"),
        }
      : {},
    {
      skip: type === "old",
    }
  );
  const { data: oldLeadManagementData } = useGetOldLeadManagementQuery(
    selectedDate
      ? {
          start_date: dayjs(selectedDate).startOf("month").format("YYYY-MM-DD"),
          end_date: dayjs(selectedDate).endOf("month").format("YYYY-MM-DD"),
        }
      : {},
    {
      skip: type === "new",
    }
  );

  const leadData =
    type == "new" ? leadManagementData?.data : oldLeadManagementData?.data;

  return (
    <div className="space-y-6">
      <Card className="cursor-pointer hover:shadow-md transition-shadow h-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="text-sm font-medium">
              {type == "new" ? "Fresh Leads" : "Old Leads"}
            </CardTitle>
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
              <p className="text-sm">Total Leads</p>
            </div>
            {leadData ? (
              <p className="text-xl font-bold text-orange-700">
                {leadData.total_leads}
              </p>
            ) : (
              <Skeleton className="h-5 w-20 mt-2" />
            )}
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className="flex items-center justify-between p-2 rounded-lg bg-green-50 hover:bg-green-100 transition-colors cursor-pointer"
                  // onClick={() => handleLeadsClick("unassigned")}
                >
                  <div className="flex items-center gap-2">
                    <ArrowUp className="h-4 w-4 text-green-500" />
                    <p className="text-sm">Unassigned</p>
                  </div>
                  {leadData ? (
                    <p className="text-xl font-bold text-green-700">
                      {leadData?.unassigned.total_unassigned_leads}
                    </p>
                  ) : (
                    <Skeleton className="h-5 w-20 mt-2" />
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent className="p-0 bg-white border border-gray-200 shadow-lg rounded-lg max-w-xs">
                <div className="p-2">
                  <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <h4 className="font-semibold text-gray-900 text-sm">
                      Unassigned Leads
                    </h4>
                  </div>
                  <div className="grid grid-cols-2 gap-3 m-3">
                    <div className="text-center p-2 bg-green-50 rounded-md">
                      <p className="text-xs text-gray-600 font-medium">
                        Target Market
                      </p>
                      <p className="text-sm font-bold text-green-700">
                        {
                          leadData?.unassigned
                            .total_target_market_unassigned_leads
                        }
                      </p>
                    </div>
                    <div className="text-center p-2 bg-blue-50 rounded-md">
                      <p className="text-xs text-gray-600 font-medium">
                        Non Target Market
                      </p>
                      <p className="text-sm font-bold text-blue-700">
                        {
                          leadData?.unassigned
                            .total_non_target_market_unassigned_leads
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className="flex items-center justify-between p-2 rounded-lg bg-green-50 hover:bg-green-100 transition-colors cursor-pointer"
                  onClick={() => handleLeadsClick("assigned")}
                >
                  <div className="flex items-center gap-2">
                    <ArrowUp className="h-4 w-4 text-green-500" />
                    <p className="text-sm">Assigned</p>
                  </div>
                  {leadData ? (
                    <p className="text-xl font-bold text-green-700">
                      {leadData?.assigned.total_assigned_leads}
                    </p>
                  ) : (
                    <Skeleton className="h-5 w-20 mt-2" />
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent className="p-0 bg-white border border-gray-200 shadow-lg rounded-lg max-w-xs">
                <div className="p-2">
                  <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <h4 className="font-semibold text-gray-900 text-sm">
                      Assigned Leads
                    </h4>
                  </div>
                  <div className="grid grid-cols-2 gap-3 m-3">
                    <div className="text-center p-2 bg-green-50 rounded-md">
                      <p className="text-xs text-gray-600 font-medium">
                        Mentor
                      </p>
                      <p className="text-sm font-bold text-green-700">
                        {leadData?.assigned.total_assigned_to_mentors}
                      </p>
                    </div>
                    <div className="text-center p-2 bg-blue-50 rounded-md">
                      <p className="text-xs text-gray-600 font-medium">
                        Counsellor
                      </p>
                      <p className="text-sm font-bold text-blue-700">
                        {leadData?.assigned.total_assigned_to_counsellors}
                      </p>
                    </div>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className="flex items-center justify-between p-2 rounded-lg bg-green-50 hover:bg-green-100 transition-colors cursor-pointer"
                  
                >
                  <div className="flex items-center gap-2">
                    <ArrowUp className="h-4 w-4 text-green-500" />
                    <p className="text-sm">Consultation Done</p>
                  </div>
                  {leadData ? (
                    <p className="text-xl font-bold text-green-700">
                      {leadData?.consultation_done.total_consultations}
                    </p>
                  ) : (
                    <Skeleton className="h-5 w-20 mt-2" />
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent className="p-0 bg-white border border-gray-200 shadow-lg rounded-lg max-w-xs">
                <div className="p-2">
                  <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <h4 className="font-semibold text-gray-900 text-sm">
                      Consultation Done
                    </h4>
                  </div>
                  <div className="grid grid-cols-2 gap-3 m-3">
                    <div className="text-center p-2 bg-green-50 rounded-md">
                      <p className="text-xs text-gray-600 font-medium">
                        Mentor
                      </p>
                      <p className="text-sm font-bold text-green-700">
                        {leadData?.consultation_done.mentor_consultations}
                      </p>
                    </div>
                    <div className="text-center p-2 bg-blue-50 rounded-md">
                      <p className="text-xs text-gray-600 font-medium">
                        Counsellor
                      </p>
                      <p className="text-sm font-bold text-blue-700">
                        {leadData?.consultation_done.counsellor_consultations}
                      </p>
                    </div>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div
            className="flex items-center justify-between p-2 rounded-lg bg-green-50 hover:bg-green-100 transition-colors cursor-pointer"
            // onClick={() => handleLeadsClick("assigned")}
          >
            <div className="flex items-center gap-2">
              <IndianRupee className="h-4 w-4 text-green-500" />
              <p className="text-sm">Sales</p>
            </div>
            {leadData ? (
              <p className="text-xl font-bold text-green-700">
                {leadData?.sales}
              </p>
            ) : (
              <Skeleton className="h-5 w-20 mt-2" />
            )}
          </div>
        </CardContent>
      </Card>
      <Dialog open={showLeadsModal} onOpenChange={setShowLeadsModal}>
        <DialogContent
          className={`${
            modalType === "assigned"
              ? "min-w-6xl"
              : modalType === "position"
              ? "min-w-2xl"
              : ""
          }`}
        >
          <DialogHeader>
            <div className="flex justify-between items-end">
              <div className="">
                <DialogTitle>
                  {modalType === "assigned"
                    ? "Assigned Leads Performance"
                    : modalType === "unassigned"
                    ? "Unassigned Leads - Source Breakdown"
                    : "Lead Position"}
                </DialogTitle>
                <DialogDescription>
                  {modalType === "assigned"
                    ? "Detailed performance metrics for each counsellor including consultation and sales ratios"
                    : modalType === "unassigned"
                    ? "Source-wise distribution of unassigned leads"
                    : ""}
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
          ) : modalType === "unassigned" ? (
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
          ) : (
            <LeadPosition />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
