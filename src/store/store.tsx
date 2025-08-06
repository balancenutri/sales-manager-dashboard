import { periodReducer } from "@/features/period/periodSlice";
import { commonAPi } from "@/service/common/api";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    period: periodReducer,
    [commonAPi.reducerPath]: commonAPi.reducer,
  },
  middleware: (gDM) => gDM().concat(commonAPi.middleware),
});
