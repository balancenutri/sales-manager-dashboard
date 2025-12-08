import CustomDatePicker from "@/components/ui/custom-date-picker";
import { useGetAssignedLeadPerformanceAllQuery } from "@/service/dashboard/api";
import dayjs from "dayjs";
import { useState } from "react";
import AllCounsellorCard from "../../cards/AllCounsellorCard";
import SkeletonCard from "@/components/common/SkeletonCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CounsellorPerformance() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    dayjs().toDate()
  );

  const [selected, setSelected] = useState<"" | "ol" | "fl" | "oc">("");

  const { data, isFetching } = useGetAssignedLeadPerformanceAllQuery({
    start_date: dayjs(selectedDate).startOf("month").format("YYYY-MM-DD"),
    end_date: dayjs(selectedDate).endOf("month").format("YYYY-MM-DD"),
    filter: selected,
  });
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Counsellor Performance</h2>
        <div className="flex gap-2 items-center">
          <Tabs defaultValue={selected} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger
                className="cursor-pointer"
                value=""
                onClick={() => setSelected("")}
              >
                All Leads
              </TabsTrigger>
              <TabsTrigger
                className="cursor-pointer"
                value={"fl"}
                onClick={() => setSelected("fl")}
              >
                New Lead
              </TabsTrigger>
              <TabsTrigger
                className="cursor-pointer"
                value="ol"
                onClick={() => setSelected("ol")}
              >
                Old Lead
              </TabsTrigger>
              <TabsTrigger
                className="cursor-pointer"
                value="oc"
                onClick={() => setSelected("oc")}
              >
                OC
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <CustomDatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            showMonthYearPicker
            dateFormat="MM/yyyy"
            maxDate={dayjs().toDate()}
            className="h-8 w-32"
            clearable
          />
        </div>
      </div>


      <div className="grid grid-cols-4 gap-3 mt-2">
        {data?.data && !isFetching
          ? data?.data.map((performanceData) => (
              <AllCounsellorCard performanceData={performanceData} benchmarkData={data?.table_meta_data?.benchmarkData} averageData={data?.table_meta_data?.avgPerformance} type={selected !== "oc"} />
            ))
          : Array(4)
              .fill(null)
              .map((_, idx: number) => <SkeletonCard row={4} key={idx} />)}
      </div>
    </div>
  );
}
