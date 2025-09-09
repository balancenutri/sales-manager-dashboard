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
import type { Bifurcation, StageDistribution } from "@/lib/types";

export default function StageBifurcation({
  data,
}: {
  data?: Bifurcation<StageDistribution>;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Stage Bifuraction</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">User</TableHead>
              <TableHead className="text-center">Stage 1</TableHead>
              <TableHead className="text-center">Stage 2</TableHead>
              <TableHead className="text-center">Stage 3</TableHead>
              <TableHead className="text-center">Stage 4</TableHead>
            </TableRow>
          </TableHeader>
          {data?.lead && data?.oc ? <TableBody>
            <TableRow>
              <TableCell className="font-semibold text-center">Lead</TableCell>
              <TableCell className="text-center font-bold">
                {data?.lead.stage_1}
              </TableCell>
              <TableCell className="text-center font-bold">
                {data?.lead.stage_2}
              </TableCell>
              <TableCell className="text-center font-bold">
                {data?.lead.stage_3}
              </TableCell>
              <TableCell className="text-center font-bold">
                {data?.lead.stage_4}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold text-center">OC</TableCell>
              <TableCell className="text-center font-bold">
                {data?.oc.stage_1}
              </TableCell>
              <TableCell className="text-center font-bold">
                {data?.oc.stage_2}
              </TableCell>
              <TableCell className="text-center font-bold">
                {data?.oc.stage_3}
              </TableCell>
              <TableCell className="text-center font-bold">
                {data?.oc.stage_4}
              </TableCell>
            </TableRow>
          </TableBody> : <SkeletonTable row={2} col={5} />}
        </Table>
      </CardContent>
    </Card>
  );
}
