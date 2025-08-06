import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { keyString } from "@/lib/utils";
import { useGetClinicalConditionDataQuery } from "@/service/dashboard/api";

export type ClinicalConditionData = {
  [keyof: string]: {
    leads: number;
    ocl: number;
  };
};

export type ClinicalConditionResponse = {
  data: ClinicalConditionData;
};

export default function ClinicalBifurcation() {
  const { data, isLoading } = useGetClinicalConditionDataQuery() as {
    data: ClinicalConditionResponse;
    isLoading: boolean;
  };

  console.log({ data, isLoading });
  return (
    <div>
      <div className="space-y-6 mt-8">
        <h2 className="text-2xl font-bold mb-10">Clinical Conditions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
          {!isLoading &&
            Object.entries(data.data).map(([condition, data]) => (
              <Card key={condition} className="relative">
                  <CardHeader className="pb-2 absolute -top-5 left-0 right-0 flex justify-center">
                    <CardTitle className="text-base font-medium">
                      <span className="block text-nowrap px-3 py-2 rounded-md bg-orange-100 text-orange-800">
                        {keyString(condition)}
                      </span>
                    </CardTitle>
                  </CardHeader>
                {/* <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    <Badge className="bg-purple-600 text-white">
                      {condition}
                    </Badge>
                  </CardTitle>
                </CardHeader> */}
                <CardContent className="space-y-2 mt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm ">OLR</span>
                    <span className="font-semibold text-base">
                      {data.leads}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm ">OCL</span>
                    <span className="font-semibold text-base">{data.ocl}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
}
