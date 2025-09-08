import {
  useGetFacebookPerformanceQuery,
  useGetInstagramPerformanceQuery,
  useGetLinkedinPerformanceQuery,
  useGetTwitterPerformanceQuery,
  useGetYoutubePerformanceQuery,
} from "@/service/dashboard/api";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import type { SocialMediaType, ValidSocialMediaKey } from "@/lib/types";
import { keyString } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import AddMediaForm from "../AddMediaForm";
import YoutubeForm from "../form/YoutubeForm";
import ImpressionTooltip from "./ImpressionTooltip";

type PlatformType = {
  [key in ValidSocialMediaKey]: LucideIcon;
};

type PeriodType = "today" | "this_week" | "mtd" | "this_quarter";

export default function Platforms({
  selectedPlatform,
}: {
  selectedPlatform: SocialMediaType;
}) {
  console.log(selectedPlatform);

  const [selectedAccount, setSelectedAccount] = useState<
    "Khyati" | "BN" | "All"
  >("All");
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>("mtd");
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const { data: youtubeData } = useGetYoutubePerformanceQuery(
    {
      account: selectedAccount == "All" ? null : selectedAccount,
      filter: selectedPeriod,
    },
    {
      skip: selectedPlatform !== "youtube",
    }
  );
  const { data: instagramData } = useGetInstagramPerformanceQuery(
    {
      account: selectedAccount == "All" ? null : selectedAccount,
      filter: selectedPeriod,
    },
    {
      skip: selectedPlatform !== "instagram",
    }
  );
  const { data: faceBookData } = useGetFacebookPerformanceQuery(
    {
      account: selectedAccount == "All" ? null : selectedAccount,
      filter: selectedPeriod,
    },
    {
      skip: selectedPlatform !== "facebook",
    }
  );
  const { data: linkedinData } = useGetLinkedinPerformanceQuery(
    {
      account: selectedAccount == "All" ? null : selectedAccount,
      filter: selectedPeriod,
    },
    {
      skip: selectedPlatform !== "linkedin",
    }
  );
  const { data: twitterData } = useGetTwitterPerformanceQuery(
    {
      account: selectedAccount == "All" ? null : selectedAccount,
      filter: selectedPeriod,
    },
    {
      skip: selectedPlatform !== "twitter",
    }
  );

  const platformIcons: PlatformType = {
    youtube: Youtube,
    instagram: Instagram,
    facebook: Facebook,
    twitter: Twitter,
    linkedin: Linkedin,
  };

  const Icon = platformIcons[selectedPlatform as keyof typeof platformIcons];

  const data =
    selectedPlatform == "youtube"
      ? youtubeData?.data
      : selectedPlatform == "instagram"
      ? instagramData?.data
      : selectedPlatform == "linkedin"
      ? linkedinData?.data
      : selectedPlatform == "twitter"
      ? twitterData?.data
      : faceBookData?.data;

  const renderAccountData = () => {
    return (
      <div className="space-y-4">
        <div className="flex justify-between">
          <h4 className="font-medium text-lg">{selectedAccount} Account</h4>
          {selectedAccount !== "All" && (
            <Button variant={"outline"} onClick={() => setOpenDialog(true)}>
              Update
            </Button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data &&
            Object.entries(data).map(
              ([key, value]) =>
                !["like", "comment", "share"].includes(key) && (
                  <div
                    key={key}
                    className="flex justify-between py-3 px-4 bg-muted rounded-lg"
                  >
                    <span className="capitalize">{key.replace(/_/g, " ")}</span>
                    <span className="font-medium">
                      {key !== "impressions" ? (
                        value
                      ) : (
                        <ImpressionTooltip data={data} />
                      )}
                    </span>
                  </div>
                )
            )}
        </div>
      </div>
    );
  };

  const renderDialog = () => (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent
        onInteractOutside={(e: React.MouseEvent | Event) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>{keyString(selectedPlatform || "")}</DialogTitle>
          {selectedPlatform == "youtube" ? (
            <YoutubeForm
              mediaData={{
                like: data?.like || 0,
                comment: data?.comment || 0,
                share: data?.share || 0,
                total_views: data?.total_followers || 0,
                total_subscriber: data?.total_subscriber || 0,
                subscriber_gain: data?.subscriber_gain || 0,
                subscriber_loss: data?.subscriber_loss || 0,
                unique_engagement: data?.unique_engagement || 0,
              }}
              closeModal={() => setOpenDialog(false)}
              accounts={selectedAccount}
            />
          ) : (
            <AddMediaForm
              type={selectedPlatform}
              mediaData={{
                like: data?.like || 0,
                comment: data?.comment || 0,
                share: data?.share || 0,
                total_followers: data?.total_followers || 0,
                total_reach: data?.total_reach || 0,
                total_visitors: data?.total_visitors || 0,
                unique_engagement: data?.unique_engagement || 0,
              }}
              closeModal={() => setOpenDialog(false)}
              accounts={selectedAccount}
            />
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );

  return (
    <>
      {selectedPlatform && (
        <DialogContent className="min-w-4xl max-h-[80vh] overflow-y-auto ">
          <div className="flex justify-between mt-4">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Icon className="h-6 w-6" />
                {keyString(selectedPlatform)} {" "}
                Analytics
              </DialogTitle>
            </DialogHeader>

            <Select
              value={selectedPeriod}
              onValueChange={(val: PeriodType) => setSelectedPeriod(val)}
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
            value={selectedAccount}
            onValueChange={(val) =>
              setSelectedAccount(val as "Khyati" | "BN" | "All")
            }
            className="mt-4"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="All">All</TabsTrigger>
              <TabsTrigger value="Khyati">Khyati</TabsTrigger>
              <TabsTrigger value="BN">BN</TabsTrigger>
            </TabsList>

            <TabsContent value="All" className="mt-6">
              {renderAccountData()}
            </TabsContent>

            <TabsContent value="Khyati" className="mt-6">
              {renderAccountData()}
            </TabsContent>

            <TabsContent value="BN" className="mt-6">
              {renderAccountData()}
            </TabsContent>
          </Tabs>
        </DialogContent>
      )}
      {renderDialog()}
    </>
  );
}
