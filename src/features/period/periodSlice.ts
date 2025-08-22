// src/store/slices/periodSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface PeriodState {
    period: 'today' | 'this_week' | 'mtd' | 'this_quarter';
}

const initialState: PeriodState = {
    period: "today",
};

const periodSlice = createSlice({
    name: "period",
    initialState,
    reducers: {
        setPeriod: (state, action: PayloadAction<PeriodState["period"]>) => {
            state.period = action.payload;
        },
    },
});

export const { setPeriod } = periodSlice.actions;
export const selectPeriod = (state: { period: PeriodState }) => state.period.period;
export const periodReducer = periodSlice.reducer;
