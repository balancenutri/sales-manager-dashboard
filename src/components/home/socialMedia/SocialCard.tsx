import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import MediaCard from "./MediaCard";
import { useGetSocialMediaPerformanceQuery } from "@/service/dashboard/api";
import ImpressionTooltip from "./platform/ImpressionTooltip";
import { Skeleton } from "@/components/ui/skeleton";

export default function SocialCard() {
  const { data: socialMediaData } = useGetSocialMediaPerformanceQuery();

  const SkeletonArray = Array(9)
    .fill(null)
    .map((_, index: number) => (
      <div
        className="flex justify-between py-3 px-4 bg-muted rounded-lg"
        key={index}
      >
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-5 w-20" />
      </div>
    ));

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Social Media Performance</h2>
      <Card>
        <CardHeader>
          <CardTitle>OverAll Social Media Leads</CardTitle>
        </CardHeader>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-5">
          {socialMediaData?.data
            ? Object.entries(socialMediaData?.data).map(
                ([key, value]) =>
                  ![
                    "like",
                    "comment",
                    "share",
                    "total_subscriber",
                    "subscriber_gain",
                    "subscriber_loss",
                  ].includes(key) && (
                    <div
                      key={key}
                      className="flex justify-between py-3 px-4 bg-muted rounded-lg"
                    >
                      <span className="capitalize">
                        {key.replace(/_/g, " ")}
                      </span>
                      {key !== "impressions" ? (
                        value
                      ) : (
                        <ImpressionTooltip data={socialMediaData?.data} />
                      )}
                    </div>
                  )
              )
            : SkeletonArray}
        </div>
      </Card>
      <MediaCard />
    </div>
  );
}
