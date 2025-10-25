import { DataTable } from "@/components/common/Table";
import { generateHeadersAndAccessors } from "@/lib/tableHeaders";
import { useGetAppDownloadDataQuery } from "@/service/dashboard/api";

export default function AppDownloadData({ selected, device }: { selected: string; device: string; }) {
  console.log({ selected });
  if (!selected) return <></>;
  const { data, isFetching, isError, error } = useGetAppDownloadDataQuery({
    filter: selected,
    device
  });

  // Handle error state
  if (isError) {
    console.error("API error:", error);
    return (
      <div className="text-red-500 text-center py-6">
        Error loading data:{" "}
        {/* {error?.data?.message || error?.message || "Unknown error"} */}
      </div>
    );
  }

  // Generate table data
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
