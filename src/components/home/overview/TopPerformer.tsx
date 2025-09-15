import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";
import { useGetTopPerformersQuery } from "@/service/dashboard/api";
import { useState } from "react";
import CounsellorCard from "../cards/CounsellorCard";
export default function TopPerformer({
  title,
  subTitle,
}: {
  title: string;
  subTitle: string;
}) {
  const { data, isFetching } = useGetTopPerformersQuery();

  const [openModal, setOpenModal] = useState(false);

  const renderSkeletonRows = () => {
    return Array.from({ length: 3 }).map((_, i) => (
      <TableRow key={i}>
        {Array.from({ length: 4 }).map((_, j) => (
          <TableCell key={j}>
            <Skeleton className="h-4 w-32" />
          </TableCell>
        ))}
      </TableRow>
    ));
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subTitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-[60vh]">
          {!data?.data || isFetching
            ? renderSkeletonRows()
            : Object.entries(data?.data || {}).map(
                ([counsellor, sales], index) =>
                  index < 5 && (
                    <div
                      key={index}
                      className="flex items-center space-x-4"
                      onClick={() => setOpenModal(true)}
                    >
                      {/* <div className="flex items-center justify-center w-8 h-8 rounded-full bg-teal-100 text-teal-800 font-bold text-sm">
                  {index + 1}
                </div> */}
                      <Avatar className="h-10 w-10">
                        {/* <AvatarImage src={counsellor.avatar || "/placeholder.svg"} /> */}
                        <AvatarFallback>
                          {counsellor
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{counsellor}</p>
                        <p className="text-xs text-muted-foreground">
                          {sales.conversion_rate}% conversion rate
                        </p>
                      </div>
                      <Badge variant="secondary">₹{sales.sales}</Badge>
                    </div>
                  )
              )}
        </div>
      </CardContent>

      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent
          onInteractOutside={(e: React.MouseEvent | Event) =>
            e.preventDefault()
          }
        >
          <DialogHeader>
            <DialogTitle>Counsellor Details</DialogTitle>
          </DialogHeader>
          <CounsellorCard />
        </DialogContent>
      </Dialog>
    </Card>
  );
}
