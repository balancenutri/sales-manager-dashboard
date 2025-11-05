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
  type UpdateSocialMediaResponse,
  type UpdateSocialMediaBody,
  type GetAllCampaignResponse,
  type GetCampaignDetailsResponse,
  type CampaignDetailsBody,
  type UpdateCampaignBody,
  type UserBifurcationResponse,
  type CampaignOverviewResponse,
  type AppCountResponse,
  type AllSocialMediaPerformanceResponse,
  type NotificationStatsResponse,
  type WebsitePerformanceResponse,
  type CounsellorCampaignPerformanceResponse,
  type SolidSalesResponse,
  type SalesTriggerResponse,
  type SalesProjectionResponse,
  type KeySourceResponse,
  type CounsellorDataResponse,
  type PitchedHistoryResponse,
  type OcManagementResponse,
  type ConsultationPendingResponse,
  type UnconvertedLeadResponse,
  type QuickSalesSnapshotResponse,
  type SalesOpportunities,
  type LeadFunnelResponse,
  type PageVisitsDataResponse,
  type SalesAlertResponse,
  type NotificationEngagementSummaryResponse,
} from "@/lib/types";

type BodyProps = {
  filter: string;
};

export const dashboardApi = commonAPi.injectEndpoints({
  endpoints: (builder) => ({
    getLeadManagement: builder.query<
      LeadManagementResponse,
      {
        start_date?: string;
        end_date?: string;
      }
    >({
      query: (body) => ({
        url: `/sales/overview/lead-management`,
        method: "POST",
        body,
      }),
      providesTags: ["Common"],
    }),
    getOldLeadManagement: builder.query<
      LeadManagementResponse,
      {
        start_date?: string;
        end_date?: string;
      }
    >({
      query: (body) => ({
        url: `/sales/overview/old-lead-management`,
        method: "POST",
        body,
      }),
      providesTags: ["Common"],
    }),
    getLeadFunnel: builder.query<LeadFunnelResponse, void>({
      query: () => ({
        url: `/sales/overview/lead-funnel`,
        method: "POST",
      }),
      providesTags: ["Common"],
    }),
    getConsultationPending: builder.query<ConsultationPendingResponse, void>({
      query: () => ({
        url: `/sales/overview/consultation-pending`,
        method: "POST",
      }),
      providesTags: ["Common"],
    }),
    getQuickSalesSnapshot: builder.query<QuickSalesSnapshotResponse, void>({
      query: () => ({
        url: `/sales/overview/quick-sales-snapshot`,
        method: "POST",
      }),
      providesTags: ["Common"],
    }),
    getSolidSalesOpportunity: builder.query<SalesOpportunities, void>({
      query: () => ({
        url: `/sales/overview/solid-sales-opportunities`,
        method: "POST",
      }),
      providesTags: ["Common"],
    }),
    getUnconvertedLeads: builder.query<UnconvertedLeadResponse, void>({
      query: () => ({
        url: `/sales/overview/unconverted-leads`,
        method: "POST",
      }),
      providesTags: ["Common"],
    }),
    getOcManagement: builder.query<
      OcManagementResponse,
      {
        start_date?: string;
        end_date?: string;
      }
    >({
      query: (body) => ({
        url: `/sales/overview/oc-management`,
        method: "POST",
        body,
      }),
      providesTags: ["Common"],
    }),
    getAssignedLeadPerformance: builder.query<
      AssignedLeadPerformanceResponse,
      {
        start_date?: string;
        end_date?: string;
      }
    >({
      query: (body) => ({
        url: `/sales/overview/assigned-leads-performance`,
        method: "POST",
        body,
      }),
      providesTags: ["Common"],
    }),

    getSalesBreakDownByStack: builder.query<SalesPerformanceResponse, void>({
      query: () => ({
        url: `/sales/overview/sales-breakdown-by-stack`,
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

    getSalesTrigger: builder.query<SalesTriggerResponse, void>({
      query: () => ({
        url: `/sales/overview/sales-trigger`,
        method: "POST",
      }),
      providesTags: ["Common"],
    }),
    getSalesProjection: builder.query<
      SalesProjectionResponse,
      {
        start_date?: string;
        end_date?: string;
      }
    >({
      query: (body) => ({
        url: `/sales/overview/sales-projection`,
        method: "POST",
        body,
      }),
      providesTags: ["Common"],
    }),
    getPitchedHistory: builder.query<
      PitchedHistoryResponse,
      {
        user_type?: string;
        start_date?: string;
        end_date?: string;
        filter?: "rate_shared" | "link_shared" | "to_pay" | "pay_later";
      }
    >({
      query: (body) => ({
        url: `/sales/overview/pitched-history`,
        method: "POST",
        body,
      }),
      providesTags: ["Common"],
    }),
    getPageVisitsData: builder.query<
      PageVisitsDataResponse,
      {
        page_type?: number;
        start_date?: string;
        end_date?: string;
      }
    >({
      query: (params) => ({
        url: `/sales/overview/page-visit-details`,
        method: "POST",
        params,
      }),
      providesTags: ["Common"],
    }),
    getKeySourceConversion: builder.query<
      KeySourceResponse,
      {
        start_date?: string;
        end_date?: string;
      }
    >({
      query: (body) => ({
        url: `/sales/overview/key-source-conversion`,
        method: "POST",
        body,
      }),
      providesTags: ["Common"],
    }),
    getCounsellorPerformance: builder.query<
      TopPerformerResponse,
      { sort_by?: string; order?: string }
    >({
      query: (body) => ({
        url: `/sales/overview/counsellor-performance`,
        method: "POST",
        body,
      }),
      providesTags: ["Common"],
    }),
    getCounsellorDataById: builder.query<CounsellorDataResponse, number>({
      query: (id) => ({
        url: `/sales/overview/assigned-leads-performance-by-id/${id}`,
        method: "POST",
      }),
      providesTags: ["Common"],
    }),
    getLeadRiskAndMisses: builder.query<SolidSalesResponse, void>({
      query: () => `/mentor/lead-dashboard/risk-and-misses`,
    }),
    getLeadSolidSalesOpportunity: builder.query<SolidSalesResponse, void>({
      query: () => `/mentor/lead-dashboard/solid-sales-opportunity`,
    }),
    getLeadMtdSalesRisks: builder.query<SolidSalesResponse, void>({
      query: () => `/mentor/lead-dashboard/mtd-sales-risk`,
    }),

    getSalesAlert: builder.query<SalesAlertResponse, void>({
      query: () => `/franchise/country-wise-sales/sales-alert`,
    }),

    getOcRiskAndMisses: builder.query<SolidSalesResponse, void>({
      query: () => `/mentor/oc-dashboard/risk-and-misses`,
    }),
    getOcSolidSalesOpportunity: builder.query<SolidSalesResponse, void>({
      query: () => `/mentor/oc-dashboard/solid-sales-opportunity`,
    }),
    getOcMtdSalesRisks: builder.query<SolidSalesResponse, void>({
      query: () => `/mentor/oc-dashboard/mtd-sales-risk`,
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
    getInstagramPerformance: builder.query<
      SocialMediaResponse,
      { account: string | null; filter?: string }
    >({
      query: (body) => ({
        url: `/sales/social-media/instagram-performance`,
        method: "POST",
        body,
      }),
      providesTags: ["SocialMedia"],
    }),
    getYoutubePerformance: builder.query<
      SocialMediaResponse,
      { account: string | null; filter?: string }
    >({
      query: (body) => ({
        url: `/sales/social-media/youtube-performance`,
        method: "POST",
        body,
      }),
      providesTags: ["SocialMedia"],
    }),
    getFacebookPerformance: builder.query<
      SocialMediaResponse,
      { account: string | null; filter?: string }
    >({
      query: (body) => ({
        url: `/sales/social-media/facebook-performance`,
        method: "POST",
        body,
      }),
      providesTags: ["SocialMedia"],
    }),
    getTwitterPerformance: builder.query<
      SocialMediaResponse,
      { account: string | null; filter?: string }
    >({
      query: (body) => ({
        url: `/sales/social-media/twitter-performance`,
        method: "POST",
        body,
      }),
      providesTags: ["SocialMedia"],
    }),
    getLinkedinPerformance: builder.query<
      SocialMediaResponse,
      { account: string | null; filter?: string }
    >({
      query: (body) => ({
        url: `/sales/social-media/linkedin-performance`,
        method: "POST",
        body,
      }),
      providesTags: ["SocialMedia"],
    }),
    getSocialMediaPerformance: builder.query<SocialMediaResponse, void>({
      query: (body) => ({
        url: `/sales/social-media/social-media-performance`,
        method: "POST",
        body,
      }),
      providesTags: ["SocialMedia"],
    }),
    getAllSocialMediaPerformance: builder.query<
      AllSocialMediaPerformanceResponse,
      void
    >({
      query: (body) => ({
        url: `/sales/social-media/all-social-media-performance`,
        method: "POST",
        body,
      }),
      providesTags: ["SocialMedia"],
    }),
    updateSocialMediaPerformance: builder.mutation<
      UpdateSocialMediaResponse,
      UpdateSocialMediaBody
    >({
      query: (body) => ({
        url: `/sales/social-media/update-social-media-analysis`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["SocialMedia"],
    }),

    getGenderWiseLead: builder.query({
      query: (body: BodyProps) => ({
        url: `/sales/digital-marketing/overall-gender-wise-leads`,
        method: "POST",
        body,
      }),
      providesTags: ["Common"],
    }),
    getWebsitePerformance: builder.query<WebsitePerformanceResponse, void>({
      query: () => ({
        url: `/sales/digital-marketing/website-performance`,
        method: "POST",
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
      invalidatesTags: ["Campaign"],
    }),
    updateCampaign: builder.mutation<any, UpdateCampaignBody>({
      query: (body) => ({
        url: `/sales/digital-marketing/update-campaign`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Campaign"],
    }),
    getAllCampaigns: builder.query<GetAllCampaignResponse, void>({
      query: () => `/sales/digital-marketing/get-campaigns-details`,
      providesTags: ["Campaign"],
    }),
    getCampaignDetails: builder.query<
      GetCampaignDetailsResponse,
      CampaignDetailsBody
    >({
      query: (body) => ({
        url: `/sales/digital-marketing/campaigns-details-id`,
        method: "POST",
        body,
      }),
      providesTags: ["Campaign"],
    }),
    getCampaignOverview: builder.query<
      CampaignOverviewResponse,
      { filter?: string }
    >({
      query: (body) => ({
        url: `/sales/digital-marketing/campaign-overview`,
        method: "POST",
        body,
      }),
      providesTags: ["Campaign"],
    }),
    getCounsellorCampaignPerformance: builder.query<
      CounsellorCampaignPerformanceResponse,
      void
    >({
      query: () => ({
        url: `/sales/digital-marketing/counsellor-campaign-performance`,
        method: "POST",
      }),
      providesTags: ["Campaign"],
    }),
    getUserBifurcationCount: builder.query<UserBifurcationResponse, void>({
      query: () => ({
        url: `/sales/digital-marketing/user-bifurcation-count`,
        method: "POST",
      }),
      providesTags: ["Common"],
    }),
    getLeadUserMisData: builder.query<LeadMisResponse, LeadMisBody>({
      query: (body) => ({
        url: `/sales/digital-marketing/lead-mis-data`,
        method: "POST",
        body,
      }),
      providesTags: ["Common"],
    }),

    getAppDownloadsCount: builder.query<
      AppDownlaodResponse,
      { filter?: string }
    >({
      query: (body) => ({
        url: `/sales/app-activity/app-download-counts`,
        method: "POST",
        body,
      }),
      providesTags: ["Common"],
    }),
    getAllActiveAppCount: builder.query<SocialMediaResponse, void>({
      query: () => ({
        url: `/sales/app-activity/all-active-app-count`,
        method: "POST",
      }),
      providesTags: ["Common"],
    }),
    getAllOcAppCount: builder.query<SocialMediaResponse, void>({
      query: () => ({
        url: `/sales/app-activity/all-oc-app-count`,
        method: "POST",
      }),
      providesTags: ["Common"],
    }),
    getAllLeadAppCount: builder.query<SocialMediaResponse, void>({
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
    getActiveAppCount: builder.query<AppCountResponse, BodyProps>({
      query: (body) => ({
        url: `/sales/app-activity/app-analytics-overview-active-count`,
        method: "POST",
        body,
      }),
      providesTags: ["Common"],
    }),
    getOcAppCount: builder.query<AppCountResponse, BodyProps>({
      query: (body) => ({
        url: `/sales/app-activity/app-analytics-overview-oc-count`,
        method: "POST",
        body,
      }),
      providesTags: ["Common"],
    }),
    getLeadAppCount: builder.query<AppCountResponse, BodyProps>({
      query: (body) => ({
        url: `/sales/app-activity/app-analytics-overview-lead-count`,
        method: "POST",
        body,
      }),
      providesTags: ["Common"],
    }),
    getNotificationEngagement: builder.query<
      NotificationStatsResponse,
      {
        type?: "" | "promotional" | "transactional" | "engagement";
        period: string;
        filter?: string;
      }
    >({
      query: (body) => ({
        url: `/sales/app-activity/notification-engagement`,
        method: "POST",
        body,
      }),
      providesTags: ["Common"],
    }),
    getNotificationEngagementSummary: builder.query<
      NotificationEngagementSummaryResponse,
      void
    >({
      query: () => ({
        url: `/sales/app-activity/notification-engagement-summary`,
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

    getAppDownloadData: builder.query({
      query: (body: { filter: string; device?: string }) => ({
        url: `/sales/app-activity/app-download-data`,
        method: "POST",
        body,
      }),
      providesTags: ["Common"],
    }),

    getLeadAppAnalyticsOverViewData: builder.query({
      query: (body: { filter?: string; type?: string }) => ({
        url: `/sales/app-activity/app-analytics-overview-lead-data`,
        method: "POST",
        body,
      }),
      providesTags: ["Common"],
    }),
    getActiveAppAnalyticsOverViewData: builder.query({
      query: (body: { filter?: string; type?: string }) => ({
        url: `/sales/app-activity/app-analytics-overview-active-data`,
        method: "POST",
        body,
      }),
      providesTags: ["Common"],
    }),
    getOcAppAnalyticsOverViewData: builder.query({
      query: (body: { filter?: string; type?: string }) => ({
        url: `/sales/app-activity/app-analytics-overview-oc-data`,
        method: "POST",
        body,
      }),
      providesTags: ["Common"],
    }),
  }),
});

export const {
  useGetLeadManagementQuery,
  useGetOldLeadManagementQuery,
  useGetConsultationPendingQuery,
  useGetQuickSalesSnapshotQuery,
  useGetLeadFunnelQuery,
  useGetSolidSalesOpportunityQuery,
  useGetUnconvertedLeadsQuery,
  useGetOcManagementQuery,
  useGetAssignedLeadPerformanceQuery,
  useGetSalesBreakDownByStackQuery,

  useGetSalesPerformanceQuery,
  useGetSaleByStackQuery,
  useGetSalesTriggerQuery,
  useGetSalesProjectionQuery,
  useGetPitchedHistoryQuery,
  useGetPageVisitsDataQuery,
  useGetKeySourceConversionQuery,

  useGetCounsellorPerformanceQuery,
  useGetCounsellorDataByIdQuery,
  useGetLeadRiskAndMissesQuery,
  useGetLeadSolidSalesOpportunityQuery,
  useGetLeadMtdSalesRisksQuery,
  useGetSalesAlertQuery,

  useGetOcMtdSalesRisksQuery,
  useGetOcRiskAndMissesQuery,
  useGetOcSolidSalesOpportunityQuery,

  useGetGenderWiseLeadQuery,
  useGetWebsitePerformanceQuery,
  useGetClinicalConditionDataQuery,
  useGetLeadMisDataQuery,

  useAddNewCampaignMutation,
  useUpdateCampaignMutation,
  useGetAllCampaignsQuery,
  useGetCampaignDetailsQuery,
  useGetCampaignOverviewQuery,
  useGetCounsellorCampaignPerformanceQuery,
  useGetUserBifurcationCountQuery,
  useGetLeadUserMisDataQuery,
  useLazyGetLeadMisDataQuery,

  useGetCounsellorSocialMediaPerformanceQuery,
  useGetConsolidatedTeamPerformanceQuery,
  useGetInstagramPerformanceQuery,
  useGetFacebookPerformanceQuery,
  useGetLinkedinPerformanceQuery,
  useGetTwitterPerformanceQuery,
  useGetYoutubePerformanceQuery,
  useGetSocialMediaPerformanceQuery,
  useGetAllSocialMediaPerformanceQuery,
  useUpdateSocialMediaPerformanceMutation,

  useGetAppDownloadsCountQuery,
  useGetAllOcAppCountQuery,
  useGetAllActiveAppCountQuery,
  useGetAllLeadAppCountQuery,
  useGetAppUsageOverviewQuery,
  useGetKeyEngagementMatricsQuery,
  useGetActivatedFeaturesQuery,
  useGetActiveAppCountQuery,
  useGetOcAppCountQuery,
  useGetLeadAppCountQuery,
  useGetNotificationEngagementQuery,
  useGetNotificationEngagementSummaryQuery,

  useGetClientPerformanceQuery,

  useGetGuideAndBookInteractionsQuery,
  useGetContentVisitsQuery,

  useGetAppDownloadDataQuery,
  useGetLeadAppAnalyticsOverViewDataQuery,
  useGetActiveAppAnalyticsOverViewDataQuery,
  useGetOcAppAnalyticsOverViewDataQuery,
} = dashboardApi;
