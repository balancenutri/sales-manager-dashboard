import CampaignDetails from "./campaign/CampaignDetails";
import WebsitePerformance from "./WebsitePerformance";

export default function DigitalMarketingAnalytics() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Digital Marketing Analytics</h2>
      <WebsitePerformance />
      <CampaignDetails />
    </div>
  );
}
