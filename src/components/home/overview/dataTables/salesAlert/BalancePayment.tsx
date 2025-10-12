import { DataTable } from "@/components/common/Table";
import { generateHeadersAndAccessors } from "@/lib/tableHeaders";
import { useGetBalancePaymentOdDataQuery } from "@/service/dashboard/dataTableApi";

export default function Home() {
  const { data, isFetching } = useGetBalancePaymentOdDataQuery({ mentor_id: 88 });
  const tableData = generateHeadersAndAccessors(
    { data: data?.data },
    ["feedbacks"], // hiddenColumns
    [] // hiddenData
  );

  return (
    <div className="container mx-auto py-6">
      <DataTable
        columns={tableData.columns || []}
        data={tableData.data || []}
        showPagination={true}
        showColumnVisibility={false}
        pageSize={10}
      />
    </div>
  );
}
