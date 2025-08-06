import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { mockData } from "@/lib/data";
import Header from "@/components/common/Header";
import LeadCard from "@/components/home/overview/LeadCard";
import RevenueCard from "@/components/home/overview/RevenueCard";
import SocialMediaCard from "@/components/home/overview/SocialMediaCard";
import SocialCard from "@/components/home/socialMedia/SocialCard";
import SocialMediaPerformance from "@/components/home/socialMedia/SocialMediaPerformance";
import ContentManagement from "@/components/home/common/ContentManagement";
import TopPerformer from "@/components/home/overview/TopPerformer";
import RecentActivity from "@/components/home/overview/RecentActivity";
import DigitalMarketingAnalytics from "@/components/home/digitalMarketing/DigitalMarketingAnalytics";
import GenderBifurcation from "@/components/home/digitalMarketing/GenderBifurcation";
import ClinicalBifurcation from "@/components/home/digitalMarketing/ClinicalBifurcation";
import CampaignOverview from "@/components/home/digitalMarketing/CampaignOverview";
import LeadMIS from "@/components/home/digitalMarketing/LeadMIS";
import CounsellorSocialMediaPerformance from "@/components/home/socialMedia/CounsellorSocialMediaPerformance";
import PerformanceConsolidatedTable from "@/components/home/socialMedia/PerformanceConsolidatedTable";
import AppDownloadCount from "@/components/home/appAnalysis/AppDownloadCount";
import AppUsageActivity from "@/components/home/appAnalysis/AppUsageActivity";
import KeyEngagementMetrix from "@/components/home/appAnalysis/KeyEngagementMetrix";
import ActivatedFeatures from "@/components/home/appAnalysis/ActivatedFeatures";
import OverviewDetails from "@/components/home/overview/OverViewDetails";

// Calculate total sales opportunity and add to overview
mockData.overview.totalSalesOpportunity = Object.values(
  mockData.solidSalesOpportunity
).reduce((sum, item) => sum + item.mtd, 0);

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Toaster /> Add Toaster component for displaying messages */}
      {/* Header */}
      <Header />
      <div className="p-6">
        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger className="cursor-pointer" value="overview">Overview</TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="social-media">Social Media</TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="digital-marketing">
              Digital Marketing
            </TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="app-analytics">App Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab Content */}
          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {/* Combined Leads Card */}
              <LeadCard />

              {/* Combined Sales & Revenue Card */}
              <RevenueCard />

              {/* Social Media Performance Card */}
              <SocialMediaCard />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Performers */}
              <TopPerformer />

              {/* Recent Activity */}
              <RecentActivity />
            </div>

            {/* New Cards: Risks, Opportunities, MTD Sales Risks */}
            <OverviewDetails />
          </TabsContent>

          <TabsContent value="social-media" className="space-y-6">
            <SocialCard />

            {/* Overall Social Media Performance */}

            <SocialMediaPerformance />

            <div className="grid grid-cols-2 gap-4">
              {/* Counsellor Social Media Performance */}
              <CounsellorSocialMediaPerformance />

              {/* New Team Performance Consolidated Table */}
              <PerformanceConsolidatedTable />
            </div>
          </TabsContent>

          {/* Digital Marketing Tab Content */}
          <TabsContent value="digital-marketing" className="space-y-6">
            <DigitalMarketingAnalytics />

            {/* Overall Male/Female Leads */}
            <GenderBifurcation />

            {/* Clinical Conditions Section */}
            <ClinicalBifurcation />

            {/* Campaigns Overview Section */}
            <CampaignOverview />

            {/* Lead MIS Section */}

            <LeadMIS />
          </TabsContent>

          {/* App Analytics Tab Content (Moved from previous location) */}
          <TabsContent value="app-analytics" className="space-y-6">
            {/* App Download Counts */}
            <AppDownloadCount />
            <h2 className="text-2xl font-bold">App Analytics Overview</h2>

            <div className="grid grid-cols-3 gap-6">

            {/* App Usage Overview */}
            <AppUsageActivity />

            {/* Key Engagement Metrics */}
            <KeyEngagementMetrix />

            {/* Activated Features */}
            <ActivatedFeatures />
            </div>
          </TabsContent>
        </Tabs>

        {/* Content Engagement Section */}
        <ContentManagement />
      </div>
      {/* Campaign Snapshot Modal */}
    </div>
  );
}
