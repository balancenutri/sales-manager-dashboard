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
// import { selectPeriod } from "@/features/period/periodSlice";
import { useGetCounsellorCampaignPerformanceQuery } from "@/service/dashboard/api";
// import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

// type CounsellorSocialMediaPerformanceResponse = {
//   data: Record<string, SocialEntry>;
// };

export default function CounsellorDigitalMarketingPerfotmance() {
  //   const filter = useSelector(selectPeriod);

  const { data, isLoading } = useGetCounsellorCampaignPerformanceQuery();

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
        <h2 className="text-xl font-bold">
          Counsellor Digital Marketing Performance (MTD)
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>
              Individual Counsellor Digital Marketing Metrics
            </CardTitle>
            <CardDescription>
              Breakdown of digital marketing leads, consultations, and
              conversions per counsellor
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Counsellor</TableHead>
                  <TableHead>Digital Marketing Leads Assigned</TableHead>
                  <TableHead>Digital Marketing Consultations</TableHead>
                  <TableHead>
                    Digital Marketing Sales <br /> (Units)
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading || !data?.data
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
