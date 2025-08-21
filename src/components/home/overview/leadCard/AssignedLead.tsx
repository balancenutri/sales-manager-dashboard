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

export default function AssignedLead() {
  const { data, isFetching } = useGetAssignedLeadPerformanceQuery();

  console.log({ data, isFetching });

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
    ? getTotalPerformance(data?.data)
    : {
        totalConsultations: 0,
        totalSales: 0,
        totalLeadsAssigned: 0,
      };

  return (
    <div className="space-y-4">
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
          {data?.data &&
            Object.entries(data?.data).map(([key, counsellor]) => {
              return (
                <TableRow key={key}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {counsellor.crm_user
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
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
            })}
        </TableBody>
      </Table>

      <div className="pt-4 border-t">
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <p className="text-muted-foreground">Total Leads Assigned</p>
            <p className="text-2xl font-bold">
              {total.totalLeadsAssigned}
            </p>
          </div>
          <div className="text-center">
            <p className="text-muted-foreground">Total Consultations</p>
            <p className="text-2xl font-bold">
              {total.totalConsultations}
            </p>
          </div>
          <div className="text-center">
            <p className="text-muted-foreground">Total Sales</p>
            <p className="text-2xl font-bold">{total.totalSales}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
