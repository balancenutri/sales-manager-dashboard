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
    totalCount?: number;
    hide_columns?: any[];
}
export interface RegionApiResponse {
    status: string;
    message: string;
    data: RegionApi[];
    totalCount?: number;
    hide_columns?: any[];
}
export interface AllCitiesResponse {
    status: string;
    message: string;
    data: CityApiResponse[];
    totalCount?: number;
    hide_columns?: any[];
}


export type HealthIssue = {
    id: number;
    name: string;
}
export interface HealthIssueResponse {
    status: string;
    message: string;
    data: HealthIssue[];
    hide_columns?: any[];
}
export interface AllProgramResponse {
    status: string;
    message: string;
    data: {
        program_id: number;
        program_name: string;
    }[];
    hide_columns?: any[];
}
export interface AllSourceResponse {
    status: string;
    message: string;
    data: {
        "source_id": number;
        "source_name": string;
        "source_group": number;
    }[];
    hide_columns?: any[];
}



export type LeadMis = {
    "Name": string;
    "Email": string;
    "Gender": string | null;
    "Age Group": string | null;
    "Clinical Conditions": string;
    "Region": string;
    "Sales Status": string;
    "Stage": string;
    "User Type": string;
}

export interface LeadMisResponse {
    status: string;
    message: string;
    data: LeadMis[];
    totalCount: number;
    hide_columns: any[];
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
        program_name: string[];
    };
    digital_marketing: {
        impressions: number;
        reach: number;
        clicks: number;
        ctr: number;
        conversions: number;
    },
};
export type UpdateCampaignBody = {
    id: number;
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
        program_name: string[];
    };
    digital_marketing: {
        impressions: number;
        reach: number;
        clicks: number;
        ctr: number;
        conversions: number;
    },
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
    user_types?: string[];
    is_export?: boolean;
};


