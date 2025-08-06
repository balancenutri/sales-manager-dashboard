import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { mockData } from "@/lib/data";

export default function GenderBifurcation() {
  const maleLeadsCount = mockData.leads.filter(
    (lead) => lead.gender === "Male"
  ).length;
  const femaleLeadsCount = mockData.leads.filter(
    (lead) => lead.gender === "Female"
  ).length;
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Overall Male Leads</CardTitle>
            <CardDescription>Total male leads in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-4xl font-bold">{maleLeadsCount}</span>
              <span className="text-lg text-muted-foreground">Male Leads</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Overall Female Leads</CardTitle>
            <CardDescription>Total female leads in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-4xl font-bold">{femaleLeadsCount}</span>
              <span className="text-lg text-muted-foreground">
                Female Leads
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
