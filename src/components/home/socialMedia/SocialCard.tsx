import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { mockData } from "@/lib/data";
import { ArrowDown, ArrowUp, Facebook, Instagram, Youtube } from "lucide-react";

export default function SocialCard() {
  const totalSocialMediaConvertedLeads =
    mockData.socialMediaLeads.instagram.smo.converted +
    mockData.socialMediaLeads.instagram.sme.converted +
    mockData.socialMediaLeads.facebook.smo.converted +
    mockData.socialMediaLeads.facebook.sme.converted +
    mockData.socialMediaLeads.youtube.smo.converted +
    mockData.socialMediaLeads.youtube.sme.converted;

  const socialMediaRevenue =
    mockData.leadSourceAnalytics.find((s) => s.source === "Social Media")
      ?.revenue || 0;

  const calculatePlatformRevenue = (platformConvertedLeads: number) => {
    if (totalSocialMediaConvertedLeads === 0) return 0;
    return (
      (platformConvertedLeads / totalSocialMediaConvertedLeads) *
      socialMediaRevenue
    );
  };
  const selectedPeriod = "today";
  return (
    <div>
      <h2 className="text-2xl font-bold">
        Social Media Performance by Platform
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Instagram Performance Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Instagram />
              <CardTitle>Instagram Performance</CardTitle>
            </div>
            <CardDescription>Leads and Revenue from Instagram</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between border-b pb-2">
              <span className="font-medium">Total Followers</span>
              <div className="flex items-center space-x-1">
                <span className="font-semibold text-lg">
                  {mockData.socialMediaAnalytics.instagram.followers.current.toLocaleString()}
                </span>
                {mockData.socialMediaAnalytics.instagram.followers.change >
                0 ? (
                  <ArrowUp className="h-4 w-4 text-green-500" />
                ) : (
                  <ArrowDown className="h-4 w-4 text-red-500" />
                )}
                <span
                  className={`text-sm ${
                    mockData.socialMediaAnalytics.instagram.followers.change > 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {Math.abs(
                    mockData.socialMediaAnalytics.instagram.followers.change
                  ).toLocaleString()}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <span className="font-medium">Total Visitors</span>
              <span className="font-semibold text-lg">
                {mockData.socialMediaAnalytics.instagram.totalVisitors[
                  selectedPeriod
                ].toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <span className="font-medium">Unique Engagement</span>
              <span className="font-semibold text-lg">
                {mockData.socialMediaAnalytics.instagram.uniqueEngagement[
                  selectedPeriod
                ].toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <span className="font-medium">Total Reach</span>
              <span className="font-semibold text-lg">
                {mockData.socialMediaAnalytics.totalReach[
                  selectedPeriod
                ].toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <span className="font-medium">Impressions</span>
              <span className="font-semibold text-lg">
                {mockData.socialMediaAnalytics.impressions[
                  selectedPeriod
                ].toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <span className="font-medium">Engagement Rate</span>
              <span className="font-semibold text-lg">
                {mockData.socialMediaAnalytics.engagementRate[selectedPeriod]}%
              </span>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <span className="font-medium">Leads Generated</span>
              <span className="font-semibold text-lg">
                {mockData.socialMediaLeads.instagram.smo.total +
                  mockData.socialMediaLeads.instagram.sme.total}
              </span>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <span className="font-medium">Leads Converted</span>
              <span className="font-semibold text-lg">
                {mockData.socialMediaLeads.instagram.smo.converted +
                  mockData.socialMediaLeads.instagram.sme.converted}
              </span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t">
              <span className="font-medium">Revenue Generated</span>
              <span className="font-semibold text-lg text-green-600">
                ₹
                {(
                  calculatePlatformRevenue(
                    mockData.socialMediaLeads.instagram.smo.converted +
                      mockData.socialMediaLeads.instagram.sme.converted
                  ) / 1000
                ).toFixed(0)}
                K
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Facebook Performance Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              {/* <img
                src="/placeholder.svg?height=24&width=24"
                alt="Facebook"
                className="h-6 w-6"
              /> */}
              <Facebook />
              <CardTitle>Facebook Performance</CardTitle>
            </div>
            <CardDescription>Leads and Revenue from Facebook</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between border-b pb-2">
              <span className="font-medium">Total Followers</span>
              <div className="flex items-center space-x-1">
                <span className="font-semibold text-lg">
                  {mockData.socialMediaAnalytics.facebook.followers.current.toLocaleString()}
                </span>
                {mockData.socialMediaAnalytics.facebook.followers.change > 0 ? (
                  <ArrowUp className="h-4 w-4 text-green-500" />
                ) : (
                  <ArrowDown className="h-4 w-4 text-red-500" />
                )}
                <span
                  className={`text-sm ${
                    mockData.socialMediaAnalytics.facebook.followers.change > 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {Math.abs(
                    mockData.socialMediaAnalytics.facebook.followers.change
                  ).toLocaleString()}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <span className="font-medium">Total Visitors</span>
              <span className="font-semibold text-lg">
                {mockData.socialMediaAnalytics.facebook.totalVisitors[
                  selectedPeriod
                ].toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <span className="font-medium">Unique Engagement</span>
              <span className="font-semibold text-lg">
                {mockData.socialMediaAnalytics.facebook.uniqueEngagement[
                  selectedPeriod
                ].toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <span className="font-medium">Total Reach</span>
              <span className="font-semibold text-lg">
                {mockData.socialMediaAnalytics.totalReach[
                  selectedPeriod
                ].toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <span className="font-medium">Impressions</span>
              <span className="font-semibold text-lg">
                {mockData.socialMediaAnalytics.impressions[
                  selectedPeriod
                ].toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <span className="font-medium">Engagement Rate</span>
              <span className="font-semibold text-lg">
                {mockData.socialMediaAnalytics.engagementRate[selectedPeriod]}%
              </span>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <span className="font-medium">Leads Generated</span>
              <span className="font-semibold text-lg">
                {mockData.socialMediaLeads.facebook.smo.total +
                  mockData.socialMediaLeads.facebook.sme.total}
              </span>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <span className="font-medium">Leads Converted</span>
              <span className="font-semibold text-lg">
                {mockData.socialMediaLeads.facebook.smo.converted +
                  mockData.socialMediaLeads.facebook.sme.converted}
              </span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t">
              <span className="font-medium">Revenue Generated</span>
              <span className="font-semibold text-lg text-green-600">
                ₹
                {(
                  calculatePlatformRevenue(
                    mockData.socialMediaLeads.facebook.smo.converted +
                      mockData.socialMediaLeads.facebook.sme.converted
                  ) / 1000
                ).toFixed(0)}
                K
              </span>
            </div>
          </CardContent>
        </Card>

        {/* YouTube Performance Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              {/* <img
                src="/placeholder.svg?height=24&width=24"
                alt="YouTube"
                className="h-6 w-6"
              /> */}
              <Youtube />
              <CardTitle>YouTube Performance</CardTitle>
            </div>
            <CardDescription>Leads and Revenue from YouTube</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between border-b pb-2">
              <span className="font-medium">Total Subscribers</span>
              <div className="flex items-center space-x-1">
                <span className="font-semibold text-lg">
                  {mockData.socialMediaAnalytics.youtube.subscribers.current.toLocaleString()}
                </span>
                {mockData.socialMediaAnalytics.youtube.subscribers.change >
                0 ? (
                  <ArrowUp className="h-4 w-4 text-green-500" />
                ) : (
                  <ArrowDown className="h-4 w-4 text-red-500" />
                )}
                <span
                  className={`text-sm ${
                    mockData.socialMediaAnalytics.youtube.subscribers.change > 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {Math.abs(
                    mockData.socialMediaAnalytics.youtube.subscribers.change
                  ).toLocaleString()}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <span className="font-medium">Total Visitors</span>
              <span className="font-semibold text-lg">
                {mockData.socialMediaAnalytics.youtube.totalVisitors[
                  selectedPeriod
                ].toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <span className="font-medium">Unique Engagement</span>
              <span className="font-semibold text-lg">
                {mockData.socialMediaAnalytics.youtube.uniqueEngagement[
                  selectedPeriod
                ].toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <span className="font-medium">Total Reach</span>
              <span className="font-semibold text-lg">
                {mockData.socialMediaAnalytics.totalReach[
                  selectedPeriod
                ].toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <span className="font-medium">Impressions</span>
              <span className="font-semibold text-lg">
                {mockData.socialMediaAnalytics.impressions[
                  selectedPeriod
                ].toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <span className="font-medium">Engagement Rate</span>
              <span className="font-semibold text-lg">
                {mockData.socialMediaAnalytics.engagementRate[selectedPeriod]}%
              </span>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <span className="font-medium">Leads Generated</span>
              <span className="font-semibold text-lg">
                {mockData.socialMediaLeads.youtube.smo.total +
                  mockData.socialMediaLeads.youtube.sme.total}
              </span>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <span className="font-medium">Leads Converted</span>
              <span className="font-semibold text-lg">
                {mockData.socialMediaLeads.youtube.smo.converted +
                  mockData.socialMediaLeads.youtube.sme.converted}
              </span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t">
              <span className="font-medium">Revenue Generated</span>
              <span className="font-semibold text-lg text-green-600">
                ₹
                {(
                  calculatePlatformRevenue(
                    mockData.socialMediaLeads.youtube.smo.converted +
                      mockData.socialMediaLeads.youtube.sme.converted
                  ) / 1000
                ).toFixed(0)}
                K
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
