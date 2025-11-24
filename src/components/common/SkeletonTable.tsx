import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

interface SkeletonTableProps {
  row: number;
  col: number;
  withHeader?: boolean;
}

export default function SkeletonTable({
  row,
  col,
  withHeader = false,
}: SkeletonTableProps) {
  return withHeader ? (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          {Array.from({ length: col }).map((_, j) => (
            <TableHead key={j}>
              <Skeleton className="h-4 w-24" />
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {Array.from({ length: row }).map((_, i) => (
          <TableRow key={i}>
            {Array.from({ length: col }).map((_, j) => (
              <TableCell key={j}>
                <Skeleton className="h-4 w-full" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ) : (
    Array.from({ length: row }).map((_, i) => (
      <TableRow key={i}>
        {Array.from({ length: col }).map((_, j) => (
          <TableCell key={j}>
            <Skeleton className="h-4 w-full" />
          </TableCell>
        ))}
      </TableRow>
    ))
  );
}
