import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonCard({ row }: { row: number }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-5 w-20" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {Array(row)
          .fill(null)
          .map((_, index: number) => (
            <div
              key={index}
              className="flex items-center justify-between border-b pb-2"
            >
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-5 w-20" />
            </div>
          ))}
      </CardContent>
    </Card>
  );
}
