import {
  useGetAllActiveAppCountQuery,
  useGetAllLeadAppCountQuery,
  useGetAllOcAppCountQuery,
} from "@/service/dashboard/api";
import AppCountCard from "./appCount/AppCountCard";

export default function AppCount() {
  const { data: leadData } = useGetAllLeadAppCountQuery();
  const { data: activeData } = useGetAllActiveAppCountQuery();
  const { data: ocData } = useGetAllOcAppCountQuery();
  return (
    <div className="grid lg:grid-cols-3 gap-4">
      <AppCountCard data={activeData?.data || {}} title="Active App Count" />
      <AppCountCard data={ocData?.data || {}} title="Lead App Count" />
      <AppCountCard data={leadData?.data || {}} title="OC App Count" />
    </div>
  );
}
