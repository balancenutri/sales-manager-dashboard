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
import { useGetCounsellorPerformanceQuery } from "@/service/dashboard/api";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CounsellorCard from "../../cards/CounsellorCard";
export default function TopPerformer() {
  const [openModal, setOpenModal] = useState<null | number>(null);
  const [selected, setSelected] = useState<
    "sales" | "conversion_rate" | "avg_per_unit"
  >("conversion_rate");
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  const { data, isFetching } = useGetCounsellorPerformanceQuery({
    sort_by: selected,
    order,
  });

  const renderSkeletonRows = () => {
    return Array.from({ length: 3 }).map((_, i) => (
      <div className="flex items-center space-x-4" key={i}>
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-4 w-44" />
        </div>
      </div>
    ));
  };
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="">
            <CardTitle>{order == "desc" ? "Top" : "Low"} Performers</CardTitle>
            <CardDescription>Best Performers</CardDescription>
          </div>
          <div className="flex gap-2">
            <Tabs defaultValue={order} className="">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger
                  className="cursor-pointer"
                  value="desc"
                  onClick={() => setOrder("desc")}
                >
                  Top
                </TabsTrigger>
                <TabsTrigger
                  className="cursor-pointer"
                  value={"asc"}
                  onClick={() => setOrder("asc")}
                >
                  Low
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <Select
              onValueChange={(val: string) =>
                setSelected(val as "sales" | "conversion_rate" | "avg_per_unit")
              }
              value={selected}
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="conversion_rate">Conversion</SelectItem>
                <SelectItem value="sales">Revenue</SelectItem>
                <SelectItem value="avg_per_unit">Avg. Per Unit Sale</SelectItem>
              </SelectContent>
            </Select>
          </div>
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
                      className="flex items-center space-x-4 cursor-pointer"
                      onClick={() => setOpenModal(sales.id)}
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

      <Dialog open={!!openModal} onOpenChange={() => setOpenModal(null)}>
        <DialogContent
          onInteractOutside={(e: React.MouseEvent | Event) =>
            e.preventDefault()
          }
        >
          <DialogHeader>
            <DialogTitle>Counsellor Details</DialogTitle>
          </DialogHeader>
          {openModal && <CounsellorCard counsellorId={openModal} />}
        </DialogContent>
      </Dialog>
    </Card>
  );
}
