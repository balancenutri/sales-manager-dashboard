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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export default function TopPerformer({
  title,
  subTitle,
}: {
  title: string;
  subTitle: string;
}) {
  const { data, isFetching } = useGetTopPerformersQuery();

  const [openModal, setOpenModal] = useState(false);
  const [selected, setSelected] = useState<
    "average" | "revenue" | "conversion" | null
  >(null);

  console.log({ selected, setSelected });

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
        <div className="flex justify-between items-center">
          <div className="">
            <CardTitle>{title}</CardTitle>
            <CardDescription>{subTitle}</CardDescription>
          </div>
          <Select
            onValueChange={(val: string) =>
              setSelected(val as "average" | "revenue" | "conversion")
            }
          >
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="conversion">Conversion</SelectItem>
              <SelectItem value="revenue">Revenue</SelectItem>
              <SelectItem value="average">Avg. Per Unit Sale</SelectItem>
            </SelectContent>
          </Select>
        </div>
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
                      <Avatar className="h-10 w-10">
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
