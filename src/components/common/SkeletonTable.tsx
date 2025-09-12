import { TableCell, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonTable({
  row,
  col,
}: {
  row: number;
  col: number;
}) {
  return Array.from({ length: row }).map((_, i) => (
    <TableRow key={i}>
      {Array.from({ length: col }).map((_, j) => (
        <TableCell key={j}>
          <Skeleton className="h-4 w-full" />
        </TableCell>
      ))}
    </TableRow>
  ));
}
