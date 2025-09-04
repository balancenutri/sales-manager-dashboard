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
import type { Bifurcation, GenderDistribution } from "@/lib/types";

export default function GenderBifurcation({
  data,
}: {
  data?: Bifurcation<GenderDistribution>;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gender Bifurcation</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Gender</TableHead>
              <TableHead className="text-center">Lead</TableHead>
              <TableHead className="text-center">OC</TableHead>
            </TableRow>
          </TableHeader>
          {data?.lead && data?.oc ? <TableBody>
            <TableRow>
              <TableCell className="font-semibold text-center">Male</TableCell>
              <TableCell className="text-center font-bold">
                {data?.lead.gender_male}
              </TableCell>
              <TableCell className="text-center font-bold">
                {data?.lead.gender_female}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold text-center">
                Female
              </TableCell>
              <TableCell className="text-center font-bold">
                {data?.oc.gender_male}
              </TableCell>
              <TableCell className="text-center font-bold">
                {data?.oc.gender_female}
              </TableCell>
            </TableRow>
          </TableBody> : <SkeletonTable row={2} col={3} />}
        </Table>
      </CardContent>
    </Card>
  );
}
