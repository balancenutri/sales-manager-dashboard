import { DataTable } from "@/components/common/Table";
import { generateHeadersAndAccessors } from "@/lib/tableHeaders";
import {
  useGetBalancePaymentOdDataQuery,
  useGetEngagementDataQuery,
  useGetFollowUpDataQuery,
  useGetCrossCallDataQuery,
  useGetCallsDataQuery,
} from "@/service/dashboard/dataTableApi";

// Define the type for the selected prop
type SelectedApi =
  | "balance_payment_overdue"
  | "engagement_missed"
  | "follow_up_missed"
  | "cross_call_OD"
  | "calls_missed";

// Define props for the BalancePayment component
interface BalancePaymentProps {
  selected: SelectedApi;
}

// Define specific body types for each API (for type safety)
interface BalancePaymentBody {
  filter: string;
}
interface EngagementBody {
  date: string;
}
interface FollowUpBody {
  status: string;
}
interface CrossCallBody {
  type: string;
}
interface CallsBody {
  call_status: string;
}

// Define API configuration type
interface ApiConfig {
  body:
    | BalancePaymentBody
    | EngagementBody
    | FollowUpBody
    | CrossCallBody
    | CallsBody;
  hiddenColumns: string[];
  hiddenData: any[];
}

// Function to generate API configuration
const getApiConfig = (selected: SelectedApi): ApiConfig => {
  switch (selected) {
    case "balance_payment_overdue":
      return {
        body: { filter: "overdue" },
        hiddenColumns: ["feedbacks"],
        hiddenData: [],
      };
    case "engagement_missed":
      return {
        body: { filter: "missed" },
        hiddenColumns: ["metrics"],
        hiddenData: [],
      };
    case "follow_up_missed":
      return {
        body: { filter: "missed" },
        hiddenColumns: ["notes"],
        hiddenData: [],
      };
    case "cross_call_OD":
      return {
        body: { filter: "missed" },
        hiddenColumns: ["call_logs"],
        hiddenData: [],
      };
    case "calls_missed":
      return {
        body: { filter: "missed" },
        hiddenColumns: ["call_duration"],
        hiddenData: [],
      };
    default:
      return {
        body: { filter: "missed" },
        hiddenColumns: ["feedbacks"],
        hiddenData: [],
      };
  }
};

// ✅ Custom hook to handle dynamic query selection
function useSelectedQuery(selected: SelectedApi, body: any) {
  switch (selected) {
    case "balance_payment_overdue":
      return useGetBalancePaymentOdDataQuery(body);
    case "engagement_missed":
      return useGetEngagementDataQuery(body);
    case "follow_up_missed":
      return useGetFollowUpDataQuery(body);
    case "cross_call_OD":
      return useGetCrossCallDataQuery(body);
    case "calls_missed":
      return useGetCallsDataQuery(body);
    default:
      throw new Error(`Invalid selected API: ${selected}`);
  }
}

export default function RiskAndOdsData({ selected }: BalancePaymentProps) {
  if (!selected) return <></>;
  // Get API configuration
  const { body, hiddenColumns, hiddenData } = getApiConfig(selected);

  // Call the correct API query hook via custom hook
  const { data, isFetching, isError, error } = useSelectedQuery(selected, body);

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
  const tableData = generateHeadersAndAccessors(
    { data: data?.data || [] },
    hiddenColumns,
    hiddenData
  );

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
