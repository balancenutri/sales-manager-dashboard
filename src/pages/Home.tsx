import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Header from "@/components/common/Header";
import LeadCard from "@/components/home/overview/leadManagement/LeadCard";
import RevenueCard from "@/components/home/overview/leadManagement/RevenueCard";
import SocialCard from "@/components/home/socialMedia/SocialCard";
import ContentManagement from "@/components/home/common/ContentManagement";
import TopPerformer from "@/components/home/overview/counsellorOverview/TopPerformer";
import RecentActivity from "@/components/home/overview/counsellorOverview/RecentActivity";
import ClinicalBifurcation from "@/components/home/digitalMarketing/ClinicalBifurcation";
import LeadMIS from "@/components/home/digitalMarketing/LeadMIS";
import CounsellorSocialMediaPerformance from "@/components/home/socialMedia/CounsellorSocialMediaPerformance";
import PerformanceConsolidatedTable from "@/components/home/socialMedia/PerformanceConsolidatedTable";
import AppDownloadCount from "@/components/home/appAnalysis/AppDownloadCount";
import KeyEngagementMetrix from "@/components/home/appAnalysis/KeyEngagementMetrix";
import ActivatedFeatures from "@/components/home/appAnalysis/ActivatedFeatures";
import DigitalMarketingAnalytics from "@/components/home/digitalMarketing/DigitalMarketingAnalytics";
import CampaignOverview from "@/components/home/digitalMarketing/CampaignOverview";
import AppCount from "@/components/home/appAnalysis/AppCount";
import LeadOcBifurcation from "@/components/home/digitalMarketing/LeadOcBifurcation";
import NotificationEngagments from "@/components/home/appAnalysis/NotificationEngagements";
import SalesProjection from "@/components/home/overview/keyMetrics/SalesProjection";
import KeySourceConversion from "@/components/home/overview/KeySourceConversion";
import CounsellorDigitalMarketingPerfotmance from "@/components/home/digitalMarketing/CounsellorDigitalMarketingPerfotmance";
import KeySalesAlert from "@/components/home/overview/keyMetrics/KeySalesAlert";
import SalesSnapshots from "@/components/home/quickSnapshot/SalesSnapshots";
import LeadPosition from "@/components/home/overview/leadCard/LeadPosition";
import OcCard from "@/components/home/overview/leadManagement/OcCard";
import SalesAlert from "@/components/home/overview/counsellorOverview/SalesAlert";
import RiskMissesAndOds from "@/components/home/overview/counsellorOverview/RiskMissesAndOds";
import AppNotificationMarquee from "@/components/home/appAnalysis/AppNotificationMarquee";
import AppCrash from "@/components/home/appAnalysis/crashAnalysis/AppCrash";

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
            <LeadPosition />
            <h2 className="text-xl font-bold">Quick Sales Snapshot</h2>
            <SalesSnapshots />
            <SalesProjection prev={false} />
            <SalesProjection prev={true} />

            <h2 className="text-xl font-bold">Key Sales Alerts</h2>

            <KeySalesAlert />
            <h2 className="text-xl font-bold">Lead Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <LeadCard type="new" />
              <LeadCard type="old" />
              <OcCard />

              <RevenueCard />
            </div>

            <RiskMissesAndOds />

            <KeySourceConversion />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Top Performers */}
              <TopPerformer />
              <SalesAlert />
              <RecentActivity />
            </div>
          </TabsContent>

          <TabsContent value="social-media" className="space-y-6">
            <SocialCard />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
            <CounsellorDigitalMarketingPerfotmance />
            <LeadOcBifurcation />
            <ClinicalBifurcation />

            <LeadMIS />
          </TabsContent>

          <TabsContent value="app-analytics" className="space-y-6">
            <AppNotificationMarquee />
            <AppDownloadCount />
            <AppCrash />
            <AppCount />
            <h2 className="text-xl font-bold">Content Engagement</h2>

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
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// import Header from "@/components/common/Header";
// import LeadCard from "@/components/home/overview/LeadCard";
// import RevenueCard from "@/components/home/overview/RevenueCard";
// import SocialCard from "@/components/home/socialMedia/SocialCard";
// import ContentManagement from "@/components/home/common/ContentManagement";
// import TopPerformer from "@/components/home/overview/TopPerformer";
// import RecentActivity from "@/components/home/overview/RecentActivity";
// import ClinicalBifurcation from "@/components/home/digitalMarketing/ClinicalBifurcation";
// import LeadMIS from "@/components/home/digitalMarketing/LeadMIS";
// import CounsellorSocialMediaPerformance from "@/components/home/socialMedia/CounsellorSocialMediaPerformance";
// import PerformanceConsolidatedTable from "@/components/home/socialMedia/PerformanceConsolidatedTable";
// import AppDownloadCount from "@/components/home/appAnalysis/AppDownloadCount";
// import KeyEngagementMetrix from "@/components/home/appAnalysis/KeyEngagementMetrix";
// import ActivatedFeatures from "@/components/home/appAnalysis/ActivatedFeatures";
// import OverviewDetails from "@/components/home/overview/OverViewDetails";
// import DigitalMarketingAnalytics from "@/components/home/digitalMarketing/DigitalMarketingAnalytics";
// import CampaignOverview from "@/components/home/digitalMarketing/CampaignOverview";
// import AppCount from "@/components/home/appAnalysis/AppCount";
// import LeadOcBifurcation from "@/components/home/digitalMarketing/LeadOcBifurcation";
// import NotificationEngagments from "@/components/home/appAnalysis/NotificationEngagements";
// // import OcCard from "@/components/home/overview/OcCard";
// // import KeyMetricsBar from "@/components/home/overview/KeyMetrics";
// // import StatusWiseMetrics from "@/components/home/overview/keyMetrics/StatusWise";
// import SalesProjection from "@/components/home/overview/keyMetrics/SalesProjection";
// import KeySourceConversion from "@/components/home/overview/KeySourceConversion";
// import CounsellorDigitalMarketingPerfotmance from "@/components/home/digitalMarketing/CounsellorDigitalMarketingPerfotmance";
// import KeySalesAlert from "@/components/home/overview/KeySalesAlert";
// import SalesSnapshots from "@/components/home/quickSnapshot/SalesSnapshots";
// import LeadPosition from "@/components/home/overview/leadCard/LeadPosition";
// import OcCard from "@/components/home/overview/OcCard";
// // import BenchmarkAndAvg from "@/components/home/overview/BenchmarkAndAvg";

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header />
//       <div className="p-6">
//         {/* Main Content Tabs */}
//         <Tabs defaultValue="overview" className="space-y-6">
//           <TabsList className="grid w-full grid-cols-4">
//             <TabsTrigger className="cursor-pointer" value="overview">
//               Overview
//             </TabsTrigger>
//             <TabsTrigger className="cursor-pointer" value="social-media">
//               Social Media
//             </TabsTrigger>
//             <TabsTrigger className="cursor-pointer" value="digital-marketing">
//               Digital Marketing
//             </TabsTrigger>
//             <TabsTrigger className="cursor-pointer" value="app-analytics">
//               App Analytics
//             </TabsTrigger>
//           </TabsList>

