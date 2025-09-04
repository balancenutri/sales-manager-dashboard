// import {
//   useGetAllActiveAppCountQuery,
//   useGetAllLeadAppCountQuery,
//   useGetAllOcAppCountQuery,
// } from "@/service/dashboard/api";
import AppCountCard from "./appCount/AppCountCard";
import { useState } from "react";
import {
  useGetActiveAppCountQuery,
  useGetLeadAppCountQuery,
  useGetOcAppCountQuery,
} from "@/service/dashboard/api";

type PeriodType = "overall" | "last_24_hours" | "last_48_hours" | "mtd";

export default function AppCount() {
    const [leadPeriod, setLeadPeriod] = useState<PeriodType>("mtd");
    const [activePeriod, setActivePeriod] = useState<PeriodType>("mtd");

  const { data: leadData } = useGetLeadAppCountQuery({ filter: leadPeriod });
  const { data: activeData } = useGetActiveAppCountQuery({ filter: activePeriod });
  const { data: ocData } = useGetOcAppCountQuery({ filter: "" });


  return (
    <div className="mt-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">App Analytics Overview</h2>
      </div>
      <div className="grid lg:grid-cols-3 gap-4">
        <AppCountCard
          data={leadData?.data}
          title="Lead App Count"
          period={leadPeriod}
          setPeriod={setLeadPeriod}
        />
        <AppCountCard
          data={activeData?.data}
          title="Active App Count"
          period={activePeriod}
          setPeriod={setActivePeriod}
        />
        <AppCountCard data={ocData?.data} title="OC App Count" />
      </div>
    </div>
  );
}
