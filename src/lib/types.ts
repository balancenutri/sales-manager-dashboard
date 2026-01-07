export type CountryApiResponse = {
  country_name: string;
  country_id: number;
  phonecode: number;
  flag: string;
  zone_name: string;
};
export type CountryRegionApiResponse = {
  country_name: string;
  country_id: number;
};
export type RegionApi = {
  region_name: string;
  region_id: number;
};

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
};
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
    source_id: number;
    source_name: string;
    source_group: number;
  }[];
  hide_columns?: any[];
}

export type LeadMis = {
  Name: string;
  Email: string;
  Gender: string | null;
  "Age Group": string | null;
  "Clinical Conditions": string;
  Region: string;
  "Sales Status": string;
  Stage: string;
  "User Type": string;
  "Phone Code": string;
  "Phone Number": string;
};

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
    frequency: number;
  };
  added_by: string;
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
  };
};

export type AdPerformanceBody = {
  ad_name: string;
  added_by: string;
  id?: number;

  funnel: string;
  objective: string;

  reporting_start: string;
  reporting_end: string;

  amount_spent?: number;
  impressions?: number;
  reach?: number;
  frequency?: number;

  link_clicks?: number;
  ctr?: number;
  cpc?: number;

  results?: number;
  cost_per_result?: number;
  sales?: number;
  revenue?: number;
  cpa?: number;
  aov?: number;
};

export type AdPerformanceData = {
  ad_name: string;
  added_by: string;
  id: number;

  funnel: string;
  objective: string;
  status: string;

  reporting_start: string;
  reporting_end: string;

  amount_spent?: number;
  impressions?: number;
  reach?: number;
  frequency?: number;

  link_clicks?: number;
  ctr?: number;
  cpc?: number;
  cpm?: number;

  results?: number;
  cost_per_result?: number;
  sales?: number;
  revenue?: number;
  cpa?: number;
  aov?: number;
};

export interface UpdateAdPerformanceArgs {
  id: number | string;
  body: AdPerformanceBody;
}

export interface AdPerformanceResponse {
  status: string;
  message: string;
  data: AdPerformanceData[];
  table_meta_data: {
    funnels: string[];
  };
  totalCount: number;
  hide_columns: any[];
}

type AdPerformanceOverviewData = {
  active_count: number;
  inactive_count: number;
  total_count: number;
  total_conversion: number;
  total_ad_spend: number;
  total_impressions: number;
  total_reach: number;
  total_ctr: number;
  total_cac: number;
  leads_generated: number;
  revenue_generated: number;
};
export interface AdPerformanceOverviewResponse {
  status: string;
  message: string;
  data: AdPerformanceOverviewData[];
  table_meta_data: {
    funnels: string[];
  };
  hide_columns: string[];
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
  user_types?: string[];
  is_export?: boolean;
};

export type AppDownlaod = {
  [key: string]: {
    lead: number;
    oc: number;
  };
};

export interface AppDownlaodResponse {
  status: string;
  message: string;
  data: AppDownlaod;
  totalCount: number;
}

export type AppUsage = {
  today_count?: number;
  this_month_count?: number;
  count?: number | string;
  type: string;
};

export interface AppUsageResponse {
  status: string;
  message: string;
  data: AppUsage[];
  totalCount: number;
}
export type AppCrash = {
  id: number;
  crash_free_users: string;
  crash_free_sessions: string;
  yesterday: string;
  last_seven_days: string;
  mtd: string;
};
export interface AppCralysticsResponse {
  status: string;
  message: string;
  data: [AppCrash];
  totalCount: number;
}

export type KeyEngagement = {
  [key: string]: {
    today_count: {
      active: number;
      oc: number;
      lead: number;
      total: number;
    };
    monthly_count: {
      active: number;
      oc: number;
      lead: number;
      total: number;
    };
  };
};

export interface KeyEngagementResponse {
  status: string;
  message: string;
  data: KeyEngagement;
  totalCount: number;
}
export interface ActivatedFeaturesResponse {
  status: string;
  message: string;
  data: KeyEngagement;
  totalCount: number;
}

