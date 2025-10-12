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
  }),
});

export const {
    useGetBalancePaymentOdDataQuery,
} = dataTableApi;
