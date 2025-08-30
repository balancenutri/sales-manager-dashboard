import {
  useGetAllActiveAppCountQuery,
  useGetAllLeadAppCountQuery,
  useGetAllOcAppCountQuery,
} from "@/service/dashboard/api";
import AppCountCard from "./appCount/AppCountCard";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type PeriodType = "mtd" | "last_24_hours" | "last_72_hours" | "all";

export default function AppCount() {
  const { data: leadData } = useGetAllLeadAppCountQuery();
  const { data: activeData } = useGetAllActiveAppCountQuery();
  const { data: ocData } = useGetAllOcAppCountQuery();

  const [period, setPeriod] = useState<PeriodType>("mtd");

  const appData = {
    active: {
      with_app: 12,
      without_app: 67,
      not_updated: 55,
      with_activity: 55,
      without_activity: 67,
    },
    oc: {
      with_app: 12,
      without_app: 67,
      not_updated: 55,
      with_activity: 55,
      without_activity: 67,
    },
    lead: {
      with_app: 12,
      without_app: 67,
      not_updated: 55,
      with_activity: 55,
      without_activity: 67,
    },
  };

  const [selected, setSelected] = useState("");
  return (
    <div className="mt-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">App Analytics Overview</h2>
        <Tabs defaultValue={selected} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger
              className="cursor-pointer"
              value="all"
              onClick={() => setSelected("mtd")}
            >
              This Month
            </TabsTrigger>
            <TabsTrigger
              className="cursor-pointer"
              value="android"
              onClick={() => setSelected("last_24_hours")}
            >
              Last 24 Hours
            </TabsTrigger>
            <TabsTrigger
              className="cursor-pointer"
              value="ios"
              onClick={() => setSelected("last_48_hours")}
            >
              Last 48 Hours
            </TabsTrigger>
            <TabsTrigger
              className="cursor-pointer"
              value="ios"
              onClick={() => setSelected("all")}
            >
              Over All
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="grid lg:grid-cols-3 gap-4">
        <AppCountCard data={appData.active} title="Active App Count" />
        <AppCountCard data={appData.oc} title="OC App Count" />
        <AppCountCard data={appData.lead} title="Lead App Count" />
        {/* <AppCountCard data={activeData?.data || {}} title="Active App Count" />
      <AppCountCard data={ocData?.data || {}} title="OC App Count" />
      <AppCountCard data={leadData?.data || {}} title="Lead App Count" /> */}
      </div>
    </div>
  );
}