type LeadManagement = {
  total_leads: string;
  unassigned: {
    total_unassigned_leads: string;
    total_target_market_unassigned_leads: string;
    total_non_target_market_unassigned_leads: string;
  };
  assigned: {
    total_assigned_leads: string;
    total_assigned_to_mentors: string;
    total_assigned_to_counsellors: string;
  };
  consultation_done: {
    mentor_consultations: string;
    counsellor_consultations: string;
    total_consultations: string;
  };
  sales: string;
};
export interface LeadManagementResponse {
  status: string;
  message: string;
  data: LeadManagement;
  totalCount: number;
}
export interface UnconvertedLeadResponse {
  status: string;
  message: string;
  data: {
    hot: number;
    warm: number;
    cold: number;
  };
  totalCount: number;
}
export interface ConsultationPendingResponse {
  status: string;
  message: string;
  data: {
    to_engage: number;
    connected: number;
  };
  totalCount: number;
}
export interface LeadFunnelResponse {
  status: string;
  message: string;
  data: {
    monthly: {
      counsellor_lead_target_units: number;
      counsellor_lead_assigned_units: number;
      mentor_lead_target_units: number;
      mentor_lead_assigned_units: number;
      counsellor_total_target: number;
      mentor_total_target: number;
      counsellor_total_sales: number;
      counsellor_total_sales_units: number;
      mentor_total_sales: number;
      mentor_total_sales_units: number;
      counsellor_total_consultations: number;
      mentor_total_consultations: number;
      counsellor_lead_to_sales_conversion_rate: number;
      mentor_lead_to_sales_conversion_rate: number | null;
      counsellor_consultation_to_sales_conversion_rate: number;
      mentor_consultation_to_sales_conversion_rate: number | null;
      total_lead_to_sales_conversion_rate: number;
      total_consultation_to_sales_conversion_rate: number;
    };
    last_month: {
      counsellor_lead_target_units: number;
      counsellor_lead_assigned_units: number;
      mentor_lead_target_units: number;
      mentor_lead_assigned_units: number;
      counsellor_total_target: number;
      mentor_total_target: number;
      counsellor_total_sales: number;
      counsellor_total_sales_units: number;
      mentor_total_sales: number;
      mentor_total_sales_units: number;
      counsellor_total_consultations: number;
      mentor_total_consultations: number;
      counsellor_lead_to_sales_conversion_rate: number;
      mentor_lead_to_sales_conversion_rate: number | null;
      counsellor_consultation_to_sales_conversion_rate: number;
      mentor_consultation_to_sales_conversion_rate: number | null;
      total_lead_to_sales_conversion_rate: number;
      total_consultation_to_sales_conversion_rate: number;
    };
    today: {
      counsellor_todays_lead_target_units: number;
      counsellor_todays_lead_assigned_units: number;
      mentor_todays_lead_target_units: number;
      mentor_todays_lead_assigned_units: number;
      counsellor_todays_sales_target: number;
      mentor_todays_sales_target: number;
      counsellor_todays_sales: number;
      mentor_todays_sales: number;
      counsellor_todays_consultations: number;
      mentor_todays_consultations: number;
    };
    yesterday: {
      counsellor_yesterdays_lead_target_units: number;
      counsellor_yesterdays_lead_assigned_units: number;
      mentor_yesterdays_lead_target_units: number;
      mentor_yesterdays_lead_assigned_units: number;
      counsellor_yesterdays_sales_target: number;
      mentor_yesterdays_sales_target: number;
      counsellor_yesterdays_sales: number;
      mentor_yesterdays_sales: number;
      total_yesterdays_sales: number;
      counsellor_yesterdays_consultations: number;
      mentor_yesterdays_consultations: number;
    };
  };
  hide_columns: string[];
}

export interface QuickSalesSnapshotResponse {
  status: string;
  message: string;
  data: {
    monthly: {
      fl: number;
      ol: number;
      consultations: number;
      sales: number;
    };
    yesterday: {
      fl: number;
      ol: number;
      consultations: number;
      sales: number;
    };
  };
  totalCount: number;
}

export type SalesOpportunities = {
  status: string;
  message: string;
  data: {
    checkout_visit: Record<string, number>;
    "payment_details_shared(to_pay)": Record<string, number>;
    "payment_details_shared(pay_later)": Record<string, number>;
    leads_with_double_discount: Record<string, number>;
    referrals: Record<string, number>;
    leads_with_free_course: Record<string, number>;
    leads_with_GO_pro: Record<string, number>;
    good_weight_loss: Record<string, number>;
    milestone: Record<string, number>;
    good_consultation_feedback: Record<string, number>;
  };
  hide_columns: string[];
};

