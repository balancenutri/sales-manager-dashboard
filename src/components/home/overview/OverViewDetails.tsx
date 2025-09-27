import OverviewCard from "./OverviewCard";
import {
  useGetLeadMtdSalesRisksQuery,
  useGetLeadRiskAndMissesQuery,
  useGetLeadSolidSalesOpportunityQuery
} from "@/service/dashboard/api";

export default function OverviewDetails() {
  const { data: leadSolidSalesData, isFetching: leadSolidSalesFetching } =
    useGetLeadSolidSalesOpportunityQuery();
  const { data: leadRiskAndMissesData, isFetching: leadRiskAndMissesFetching } =
    useGetLeadRiskAndMissesQuery();
  const { data: leadSalesRiskData, isFetching: leadSalesRiskFetching } =
    useGetLeadMtdSalesRisksQuery();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Risks, Misses & OD */}

      <OverviewCard
        title="Risks, Misses & OD"
        data={leadRiskAndMissesData?.data}
        fetching={leadRiskAndMissesFetching}
      />
      <OverviewCard
        title="Solid Sales Opportunity"
        data={leadSolidSalesData?.data}
        fetching={leadSolidSalesFetching}
      />
      <OverviewCard
        title="MTD Sales Risks"
        data={leadSalesRiskData?.data }
        fetching={leadSalesRiskFetching}
      />
    </div>
  );
}



// import OverviewCard from "./OverviewCard";
// import {
//   useGetLeadMtdSalesRisksQuery,
//   useGetLeadRiskAndMissesQuery,
//   useGetLeadSolidSalesOpportunityQuery,
//   useGetOcMtdSalesRisksQuery,
//   useGetOcRiskAndMissesQuery,
//   useGetOcSolidSalesOpportunityQuery,
// } from "@/service/dashboard/api";
// import { useState } from "react";

// export default function OverviewDetails() {
//   const [solidSales, setSolidSales] = useState<"lead" | "oc">("lead");
//   const [riskAndMisses, setRiskAndMisses] = useState<"lead" | "oc">("lead");
//   const [salesRisk, setSalesRisk] = useState<"lead" | "oc">("lead");
//   const { data: leadSolidSalesData, isFetching: leadSolidSalesFetching } =
//     useGetLeadSolidSalesOpportunityQuery();
//   const { data: leadRiskAndMissesData, isFetching: leadRiskAndMissesFetching } =
//     useGetLeadRiskAndMissesQuery();
//   const { data: leadSalesRiskData, isFetching: leadSalesRiskFetching } =
//     useGetLeadMtdSalesRisksQuery();

//   const { data: ocSolidSalesData, isFetching: ocSolidSalesFetching } =
//     useGetOcSolidSalesOpportunityQuery();
//   const { data: ocRiskAndMissesData, isFetching: ocRiskAndMissesFetching } =
//     useGetOcRiskAndMissesQuery();
//   const { data: ocSalesRiskData, isFetching: ocSalesRiskFetching } =
//     useGetOcMtdSalesRisksQuery();




//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//       {/* Risks, Misses & OD */}

//       <OverviewCard
//         title="Risks, Misses & OD"
//         data={riskAndMisses === "lead" ? leadRiskAndMissesData?.data : ocRiskAndMissesData?.data}
//         fetching={riskAndMisses === "lead" ? leadRiskAndMissesFetching : ocRiskAndMissesFetching}
//         // selected={riskAndMisses}
//         // setSelected={setRiskAndMisses}
//       />
//       <OverviewCard
//         title="Solid Sales Opportunity"
//         data={solidSales === "lead" ? leadSolidSalesData?.data : ocSolidSalesData?.data}
//         fetching={solidSales === "lead" ? leadSolidSalesFetching : ocSolidSalesFetching}
//         // selected={solidSales}
//         // setSelected={setSolidSales}
//       />
//       <OverviewCard
//         title="MTD Sales Risks"
//         data={salesRisk === "lead" ? leadSalesRiskData?.data : ocSalesRiskData?.data}
//         fetching={salesRisk === "lead" ? leadSalesRiskFetching : ocSalesRiskFetching}
//         // selected={salesRisk}
//         // setSelected={setSalesRisk}
//       />
//     </div>
//   );
// }
