import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { keyMetricsData, mockData, simpleRowMetricsData } from "@/lib/data";
import Header from "@/components/common/Header";
import LeadCard from "@/components/home/overview/LeadCard";
import RevenueCard from "@/components/home/overview/RevenueCard";
import SocialCard from "@/components/home/socialMedia/SocialCard";
import ContentManagement from "@/components/home/common/ContentManagement";
import TopPerformer from "@/components/home/overview/TopPerformer";
import RecentActivity from "@/components/home/overview/RecentActivity";
import ClinicalBifurcation from "@/components/home/digitalMarketing/ClinicalBifurcation";
import LeadMIS from "@/components/home/digitalMarketing/LeadMIS";
import CounsellorSocialMediaPerformance from "@/components/home/socialMedia/CounsellorSocialMediaPerformance";
import PerformanceConsolidatedTable from "@/components/home/socialMedia/PerformanceConsolidatedTable";
import AppDownloadCount from "@/components/home/appAnalysis/AppDownloadCount";
import KeyEngagementMetrix from "@/components/home/appAnalysis/KeyEngagementMetrix";
import ActivatedFeatures from "@/components/home/appAnalysis/ActivatedFeatures";
import OverviewDetails from "@/components/home/overview/OverViewDetails";
import DigitalMarketingAnalytics from "@/components/home/digitalMarketing/DigitalMarketingAnalytics";
import CampaignOverview from "@/components/home/digitalMarketing/CampaignOverview";
import AppCount from "@/components/home/appAnalysis/AppCount";
import LeadOcBifurcation from "@/components/home/digitalMarketing/LeadOcBifurcation";
import NotificationEngagments from "@/components/home/appAnalysis/NotificationEngagements";
import OcCard from "@/components/home/overview/OcCard";
// import KeyMetricsBar from "@/components/home/overview/KeyMetrics";
import StatusWiseMetrics from "@/components/home/overview/keyMetrics/StatusWise";
import SalesProjection from "@/components/home/overview/keyMetrics/SalesProjection";

mockData.overview.totalSalesOpportunity = Object.values(
  mockData.solidSalesOpportunity
).reduce((sum, item) => sum + item.mtd, 0);

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="p-6">
        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger className="cursor-pointer" value="overview">
              Overview
            </TabsTrigger>
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
              <OcCard />

              {/* Combined Sales & Revenue Card */}
              <RevenueCard />

              {/* Social Media Performance Card */}
              {/* <PerformanceConsolidatedTable
                title="Team Performance (Social Media)"
                description="Consolidated social media performance by team/counsellor"
                header={false}
              /> */}
            </div>
            <h2 className="text-2xl font-bold">Key Metrics</h2>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
              <StatusWiseMetrics data={keyMetricsData} />
              <SalesProjection data={simpleRowMetricsData} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Top Performers */}
              <TopPerformer
                title="Top Performers"
                subTitle="Best performing counsellors this month"
              />
              <TopPerformer
                title="Low Performers"
                subTitle="Low performing counsellors this month"
              />

              {/* Recent Activity */}
              <RecentActivity />
            </div>

            {/* New Cards: Risks, Opportunities, MTD Sales Risks */}
            <OverviewDetails />
          </TabsContent>

          <TabsContent value="social-media" className="space-y-6">
            <SocialCard />

            <div className="grid grid-cols-2 gap-4">
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
            <CampaignOverview />
            <LeadOcBifurcation />
            <ClinicalBifurcation />

            <LeadMIS />
          </TabsContent>

          <TabsContent value="app-analytics" className="space-y-6">
            <AppDownloadCount />
            <AppCount />
            <h2 className="text-2xl font-bold">Content Engagement</h2>

            <div className="grid grid-cols-3 gap-6">
              <KeyEngagementMetrix />

              <ActivatedFeatures />
              <ContentManagement type="content" />
              <ContentManagement type="guide" />
            </div>
            <NotificationEngagments />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
