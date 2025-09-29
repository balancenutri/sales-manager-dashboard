import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Youtube,
  Twitter,
  Instagram,
  Facebook,
  Linkedin,
  type LucideIcon,
} from "lucide-react";
import Platforms from "./platform/Platforms";
import type { SocialMediaType, ValidSocialMediaKey } from "@/lib/types";
import { useGetAllSocialMediaPerformanceQuery } from "@/service/dashboard/api";
import { Dialog } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";

type PlatformsType = {
  key: ValidSocialMediaKey;
  name: string;
  icon: LucideIcon;
  color: string;
};
export default function MediaCard() {
  const [selectedPlatform, setSelectedPlatform] =
    useState<SocialMediaType>(null);
  // const [modalAccountTab, setModalAccountTab] = useState("all");

  const { data } = useGetAllSocialMediaPerformanceQuery();

  const handlePlatformClick = (platform: SocialMediaType) => {
    setSelectedPlatform(platform);
    // setModalAccountTab("all");
  };

  const closeModal = () => {
    setSelectedPlatform(null);
  };

  const renderPlatformCards = () => {
    const platforms: PlatformsType[] = [
      { key: "youtube", name: "YouTube", icon: Youtube, color: "text-red-600" },
      {
        key: "instagram",
        name: "Instagram",
        icon: Instagram,
        color: "text-pink-600",
      },
      {
        key: "facebook",
        name: "Facebook",
        icon: Facebook,
        color: "text-blue-600",
      },
      { key: "twitter", name: "Twitter", icon: Twitter, color: "text-sky-600" },
      {
        key: "linkedin",
        name: "Linkedin",
        icon: Linkedin,
        color: "text-sky-600",
      },
    ];

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {platforms.map((platform) => {
          const Icon = platform.icon;
          return (
            <Card
              key={platform.key}
              className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105"
              onClick={() => handlePlatformClick(platform.key)}
            >
              <CardHeader className="flex items-center space-y-0 pb-2">
                <Icon className={`h-6 w-6 ${platform.color}`} />
                <CardTitle className="text-sm font-medium">
                  {platform.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    {data?.data ? (
                      <div className="text-xl font-bold">
                        {data.data[platform.key].lead_generated}
                      </div>
                    ) : (
                      <Skeleton className="h-6 w-16" />
                    )}
                    <p className="text-xs">Total Leads</p>
                  </div>
                  <div>
                    {data?.data ? (
                      <div className="text-lg font-semibold text-green-600">
                        Rs. {data.data[platform.key].revenue_generated}
                      </div>
                    ) : (
                      <Skeleton className="h-6 w-16" />
                    )}
                    <p className="text-xs">Revenue Generated</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  };
  return (
    <div className="">
      <div className="container mx-auto">
        {renderPlatformCards()}
        {/* {renderModalContent()} */}

        <Dialog open={!!selectedPlatform} onOpenChange={closeModal}>
          <Platforms selectedPlatform={selectedPlatform} />
        </Dialog>
      </div>
    </div>
  );
}
