import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockData } from "@/lib/data";
export default function ClinicalBifurcation() {
  return (
    <div>
      <div className="space-y-6 mt-8">
        <h2 className="text-2xl font-bold">Clinical Conditions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(mockData.clinicalConditionsAnalytics)
            .slice(0, 3)
            .map(([condition, data]) => (
              <Card key={condition}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    <Badge className="bg-purple-600 text-white">
                      {condition}11
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">OLR</span>
                    <span className="font-semibold text-base">
                      {data.olr.count} | {data.olr.value}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">OCL</span>
                    <span className="font-semibold text-base">
                      {data.ocl.count} | {data.ocl.value}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
        <h2 className="text-2xl font-bold mt-8">Other Clinical Conditions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(mockData.clinicalConditionsAnalytics)
            .slice(3)
            .map(([condition, data]) => (
              <Card key={condition}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    <Badge className="bg-purple-600 text-white">
                      {condition}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">OLR</span>
                    <span className="font-semibold text-base">
                      {data.olr.count} | {data.olr.value}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">OCL</span>
                    <span className="font-semibold text-base">
                      {data.ocl.count} | {data.ocl.value}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
}
