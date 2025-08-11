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


export type HealthIssue = {
    id: number;
    name: string;
}
export interface HealthIssueResponse {
    status: string;
    message: string;
    data: HealthIssue[];     // Optional
    hide_columns?: any[];      // Optional
}
export interface AllProgramResponse {
    status: string;
    message: string;
    data: {
        program_id: number;
        program_name: string;
    }[];     // Optional
    hide_columns?: any[];      // Optional
}
export interface AllSourceResponse {
    status: string;
    message: string;
    data: {
        "source_id": number;
        "source_name": string;
        "source_group": number;
    }[];     // Optional
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


export type AddCampaignBody = {
    name: string;
    type: string;
    status: string;
    start_date: string;
    end_date: string;
    ad_spend: number;
    target_users: {
        gender: string[];
        health_conditions: string[];
        age_group: string[];
        program_name: number[];
    };
};

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
    today_count?: number,
    this_month_count?: number,
    count?: number | string,
    type: string,
}

export interface AppUsageResponse {
    status: string;
    message: string;
    data: AppUsage[];
    totalCount: number;
}

export type KeyEngagement = {
    [key: string]: {
        today_count: number,
        monthly_count: number,
    }
}

export interface KeyEngagementResponse {
    status: string;
    message: string;
    data: KeyEngagement;
    totalCount: number;
}
export interface ActivatedFeaturesResponse {
    status: string;
    message: string;
    data: {
        [key: string]: number,
    };
    totalCount: number;
}

type LeadManagement = {
    total_leads: number;
    assigned_leads: number;
    unassigned_leads: number;
}
export interface LeadManagementResponse {
    status: string;
    message: string;
    data: LeadManagement;
    totalCount: number;
}

type SalesPerformance = {
    sales_closed: string;
    revenue: string;
    target: string;
    conversion_rate: string;
    revenue_target_progress: string;
    pending_target: number;
}
export interface SalesPerformanceResponse {
    status: string;
    message: string;
    data: SalesPerformance;
    totalCount: number;
}


type TopPerformer = {
    [key: string]: {
        sales: number;
        conversion_rate: number;
    }
}
export interface TopPerformerResponse {
    status: string;
    message: string;
    data: TopPerformer;
    totalCount: number;
}



