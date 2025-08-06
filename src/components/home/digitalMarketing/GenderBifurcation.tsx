import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { selectPeriod } from "@/features/period/periodSlice";
import { useGetGenderWiseLeadQuery } from "@/service/dashboard/api";
import { useSelector } from "react-redux";

type GenderData = {
  overall_male_leads: number;
  overall_female_leads: number;
};

type GenderBifurcationResponse = {
    data : GenderData;
}

export default function GenderBifurcation() {
  const filter = useSelector(selectPeriod);

  const { data, isLoading } = useGetGenderWiseLeadQuery({ filter }) as {
    data: GenderBifurcationResponse;
    isLoading: boolean;
  };
  console.log({ data, isLoading });
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
              <span className="text-4xl font-bold">{data?.data?.overall_male_leads}</span>
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
              <span className="text-4xl font-bold">{data?.data?.overall_female_leads}</span>
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
