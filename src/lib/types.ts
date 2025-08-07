export type CountryApiResponse = {
    "country_name": string,
    "country_id": number,
    "phonecode": number,
    "flag": string,
    "zone_name": string
}
export type CountryRegionApiResponse = {
    "country_name": string,
    "country_id": number,
}
export type RegionApi = {
    "region_name": string,
    "region_id": number,
}


export interface AllCountriesResponse {
    status: string;
    message: string;
    data: CountryApiResponse[];
    totalCount: number;
    hide_columns: any[];
}

export interface AllCountryByRegionResponse {
    status: string;
    message: string;
    data: CountryApiResponse[];
    totalCount: number;
    hide_columns: any[];
}

export type StateApiResponse = {
    state_name: string;
    state_id: number;
    country_id: number;
};

export type CityApiResponse = {
    city_name: string;
    city_id: number;
    state_id: number;
};

export interface AllStatesResponse {
    status: string;
    message: string;
    data: StateApiResponse[];
    totalCount?: number;       // Optional: only include if your API returns it
    hide_columns?: any[];      // Optional: based on your actual API
}
export interface RegionApiResponse {
    status: string;
    message: string;
    data: RegionApi[];
    totalCount?: number;       // Optional: only include if your API returns it
    hide_columns?: any[];      // Optional: based on your actual API
}
export interface AllCitiesResponse {
    status: string;
    message: string;
    data: CityApiResponse[];
    totalCount?: number;       // Optional
    hide_columns?: any[];      // Optional
}



export type LeadMis = {
    "Name": string,
    "Gender": string | null,
    "Age Group": string | null,
    "Clinical Conditions": string,
    "Region": string,
    "Sales Status": string,
    "Stage": string
}

export interface LeadMisResponse {
    status: string;
    message: string;
    data: LeadMis[];
    totalCount: number;       // Optional
    hide_columns: any[];      // Optional
}

export type LeadMisBody = {
    genders?: string[];
    age_groups?: string[];
    health_conditions?: string[];
    regions?: number[];
    countries?: number[];
    states?: number[];
    cities?: number[];
    statuses?: number[];
    stages?: number[];
    page?: number;
    limit?: number;
    is_export?: boolean;
};


export type AppDownlaod = {
    [key: string]: {
        lead: number,
        oc: number,
    }
}

export interface AppDownlaodResponse {
    status: string;
    message: string;
    data: AppDownlaod;
    totalCount: number;
}


export type AppUsage = {
    today_count: number,
    this_month_count: number,
    type: string,
}

export interface AppUsageResponse {
    status: string;
    message: string;
    data: AppUsage[];
    totalCount: number;
}

export type KeyEngagement = {
    count: number,
    type: string,
}

export interface KeyEngagementResponse {
    status: string;
    message: string;
    data: KeyEngagement[];
    totalCount: number;
}
