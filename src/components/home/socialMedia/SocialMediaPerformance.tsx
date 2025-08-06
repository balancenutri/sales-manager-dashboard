import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { mockData } from "@/lib/data";

export default function SocialMediaPerformance() {
  const selectedPeriod = "today";
  const overallSocialVisitors =
    mockData.socialMediaAnalytics.instagram.totalVisitors[selectedPeriod] +
    mockData.socialMediaAnalytics.facebook.totalVisitors[selectedPeriod] +
    mockData.socialMediaAnalytics.youtube.totalVisitors[selectedPeriod];
  const overallSocialUniqueEngagement =
    mockData.socialMediaAnalytics.instagram.uniqueEngagement[selectedPeriod] +
    mockData.socialMediaAnalytics.facebook.uniqueEngagement[selectedPeriod] +
    mockData.socialMediaAnalytics.youtube.uniqueEngagement[selectedPeriod];
  const overallSocialLeadsGenerated =
    mockData.socialMediaAnalytics.leadsFromSocial[selectedPeriod];
  const overallSocialLeadsConverted =
    mockData.leadSourceAnalytics.find((s) => s.source === "Social Media")
      ?.convertedLeads || 0;
  const overallSocialRevenue =
    mockData.leadSourceAnalytics.find((s) => s.source === "Social Media")
      ?.revenue || 0;

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Overall Social Media Performance</CardTitle>
            <CardDescription>
              Consolidated metrics across all social platforms
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between border-b pb-2">
              <span className="font-medium">Total Visitors</span>
              <span className="font-semibold text-lg">
                {overallSocialVisitors.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <span className="font-medium">Unique Engagement</span>
              <span className="font-semibold text-lg">
                {overallSocialUniqueEngagement.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <span className="font-medium">Leads Generated</span>
              <span className="font-semibold text-lg">
                {overallSocialLeadsGenerated.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <span className="font-medium">Leads Converted</span>
              <span className="font-semibold text-lg">
                {overallSocialLeadsConverted.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Revenue</span>
              <span className="font-semibold text-lg">
                ₹{(overallSocialRevenue / 1000).toFixed(0)}K
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Team Performance (Social Media) - Summary Card (This was the old card, now replaced by the new table above) */}
        {/* The previous card content was here, now replaced by the new table in the Overview tab */}
      </div>
    </div>
  );
}
