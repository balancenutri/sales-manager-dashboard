import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Bifurcation, LocationDistribution } from "@/lib/types";

export default function RegionDistribution({
  data,
}: {
  data?: Bifurcation<LocationDistribution>;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Lead - OC Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Region</TableHead>
              <TableHead className="text-center">Lead</TableHead>
              <TableHead className="text-center">OC</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-semibold text-center">India</TableCell>
              <TableCell className="text-center font-bold">
                {data?.lead.indian}
              </TableCell>
              <TableCell className="text-center font-bold">
                {data?.oc.indian}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold text-center">
                Abroad
              </TableCell>
              <TableCell className="text-center font-bold">
                {data?.lead.abroad}
              </TableCell>
              <TableCell className="text-center font-bold">
                {data?.oc.abroad}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
