import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function StageBifurcation() {
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
          <TableBody>
            <TableRow>
              <TableCell className="font-semibold text-center">Lead</TableCell>
              <TableCell className="text-center text-blue-600 underline font-bold">
                546
              </TableCell>
              <TableCell className="text-center text-blue-600 underline font-bold">
                576
              </TableCell>
              <TableCell className="text-center text-blue-600 underline font-bold">
                576
              </TableCell>
              <TableCell className="text-center text-blue-600 underline font-bold">
                576
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold text-center">OC</TableCell>
              <TableCell className="text-center text-blue-600 underline font-bold">
                546
              </TableCell>
              <TableCell className="text-center text-blue-600 underline font-bold">
                576
              </TableCell>
              <TableCell className="text-center text-blue-600 underline font-bold">
                576
              </TableCell>
              <TableCell className="text-center text-blue-600 underline font-bold">
                576
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
