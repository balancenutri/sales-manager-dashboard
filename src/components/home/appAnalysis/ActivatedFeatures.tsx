import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { mockData } from "@/lib/data";
import { Gift, RefreshCw, Ticket, UserPlus } from "lucide-react";

export default function ActivatedFeatures() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Activated Features</CardTitle>
        <CardDescription>User activations of key app features</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between border-b pb-2">
          <div className="flex items-center space-x-3">
            <Gift className="h-4 w-4 text-purple-500" />
            <span className="font-medium">Free Guide Activated</span>
          </div>
          <div className="font-semibold text-lg">
            {mockData.appAnalytics.freeGuideActivated.day} |{" "}
            {mockData.appAnalytics.freeGuideActivated.mtd.toLocaleString()}
          </div>
        </div>
        <div className="flex items-center justify-between border-b pb-2">
          <div className="flex items-center space-x-3">
            <Ticket className="h-4 w-4 text-orange-500" />
            <span className="font-medium">Coupon Code Activated</span>
          </div>
          <div className="font-semibold text-lg">
            {mockData.appAnalytics.couponCodeActivated.day} |{" "}
            {mockData.appAnalytics.couponCodeActivated.mtd.toLocaleString()}
          </div>
        </div>
        <div className="flex items-center justify-between border-b pb-2">
          <div className="flex items-center space-x-3">
            <RefreshCw className="h-4 w-4 text-blue-500" />
            <span className="font-medium">Spin to Win Activated</span>
          </div>
          <div className="font-semibold text-lg">
            {mockData.appAnalytics.spinToWinActivated.day} |{" "}
            {mockData.appAnalytics.spinToWinActivated.mtd.toLocaleString()}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <UserPlus className="h-4 w-4 text-green-500" />
            <span className="font-medium">Leads with Go Pro</span>
          </div>
          <div className="font-semibold text-lg">
            {mockData.appAnalytics.leadsWithGoPro.day} |{" "}
            {mockData.appAnalytics.leadsWithGoPro.mtd.toLocaleString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
