import {
  type AllCitiesResponse,
  type AllCountriesResponse,
  type AllCountryByRegionResponse,
  type AllStatesResponse,
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
  tagTypes: ["Common"],
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
    getAllHealthIssue: builder.query({
      query: () => `/common/get-health-issues`,
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
} = commonAPi;
