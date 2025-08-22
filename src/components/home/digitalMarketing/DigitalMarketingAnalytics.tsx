import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { mockData } from "@/lib/data";
import {
  Activity,
  // Award,
  // DollarSign,
  // LineChart,
  // Megaphone,
  // ShoppingCart,
  Eye,
  TrendingUp,
  UserPlus,
  Users,
  Users2,
} from "lucide-react";

export default function DigitalMarketingAnalytics() {
  return (
    <div>
      <h2 className="text-2xl font-bold">Digital Marketing Analytics</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
        {/* <Card>
          <CardHeader>
            <CardTitle>Campaign Performance</CardTitle>
            <CardDescription>
              Key metrics for digital marketing campaigns
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center space-x-3">
                <Megaphone className="h-4 w-4 text-red-500" />
                <span className="font-medium">Ad Spend</span>
              </div>
              <div className="font-semibold text-lg">
                ₹{mockData.digitalMarketingAnalytics.adSpend.day} | ₹
                {mockData.digitalMarketingAnalytics.adSpend.mtd.toLocaleString()}
              </div>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center space-x-3">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="font-medium">ROI</span>
              </div>
              <div className="font-semibold text-lg">
                {mockData.digitalMarketingAnalytics.roi.day}x |{" "}
                {mockData.digitalMarketingAnalytics.roi.mtd}x
              </div>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center space-x-3">
                <ShoppingCart className="h-4 w-4 text-blue-500" />
                <span className="font-medium">Clicks</span>
              </div>
              <div className="font-semibold text-lg">
                {mockData.digitalMarketingAnalytics.clicks.day} |{" "}
                {mockData.digitalMarketingAnalytics.clicks.mtd.toLocaleString()}
              </div>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center space-x-3">
                <Users className="h-4 w-4 text-purple-500" />
                <span className="font-medium">Total Users</span>
              </div>
              <div className="font-semibold text-lg">
                {mockData.digitalMarketingAnalytics.totalUsers.day.toLocaleString()}{" "}
                |{" "}
                {mockData.digitalMarketingAnalytics.totalUsers.mtd.toLocaleString()}
              </div>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center space-x-3">
                <Activity className="h-4 w-4 text-orange-500" />
                <span className="font-medium">Unique Engagement</span>
              </div>
              <div className="font-semibold text-lg">
                {mockData.digitalMarketingAnalytics.uniqueEngagement.day.toLocaleString()}{" "}
                |{" "}
                {mockData.digitalMarketingAnalytics.uniqueEngagement.mtd.toLocaleString()}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <UserPlus className="h-4 w-4 text-orange-500" />
                <span className="font-medium">Leads Generated</span>
              </div>
              <div className="font-semibold text-lg">
                {mockData.digitalMarketingAnalytics.leadsFromGoogleAds.day} |{" "}
                {mockData.digitalMarketingAnalytics.leadsFromGoogleAds.mtd}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Conversion & Cost</CardTitle>
            <CardDescription>
              Conversion metrics and cost efficiency
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center space-x-3">
                <Award className="h-4 w-4 text-yellow-500" />
                <span className="font-medium">Conversions</span>
              </div>
              <div className="font-semibold text-lg">
                {mockData.digitalMarketingAnalytics.conversions.day} |{" "}
                {mockData.digitalMarketingAnalytics.conversions.mtd}
              </div>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center space-x-3">
                <DollarSign className="h-4 w-4 text-purple-500" />
                <span className="font-medium">Cost Per Click (CPC)</span>
              </div>
              <div className="font-semibold text-lg">
                ${mockData.digitalMarketingAnalytics.cpc.day} | $
                {mockData.digitalMarketingAnalytics.cpc.mtd}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <LineChart className="h-4 w-4 text-green-500" />
                <span className="font-medium">Revenue from Digital</span>
              </div>
              <div className="font-semibold text-lg">
                ₹{(mockData.leadSourceAnalytics[3].revenue / 1000).toFixed(0)}K
              </div>
            </div>
          </CardContent>
        </Card> */}
        {/* Combined Website Performance Card */}
        <Card>
          <CardHeader>
            <CardTitle>Website Performance</CardTitle>
            <CardDescription>
              Traffic, engagement, and leads from the website
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* <h3 className="text-md font-semibold mb-2">Traffic Overview</h3> */}
            {/* <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center space-x-3">
                <Users2 className="h-4 w-4 text-blue-500" />
                <span className="font-medium">Total Visitors</span>
              </div>
              <div className="font-semibold text-lg">
                {mockData.websiteAnalytics.totalVisitors.day} |{" "}
                {mockData.websiteAnalytics.totalVisitors.mtd.toLocaleString()}
              </div>
            </div> */}
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center space-x-3">
                <Eye className="h-4 w-4 text-purple-500" />
                <span className="font-medium">Page Views</span>
              </div>
              <div className="font-semibold text-lg">
                {mockData.websiteAnalytics.pageViews.day} |{" "}
                {mockData.websiteAnalytics.pageViews.mtd.toLocaleString()}
              </div>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center space-x-3">
                <Users className="h-4 w-4 text-purple-500" />
                <span className="font-medium">Total Engagement</span>
              </div>
              <div className="font-semibold text-lg">
                {mockData.websiteAnalytics.totalUsers.day.toLocaleString()} |{" "}
                {mockData.websiteAnalytics.totalUsers.mtd.toLocaleString()}
              </div>
            </div>
                        <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center space-x-3">
                <Activity className="h-4 w-4 text-orange-500" />
                <span className="font-medium">Avg. Session Duration</span>
              </div>
              <div className="font-semibold text-lg">
                {mockData.websiteAnalytics.avgSessionDuration.day} |{" "}
                {mockData.websiteAnalytics.avgSessionDuration.mtd}
              </div>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center space-x-3">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="font-medium">Bounce Rate</span>
              </div>
              <div className="font-semibold text-lg">
                {mockData.websiteAnalytics.bounceRate.day}% |{" "}
                {mockData.websiteAnalytics.bounceRate.mtd}%
              </div>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center space-x-3">
                <Activity className="h-4 w-4 text-orange-500" />
                <span className="font-medium">Unique Engagement</span>
              </div>
              <div className="font-semibold text-lg">
                {mockData.websiteAnalytics.uniqueEngagement.day.toLocaleString()}{" "}
                |{" "}
                {mockData.websiteAnalytics.uniqueEngagement.mtd.toLocaleString()}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <UserPlus className="h-4 w-4 text-teal-500" />
                <span className="font-medium">Leads from Website</span>
              </div>
              <div className="font-semibold text-lg">
                {mockData.websiteAnalytics.leadsFromWebsite.day} |{" "}
                {mockData.websiteAnalytics.leadsFromWebsite.mtd}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
