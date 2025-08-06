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

export default function PerformanceConsolidatedTable() {
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
  return (
    <div>
      <div className="space-y-6 mt-8">
        <h2 className="text-2xl font-bold">Consolidated Team Performance</h2>
        <Card>
          <CardHeader>
            <CardTitle>Team & Mentor Performance Summary</CardTitle>
            <CardDescription>
              Leads, Consultations, and Sales by Team and Mentor
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Team / Mentor</TableHead>
                  <TableHead>Leads Assigned</TableHead>
                  <TableHead>Consultations Done</TableHead>
                  <TableHead>Sales Done</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teamSocialLeadDistribution.map((team) => (
                  <TableRow key={team.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={
                              mockData.teams.find((t) => t.id === team.id)
                                ?.mentorAvatar || "/placeholder.svg"
                            }
                          />
                          <AvatarFallback>
                            {team.mentor
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <span className="font-medium">{team.name}</span>
                          <p className="text-xs text-muted-foreground">
                            {team.mentor}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold">
                      {team.estimatedSocialLeads}
                    </TableCell>
                    <TableCell className="font-semibold">
                      {team.estimatedSocialConsultations}
                    </TableCell>
                    <TableCell className="font-semibold">
                      {team.estimatedSocialSales}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
