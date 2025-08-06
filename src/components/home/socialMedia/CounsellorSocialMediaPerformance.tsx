import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { selectPeriod } from "@/features/period/periodSlice";
import { useGetCounsellorSocialMediaPerformanceQuery } from "@/service/dashboard/api";
// import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useSelector } from "react-redux";

type SocialEntry = {
  social_leads_assigned: number;
  social_consultations: number;
  social_sales: number;
};

type CounsellorSocialMediaPerformanceResponse = {
  data: Record<string, SocialEntry>;
};

export default function CounsellorSocialMediaPerformance() {
  const filter = useSelector(selectPeriod);

  const { data, isLoading } = useGetCounsellorSocialMediaPerformanceQuery({
    filter,
  }) as {
    data: CounsellorSocialMediaPerformanceResponse;
    isLoading: boolean;
  };

  const renderSkeletonRows = () => {
    return Array.from({ length: 5 }).map((_, i) => (
      <TableRow key={i}>
        {Array.from({ length: 4 }).map((_, j) => (
          <TableCell key={j}>
            <Skeleton className="h-4 w-full" />
          </TableCell>
        ))}
      </TableRow>
    ));
  };
  return (
    <div>
      <div className="space-y-6 mt-8">
        <h2 className="text-2xl font-bold">
          Counsellor Social Media Performance
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Individual Counsellor Social Media Metrics</CardTitle>
            <CardDescription>
              Breakdown of social media leads, consultations, and conversions
              per counsellor
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Counsellor</TableHead>
                  <TableHead>Social Leads Assigned</TableHead>
                  <TableHead>Social Consultations</TableHead>
                  <TableHead>Social Sales</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading
                  ? renderSkeletonRows()
                  : Object.entries(data?.data).map(
                      ([counsellor, sales], index: number) => {
                        return (
                          <TableRow key={index}>
                            <TableCell>
                              <div className="flex items-center space-x-3">
                                {/* <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={counsellor.avatar || "/placeholder.svg"}
                            />
                            <AvatarFallback>
                              {counsellor.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar> */}
                                <span className="font-medium">
                                  {counsellor}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell className="font-semibold">
                              {sales.social_leads_assigned}
                            </TableCell>
                            <TableCell className="font-semibold">
                              {sales.social_consultations}
                            </TableCell>
                            <TableCell className="font-semibold">
                              {sales.social_sales}
                            </TableCell>
                          </TableRow>
                        );
                      }
                    )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