export interface OcManagementResponse {
  status: string;
  message: string;
  data: {
    oc: string;
    suggested_programs: string;
    calls: string;
    orders: string;
  };
  totalCount: number;
}

type SalesPerformance = {
  sales_closed: {
    total: string;
    by_counsellor: string;
    by_mentor: string;
  };
  revenue: {
    total: string;
    by_counsellor: string;
    by_mentor: string;
  };
  target: string;
  conversion_rate: string;
  revenue_target_progress: string;
  pending_target: number;
};
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
    avg_per_unit: number;
    id: number;
    crm_user: string;
  };
};
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
};

export type WeeklyEngagement = {
  week_number: number;
  total_notifications: number;
  seen_notifications: string;
  engagement_percentage: string;
};

export type ProgramEngagement = {
  program_category: string;
  total_notifications: number;
  seen_notifications: number;
  engagement_percentage: string;
};

export type TopNotification = {
  title: string;
  seen_count: number;
};

export type AppVersionStats = {
  updated: number;
  notUpdated: number;
  updatedPercentage: string;
  notUpdatedPercentage: string;
};

export type ClientPerformanceData = {
  notificationSeenInApp: NotificationSeenInApp;
  weeklyEngagementTrend: WeeklyEngagement[];
  engagementByProgramStack: ProgramEngagement[];
  topNotifications: TopNotification[];
  appVersionStats: AppVersionStats;
};
export interface ClientPerformanceResponse {
  status: string;
  message: string;
  data: ClientPerformanceData;
  hide_columns: string[];
}

export type ClientPerformanceBody = {
  time_range: string;
  user_status: string[];
};

export type AssignedLeadPerformance = {
  [key: string]: {
    crm_user: string;
    leads_assigned: number;
    consultations: number;
    sales: number;
    "l:c": string;
    "c:s": string;
    "l:s": string;
  };
};
export type AssignedLeadPerformanceAll = {
  admin_user_id: number;
  crm_user: string;
  role_id: number;
  leads_assigned: number;
  consultations: number;
  sales: number;
  "l:c": string;
  "c:s": string;
  "l:s": string;
  sales_amount: number;
  revenue: number;
  suggested_programs: number;
  suggested_amount: number;
  best_source_performance: string | null;
  lead_assigned_sales_status_count: {
    to_engage: number;
    hot: number;
    warm: number;
    cold: number;
  };
  avg_conversion_time_days: string;
  avg_performance: {
    "l:c": string;
    "c:s": string;
    "l:s": string;
  };
};

export interface AssignedLeadPerformanceResponse {
  status: string;
  message: string;
  data: {
    counsellor_data: AssignedLeadPerformance;
    mentor_data: AssignedLeadPerformance;
  };
  totalCount: number;
}
export interface AssignedLeadPerformanceAllResponse {
  status: string;
  message: string;
  data: AssignedLeadPerformanceAll[];
  table_meta_data: {
    benchmarkData: {
      "l:c": number;
      "c:s": number;
      "l:s": number;
    };
    avgPerformance: {
      "l:c": number;
      "c:s": number;
      "l:s": number;
    };
  };
}

interface DailyReport {
  note: string;
  added_date: string;
  lead_assigned: number;
  follow_up_done_today: number;
  consultation_done: number;
  engagement_today: number;
  sale_today: {
    unit: number;
    amount: number;
  };
}
export interface CounsellorDailyPerformanceByIdResponse {
  status: string;
  message: string;
  data: DailyReport[];
  totalCount: number;
}
export interface SaleByStackResponse {
  status: string;
  message: string;
  data: {
    program_category: string;
    sales: number;
    revenue: number;
  }[];
  totalCount: number;
}

export type ContentVisit = {
  [key: string]: {
    countsToday: {
      lead_count: number;
      oc_count: number;
      active_count: number;
    };
    countsThisMonth: {
      lead_count: number;
      oc_count: number;
      active_count: number;
    };
    data: string;
  };
};

export interface ContentVisitResponse {
  status: string;
  message: string;
  data: ContentVisit;
  totalCount: number;
}

export type SocailMediaType = {
  impressions: number;
  total_reach: number;
  total_visitors: number;
  engagement_rate: string;
  total_followers: number;
  unique_engagement: number;
  lead_generated: number;
  lead_converted: number;
  revenue_generated: number;
  total_subscriber?: number;
  subscriber_gain?: number;
  subscriber_loss?: number;
  total_views?: number;
  like: number;
  comment: number;
  share: number;
};