export type AppDownlaod = {
    [key: string]: {
        lead: number;
        oc: number;
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









export type NotificationSeenInApp = {
    seenPercentage: string;
    totalNotifications: number;
    seenNotifications: number;
    trend: string;
}

export type WeeklyEngagement = {
    week_number: number;
    total_notifications: number;
    seen_notifications: string;
    engagement_percentage: string;
}

export type ProgramEngagement = {
    program_category: string;
    total_notifications: number;
    seen_notifications: number;
    engagement_percentage: string;
}

export type TopNotification = {
    title: string;
    seen_count: number;
}

export type AppVersionStats = {
    updated: number;
    notUpdated: number;
    updatedPercentage: string;
    notUpdatedPercentage: string;
}

export type ClientPerformanceData = {
    notificationSeenInApp: NotificationSeenInApp;
    weeklyEngagementTrend: WeeklyEngagement[];
    engagementByProgramStack: ProgramEngagement[];
    topNotifications: TopNotification[];
    appVersionStats: AppVersionStats;
}
export interface ClientPerformanceResponse {
    status: string;
    message: string;
    data: ClientPerformanceData;
    hide_columns: string[];
}

export type ClientPerformanceBody = {
    time_range: string;
    user_status: string[];
}


export type AssignedLeadPerformance = {
    [key: string]: {
        "crm_user": string;
        "leads_assigned": number;
        "consultations": number;
        "sales": number;
        "l:c": string;
        "c:s": string;
        "l:s": string;
    }
}

export interface AssignedLeadPerformanceResponse {
    status: string;
    message: string;
    data: AssignedLeadPerformance;
    totalCount: number;
}
export interface SaleByStackResponse {
    status: string;
    message: string;
    data: {
        "program_category": string;
        "sales": number;
        "revenue": number;
    }[];
    totalCount: number;
}



export type ContentVisit = {
    [key: string]: {
        countsToday: {
            lead_count: number;
            oc_count: number;
            active_count: number;
        },
        countsThisMonth: {
            lead_count: number;
            oc_count: number;
            active_count: number;
        },
        data: string;
    }
}

export interface ContentVisitResponse {
    status: string;
    message: string;
    data: ContentVisit;
    totalCount: number;
}

export type SocailMediaType = {
    [key: string]: number;
}

export interface SocialMediaResponse {
    status: string;
    message: string;
    data: SocailMediaType;
    totalCount: number;
}

export interface UpdateSocialMediaBody {
    data: {
        total_followers: number;
        total_visitors: number;
        unique_engagement: number;
        total_reach?: number;
        impressions: number;
        engagement_rate: string;
    },
    type?: string;
}

export interface UpdateSocialMediaResponse {
    status: string;
    message: string;
}


export type AllCampaignDetails = {
    "id": number;
    "name": string;
    "type": number;
    "type_name": string;
    "status": string;
    "lead_generated": number;
    "revenue_generated": number;
}
export interface GetAllCampaignResponse {
    status: string;
    message: string;
    data: AllCampaignDetails[];
    hideColumn: [];
}


type CampaignDetails = {
    "campaignName": string;
    "campaignType": number;
    "campaignStatus": string;
    "campaignTypeName": string;
    "campaignStartDate": string;
    "campaignEndDate": string;
    "campaignAdSpend": number;
    "targetUsers": {
        "gender": string[];
        "health_conditions": string[];
        "age_group": string[];
        "program_name": string[];
    },
    "digitalMarketing": {
        "impressions": number;
        "reach": number;
        "clicks": number;
        "ctr": number;
        "conversions": number;
    },
    "leadsGenerated": number;
    "revenueGenerated": number;
}
export interface GetCampaignDetailsResponse {
    status: string;
    message: string;
    data: CampaignDetails;
    hideColumn: [];
}

export type CampaignDetailsBody = {
    campaign_id: number;
}



// Generic type for bifurcation with lead & oc
export type Bifurcation<T> = {
    lead: T;
    oc: T;
};

// Location distribution
export type LocationDistribution = {
    indian: number;
    abroad: number;
};

// Stage distribution
export type StageDistribution = {
    stage_1: number;
    stage_2: number;
    stage_3: number;
    stage_4: number;
};

// Gender distribution
export type GenderDistribution = {
    gender_male: number;
    gender_female: number;
};

// Age group distribution
export type AgeGroupDistribution = {
    age_group_below_20: number;
    age_group_21_to_30: number;
    age_group_31_to_40: number;
    age_group_41_to_50: number;
    age_group_above_50: number;
};

// Final response type
export interface UserBifurcationResponse {
    status: string;
    message: string;
    data: {
        overall_distribution: {
            lead: number;
            oc: number;
        };
        location_distribution: Bifurcation<LocationDistribution>;
        stage_distribution: Bifurcation<StageDistribution>;
        gender_distribution: Bifurcation<GenderDistribution>;
        age_group_distribution: Bifurcation<AgeGroupDistribution>;
    };
    hide_columns: string[];
}

type CampaignOverviewData = {
    active_count: number;
    total_ad_spend: number;
    total_impressions: number;
    total_reach: number;
    total_ctr: number;
    total_cac: number;
    leads_generated: number;
    revenue_generated: number;
}
export interface CampaignOverviewResponse {
    status: string;
    message: string;
    data: CampaignOverviewData[];
    hide_columns: string[];
}


export type AppVersionCount = {
    version: string;
    count: number;
};

export type NotUpdatedVersions = {
    android: AppVersionCount[];
    ios: AppVersionCount[];
};

export type ActiveAppCount = {
    with_app: number;
    without_app: number;
    not_updated: number;
    with_activity: number;
    with_inactivity: number;
    not_updated_versions: NotUpdatedVersions;
    current_versions: {
        android: string;
        ios: string;
    }
};

export interface AppCountResponse {
    status: string;
    message: string;
    data: ActiveAppCount;
    hide_columns: string[];
}