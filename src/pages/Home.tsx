import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { mockData } from "@/lib/data";
import Header from "@/components/common/Header";
import LeadCard from "@/components/home/overview/LeadCard";
import RevenueCard from "@/components/home/overview/RevenueCard";
import SocialCard from "@/components/home/socialMedia/SocialCard";
import ContentManagement from "@/components/home/common/ContentManagement";
import TopPerformer from "@/components/home/overview/TopPerformer";
import RecentActivity from "@/components/home/overview/RecentActivity";
import GenderBifurcation from "@/components/home/digitalMarketing/GenderBifurcation";
import ClinicalBifurcation from "@/components/home/digitalMarketing/ClinicalBifurcation";
import LeadMIS from "@/components/home/digitalMarketing/LeadMIS";
import CounsellorSocialMediaPerformance from "@/components/home/socialMedia/CounsellorSocialMediaPerformance";
import PerformanceConsolidatedTable from "@/components/home/socialMedia/PerformanceConsolidatedTable";
import AppDownloadCount from "@/components/home/appAnalysis/AppDownloadCount";
import AppUsageActivity from "@/components/home/appAnalysis/AppUsageActivity";
import KeyEngagementMetrix from "@/components/home/appAnalysis/KeyEngagementMetrix";
import ActivatedFeatures from "@/components/home/appAnalysis/ActivatedFeatures";
import OverviewDetails from "@/components/home/overview/OverViewDetails";
import LeadPerformance from "@/components/home/appAnalysis/LeadPerformance";
// import LeadAppCount from "@/components/home/appAnalysis/LeadAppCount";
import DigitalMarketingAnalytics from "@/components/home/digitalMarketing/DigitalMarketingAnalytics";
import CampaignOverview from "@/components/home/digitalMarketing/CampaignOverview";
import AppCount from "@/components/home/appAnalysis/AppCount";
import LeadDistribution from "@/components/home/digitalMarketing/LeadDistribution";
import AgeBifurcation from "@/components/home/digitalMarketing/AgeBifurcation";
import StageBifurcation from "@/components/home/digitalMarketing/StageBifurcation";
import UserDistribution from "@/components/home/digitalMarketing/UserDistribution";
// import LeadPerformance from "@/components/home/appAnalysis/LeadPerformance";

// Calculate total sales opportunity and add to overview
mockData.overview.totalSalesOpportunity = Object.values(
  mockData.solidSalesOpportunity
).reduce((sum, item) => sum + item.mtd, 0);

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="p-6">
        {/* Main Content Tabs */}
        <Tabs defaultValue="social-media" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            {/* <TabsTrigger className="cursor-pointer" value="overview">
              Overview
            </TabsTrigger> */}
            <TabsTrigger className="cursor-pointer" value="social-media">
              Social Media
            </TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="digital-marketing">
              Digital Marketing
            </TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="app-analytics">
              App Analytics
            </TabsTrigger>
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
              <PerformanceConsolidatedTable
                title="Team Performance (Social Media)"
                description="Consolidated social media performance by team/counsellor"
                header={false}
              />
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

            {/* <SocialMediaPerformance /> */}

            <div className="grid grid-cols-2 gap-4">
              {/* Counsellor Social Media Performance */}
              <CounsellorSocialMediaPerformance />

              {/* New Team Performance Consolidated Table */}
              <PerformanceConsolidatedTable
                title="Team & Mentor Performance Summary"
                description="Leads, Consultations, and Sales by Team and Mentor"
                header={true}
              />
            </div>
          </TabsContent>

          {/* Digital Marketing Tab Content */}
          <TabsContent value="digital-marketing" className="space-y-6">
            <DigitalMarketingAnalytics />

            {/* Overall Male/Female Leads */}
            <h2 className="text-2xl font-bold">Lead & OC Bifurcation</h2>
            <div className="grid grid-cols-4 gap-4">
              <UserDistribution />
              <LeadDistribution />
              <div className="col-span-2">
                <StageBifurcation />
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4 mb-20">
              <GenderBifurcation />
              <div className="col-span-3">
                <AgeBifurcation />
              </div>
            </div>

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
            <AppCount />
            {/* <div className="max-w-[500px]">
              <LeadAppCount />
            </div> */}
            <h2 className="text-2xl font-bold">Content Engagement</h2>

            <div className="grid grid-cols-3 gap-6">
              {/* App Usage Overview */}
              {/* <AppUsageActivity /> */}

              {/* Key Engagement Metrics */}
              <KeyEngagementMetrix />

              {/* Activated Features */}
              <ActivatedFeatures />
              <ContentManagement type="content" />
              <ContentManagement type="guide" />
            </div>
            <LeadPerformance />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
