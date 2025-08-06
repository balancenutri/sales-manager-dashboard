import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { mockData } from "@/lib/data";
export default function TopPerformer() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Performers</CardTitle>
        <CardDescription>
          Best performing counsellors this month
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockData.counsellors
            .sort((a, b) => b.conversionRate - a.conversionRate)
            .slice(0, 3)
            .map((counsellor, index) => (
              <div key={counsellor.id} className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-teal-100 text-teal-800 font-bold text-sm">
                  {index + 1}
                </div>
                <Avatar className="h-10 w-10">
                  <AvatarImage src={counsellor.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {counsellor.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium">{counsellor.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {counsellor.conversionRate}% conversion rate
                  </p>
                </div>
                <Badge variant="secondary">
                  ₹{(counsellor.revenue / 1000).toFixed(0)}K
                </Badge>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
