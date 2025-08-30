import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import MediaCard from "./MediaCard";
// import { useSelector } from "react-redux";
// import { selectPeriod } from "@/features/period/periodSlice";
// import {
//   useGetFacebookPerformanceQuery,
//   useGetInstagramPerformanceQuery,
//   useGetSocialMediaPerformanceQuery,
//   useGetYoutubePerformanceQuery,
// } from "@/service/dashboard/api";
// import { Facebook, Globe, Instagram, Twitter, Youtube } from "lucide-react";
// import { Tabs, TabsContent } from "@/components/ui/tabs";
// import { TabsList, TabsTrigger } from "@radix-ui/react-tabs";

export default function SocialCard() {
  // const filter = useSelector(selectPeriod);

  // const { data: youtubeData } = useGetYoutubePerformanceQuery({ filter });
  // const { data: instagramData } = useGetInstagramPerformanceQuery({ filter });
  // const { data: faceBookData } = useGetFacebookPerformanceQuery({ filter });
  // const { data: socialMediaData } = useGetSocialMediaPerformanceQuery({
  //   filter,
  // });

  const accountData = {
    impressions: 33,
    total_followers: 100,
    total_reach: 43,
    total_visitors: 6,
    unique_engagement: 20,
    engagement_rate: "333.33%",
    lead_generated: 478,
    lead_converted: 53,
    revenue_generated: 896701,
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">
        Social Media Performance
      </h2>
      <Card>
        <CardHeader>
          <CardTitle>OverAll Socail Media Leads</CardTitle>
        </CardHeader>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-5">
          {Object.entries(accountData).map(([key, value]) => (
            <div
              key={key}
              className="flex justify-between py-3 px-4 bg-muted rounded-lg"
            >
              <span className="capitalize">{key.replace(/_/g, " ")}</span>
              <span className="font-medium">{value}</span>
            </div>
          ))}
        </div>
      </Card>
      <MediaCard />
    </div>
  );
}
