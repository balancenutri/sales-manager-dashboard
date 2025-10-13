import { DataTable } from "@/components/common/Table";
import { generateHeadersAndAccessors } from "@/lib/tableHeaders";
import {
  useGetLeadWalletExpiringTomorrowDataQuery,
  useGetHotLeadWithNegativeFeedbackTomorrowDataQuery,
  useGetLeadGoodWeightLossDataQuery,
  useGetLeadMilestoneDataQuery,
  useGetLeadWithGuidePurchasedDataQuery,
  useGetLeadHotFollowUpPendingDataQuery,
} from "@/service/dashboard/dataTableApi";

// Define the type for the selected prop
type SelectedApi =
  | "wallet_expiring_tomorrow"
  | "HOT_lead_with_negative_feedback"
  | "good_weight_loss"
  | "HOT_followups_pending"
  | "milestone"
  | "leads_with_e_kit_pro" | null;

// Define props for the BalancePayment component
interface BalancePaymentProps {
  selected: SelectedApi;
}


// Define API configuration type
interface ApiConfig {
  body: {};
  hiddenColumns: string[];
  hiddenData: any[];
}

// Function to generate API configuration
const getApiConfig = (selected: SelectedApi): ApiConfig => {
  switch (selected) {
    case "wallet_expiring_tomorrow":
      return {
        body: {},
        hiddenColumns: ["feedbacks"],
        hiddenData: [],
      };
    case "HOT_lead_with_negative_feedback":
      return {
        body: {},
        hiddenColumns: ["metrics"],
        hiddenData: [],
      };
    case "good_weight_loss":
      return {
        body: {},
        hiddenColumns: ["notes"],
        hiddenData: [],
      };
    case "milestone":
      return {
        body: {},
        hiddenColumns: ["call_logs"],
        hiddenData: [],
      };
    case "leads_with_e_kit_pro":
      return {
        body: {},
        hiddenColumns: ["call_duration"],
        hiddenData: [],
      };
    default:
      return {
        body: {},
        hiddenColumns: ["feedbacks"],
        hiddenData: [],
      };
  }
};

// ✅ Custom hook to handle dynamic query selection
function useSelectedQuery(selected: SelectedApi, body: any) {
  switch (selected) {
    case "wallet_expiring_tomorrow":
      return useGetLeadWalletExpiringTomorrowDataQuery(body);
    case "HOT_lead_with_negative_feedback":
      return useGetHotLeadWithNegativeFeedbackTomorrowDataQuery(body);
    case "good_weight_loss":
      return useGetLeadGoodWeightLossDataQuery(body);
    case "milestone":
      return useGetLeadMilestoneDataQuery(body);
    case "leads_with_e_kit_pro":
      return useGetLeadWithGuidePurchasedDataQuery(body);
    case "HOT_followups_pending":
      return useGetLeadHotFollowUpPendingDataQuery(body);
    default:
      throw new Error(`Invalid selected API: ${selected}`);
  }
}

export default function SalesAlertData({ selected }: BalancePaymentProps) {
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