export interface SocialMediaResponse {
  status: string;
  message: string;
  data: SocailMediaType;
  totalCount: number;
}

export interface UpdateSocialMediaBody {
  data: {
    total_followers?: number;
    total_visitors?: number;
    total_subscriber?: number;
    subscriber_gain?: number;
    subscriber_loss?: number;
    unique_engagement: number;
    total_reach?: number;
    impressions: number;
    engagement_rate: string;
    like: number;
    comment: number;
    share: number;
  };
  type?: string;
  account?: string;
}

export interface UpdateSocialMediaResponse {
  status: string;
  message: string;
}

export type AllCampaignDetails = {
  id: number;
  name: string;
  type: number;
  type_name: string;
  status: string;
  lead_generated: number;
  revenue_generated: number;
};
export interface GetAllCampaignResponse {
  status: string;
  message: string;
  data: AllCampaignDetails[];
  hideColumn: [];
}

type CampaignDetails = {
  campaignName: string;
  campaignType: number;
  campaignStatus: string;
  campaignTypeName: string;
  campaignStartDate: string;
  campaignEndDate: string;
  campaignAdSpend: number;
  targetUsers: {
    gender: string[];
    health_conditions: string[];
    age_group: string[];
    program_name: string[];
  };
  digitalMarketing: {
    impressions: number;
    reach: number;
    clicks: number;
    ctr: number;
    conversions: number;
  };
  leadsGenerated: number;
  revenueGenerated: number;
  addedBy: string | null;
};
export interface GetCampaignDetailsResponse {
  status: string;
  message: string;
  data: CampaignDetails;
  hideColumn: [];
}

export interface AdPerformanceFilterPayload {
  start_date?: string | null;
  end_date?: string | null;
  funnel?: string;
  objective?: string;
  ad_name?: string;
}

export type CampaignDetailsBody = {
  campaign_id: number;
};

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
  stage_0: number;
};

// Gender distribution
export type GenderDistribution = {
  gender_male: number;
  gender_female: number;
  gender_no_gender: number;
};

// Age group distribution
export type AgeGroupDistribution = {
  age_group_below_20: number;
  age_group_21_to_30: number;
  age_group_31_to_40: number;
  age_group_41_to_50: number;
  age_group_above_50: number;
  age_group_no_age_group: number;
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
  inactive_count: number;
  total_count: number;
  total_conversion: number;
  total_ad_spend: number;
  total_impressions: number;
  total_reach: number;
  total_ctr: number;
  total_cac: number;
  leads_generated: number;
  revenue_generated: number;
};
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
  not_updated: number;
  on_new_app_not_updated: number;
  on_old_app_not_updated: number;
  with_app: number;
  with_app_active_user: number;
  with_app_inactive_user: number;
  without_app: number;
};

export interface AppCountResponse {
  status: string;
  message: string;
  data: ActiveAppCount;
  hide_columns: string[];
}

export type SocialMediaType =
  | "youtube"
  | "instagram"
  | "facebook"
  | "twitter"
  | "linkedin"
  | null;

// Define valid keys as DialogType excluding null
export type ValidSocialMediaKey = Exclude<SocialMediaType, null>;

type AllSocialMedia = {
  [key in ValidSocialMediaKey]: {
    lead_generated: number;
    revenue_generated: number;
  };
};

export interface AllSocialMediaPerformanceResponse {
  status: string;
  message: string;
  data: AllSocialMedia;
  hide_columns: string[];
}
type CounsellorKey = {
  [key: string]: {
    social_leads_assigned: number;
    social_consultations: number;
    social_sales: number;
  };
};
export interface CounsellorCampaignPerformanceResponse {
  status: string;
  message: string;
  data: CounsellorKey;
  hide_columns: string[];
}

export type NotificationEntry = {
  title: string;
  seen_count: number;
  total_count: number;
  open_trend: string;
};

export type NotificationEngagementData = {
  total_notifications: {
    total_sent: number;
    total_seen: number;
    open_trend: string;
  };
  top_notifications: NotificationEntry[];
  less_performing_notifications: NotificationEntry[];
};

export interface NotificationStatsResponse {
  status: string;
  message: string;
  data: NotificationEngagementData;
  hide_columns: string[];
}

export type WebsitePerformanceKey =
  | "active_users"
  | "new_users"
  | "avg_session_duration"
  | "bounce_rate"
  | "impressions"
  | "lead_conversion"
  | "leads_from_website";

