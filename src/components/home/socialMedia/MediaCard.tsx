// "use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Youtube, Twitter, Instagram, Facebook, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// const accountsData = {
//   khyati: {
//     youtube: {
//       impressions: 1017,
//       total_followers: 972,
//       total_visitors: 750,
//       unique_engagement: 70,
//       engagement_rate: "9.33%",
//       lead_generated: 24,
//       lead_converted: 2,
//       revenue_generated: 749,
//     },
//     instagram: {
//       impressions: 33,
//       total_followers: 100,
//       total_reach: 43,
//       total_visitors: 6,
//       unique_engagement: 20,
//       engagement_rate: "333.33%",
//       lead_generated: 478,
//       lead_converted: 53,
//       revenue_generated: 896701,
//     },
//     facebook: {
//       impressions: 1,
//       total_followers: 10,
//       total_reach: 2,
//       total_visitors: 5,
//       unique_engagement: 3,
//       engagement_rate: "60.00%",
//       lead_generated: 4,
//       lead_converted: 1,
//       revenue_generated: 0,
//     },
//     twitter: {
//       impressions: 250,
//       total_followers: 180,
//       total_visitors: 120,
//       unique_engagement: 45,
//       engagement_rate: "18.00%",
//       lead_generated: 12,
//       lead_converted: 3,
//       revenue_generated: 450,
//     },
//     linkedin: {
//       impressions: 250,
//       total_followers: 180,
//       total_visitors: 120,
//       unique_engagement: 45,
//       engagement_rate: "18.00%",
//       lead_generated: 12,
//       lead_converted: 3,
//       revenue_generated: 450,
//     },
//   },
//   all: {
//     youtube: {
//       impressions: 1017,
//       total_followers: 972,
//       total_visitors: 750,
//       unique_engagement: 70,
//       engagement_rate: "9.33%",
//       lead_generated: 24,
//       lead_converted: 2,
//       revenue_generated: 749,
//     },
//     instagram: {
//       impressions: 33,
//       total_followers: 100,
//       total_reach: 43,
//       total_visitors: 6,
//       unique_engagement: 20,
//       engagement_rate: "333.33%",
//       lead_generated: 478,
//       lead_converted: 53,
//       revenue_generated: 896701,
//     },
//     facebook: {
//       impressions: 1,
//       total_followers: 10,
//       total_reach: 2,
//       total_visitors: 5,
//       unique_engagement: 3,
//       engagement_rate: "60.00%",
//       lead_generated: 4,
//       lead_converted: 1,
//       revenue_generated: 0,
//     },
//     twitter: {
//       impressions: 250,
//       total_followers: 180,
//       total_visitors: 120,
//       unique_engagement: 45,
//       engagement_rate: "18.00%",
//       lead_generated: 12,
//       lead_converted: 3,
//       revenue_generated: 450,
//     },
//     linkedin: {
//       impressions: 250,
//       total_followers: 180,
//       total_visitors: 120,
//       unique_engagement: 45,
//       engagement_rate: "18.00%",
//       lead_generated: 12,
//       lead_converted: 3,
//       revenue_generated: 450,
//     },
//   },
//   bn: {
//     youtube: {
//       impressions: 850,
//       total_followers: 650,
//       total_visitors: 520,
//       unique_engagement: 55,
//       engagement_rate: "8.46%",
//       lead_generated: 18,
//       lead_converted: 1,
//       revenue_generated: 520,
//     },
//     instagram: {
//       impressions: 45,
//       total_followers: 120,
//       total_reach: 38,
//       total_visitors: 8,
//       unique_engagement: 25,
//       engagement_rate: "208.33%",
//       lead_generated: 320,
//       lead_converted: 42,
//       revenue_generated: 654320,
//     },
//     facebook: {
//       impressions: 2,
//       total_followers: 15,
//       total_reach: 3,
//       total_visitors: 7,
//       unique_engagement: 5,
//       engagement_rate: "33.33%",
//       lead_generated: 6,
//       lead_converted: 2,
//       revenue_generated: 150,
//     },
//     twitter: {
//       impressions: 180,
//       total_followers: 140,
//       total_visitors: 95,
//       unique_engagement: 32,
//       engagement_rate: "22.86%",
//       lead_generated: 8,
//       lead_converted: 2,
//       revenue_generated: 280,
//     },
//     linkedin: {
//       impressions: 180,
//       total_followers: 140,
//       total_visitors: 95,
//       unique_engagement: 32,
//       engagement_rate: "22.86%",
//       lead_generated: 8,
//       lead_converted: 2,
//       revenue_generated: 280,
//     },
//   },
// };

