import {
  useGetFacebookPerformanceQuery,
  useGetInstagramPerformanceQuery,
  useGetSocialMediaPerformanceQuery,
  useGetYoutubePerformanceQuery,
} from "@/service/dashboard/api";
import { Facebook, Instagram, Youtube } from "lucide-react";
import MediaCard from "./MediaCard";

export default function SocialCard() {
  const { data: youtubeData, isFetching: youtubeFetching } =
    useGetYoutubePerformanceQuery();
  const { data: instagramData, isFetching: instagramFetching } =
    useGetInstagramPerformanceQuery();
  const { data: faceBookData, isFetching: faceBookFetching } =
    useGetFacebookPerformanceQuery();
  const { data: socialMediaData, isFetching: socialMediaFetching } =
    useGetSocialMediaPerformanceQuery();
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">
        Social Media Performance by Platform
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {!youtubeFetching && (
          <MediaCard
            data={{
              data: youtubeData?.data || {},
              icon: Youtube,
              desc: "Leads and Revenue from Youtube",
              title: "Youtube",
            }}
          />
        )}
        {!instagramFetching && (
          <MediaCard
            data={{
              data: instagramData?.data || {},
              icon: Instagram,
              desc: "Leads and Revenue from Instagram",

              title: "Instagram",
            }}
          />
        )}
        {!faceBookFetching && (
          <MediaCard
            data={{
              data: faceBookData?.data || {},
              icon: Facebook,
              title: "Facebook",
              desc: "Leads and Revenue from Facebook",
            }}
          />
        )}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {!socialMediaFetching && (
          <MediaCard
            data={{
              data: socialMediaData?.data || {},
              icon: Facebook,
              title: "Overall Social Media Performance",
              desc: "Consolidated metrics across all social platforms",
            }}
          />
        )}
      </div>
    </div>
  );
}
