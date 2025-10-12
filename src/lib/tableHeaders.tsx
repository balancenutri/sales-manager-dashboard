import CommonCell from "@/components/common/cells/CommonCell";
import ProgramDetailsCell from "@/components/common/cells/ProgramDetailsCell";
import SuggestProgramCell from "@/components/common/cells/SuggestedProgramCell";
import UserDetailsCell from "@/components/common/cells/UserDetailsCell";
import type { ColumnDef } from "@tanstack/react-table";
// Helper function to convert snake_case to Title Case
export const keyString = (key: string): string => {
  return key
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

type DataResponse = {
  data: any[];
  table_meta_data?: string[];
  hide_columns?: string[];
};

export const generateHeadersAndAccessors = (
  datas: DataResponse,
  hiddenColumn: string[] = [],
  hiddenData: string[] = []
) => {
  console.log(datas);
  if (!datas?.data || datas.data.length === 0) {
    return { data: [], columns: [] };
  }

  const hideData = [
    ...(Array.isArray(datas?.table_meta_data) ? datas.table_meta_data : []),
    ...(Array.isArray(hiddenData) ? hiddenData : []),
  ];

  const hideColumn = [
    ...(Array.isArray(datas?.hide_columns) ? datas.hide_columns : []),
    ...(Array.isArray(hiddenColumn) ? hiddenColumn : []),
    "filter_flags",
    "action_details",
    "faq_id",
  ];

  // Add SR. NO. column first
  const columns: ColumnDef<any>[] = [
    {
      id: "sr_no",
      header: () => (
        <div className="text-xs font-semibold text-muted-foreground">
          SR.
          <br />
          NO.
        </div>
      ),
      cell: ({ row }) => (
        <div className="w-8 text-center font-medium">{row.index + 1}</div>
      ),
    },
  ];

  console.log(datas.data[0], 155);
  // Generate columns from data structure
  const headers = Object.entries(datas.data[0]).reduce((acc, [key, value]) => {
    if (hideColumn.includes(key)) return acc;

    if (typeof value === "object" && value !== null) {
      const column: ColumnDef<any> = {
        id: key,
        accessorKey: key,
        header: () => (
          <div className="text-xs font-semibold text-muted-foreground">
            {keyString(key).toUpperCase()}
          </div>
        ),
        cell: ({ row }) => {
          const cellValue = row.original[key];
          const rowData = row.original;

          switch (key) {
            case "user_details":
            case "client_details":
              return (
                <UserDetailsCell
                  value={cellValue}
                  rowData={rowData}
                  hideData={hideData}
                />
              );
            // case "health_details":
            //   return <HealthDetailsCell value={cellValue} rowData={rowData} />
            case "suggested_details":
            case "suggested_program_details":
              return <SuggestProgramCell value={cellValue} rowData={rowData} />;
            case "program_details":
            case "current_program_details":
              return (
                <ProgramDetailsCell
                  value={cellValue}
                  rowData={rowData}
                  hideData={hideData}
                />
              );
            default:
              return <CommonCell value={cellValue} hideData={hideData} />;
          }
        },
      };
      acc.push(column);
      return acc;
    } else {
      acc.push({
        id: key,
        accessorKey: key,
        header: () => (
          <div className="text-xs font-semibold text-muted-foreground">
            {keyString(key).toUpperCase()}
          </div>
        ),
        cell: ({ row }) => <div className="text-xs">{row.original[key]}</div>,
      });
      return acc;
    }
  }, [] as ColumnDef<any>[]);

  // Add ACTIONS column at the end
  columns.push(...headers);
  columns.push({
    id: "actions",
    header: () => (
      <div className="text-xs font-semibold text-muted-foreground">ACTIONS</div>
    ),
    cell: () => {
      return (
        <div className="py-2">
          <textarea
            placeholder="FU Notes"
            className="min-h-[80px] text-xs border rounded p-2 w-full"
          />
        </div>
      );
    },
  });

  return { data: datas.data, columns };
};
