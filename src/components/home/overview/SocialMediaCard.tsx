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

export default function SocialMediaCard() {
  const socialMediaRevenue =
    mockData.leadSourceAnalytics.find((s) => s.source === "Social Media")
      ?.revenue || 0;

  const selectedPeriod = "today";

  const totalSocialLeads =
    mockData.socialMediaAnalytics.leadsFromSocial[selectedPeriod]; // Use selectedPeriod
  const unassignedSocialLeads = mockData.leadsSources.unassigned.socialMedia;
  const assignedSocialLeads = totalSocialLeads - unassignedSocialLeads;

  const totalAssignedLeadsOverall = mockData.overview.assignedLeads;
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

  const teamSocialLeadDistribution = mockData.teams.map((team) => {
    const teamCounsellors = mockData.counsellors.filter((c) =>
      team.counsellors.includes(c.name)
    );
    const estimatedTeamSocialLeads = teamCounsellors.reduce(
      (sum, c) => sum + Math.round(c.leadsAssigned * socialLeadRatio),
      0
    );
    const estimatedTeamSocialConsultations = teamCounsellors.reduce(
      (sum, c) => sum + Math.round(c.consultations * socialLeadRatio),
      0
    );
    const estimatedTeamSocialSales = teamCounsellors.reduce(
      (sum, c) => sum + Math.round(c.salesClosed * socialLeadRatio),
      0
    );
    return {
      id: team.id,
      name: team.name,
      mentor: team.mentor,
      estimatedSocialLeads: estimatedTeamSocialLeads,
      estimatedSocialConsultations: estimatedTeamSocialConsultations,
      estimatedSocialSales: estimatedTeamSocialSales,
    };
  });

  const aggregateMentorSocialLeads = teamSocialLeadDistribution.reduce(
    (sum, team) => sum + team.estimatedSocialLeads,
    0
  );
  const aggregateMentorSocialConsultations = teamSocialLeadDistribution.reduce(
    (sum, team) => sum + team.estimatedSocialConsultations,
    0
  );
  const aggregateMentorSocialSales = teamSocialLeadDistribution.reduce(
    (sum, team) => sum + team.estimatedSocialSales,
    0
  );
  const aggregateMentorSocialRevenue = socialMediaRevenue; // Total social media revenue

  // Aggregate for "Counsellor" (sum of all individual counsellors' estimated social performance)
  const aggregateCounsellorSocialLeads =
    counsellorSocialLeadDistribution.reduce(
      (sum, c) => sum + c.estimatedSocialLeads,
      0
    );
  const aggregateCounsellorSocialConsultations =
    counsellorSocialLeadDistribution.reduce(
      (sum, c) => sum + c.estimatedSocialConsultations,
      0
    );
  const aggregateCounsellorSocialSales =
    counsellorSocialLeadDistribution.reduce(
      (sum, c) => sum + c.estimatedSocialSales,
      0
    );
  const aggregateCounsellorSocialRevenue = socialMediaRevenue; // Total social media revenue

  const formatToLacs = (amount: number) => {
    if (amount === 0) return "₹0 Lac";
    return `₹${(amount / 100000).toFixed(1)} Lac`;
  };

  return (
    <div className="space-y-6">
      <Card className="hover:shadow-md transition-shadow h-full">
        <CardHeader>
          <CardTitle>Team Performance (Social Media)</CardTitle>
          <CardDescription>
            Consolidated social media performance by team/counsellor
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">Team Performance</TableHead>
                <TableHead>Leads</TableHead>
                <TableHead>Consultation</TableHead>
                <TableHead>Conversion</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Mentor</TableCell>
                <TableCell className="font-semibold">
                  {aggregateMentorSocialLeads}
                </TableCell>
                <TableCell className="font-semibold">
                  {aggregateMentorSocialConsultations}
                </TableCell>
                <TableCell className="font-semibold">
                  {aggregateMentorSocialSales} /{" "}
                  {formatToLacs(aggregateMentorSocialRevenue)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Counsellor</TableCell>
                <TableCell className="font-semibold">
                  {aggregateCounsellorSocialLeads}
                </TableCell>
                <TableCell className="font-semibold">
                  {aggregateCounsellorSocialConsultations}
                </TableCell>
                <TableCell className="font-semibold">
                  {aggregateCounsellorSocialSales} /{" "}
                  {formatToLacs(aggregateCounsellorSocialRevenue)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