export type WebsitePerformanceType = {
  [key in WebsitePerformanceKey]: string;
};

export interface WebsitePerformanceResponse {
  status: string;
  message: string;
  data: WebsitePerformanceType;
  hide_columns: string[];
}
export interface SolidSalesResponse {
  status: string;
  message: string;
  data: { [key: string]: number };
  hideColumn: [];
}

export interface DailyLeadData {
  lead_date: string;
  source_name: string;
  counsellor_name: string;
  total_leads: number;
}
export interface DailySourceLeadsResponse {
  status: string;
  message: string;
  data: DailyLeadData[];
  hideColumn: [];
}
export interface SalesAlertResponse {
  status: string;
  message: string;
  data: {
    leads_with_e_kit_pro: number;
    wallet_expiring_tomorrow: number;
    HOT_lead_with_negative_feedback: number;
    HOT_followups_pending: number;
    good_weight_loss: number;
    milestone: number;
  };
  hideColumn: [];
}
export type TriggerType = {
  hot_triggers: {
    total: number;
    "3_days": number;
    "5_days": number;
    "7_days": number;
  };
  warm_triggers: {
    total: number;
    "10_days": number;
    "12_days": number;
    "15_days": number;
  };
  to_engage: number;
  downgrade_counts: {
    hot_to_warm: number;
    hot_to_cold: number;
    warm_to_cold: number;
  };
};

export interface SalesTriggerResponse {
  status: string;
  message: string;
  data: TriggerType;
  hide_columns: string[];
}

export type ProjectionKey =
  | "total_pitched"
  | "rate_shared"
  | "link_shared"
  | "total_to_pay"
  | "pay_later"
  | "today_to_pay"
  | "tomorrow_to_pay";

export type ProjectionType = {
  [key in ProjectionKey]: {
    units: number;
    amount: number;
  };
} & {
  page_visits: {
    total_page_visits: number;
    total_checkout_visits: number;
    total_checkout_amount: number;
  };
};

export interface SalesProjectionResponse {
  status: string;
  message: string;
  data: ProjectionType;
  hide_columns: string[];
}
export type KeySourceKey =
  | "social_media"
  | "direct"
  | "iwd"
  | "campaigns"
  | "referrals";

export type KeySourceType = {
  [key in KeySourceKey]: {
    leads: number;
    converted: number;
    revenue: number;
    conversion: string;
  };
};

export interface KeySourceResponse {
  status: string;
  message: string;
  data: KeySourceType;
  hide_columns: string[];
}

export type CounsellorType = {
  crm_user: string;
  role_id: number;
  leads_assigned: number;
  consultations: number;
  sales: number;
  "l:c": string;
  "c:s": string;
  "l:s": string;
  sales_amount: string;
  revenue: string;
  suggested_programs: number;
  suggested_amount: number;
  best_source_performance: string;
};

export interface CounsellorDataResponse {
  status: string;
  message: string;
  data: CounsellorType;
  hide_columns: string[];
}

export type PitchedType = {
  total_amount: number;
  basic_stack: number;
  special_stack: number;
  users: {
    name: string;
    user_id: 28;
    program_name: string;
    program_category: string;
    suggested_amount: string;
    mrp: number;
    suggested_by: string;
    designation: string;
    added_date: string;
    payment_status: number;
    program_duration: string;
    email_id: string;
  }[];
};
export interface PitchedHistoryResponse {
  status: string;
  message: string;
  data: PitchedType;
  hide_columns: string[];
}

export interface PageVisitsDataResponse {
  status: string;
  message: string;
  data: {
    name: string;
    user_id: number;
    program_name: string;
    program_category: string;
    mrp?: number;
    program_duration?: number;
    email_id: string;
    page_type: string;
  }[];
  hide_columns: string[];
}

export interface NotificationCategory {
  total_sent: number;
  total_seen: number;
  open_trend: string;
}
export interface NotificationDayData {
  promotional: NotificationCategory;
  engagement: NotificationCategory;
  transactional: NotificationCategory;
}

export interface NotificationEngagementSummaryData {
  today: NotificationDayData;
  yesterday: NotificationDayData;
}

export interface NotificationEngagementSummaryResponse {
  status: "success" | "error";
  message: string;
  data: NotificationEngagementSummaryData;
  hide_columns: string[];
}
