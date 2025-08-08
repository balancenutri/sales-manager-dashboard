import type { ClinicalConditionResponse } from "@/components/home/digitalMarketing/ClinicalBifurcation";
import { commonAPi } from "../common/api";
import type {
  ActivatedFeaturesResponse,
  AddCampaignBody,
  AppDownlaodResponse,
  AppUsageResponse,
  KeyEngagementResponse,
  LeadMisBody,
  LeadMisResponse,
} from "@/lib/types";

type BodyProps = {
  filter: string;
};

export const dashboardApi = commonAPi.injectEndpoints({
  endpoints: (builder) => ({
    // SOCIAL MEDIA
    getCounsellorSocialMediaPerformance: builder.query({
      query: (body: BodyProps) => ({
        url: `/sales/social-media/counsellor-sm-performance`,
        method: "POST",
        body,
      }),
      providesTags: ["Common"],
    }),
    getConsolidatedTeamPerformance: builder.query({
      query: (body: BodyProps) => ({
        url: `/sales/social-media/consolidated-team-performance`,
        method: "POST",
        body,
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
  useGetGenderWiseLeadQuery,
  useGetClinicalConditionDataQuery,
  useGetLeadMisDataQuery,

  useAddNewCampaignMutation,
  useGetLeadUserMisDataQuery,
  useLazyGetLeadMisDataQuery,

  useGetCounsellorSocialMediaPerformanceQuery,
  useGetConsolidatedTeamPerformanceQuery,

  useGetAppDownloadsCountQuery,
  useGetAppUsageOverviewQuery,
  useGetKeyEngagementMatricsQuery,
  useGetActivatedFeaturesQuery,

  useGetGuideAndBookInteractionsQuery,
  useGetContentVisitsQuery,
} = dashboardApi;
