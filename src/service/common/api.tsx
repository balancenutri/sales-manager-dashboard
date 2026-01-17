import {
  type AllCitiesResponse,
  type AllCountriesResponse,
  type AllCountryByRegionResponse,
  type AllProgramResponse,
  type AllSourceResponse,
  type AllStatesResponse,
  type HealthIssueResponse,
  type RegionApiResponse,
} from "@/lib/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const apiUrl = import.meta.env.VITE_BACKEND_URL!;

export const commonAPi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
    prepareHeaders: (headers) => {
      headers.set("source", "sales");
      headers.set(
        "Accept",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      return headers;
    },
  }),
  reducerPath: "commonApi",
  tagTypes: ["Common", "SocialMedia", "Campaign", "FranchiseEnquires"],
  endpoints: (builder) => ({
    adminLogin: builder.query({
      query: (body) => {
        return {
          url: `/login-registration/login-admin`,
          method: "POST",
          body,
        };
      },
    }),

    getCountries: builder.query<AllCountriesResponse[], void>({
      query: () => `/location/all-countries`,
    }),

    getRegions: builder.query<RegionApiResponse, void>({
      query: () => `/location/get-region`,
    }),
    getCountriesByRegion: builder.query<AllCountryByRegionResponse, number[]>({
      query: (region) => `/location/get-country-region?region_id=[${region}]`,
    }),
    getStates: builder.query<AllStatesResponse[], number[]>({
      query: (state) => `/location/all-states?countryIds=[${state}]`,
    }),
    getCities: builder.query<AllCitiesResponse[], number[]>({
      query: (city) => `/location/all-cities?stateIds=[${city}]`,
    }),
    getAllHealthIssue: builder.query<HealthIssueResponse, void>({
      query: () => `/common/get-health-issues`,
    }),
    getAllProgramName: builder.query<
      AllProgramResponse[],
      { user_type?: string | null }
    >({
      query: (params) => ({
        url: `/program/program-names`,
        method: "GET",
        params,
      }),
    }),
    getAllSource: builder.query<
      AllSourceResponse,
      { source_id: number | null }
    >({
      query: (params) => ({
        url: `/common/get-all-sources`,
        method: "GET",
        params,
      }),
    }),
    getAllPrograms: builder.query<any, void>({
      query: () => `/program-session/all`,
    }),

    getMentorAvailableSlots: builder.query({
      query: ({ id, date }) => {
        return {
          url: `sales/leads/check-slot?id=${id}&date=${date}`,
          method: "POST",
        };
      },
    }),
    getPaymentGroupDetails: builder.query({
      query: (type) => `/accounts/payment-mode/get-mode-by-group?group=${type}`,
    }),
    suggestProgram: builder.mutation({
      query: (body) => {
        return {
          url: `/sales/admin-user/suggest-program`,
          method: "POST",
          body,
        };
      },
      // invalidatesTags: ["SuggestProgram"],
    }),
    updateSuggestProgram: builder.mutation({
      query: ({ body, id }) => {
        return {
          url: `/sales/leads/update-suggested-program/${id}`,
          method: "PATCH",
          body,
        };
      },
      // invalidatesTags: ["SuggestProgram"],
    }),
  }),
});

export const {
  useAdminLoginQuery,
  useGetCountriesQuery,
  useGetStatesQuery,
  useGetCitiesQuery,

  useGetRegionsQuery,
  useGetCountriesByRegionQuery,
  useGetAllHealthIssueQuery,

  useGetAllProgramNameQuery,
  useGetAllProgramsQuery,
  useGetAllSourceQuery,

  useLazyGetMentorAvailableSlotsQuery,
  useLazyGetPaymentGroupDetailsQuery,
  useSuggestProgramMutation,
  useUpdateSuggestProgramMutation,
} = commonAPi;
