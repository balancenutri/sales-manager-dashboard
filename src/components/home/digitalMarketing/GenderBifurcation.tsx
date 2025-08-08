import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { selectPeriod } from "@/features/period/periodSlice";
import { useGetGenderWiseLeadQuery } from "@/service/dashboard/api";
import { useSelector } from "react-redux";

type GenderData = {
  overall_male_leads: number;
  overall_female_leads: number;
};

type GenderBifurcationResponse = {
  data: GenderData;
};

export default function GenderBifurcation() {
  const filter = useSelector(selectPeriod);

  const { data } = useGetGenderWiseLeadQuery({ filter }) as {
    data: GenderBifurcationResponse;
  };
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
              {data?.data?.overall_male_leads !== undefined ? (
                <span className="text-4xl font-bold">
                  {data?.data?.overall_male_leads}
                </span>
              ) : (
                <Skeleton className="h-8 w-20" />
              )}
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
              {!data?.data?.overall_female_leads !== undefined ? (
                <span className="text-4xl font-bold">
                  {data?.data?.overall_female_leads}
                </span>
              ) : (
                <Skeleton className="h-8 w-20" />
              )}
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
