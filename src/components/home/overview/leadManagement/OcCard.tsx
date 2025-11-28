import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Users, ArrowUp, UserCheck, IndianRupee } from "lucide-react";
import { useState } from "react";
import { useGetOcManagementQuery } from "@/service/dashboard/api";
import { Skeleton } from "@/components/ui/skeleton";

import CustomDatePicker from "@/components/ui/custom-date-picker";
import dayjs from "dayjs";

export default function OcCard() {

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
    </div>
  );
}
