import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { mockData } from "@/lib/data";
import {
  BookText,
  HeartHandshake,
  PhoneCall,
  ShoppingCart,
} from "lucide-react";

export default function KeyEngagementMetrix() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Key Engagement Metrics</CardTitle>
        <CardDescription>Important user actions within the app</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between border-b pb-2">
          <div className="flex items-center space-x-3">
            <HeartHandshake className="h-4 w-4 text-orange-500" />
            <span className="font-medium">Health Score Taken</span>
          </div>
          <div className="font-semibold text-lg">
            {mockData.appAnalytics.hsTaken.day} |{" "}
            {mockData.appAnalytics.hsTaken.mtd.toLocaleString()}
          </div>
        </div>
        <div className="flex items-center justify-between border-b pb-2">
          <div className="flex items-center space-x-3">
            <PhoneCall className="h-4 w-4 text-red-500" />
            <span className="font-medium">Consultations Booked</span>
          </div>
          <div className="font-semibold text-lg">
            {mockData.appAnalytics.consultationBooked.day} |{" "}
            {mockData.appAnalytics.consultationBooked.mtd.toLocaleString()}
          </div>
        </div>
        <div className="flex items-center justify-between border-b pb-2">
          <div className="flex items-center space-x-3">
            <BookText className="h-4 w-4 text-blue-500" />
            <span className="font-medium">Program Page Visits</span>
          </div>
          <div className="font-semibold text-lg">
            {mockData.appAnalytics.programPageVisits.day} |{" "}
            {mockData.appAnalytics.programPageVisits.mtd.toLocaleString()}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <ShoppingCart className="h-4 w-4 text-green-500" />
            <span className="font-medium">Checkout Page Visits</span>
          </div>
          <div className="font-semibold text-lg">
            {mockData.appAnalytics.checkoutPageVisits.day} |{" "}
            {mockData.appAnalytics.checkoutPageVisits.mtd.toLocaleString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
