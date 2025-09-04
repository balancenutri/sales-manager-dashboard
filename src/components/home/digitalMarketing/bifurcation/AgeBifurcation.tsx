import SkeletonTable from "@/components/common/SkeletonTable";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { AgeGroupDistribution, Bifurcation } from "@/lib/types";

export default function AgeBifurcation({
  data,
}: {
  data?: Bifurcation<AgeGroupDistribution>;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Age Group</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Age Group</TableHead>
              <TableHead className="text-center">Below 20</TableHead>
              <TableHead className="text-center">21 - 30</TableHead>
              <TableHead className="text-center">31 - 40</TableHead>
              <TableHead className="text-center">41 - 50</TableHead>
              <TableHead className="text-center">Above 50</TableHead>
            </TableRow>
          </TableHeader>
          {data?.lead && data?.oc ? <TableBody>
            <TableRow>
              <TableCell className="font-semibold text-center">Lead</TableCell>
              <TableCell className="text-center font-bold">
                {data?.lead.age_group_below_20}
              </TableCell>
              <TableCell className="text-center font-bold">
                {data?.lead.age_group_21_to_30}
              </TableCell>
              <TableCell className="text-center font-bold">
                {data?.lead.age_group_31_to_40}
              </TableCell>
              <TableCell className="text-center font-bold">
                {data?.lead.age_group_41_to_50}
              </TableCell>
              <TableCell className="text-center font-bold">
                {data?.lead.age_group_above_50}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold text-center">OC</TableCell>
              <TableCell className="text-center font-bold">
                {data?.oc.age_group_below_20}
              </TableCell>
              <TableCell className="text-center font-bold">
                {data?.oc.age_group_21_to_30}
              </TableCell>
              <TableCell className="text-center font-bold">
                {data?.oc.age_group_31_to_40}
              </TableCell>
              <TableCell className="text-center font-bold">
                {data?.oc.age_group_41_to_50}
              </TableCell>
              <TableCell className="text-center font-bold">
                {data?.oc.age_group_above_50}
              </TableCell>
            </TableRow>
          </TableBody> : <SkeletonTable row={2} col={6} />}
        </Table>
      </CardContent>
    </Card>
  );
}
