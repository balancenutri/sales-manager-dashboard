import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockData } from "@/lib/data";

export default function AppDownloadCount() {
  return (
    <div>
      <h2 className="text-2xl font-bold mt-8">App Download Counts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 overflow-x-auto pb-4">
        {Object.entries(mockData.appAnalytics.appDownloadsBreakdown).map(
          ([period, data]) => (
            <Card key={period} className="min-w-[200px]">
              {" "}
              {/* Added min-w to ensure cards don't shrink too much */}
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium capitalize">
                  {period
                    .replace(/([A-Z])/g, " $1")
                    .replace(/month/, "This Month")
                    .trim()}{" "}
                  Downloads
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Lead</span>
                  <span className="font-semibold text-base">{data.lead}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">OC</span>{" "}
                  {/* Changed from Organic Conversions */}
                  <span className="font-semibold text-base">
                    {data.organic}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="font-medium">Total</span>
                  <span className="font-semibold text-lg">{data.total}</span>
                </div>
              </CardContent>
            </Card>
          )
        )}
      </div>
    </div>
  );
}
