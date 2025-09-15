import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LayoutDashboard, MessageSquareMore } from "lucide-react";

export default function CounsellorCard() {
  //   const getPerformanceTag = (conversionRate: number) => {
  //     if (conversionRate >= benchmark) {
  //       return { tag: "Excellent", color: "bg-green-500 text-white" };
  //     } else if (conversionRate >= benchmark * 0.95) {
  //       return { tag: "Good", color: "bg-teal-500 text-white" };
  //     } else if (conversionRate >= avg * 1.05) {
  //       return { tag: "Fair", color: "bg-yellow-500 text-white" };
  //     } else if (conversionRate >= avg * 0.95) {
  //       return { tag: "Poor", color: "bg-orange-500 text-white" };
  //     } else {
  //       return { tag: "High Risk", color: "bg-red-500 text-white" };
  //     }
  //   };
  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-3">
          <div className="flex-1">
            <CardTitle className="text-lg">{"Kundan Chaudhary"}</CardTitle>
            <Badge className={"bg-green-500 text-white"}>{"Good"}</Badge>
          </div>
          <div className="p-2 bg-gradient-to-r from-blue-300 to-blue-500 rounded-full">
            <MessageSquareMore className="h-5 w-5 text-white" />
          </div>
          <div className="p-2 bg-gradient-to-r from-blue-300 to-blue-500 rounded-full">
            <LayoutDashboard className="h-5 w-5 text-white" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-2 rounded-md bg-blue-50 text-blue-800 text-sm font-medium">
          <span>Best Source:</span>
          <span>Referral</span>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Leads Assigned</p>
            <p className="font-semibold">{33}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Consultations</p>
            <p className="font-semibold">{12}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Sales Closed</p>
            <p className="font-semibold">₹{123333}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Revenue</p>
            <p className="font-semibold">₹576</p>
          </div>
          <div>
            <p className="text-muted-foreground">Total Sales Opportunity</p>
            <p className="font-semibold">₹7867</p>
          </div>
          <div>
            <p className="text-muted-foreground">Payment Details Shared</p>
            <p className="font-semibold">₹5445 (34)</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center text-sm pt-2 border-t">
          <div>
            <p className="">L:C</p>
            <p className="font-semibold text-red-500">{10}%</p>
          </div>
          <div>
            <p className="">C:S</p>
            <p className="font-semibold text-red-500">{20}%</p>
          </div>
          <div>
            <p className="">L:S</p>
            <p className="font-semibold text-red-500">{30}%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