// const accountsData = {
//   khyati: {
//     youtube: {
//       total_subscriber: 1017,
//       subscriber_gain: 972,         // YouTube has subscribers, not followers
//       subscriber_loss: 972,         // YouTube has subscribers, not followers
//       total_views: 750,                // changed from visitors
//       impressions: 1017,
//       unique_engagement: 70,
//       engagement_rate: "9.33%",
//       leads_generated: 24,
//       leads_converted: 2,
//       revenue_generated: "Rs. 749",              // monetization revenue_generated
//       monetization_revenue: "Rs. 452",
//     },
//     instagram: {
//       impressions: 33,
//       followers: 100,
//       reach: 43,
//       profile_visits: 6,         // platform-specific
//       unique_engagement: 20,
//       engagement_rate: "333.33%",
//       leads_generated: 478,
//       leads_converted: 53,
//       revenue_generated: 896701,
//     },
//     facebook: {
//       impressions: 1,
//       followers: 10,             // page followers/likes
//       reach: 2,
//       page_visits: 5,            // platform-specific
//       unique_engagement: 3,
//       engagement_rate: "60.00%",
//       leads_generated: 4,
//       leads_converted: 1,
//       revenue_generated: 0,
//     },
//     twitter: {
//       tweet_impressions: 250,    // Twitter-specific
//       followers: 180,
//       profile_visits: 120,
//       unique_engagement: 45,
//       engagement_rate: "18.00%",
//       leads_generated: 12,
//       leads_converted: 3,
//       revenue_generated: 450,
//     },
//     linkedin: {
//       impressions: 250,
//       followers: 180,
//       page_visits: 120,          // LinkedIn-specific
//       unique_engagement: 45,
//       engagement_rate: "18.00%",
//       leads_generated: 12,
//       leads_converted: 3,
//       revenue_generated: 450,
//     },
//   },

//   bn: {
//     youtube: {
//       total_subscriber: 850,
//       subscriber_gain: 650,
//       subscriber_loss: 650,
//       total_views: 520,
//       impressions: 850,
//       unique_engagement: 55,
//       engagement_rate: "8.46%",
//       leads_generated: 18,
//       leads_converted: 1,
//       revenue_generated: 520,
//       monetization_revenue: 452,

//     },
//     instagram: {
//       impressions: 45,
//       followers: 120,
//       reach: 38,
//       profile_visits: 8,
//       unique_engagement: 25,
//       engagement_rate: "208.33%",
//       leads_generated: 320,
//       leads_converted: 42,
//       revenue_generated: 654320,
//     },
//     facebook: {
//       impressions: 2,
//       followers: 15,
//       reach: 3,
//       page_visits: 7,
//       unique_engagement: 5,
//       engagement_rate: "33.33%",
//       leads_generated: 6,
//       leads_converted: 2,
//       revenue_generated: 150,
//     },
//     twitter: {
//       tweet_impressions: 180,
//       followers: 140,
//       profile_visits: 95,
//       unique_engagement: 32,
//       engagement_rate: "22.86%",
//       leads_generated: 8,
//       leads_converted: 2,
//       revenue_generated: 280,
//     },
//     linkedin: {
//       impressions: 180,
//       followers: 140,
//       page_visits: 95,
//       unique_engagement: 32,
//       engagement_rate: "22.86%",
//       leads_generated: 8,
//       leads_converted: 2,
//       revenue_generated: 280,
//     },
//   },

