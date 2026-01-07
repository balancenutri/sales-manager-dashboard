import { useGetUserBifurcationCountQuery } from "@/service/dashboard/api";
import AgeBifurcation from "./bifurcation/AgeBifurcation";
import GenderBifurcation from "./bifurcation/GenderBifurcation";
import StageBifurcation from "./bifurcation/StageBifurcation";
import UserDistribution from "./bifurcation/UserDistribution";
import RegionDistribution from "./bifurcation/RegionDistribution";

export default function LeadOcBifurcation() {
  const { data } = useGetUserBifurcationCountQuery();

  return (
    <>
      <h2 className="text-xl font-bold">Lead & OC Bifurcation</h2>
      <div className="grid grid-cols-4 gap-4">
        <UserDistribution data={data?.data.overall_distribution} />
        <RegionDistribution data={data?.data.location_distribution} />
        <div className="col-span-2">
          <StageBifurcation data={data?.data.stage_distribution} />
        </div>
      </div>
      <div className="grid grid-cols-5 gap-4 mb-20">
        <div className="col-span-2">
          <GenderBifurcation data={data?.data.gender_distribution} />
        </div>
        <div className="col-span-3">
          <AgeBifurcation data={data?.data.age_group_distribution} />
        </div>
      </div>
    </>
  );
}
