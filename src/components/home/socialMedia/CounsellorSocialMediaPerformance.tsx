import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockData } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export default function CounsellorSocialMediaPerformance() {
  const selectedPeriod = "today";
  const totalAssignedLeadsOverall = mockData.overview.assignedLeads;
  const totalSocialLeads =
    mockData.socialMediaAnalytics.leadsFromSocial[selectedPeriod]; // Use selectedPeriod
  const unassignedSocialLeads = mockData.leadsSources.unassigned.socialMedia;
  const assignedSocialLeads = totalSocialLeads - unassignedSocialLeads;
  const socialLeadRatio =
    totalAssignedLeadsOverall > 0
      ? assignedSocialLeads / totalAssignedLeadsOverall
      : 0;

  const counsellorSocialLeadDistribution = mockData.counsellors.map(
    (counsellor) => {
      const estimatedSocialLeads = Math.round(
        counsellor.leadsAssigned * socialLeadRatio
      );
      const estimatedSocialConsultations = Math.round(
        counsellor.consultations * socialLeadRatio
      );
      const estimatedSocialSales = Math.round(
        counsellor.salesClosed * socialLeadRatio
      );
      return {
        id: counsellor.id,
        name: counsellor.name,
        avatar: counsellor.avatar,
        estimatedSocialLeads,
        estimatedSocialConsultations,
        estimatedSocialSales,
      };
    }
  );

  console.log({ counsellorSocialLeadDistribution });
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
                  <TableHead>Estimated Social Leads Assigned</TableHead>
                  <TableHead>Estimated Social Consultations</TableHead>
                  <TableHead>Estimated Social Sales</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {counsellorSocialLeadDistribution.map((counsellor) => {
                  return (
                    <TableRow key={counsellor.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={counsellor.avatar || "/placeholder.svg"}
                            />
                            <AvatarFallback>
                              {counsellor.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{counsellor.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold">
                        {counsellor.estimatedSocialLeads}
                      </TableCell>
                      <TableCell className="font-semibold">
                        {counsellor.estimatedSocialConsultations}
                      </TableCell>
                      <TableCell className="font-semibold">
                        {counsellor.estimatedSocialSales}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