//           {/* Overview Tab Content */}
//           <TabsContent value="overview" className="space-y-6">
//             {/* Key Metrics */}
//             {/* <BenchmarkAndAvg /> */}
//             <LeadPosition />
//             <h2 className="text-xl font-bold">Quick Sales Snapshot</h2>
//             <SalesSnapshots />
//             <SalesProjection />
//             {/* <h2 className="text-xl font-bold"></h2> */}
//             <h2 className="text-xl font-bold">Key Sales Alerts</h2>

//             <KeySalesAlert />
//             <h2 className="text-xl font-bold">Lead Management</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//               {/* Combined Leads Card */}
//               <LeadCard type="new" />
//               <LeadCard type="old" />
//               <OcCard />

//               {/* Combined Sales & Revenue Card */}
//               <RevenueCard />

//               {/* Social Media Performance Card */}
//               {/* <PerformanceConsolidatedTable
//                 title="Team Performance (Social Media)"
//                 description="Consolidated social media performance by team/counsellor"
//                 header={false}
//               /> */}
//             </div>
//             {/* <div className="grid lg:grid-cols-2 grid-cols-1 gap-6"> */}
//             {/* <StatusWiseMetrics /> */}
//             {/* </div> */}
//             <KeySourceConversion />
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//               {/* Top Performers */}
//               <TopPerformer
//                 title="Top Performers"
//                 subTitle="Best performing counsellors this month"
//               />
//               {/* <TopPerformer
//                 title="Low Performers"
//                 subTitle="Low performing counsellors this month"
//               /> */}

//               {/* Recent Activity */}
//               <RecentActivity />
//             </div>

//             {/* New Cards: Risks, Opportunities, MTD Sales Risks */}
//             {/* <OverviewDetails /> */}
//           </TabsContent>

//           <TabsContent value="social-media" className="space-y-6">
//             <SocialCard />

//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//               <CounsellorSocialMediaPerformance />

//               {/* New Team Performance Consolidated Table */}
//               <PerformanceConsolidatedTable
//                 title="Team & Mentor Performance Summary"
//                 description="Leads, Consultations, and Sales by Team and Mentor"
//                 header={true}
//               />
//             </div>
//           </TabsContent>

//           {/* Digital Marketing Tab Content */}
//           <TabsContent value="digital-marketing" className="space-y-6">
//             <DigitalMarketingAnalytics />
//             <CampaignOverview />
//             <CounsellorDigitalMarketingPerfotmance />
//             <LeadOcBifurcation />
//             <ClinicalBifurcation />

//             <LeadMIS />
//           </TabsContent>

//           <TabsContent value="app-analytics" className="space-y-6">
//             <AppDownloadCount />
//             <AppCount />
//             <h2 className="text-xl font-bold">Content Engagement</h2>

//             <div className="grid grid-cols-3 gap-6">
//               <KeyEngagementMetrix />

//               <ActivatedFeatures />
//               <ContentManagement type="content" />
//               <ContentManagement type="guide" />
//             </div>
//             <NotificationEngagments />
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   );
// }
