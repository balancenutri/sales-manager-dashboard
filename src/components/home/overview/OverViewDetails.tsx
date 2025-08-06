import { mockData } from "@/lib/data";
import OverviewCard from "./OverviewCard";

export default function OverviewDetails() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Risks, Misses & OD */}

      <OverviewCard title="Risks, Misses & OD" data={mockData.risksMissesOD} />
      <OverviewCard
        title="Solid Sales Opportunity"
        data={mockData.solidSalesOpportunity}
      />
      <OverviewCard title="MTD Sales Risks" data={mockData.mtdSalesRisks} />
    </div>
  );
}