//   all: {
//     youtube: {
//       total_subscriber: 1017,
//       subscriber_gain: 972,
//       subscriber_loss: 972,
//       total_views: 750,
//       impressions: 1017,
//       unique_engagement: 70,
//       engagement_rate: "9.33%",
//       leads_generated: 24,
//       leads_converted: 2,
//       revenue_generated: 749,
//       monetization_revenue: 452,

//     },
//     instagram: {
//       impressions: 33,
//       followers: 100,
//       reach: 43,
//       profile_visits: 6,
//       unique_engagement: 20,
//       engagement_rate: "333.33%",
//       leads_generated: 478,
//       leads_converted: 53,
//       revenue_generated: 896701,
//     },
//     facebook: {
//       impressions: 1,
//       followers: 10,
//       reach: 2,
//       page_visits: 5,
//       unique_engagement: 3,
//       engagement_rate: "60.00%",
//       leads_generated: 4,
//       leads_converted: 1,
//       revenue_generated: 0,
//     },
//     twitter: {
//       tweet_impressions: 250,
//       followers: 180,
//       profile_visits: 120,
//       unique_engagement: 45,
//       engagement_rate: "18.00%",
//       leads_generated: 12,
//       leads_converted: 3,
//       revenue_generated: 450,
//     },
//     linkedin: {
//       impressions: 250,
//       followers: 180,
//       page_visits: 120,
//       unique_engagement: 45,
//       engagement_rate: "18.00%",
//       leads_generated: 12,
//       leads_converted: 3,
//       revenue_generated: 450,
//     },
//   },
// };

const accountsData = {
  khyati: {
    youtube: {
      total_subscriber: 1017,
      subscriber_gain: 972,
      subscriber_loss: 972,
      total_views: 750,
      impressions: 1017,
      unique_engagement: 70,
      engagement_rate: "9.33%",
      leads_generated: 24,
      leads_converted: 2,
      revenue_generated: "Rs. 749",
      monetization_revenue: "Rs. 452",
    },
    instagram: {
      impressions: 33,
      followers: 100,
      reach: 43,
      profile_visits: 6,
      unique_engagement: 20,
      engagement_rate: "333.33%",
      leads_generated: 478,
      leads_converted: 53,
      revenue_generated: "Rs. 896701",
    },
    facebook: {
      impressions: 1,
      followers: 10,
      reach: 2,
      page_visits: 5,
      unique_engagement: 3,
      engagement_rate: "60.00%",
      leads_generated: 4,
      leads_converted: 1,
      revenue_generated: "Rs. 0",
    },
    twitter: {
      tweet_impressions: 250,
      followers: 180,
      profile_visits: 120,
      unique_engagement: 45,
      engagement_rate: "18.00%",
      leads_generated: 12,
      leads_converted: 3,
      revenue_generated: "Rs. 450",
    },
    linkedin: {
      impressions: 250,
      followers: 180,
      page_visits: 120,
      unique_engagement: 45,
      engagement_rate: "18.00%",
      leads_generated: 12,
      leads_converted: 3,
      revenue_generated: "Rs. 450",
    },
  },

  bn: {
    youtube: {
      total_subscriber: 850,
      subscriber_gain: 650,
      subscriber_loss: 650,
      total_views: 520,
      impressions: 850,
      unique_engagement: 55,
      engagement_rate: "8.46%",
      leads_generated: 18,
      leads_converted: 1,
      revenue_generated: "Rs. 520",
      monetization_revenue: "Rs. 452",
    },
    instagram: {
      impressions: 45,
      followers: 120,
      reach: 38,
      profile_visits: 8,
      unique_engagement: 25,
      engagement_rate: "208.33%",
      leads_generated: 320,
      leads_converted: 42,
      revenue_generated: "Rs. 654320",
    },
    facebook: {
      impressions: 2,
      followers: 15,
      reach: 3,
      page_visits: 7,
      unique_engagement: 5,
      engagement_rate: "33.33%",
      leads_generated: 6,
      leads_converted: 2,
      revenue_generated: "Rs. 150",
    },
    twitter: {
      tweet_impressions: 180,
      followers: 140,
      profile_visits: 95,
      unique_engagement: 32,
      engagement_rate: "22.86%",
      leads_generated: 8,
      leads_converted: 2,
      revenue_generated: "Rs. 280",
    },
    linkedin: {
      impressions: 180,
      followers: 140,
      page_visits: 95,
      unique_engagement: 32,
      engagement_rate: "22.86%",
      leads_generated: 8,
      leads_converted: 2,
      revenue_generated: "Rs. 280",
    },
  },

  all: {
    youtube: {
      total_subscriber: 1017,
      subscriber_gain: 972,
      subscriber_loss: 972,
      total_views: 750,
      impressions: 1017,
      unique_engagement: 70,
      engagement_rate: "9.33%",
      leads_generated: 24,
      leads_converted: 2,
      revenue_generated: "Rs. 749",
      monetization_revenue: "Rs. 452",
    },
    instagram: {
      impressions: 33,
      followers: 100,
      reach: 43,
      profile_visits: 6,
      unique_engagement: 20,
      engagement_rate: "333.33%",
      leads_generated: 478,
      leads_converted: 53,
      revenue_generated: "Rs. 896701",
    },
    facebook: {
      impressions: 1,
      followers: 10,
      reach: 2,
      page_visits: 5,
      unique_engagement: 3,
      engagement_rate: "60.00%",
      leads_generated: 4,
      leads_converted: 1,
      revenue_generated: "Rs. 0",
    },
    twitter: {
      tweet_impressions: 250,
      followers: 180,
      profile_visits: 120,
      unique_engagement: 45,
      engagement_rate: "18.00%",
      leads_generated: 12,
      leads_converted: 3,
      revenue_generated: "Rs. 450",
    },
    linkedin: {
      impressions: 250,
      followers: 180,
      page_visits: 120,
      unique_engagement: 45,
      engagement_rate: "18.00%",
      leads_generated: 12,
      leads_converted: 3,
      revenue_generated: "Rs. 450",
    },
  },
};

