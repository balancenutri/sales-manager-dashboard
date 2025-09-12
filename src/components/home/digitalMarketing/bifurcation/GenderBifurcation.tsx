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
              <TableHead className="text-center">Male</TableHead>
              <TableHead className="text-center">Female</TableHead>
              <TableHead className="text-center">No Gender</TableHead>
            </TableRow>
          </TableHeader>
          {data?.lead && data?.oc ? <TableBody>
            <TableRow>
              <TableCell className="font-semibold text-center">Lead</TableCell>
              <TableCell className="text-center font-bold">
                {data?.lead.gender_male}
              </TableCell>
              <TableCell className="text-center font-bold">
                {data?.lead.gender_female}
              </TableCell>
              <TableCell className="text-center font-bold">
                {data?.lead.gender_no_gender}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold text-center">
                OC
              </TableCell>
              <TableCell className="text-center font-bold">
                {data?.oc.gender_male}
              </TableCell>
              <TableCell className="text-center font-bold">
                {data?.oc.gender_female}
              </TableCell>
              <TableCell className="text-center font-bold">
                {data?.oc.gender_no_gender}
              </TableCell>
            </TableRow>
          </TableBody> : <SkeletonTable row={2} col={4} />}
        </Table>
      </CardContent>
    </Card>
  );
}
