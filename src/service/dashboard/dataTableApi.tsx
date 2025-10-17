import type { PageVisitsDataResponse } from "@/lib/types";
import { dashboardApi } from "./api";

export const dataTableApi = dashboardApi.injectEndpoints({
  endpoints: (builder) => ({
    getBalancePaymentOdData: builder.query<any, { mentor_id: number }>({
      query: (body) => ({
        url: `/mentor/lead-dashboard/balance-payment-leads`,
        method: "POST",
        body,
      }),
    }),
    getEngagementData: builder.query<any, { filter: string }>({
      query: (body) => ({
        url: `/mentor/lead-dashboard/engagement-today-leads`,
        method: "POST",
        body,
      }),
    }),
    getFollowUpData: builder.query<any, { filter: string }>({
      query: (body) => ({
        url: `/mentor/lead-dashboard/follow-ups-leads`,
        method: "POST",
        body,
      }),
    }),
    getCrossCallData: builder.query<any, { filter: string }>({
      query: (body) => ({
        url: `/mentor/lead-dashboard/cross-calls-leads`,
        method: "POST",
        body,
      }),
    }),
    getCallsData: builder.query<any, { filter: string }>({
      query: (body) => ({
        url: `/mentor/lead-dashboard/calls-leads`,
        method: "POST",
        body,
      }),
    }),

    getLeadWalletExpiringTomorrowData: builder.query<any, { search?: string }>({
      query: (body) => ({
        url: `/mentor/lead-dashboard/wallet-expiring-tomorrow-leads`,
        method: "POST",
        body,
      }),
    }),
    getHotLeadWithNegativeFeedbackTomorrowData: builder.query<
      any,
      { search?: string }
    >({
      query: (body) => ({
        url: `/mentor/lead-dashboard/hot-leads-with-negative-feedback`,
        method: "POST",
        body,
      }),
    }),
    getLeadHotFollowUpPendingData: builder.query<any, { search?: string }>({
      query: (body) => ({
        url: `/mentor/lead-dashboard/hot-follow-ups-pending-leads`,
        method: "POST",
        body,
      }),
    }),
    getLeadGoodWeightLossData: builder.query<any, { search?: string }>({
      query: (body) => ({
        url: `/mentor/lead-dashboard/good-weight-loss-leads`,
        method: "POST",
        body,
      }),
    }),
    getLeadMilestoneData: builder.query<any, { search?: string }>({
      query: (body) => ({
        url: `/mentor/lead-dashboard/milestone-filled-leads`,
        method: "POST",
        body,
      }),
    }),
    getLeadWithGuidePurchasedData: builder.query<any, { search?: string }>({
      query: (body) => ({
        url: `/mentor/lead-dashboard/guide-purchased-leads`,
        method: "POST",
        body,
      }),
    }),

    getSalesTriggerData: builder.query<
      PageVisitsDataResponse,
      {
        status: "hot" | "warm" | "cold";
      }
    >({
      query: ({ status }) => ({
        url: `/sales/overview/sales-trigger-data?status=${status}`,
        method: "POST",
      }),
      providesTags: ["Common"],
    }),
  }),
});

export const {
  useGetBalancePaymentOdDataQuery,
  useGetEngagementDataQuery,
  useGetFollowUpDataQuery,
  useGetCrossCallDataQuery,
  useGetCallsDataQuery,

  useGetLeadWalletExpiringTomorrowDataQuery,
  useGetHotLeadWithNegativeFeedbackTomorrowDataQuery,
  useGetLeadHotFollowUpPendingDataQuery,
  useGetLeadGoodWeightLossDataQuery,
  useGetLeadMilestoneDataQuery,
  useGetLeadWithGuidePurchasedDataQuery,

  useGetSalesTriggerDataQuery,
} = dataTableApi;
