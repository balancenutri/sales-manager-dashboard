import SkeletonTable from "@/components/common/SkeletonTable";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { AssignedLeadPerformance } from "@/lib/types";
import { useGetAssignedLeadPerformanceQuery } from "@/service/dashboard/api";
import dayjs from "dayjs";

export default function AssignedLead({
  selected,
  selectedDate,
}: {
  selected: "counsellor_data" | "mentor_data";
  selectedDate: Date | null;
}) {
  const { data, isFetching } = useGetAssignedLeadPerformanceQuery(
    selectedDate
      ? {
          start_date: dayjs(selectedDate).startOf("month").format("YYYY-MM-DD"),
          end_date: dayjs(selectedDate).endOf("month").format("YYYY-MM-DD"),
        }
      : {}
  );

  function getTotalPerformance(data: AssignedLeadPerformance) {
    let totalConsultations = 0;
    let totalSales = 0;
    let totalLeadsAssigned = 0;

    for (let user in data) {
      const userData = data[user];
      totalConsultations += userData.consultations;
      totalSales += userData.sales;
      totalLeadsAssigned += userData.leads_assigned;
    }

    return {
      totalConsultations,
      totalSales,
      totalLeadsAssigned,
    };
  }

  const total: {
    totalConsultations: number;
    totalSales: number;
    totalLeadsAssigned: number;
  } = data?.data
    ? getTotalPerformance(data?.data?.[selected])
    : {
        totalConsultations: 0,
        totalSales: 0,
        totalLeadsAssigned: 0,
      };

  return (
    <div className="space-y-4 max-h-[80vh] overflow-scroll">
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
          {data?.data && !isFetching ? (
            Object.entries(data?.data?.[selected]).map(([key, counsellor]) => {
              return (
                <TableRow key={key}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {counsellor.crm_user
                            ?.split(" ")
                            ?.map((n) => n[0])
                            ?.join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{counsellor.crm_user}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold">
                    {counsellor.leads_assigned}
                  </TableCell>
                  <TableCell className="font-semibold">
                    {counsellor.consultations}
                  </TableCell>
                  <TableCell className="font-semibold">
                    {counsellor.sales}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-blue-50 text-blue-700"
                    >
                      {counsellor["l:c"]}%
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700"
                    >
                      {counsellor["c:s"]}%
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-purple-50 text-purple-700"
                    >
                      {counsellor["l:s"]}%
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <SkeletonTable row={7} col={7} />
          )}
        </TableBody>
      </Table>

      <div className="pt-4 border-t">
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <p className="text-muted-foreground">Total Leads Assigned</p>
            <p className="text-xl font-bold">{total.totalLeadsAssigned}</p>
          </div>
          <div className="text-center">
            <p className="text-muted-foreground">Total Consultations</p>
            <p className="text-xl font-bold">{total.totalConsultations}</p>
          </div>
          <div className="text-center">
            <p className="text-muted-foreground">Total Sales</p>
            <p className="text-xl font-bold">{total.totalSales}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
