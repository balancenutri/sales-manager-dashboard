import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetCounsellorDailyPerformanceByIdQuery } from "@/service/dashboard/api";
import { skipToken } from "@reduxjs/toolkit/query";
import dayjs from "dayjs";

interface Sale {
  unit: number;
  amount: number;
}

interface DailyPerformance {
  note: string;
  added_date: string;
  lead_assigned: number;
  follow_up_done_today: number;
  consultation_done: number;
  engagement_today: number;
  sale_today: Sale;
}

export default function CounsellorDailyPerformance({ id }: { id?: number }) {
  const { data, isFetching } = useGetCounsellorDailyPerformanceByIdQuery(
    id ? { id } : skipToken
  );

  const performanceData: DailyPerformance[] = data?.data ?? [];


  const today = dayjs();
  const currentDay = today.date();


  const allDays: string[] = Array.from({ length: currentDay }, (_, idx) => {
    return dayjs()
      .date(idx + 1)
      .format("YYYY-MM-DD");
  });


  const mergedData: DailyPerformance[] = allDays.map((date) => {
    const existing = performanceData.find((item) => item.added_date === date);

    return (
      existing || {
        note: "-",
        added_date: date,
        lead_assigned: 0,
        follow_up_done_today: 0,
        consultation_done: 0,
        engagement_today: 0,
        sale_today: { unit: 0, amount: 0 },
      }
    );
  });

  return (
    <div className="max-h-[80vh] overflow-scroll">
      {isFetching ? (
        <p className="text-muted-foreground">Loading data...</p>
      ) : (
        <Table>

          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Leads Assigned</TableHead>
              <TableHead>Follow-ups</TableHead>
              <TableHead>Consultations</TableHead>
              <TableHead>Engagements</TableHead>
              <TableHead>Sales (Unit)</TableHead>
              <TableHead>Sales (₹)</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {mergedData.map((item) => {
              const formattedDate = dayjs(item.added_date).format("DD MMM YYYY");

              return (
                <TableRow key={item.added_date}>
                  <TableCell>{formattedDate}</TableCell>
                  <TableCell>{item.lead_assigned}</TableCell>
                  <TableCell>{item.follow_up_done_today}</TableCell>
                  <TableCell>{item.consultation_done}</TableCell>
                  <TableCell>{item.engagement_today}</TableCell>
                  <TableCell>{item.sale_today.unit}</TableCell>
                  <TableCell>₹{item.sale_today.amount}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
