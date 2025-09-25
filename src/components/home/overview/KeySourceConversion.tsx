import SkeletonCard from "@/components/common/SkeletonCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CustomDatePicker from "@/components/ui/custom-date-picker";
import { keyString } from "@/lib/utils";
import { useGetKeySourceConversionQuery } from "@/service/dashboard/api";
import dayjs from "dayjs";
import { useState } from "react";

export default function KeySourceConversion() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    dayjs().toDate()
  );

  const { data, isFetching } = useGetKeySourceConversionQuery({
    start_date: dayjs(selectedDate).startOf("month").format("YYYY-MM-DD"),
    end_date: dayjs(selectedDate).endOf("month").format("YYYY-MM-DD"),
  });

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">Key Source Conversion</h2>
        <div className="flex gap-4">
          <CustomDatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            showMonthYearPicker={true}
            dateFormat="MM/yyyy"
            maxDate={dayjs()}
            clearable={true}
          />
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {isFetching && data?.data
          ? Object.entries(data?.data).map(([key, value], idx) => (
              <Card key={idx} className="min-w-[320px] flex-shrink-0">
                <CardHeader>
                  <CardTitle>{keyString(key)}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {Object.entries(value).map(([key, item], index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between border-b last:border-none pb-2 last:pb-0"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{keyString(key)}</span>
                      </div>
                      <span className="font-medium">{item}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))
          : Array(5)
              .fill(null)
              .map((_, idx: number) => <SkeletonCard row={4} key={idx} />)}
      </div>
    </>
  );
}
