import type { ClinicalConditionResponse } from "@/components/home/digitalMarketing/ClinicalBifurcation";
import { commonAPi } from "../common/api";

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

  useGetCounsellorSocialMediaPerformanceQuery,
  useGetConsolidatedTeamPerformanceQuery,
  useGetGuideAndBookInteractionsQuery,
  useGetContentVisitsQuery,
} = dashboardApi;
