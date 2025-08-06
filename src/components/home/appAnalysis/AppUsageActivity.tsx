import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { mockData } from "@/lib/data";
import { Smartphone, TrendingUp, Users, XCircle } from "lucide-react";

export default function AppUsageActivity() {
  const appConversion =
    mockData.appAnalytics.appDownloadsBreakdown.month.total > 0
      ? (
          (mockData.appAnalytics.consultationBooked.mtd /
            mockData.appAnalytics.appDownloadsBreakdown.month.total) *
          100
        ).toFixed(1)
      : "0.0";
  return (
    <Card>
      <CardHeader>
        <CardTitle>App Usage Overview</CardTitle>
        <CardDescription>
          Key metrics related to app downloads and user base
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between border-b pb-2">
          <div className="flex items-center space-x-3">
            <Smartphone className="h-4 w-4 text-teal-500" />
            <span className="font-medium">Total Downloads</span>
          </div>
          <div className="font-semibold text-lg">
            {mockData.appAnalytics.appDownloadsBreakdown.today.total} |{" "}
            {mockData.appAnalytics.appDownloadsBreakdown.month.total.toLocaleString()}
          </div>
        </div>
        <div className="flex items-center justify-between border-b pb-2">
          <div className="flex items-center space-x-3">
            <Users className="h-4 w-4 text-green-500" />
            <span className="font-medium">Total Leads with App</span>
          </div>
          <div className="font-semibold text-lg">
            {mockData.appAnalytics.totalLeadsWithApp.day} |{" "}
            {mockData.appAnalytics.totalLeadsWithApp.mtd.toLocaleString()}
          </div>
        </div>
        <div className="flex items-center justify-between border-b pb-2">
          <div className="flex items-center space-x-3">
            <Users className="h-4 w-4 text-red-500" />
            <span className="font-medium">Total Leads Without App</span>
          </div>
          <div className="font-semibold text-lg">
            {mockData.appAnalytics.totalLeadsWithoutApp.day} |{" "}
            {mockData.appAnalytics.totalLeadsWithoutApp.mtd.toLocaleString()}
          </div>
        </div>
        <div className="flex items-center justify-between border-b pb-2">
          <div className="flex items-center space-x-3">
            <XCircle className="h-4 w-4 text-gray-500" />
            <span className="font-medium">Uninstalls</span>
          </div>
          <div className="font-semibold text-lg">
            {mockData.appAnalytics.uninstalls.day} |{" "}
            {mockData.appAnalytics.uninstalls.mtd.toLocaleString()}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <TrendingUp className="h-4 w-4 text-purple-500" />
            <span className="font-medium">App Conversion</span>
          </div>
          <div className="font-semibold text-lg">{appConversion}%</div>
        </div>
      </CardContent>
    </Card>
  );
}
