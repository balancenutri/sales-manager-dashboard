import CustomDatePicker from "@/components/ui/custom-date-picker";
import { useGetAssignedLeadPerformanceAllQuery } from "@/service/dashboard/api";
import dayjs from "dayjs";
import { useState } from "react";
import AllCounsellorCard from "../../cards/AllCounsellorCard";

export default function CounsellorPerformance() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    dayjs().toDate()
  );

  const { data, isFetching } = useGetAssignedLeadPerformanceAllQuery({
    start_date: dayjs(selectedDate).startOf("month").format("YYYY-MM-DD"),
    end_date: dayjs(selectedDate).endOf("month").format("YYYY-MM-DD"),
  });
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Counsellor Performance</h2>
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
      <div className="grid grid-cols-4 gap-3 mt-2">
        {data?.data &&
          !isFetching &&
          data?.data.map((performanceData) => (
            <AllCounsellorCard performanceData={performanceData} />
          ))}
      </div>
    </div>
  );
}
