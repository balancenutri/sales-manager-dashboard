import type { ClinicalConditionResponse } from "@/components/home/digitalMarketing/ClinicalBifurcation";
import { commonAPi } from "../common/api";
import {
  type LeadManagementResponse,
  type ActivatedFeaturesResponse,
  type AddCampaignBody,
  type AppDownlaodResponse,
  type AppUsageResponse,
  type KeyEngagementResponse,
  type LeadMisBody,
  type LeadMisResponse,
  type SalesPerformanceResponse,
  type TopPerformerResponse,
  type ClientPerformanceResponse,
  type ClientPerformanceBody,
  type AssignedLeadPerformanceResponse,
  type SaleByStackResponse,
  type SocialMediaResponse,
} from "@/lib/types";

type BodyProps = {
  filter: string;
};

export const dashboardApi = commonAPi.injectEndpoints({
  endpoints: (builder) => ({
    getLeadManagement: builder.query<LeadManagementResponse, void>({
      query: () => ({
        url: `/sales/overview/lead-management`,
        method: "POST",
      }),
      providesTags: ["Common"],
    }),
    getAssignedLeadPerformance: builder.query<
      AssignedLeadPerformanceResponse,
      void
    >({
      query: () => ({
        url: `/sales/overview/assigned-leads-performance`,
        method: "POST",
      }),
      providesTags: ["Common"],
    }),
    getSalesPerformance: builder.query<SalesPerformanceResponse, void>({
      query: () => ({
        url: `/sales/overview/sales-performance`,
        method: "POST",
      }),
      providesTags: ["Common"],
    }),
    getSaleByStack: builder.query<SaleByStackResponse, void>({
      query: () => ({
        url: `/sales/overview/sales-breakdown-by-stack`,
        method: "POST",
      }),
      providesTags: ["Common"],
    }),
    getTopPerformers: builder.query<TopPerformerResponse, void>({
      query: () => ({
        url: `/sales/overview/top-performers`,
        method: "POST",
      }),
      providesTags: ["Common"],
    }),

    // SOCIAL MEDIA
    getCounsellorSocialMediaPerformance: builder.query({
      query: () => ({
        url: `/sales/social-media/counsellor-sm-performance`,
        method: "POST",
      }),
      providesTags: ["Common"],
    }),
    getConsolidatedTeamPerformance: builder.query({
      query: () => ({
        url: `/sales/social-media/consolidated-team-performance`,
        method: "POST",
      }),
      providesTags: ["Common"],
    }),
    getInstagramPerformance: builder.query<SocialMediaResponse, BodyProps>({
      query: (body) => ({
        url: `/sales/social-media/instagram-performance`,
        method: "POST",
        body,
      }),
      providesTags: ["Common"],
    }),
    getYoutubePerformance: builder.query<SocialMediaResponse, BodyProps>({
      query: (body) => ({
        url: `/sales/social-media/youtube-performance`,
        method: "POST",
        body,
      }),
      providesTags: ["Common"],
    }),
    getFacebookPerformance: builder.query<SocialMediaResponse, BodyProps>({
      query: (body) => ({
        url: `/sales/social-media/facebook-performance`,
        method: "POST",
        body,
      }),
      providesTags: ["Common"],
    }),
    getSocialMediaPerformance: builder.query<SocialMediaResponse, BodyProps>({
      query: (body) => ({
        url: `/sales/social-media/social-media-performance`,
        method: "POST",
        body
      }),
      providesTags: ["Common"],
    }),

    getGenderWiseLead: builder.query({
      query: (body: BodyProps) => ({
        url: `/sales/digital-marketing/overall-gender-wise-leads`,
        method: "POST",
        body,
      }),
      providesTags: ["Common"],
    }),
    getClinicalConditionData: builder.query<ClinicalConditionResponse, void>({
      query: () => ({
        url: `/sales/digital-marketing/clinical-conditions-wise-data`,
        method: "POST",
      }),
      providesTags: ["Common"],
    }),
    getLeadMisData: builder.query<Blob, LeadMisBody>({
      query: (body) => ({
        url: `/sales/digital-marketing/lead-mis-data`,
        method: "POST",
        body,
        responseHandler: async (response) => {
          const contentType = response.headers.get("Content-Type");
          console.log("Content-Type:", contentType);
          if (
            !contentType?.includes(
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            )
          ) {
            const text = await response.text();
            throw new Error(
              `Unexpected Content-Type: ${contentType}. Response: ${text}`
            );
          }
          return response.blob();
        },
        headers: {
          Accept:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["Common"],
    }),

    addNewCampaign: builder.mutation<any, AddCampaignBody>({
      query: (body) => ({
        url: `/sales/digital-marketing/add-campaign`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Common"],
    }),
    getLeadUserMisData: builder.query<LeadMisResponse, LeadMisBody>({
      query: (body) => ({
        url: `/sales/digital-marketing/lead-mis-data`,
        method: "POST",
        body,
      }),
      providesTags: ["Common"],
    }),

    getAppDownloadsCount: builder.query<AppDownlaodResponse, void>({
      query: () => ({
        url: `/sales/app-activity/app-download-counts`,
        method: "POST",
      }),
      providesTags: ["Common"],
    }),
    getAllLeadWithAppCount: builder.query<SocialMediaResponse, void>({
      query: () => ({
        url: `/sales/app-activity/all-leads-with-app-count`,
        method: "POST",
      }),
      providesTags: ["Common"],
    }),
    getAppUsageOverview: builder.query<AppUsageResponse, void>({
      query: () => ({
        url: `/sales/app-activity/app-usage-overview`,
        method: "POST",
      }),
      providesTags: ["Common"],
    }),
    getKeyEngagementMatrics: builder.query<KeyEngagementResponse, void>({
      query: () => ({
        url: `/sales/app-activity/key-engagement-metrics`,
        method: "POST",
      }),
      providesTags: ["Common"],
    }),
    getActivatedFeatures: builder.query<ActivatedFeaturesResponse, void>({
      query: () => ({
        url: `/sales/app-activity/activated-features`,
        method: "POST",
      }),
      providesTags: ["Common"],
    }),
    getClientPerformance: builder.query<
      ClientPerformanceResponse,
      ClientPerformanceBody
    >({
      query: (body) => ({
        url: `/post-purchase-mis/count/client-performance`,
        method: "POST",
        body,
      }),
      providesTags: ["Common"],
    }),

    getGuideAndBookInteractions: builder.query({
      query: (body: BodyProps) => ({
        url: `/sales/social-media/guide-and-book-interactions`,
        method: "POST",
        body,
      }),
      providesTags: ["Common"],
    }),
    getContentVisits: builder.query({
      query: (body: BodyProps) => ({
        url: `/sales/social-media/content-visits`,
        method: "POST",
        body,
      }),
      providesTags: ["Common"],
    }),
  }),
});

export const {
  useGetLeadManagementQuery,
  useGetAssignedLeadPerformanceQuery,

  useGetSalesPerformanceQuery,
  useGetSaleByStackQuery,

  useGetTopPerformersQuery,

  useGetGenderWiseLeadQuery,
  useGetClinicalConditionDataQuery,
  useGetLeadMisDataQuery,

  useAddNewCampaignMutation,
  useGetLeadUserMisDataQuery,
  useLazyGetLeadMisDataQuery,

  useGetCounsellorSocialMediaPerformanceQuery,
  useGetConsolidatedTeamPerformanceQuery,
  useGetInstagramPerformanceQuery,
  useGetFacebookPerformanceQuery,
  useGetYoutubePerformanceQuery,
  useGetSocialMediaPerformanceQuery,

  useGetAppDownloadsCountQuery,
  useGetAllLeadWithAppCountQuery,
  useGetAppUsageOverviewQuery,
  useGetKeyEngagementMatricsQuery,
  useGetActivatedFeaturesQuery,
  useGetClientPerformanceQuery,

  useGetGuideAndBookInteractionsQuery,
  useGetContentVisitsQuery,
} = dashboardApi;
