import {
  useGetFacebookPerformanceQuery,
  useGetInstagramPerformanceQuery,
  useGetSocialMediaPerformanceQuery,
  useGetYoutubePerformanceQuery,
} from "@/service/dashboard/api";
import { Clapperboard, Facebook, Instagram, Youtube } from "lucide-react";
import MediaCard from "./MediaCard";
import { useSelector } from "react-redux";
import { selectPeriod } from "@/features/period/periodSlice";

export default function SocialCard() {
  const filter = useSelector(selectPeriod);
  const { data: youtubeData } = useGetYoutubePerformanceQuery({ filter });
  const { data: instagramData } = useGetInstagramPerformanceQuery({ filter });
  const { data: faceBookData } = useGetFacebookPerformanceQuery({ filter });
  const { data: socialMediaData } = useGetSocialMediaPerformanceQuery({
    filter,
  });
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">
        Social Media Performance by Platform
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MediaCard
          data={{
            data: youtubeData?.data,
            icon: Youtube,
            desc: "Leads and Revenue from Youtube",
            title: "Youtube",
          }}
        />

        <MediaCard
          data={{
            data: instagramData?.data,
            icon: Instagram,
            desc: "Leads and Revenue from Instagram",

            title: "Instagram",
          }}
        />

        <MediaCard
          data={{
            data: faceBookData?.data,
            icon: Facebook,
            title: "Facebook",
            desc: "Leads and Revenue from Facebook",
          }}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <MediaCard
          data={{
            data: socialMediaData?.data,
            icon: Clapperboard,
            title: "Overall Social Media Performance",
            desc: "Consolidated metrics across all social platforms",
          }}
        />
      </div>
    </div>
  );
}
