import { DataTable } from "@/components/common/Table";
import { generateHeadersAndAccessors } from "@/lib/tableHeaders";
import {
  useGetActiveAppAnalyticsOverViewDataQuery,
  useGetLeadAppAnalyticsOverViewDataQuery,
  useGetOcAppAnalyticsOverViewDataQuery,
} from "@/service/dashboard/api";

export default function AppAnalysisData({
  selected,
  type,
  period,
}: {
  selected: string;
  type: string;
  period?: string;
}) {
  if (!selected) return <></>;
  const leadQuery = useGetLeadAppAnalyticsOverViewDataQuery(
    { type: selected, filter: period },
    { skip: type !== "lead" }
  );

  const activeQuery = useGetActiveAppAnalyticsOverViewDataQuery(
    { type: selected, filter: period },
    { skip: type !== "active" }
  );

  const ocQuery = useGetOcAppAnalyticsOverViewDataQuery(
    { type: selected, filter: period },
    { skip: type !== "oc" }
  );

  const { data, isFetching } =
    type === "lead" ? leadQuery : type === "active" ? activeQuery : ocQuery;

  const tableData = generateHeadersAndAccessors({ data: data?.data || [] });

  return (
    <div className="container mx-auto py-6">
      <DataTable
        columns={tableData.columns || []}
        data={tableData.data || []}
        showPagination={false}
        showColumnVisibility={false}
        isFetching={isFetching}
      />
    </div>
  );
}