export default function SocialMediaDashboard() {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [modalAccountTab, setModalAccountTab] = useState("all");

  const handlePlatformClick = (platform: string) => {
    setSelectedPlatform(platform);
    setModalAccountTab("all");
  };

  const closeModal = () => {
    setSelectedPlatform(null);
  };

  const CustomTooltip = (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="font-semibold text-red-500 cursor-pointer hover:text-red-700 transition-colors duration-200 px-2 py-1 rounded-md hover:bg-red-50">
            15
          </span>
        </TooltipTrigger>
        <TooltipContent className="p-0 bg-white border border-gray-200 shadow-lg rounded-lg max-w-xs">
          <div className="p-4 space-y-4">
            {/* Today Section */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <h4 className="font-semibold text-center text-gray-900 text-sm">
                  Impressions
                </h4>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-2 bg-green-50 rounded-md">
                  <p className="text-xs text-gray-600 font-medium">Likes</p>
                  <p className="text-sm font-bold text-green-700">10</p>
                </div>
                <div className="text-center p-2 bg-blue-50 rounded-md">
                  <p className="text-xs text-gray-600 font-medium">Comment</p>
                  <p className="text-sm font-bold text-blue-700">12</p>
                </div>
                <div className="text-center p-2 bg-purple-50 rounded-md">
                  <p className="text-xs text-gray-600 font-medium">Share</p>
                  <p className="text-sm font-bold text-purple-700">15</p>
                </div>
              </div>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  const renderPlatformCards = () => {
    const platforms = [
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
                    <div className="text-2xl font-bold">
                      {Math.round(Math.random() * 1000)}
                    </div>
                    <p className="text-xs">Total Leads</p>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-green-600">
                      Rs. {Math.round(Math.random() * 10000)}
                    </div>
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

  const renderModalContent = () => {
    if (!selectedPlatform) return null;

    const platformData = {
      khyati:
        accountsData.khyati[
          selectedPlatform as keyof typeof accountsData.khyati
        ],
      bn: accountsData.bn[selectedPlatform as keyof typeof accountsData.bn],
      all: accountsData.bn[selectedPlatform as keyof typeof accountsData.all],
    };

    const platformIcons = {
      youtube: Youtube,
      instagram: Instagram,
      facebook: Facebook,
      twitter: Twitter,
      linkedin: Linkedin,
    };

    const Icon = platformIcons[selectedPlatform as keyof typeof platformIcons];

    const renderAccountData = (account: "khyati" | "bn" | "all") => {
      // if (account === "all") {
      //   return (
      //     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      //       <div className="space-y-4">
      //         <h4 className="font-medium text-lg">Khyati Account</h4>
      //         <div className="space-y-3">
      //           {Object.entries(platformData.khyati).map(([key, value]) => (
      //             <div key={key} className="flex justify-between py-2 border-b">
      //               <span className="capitalize">{key.replace(/_/g, " ")}</span>
      //               <span className="font-medium">{value}</span>
      //             </div>
      //           ))}
      //         </div>
      //       </div>
      //       <div className="space-y-4">
      //         <h4 className="font-medium text-lg">BN Account</h4>
      //         <div className="space-y-3">
      //           {Object.entries(platformData.bn).map(([key, value]) => (
      //             <div key={key} className="flex justify-between py-2 border-b">
      //               <span className="capitalize">{key.replace(/_/g, " ")}</span>
      //               <span className="font-medium">{value}</span>
      //             </div>
      //           ))}
      //         </div>
      //       </div>
      //     </div>
      //   );
      // }

      const accountData = platformData[account];
      return (
        <div className="space-y-4">
          <div className="flex justify-between">
            <h4 className="font-medium text-lg">
              {account === "khyati"
                ? "Khyati"
                : account === "all"
                ? "All"
                : "BN"}{" "}
              Account
            </h4>
            {account !== "all" && <Button variant={"outline"}>Update</Button>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(accountData).map(([key, value]) => (
              <div
                key={key}
                className="flex justify-between py-3 px-4 bg-muted rounded-lg"
              >
                <span className="capitalize">{key.replace(/_/g, " ")}</span>
                <span className="font-medium">
                  {key !== "impressions" ? value : CustomTooltip}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    };

    return (
      <Dialog open={!!selectedPlatform} onOpenChange={closeModal}>
        <DialogContent className="min-w-4xl max-h-[80vh] overflow-y-auto ">
          <div className="flex justify-between mt-4">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Icon className="h-6 w-6" />
                {selectedPlatform.charAt(0).toUpperCase() +
                  selectedPlatform.slice(1)}{" "}
                Analytics
              </DialogTitle>
            </DialogHeader>

            <Select
            value={"mtd"}
            // onValueChange={(val: periodState['period']) =>
            //   dispatch(setPeriod(val))
            // }
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="this_week">This Week</SelectItem>
                <SelectItem value="mtd">This Month</SelectItem>
                <SelectItem value="this_quarter">This Quarter</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs
            value={modalAccountTab}
            onValueChange={setModalAccountTab}
            className="mt-4"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="khyati">Khyati</TabsTrigger>
              <TabsTrigger value="bn">BN</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              {renderAccountData("all")}
            </TabsContent>

            <TabsContent value="khyati" className="mt-6">
              {renderAccountData("khyati")}
            </TabsContent>

            <TabsContent value="bn" className="mt-6">
              {renderAccountData("bn")}
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="">
      <div className="container mx-auto">
        {/* <div className="space-y-6"> */}
        {/* <h2 className="text-xl font-semibold">Social Media Platforms</h2> */}
        {renderPlatformCards()}
        {/* </div> */}
        {renderModalContent()}
      </div>
    </div>
  );
}
