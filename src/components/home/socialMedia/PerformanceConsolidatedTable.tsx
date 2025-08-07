import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetConsolidatedTeamPerformanceQuery } from "@/service/dashboard/api";
import { selectPeriod } from "@/features/period/periodSlice";
import { useSelector } from "react-redux";
import { keyString } from "@/lib/utils";

type PerformanceEntry = {
  social_leads_assigned: number;
  social_consultations: number;
  social_sales: number;
};

type ConsolidatedTeamPerformanceResponse = {
  data: Record<string, PerformanceEntry>;
};

export default function PerformanceConsolidatedTable() {
  const filter = useSelector(selectPeriod);

  const { data, isLoading } = useGetConsolidatedTeamPerformanceQuery({
    filter,
  }) as {
    data: ConsolidatedTeamPerformanceResponse;
    isLoading: boolean;
  };

  const renderSkeletonRows = () => {
    return Array.from({ length: 5 }).map((_, i) => (
      <TableRow key={i}>
        {Array.from({ length: 4 }).map((_, j) => (
          <TableCell key={j}>
            <Skeleton className="h-4 w-full" />
          </TableCell>
        ))}
      </TableRow>
    ));
  };

  return (
    <div>
      <div className="space-y-6 mt-8">
        <h2 className="text-2xl font-bold">Consolidated Team Performance</h2>
        <Card>
          <CardHeader>
            <CardTitle>Team & Mentor Performance Summary</CardTitle>
            <CardDescription>
              Leads, Consultations, and Sales by Team and Mentor
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Team / Mentor</TableHead>
                  <TableHead>Leads Assigned</TableHead>
                  <TableHead>Consultations Done</TableHead>
                  <TableHead>Sales Done</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading || !data?.data
                  ? renderSkeletonRows() 
                  : Object.entries(data?.data || {}).map(
                      ([name, team], index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <div>
                                <span className="font-medium">{keyString(name) as string}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="font-semibold">
                            {team?.social_leads_assigned}
                          </TableCell>
                          <TableCell className="font-semibold">
                            {team?.social_consultations}
                          </TableCell>
                          <TableCell className="font-semibold">
                            {team?.social_sales}
                          </TableCell>
                        </TableRow>
                      )
                    )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
