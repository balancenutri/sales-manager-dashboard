export const mockData = {
  overview: {
    totalLeads: 1247,
    assignedLeads: 892,
    unassignedLeads: 355,
    totalSales: 89,
    targetSales: 120,
    conversionRate: 7.1,
    revenue: 445000,
    targetRevenue: 600000,
    activeCounsellors: 12,
    avgPitchPerDay: 8.5,
    totalSalesOpportunity: 0, // Placeholder, will be calculated below
    benchmarkConversionRate: 12, // Example benchmark conversion rate
  },
  // Add team performance data
  teams: [
    {
      id: 1,
      name: "Team Alpha",
      mentor: "Rajesh Kumar",
      mentorAvatar: "/placeholder.svg?height=32&width=32",
      totalLeadsAssigned: 298,
      totalSalesUnits: 32,
      targetSalesUnits: 45,
      counsellors: ["Priya Sharma", "Rahul Gupta", "Sneha Patel"],
    },
    {
      id: 2,
      name: "Team Beta",
      mentor: "Sunita Verma",
      mentorAvatar: "/placeholder.svg?height=32&width=32",
      totalLeadsAssigned: 267,
      totalSalesUnits: 28,
      targetSalesUnits: 38,
      counsellors: ["Amit Kumar", "Kavya Reddy"],
    },
    {
      id: 3,
      name: "Team Gamma",
      mentor: "Vikram Singh",
      mentorAvatar: "/placeholder.svg?height=32&width=32",
      totalLeadsAssigned: 327,
      totalSalesUnits: 29,
      targetSalesUnits: 37,
      counsellors: ["Arjun Mehta", "Pooja Agarwal", "Ravi Sharma", "Meera Joshi"],
    },
  ],
  leadsSources: {
    unassigned: {
      website: 142,
      socialMedia: 89,
      referral: 67,
      googleAds: 57,
    },
  },
  ocSources: {
    unassigned: {
      checkoutVisit: 142,
      pageVisit: 89,
      appDownload: 67,
      appChat: 57,
    },
  },
  salesTypes: {
    basicStack: 34,
    specialStack: 28,
    platinumStack: 27,
  },
  // Add new counsellor revenue breakdown data
  counsellorRevenue: [
    {
      id: 1,
      name: "Priya Sharma",
      avatar: "/placeholder.svg?height=40&width=40",
      basicStack: { units: 6, amount: 18000 },
      specialStack: { units: 7, amount: 28000 },
      platinumStack: { units: 5, amount: 25000 },
      target: { units: 20, amount: 80000 },
    },
    {
      id: 2,
      name: "Rahul Gupta",
      avatar: "/placeholder.svg?height=40&width=40",
      basicStack: { units: 4, amount: 12000 },
      specialStack: { units: 5, amount: 20000 },
      platinumStack: { units: 3, amount: 15000 },
      target: { units: 15, amount: 60000 },
    },
    {
      id: 3,
      name: "Sneha Patel",
      avatar: "/placeholder.svg?height=40&width=40",
      basicStack: { units: 5, amount: 15000 },
      specialStack: { units: 6, amount: 24000 },
      platinumStack: { units: 4, amount: 20000 },
      target: { units: 18, amount: 70000 },
    },
    {
      id: 4,
      name: "Amit Kumar",
      avatar: "/placeholder.svg?height=40&width=40",
      basicStack: { units: 3, amount: 9000 },
      specialStack: { units: 4, amount: 16000 },
      platinumStack: { units: 2, amount: 10000 },
      target: { units: 12, amount: 45000 },
    },
    {
      id: 5,
      name: "Kavya Reddy",
      avatar: "/placeholder.svg?height=40&width=40",
      basicStack: { units: 4, amount: 12000 },
      specialStack: { units: 4, amount: 16000 },
      platinumStack: { units: 3, amount: 15000 },
      target: { units: 14, amount: 55000 },
    },
    {
      id: 6,
      name: "Arjun Mehta",
      avatar: "/placeholder.svg?height=40&width=40",
      basicStack: { units: 5, amount: 15000 },
      specialStack: { units: 5, amount: 20000 },
      platinumStack: { units: 3, amount: 15000 },
      target: { units: 16, amount: 65000 },
    },
  ],
  counsellors: [
    {
      id: 1,
      name: "Priya Sharma",
      avatar: "/placeholder.svg?height=40&width=40",
      leadsAssigned: 156,
      consultations: 89,
      salesClosed: 18,
      conversionRate: 11.5,
      revenue: 72000,
      avgPitchPerDay: 9.2,
      status: "active",
      lastActive: "2 hours ago",
      paymentDetailsShared: { count: 15, amount: 75000 },
      bestConversionSource: "Website",
      snapshot: {
        leadsByStatusDetail: {
          toPay: 5,
          payLater: 3,
          negotiatingPrice: 2,
        },
        leadsByEngagementDetail: {
          rateShared: 8,
          buildFaith: 4,
          notForSpecialStack: 1,
        },
        leadsByOutcomeDetail: {
          discarded: 7,
          notAffordable: 3,
          unresponsive: 5,
        },
        missesAndRisks: {
          highPotentialCold: 2,
          hotLeadsFUNotSet: 1,
          leadsStillToEngage: 3,
          toPayOD: 1, // New
          payLaterOD: 0, // New
          paymentDetailsExpired: 1, // New
        },
        downgradedLeads: {
          hotToWarm: 2,
          warmToCold: 1,
          hotToCold: 0,
        },
        triggersCrossed: {
          hotTrigger: 10,
          warmTrigger: 15,
        },
        paymentDetailsExpiring: {
          // New
          today: { count: 1, amount: 5000 },
          tomorrow: { count: 2, amount: 10000 },
          dayAfterTomorrow: { count: 0, amount: 0 },
        },
      },
    },
    {
      id: 2,
      name: "Rahul Gupta",
      avatar: "/placeholder.svg?height=40&width=40",
      leadsAssigned: 142,
      consultations: 78,
      salesClosed: 12,
      conversionRate: 8.5,
      revenue: 48000,
      avgPitchPerDay: 7.8,
      status: "active",
      lastActive: "1 hour ago",
      paymentDetailsShared: { count: 10, amount: 50000 },
      bestConversionSource: "Social Media",
      snapshot: {
        leadsByStatusDetail: {
          toPay: 3,
          payLater: 2,
          negotiatingPrice: 1,
        },
        leadsByEngagementDetail: {
          rateShared: 6,
          buildFaith: 3,
          notForSpecialStack: 0,
        },
        leadsByOutcomeDetail: {
          discarded: 5,
          notAffordable: 2,
          unresponsive: 4,
        },
        missesAndRisks: {
          highPotentialCold: 1,
          hotLeadsFUNotSet: 0,
          leadsStillToEngage: 2,
          toPayOD: 0, // New
          payLaterOD: 1, // New
          paymentDetailsExpired: 0, // New
        },
        downgradedLeads: {
          hotToWarm: 1,
          warmToCold: 0,
          hotToCold: 0,
        },
        triggersCrossed: {
          hotTrigger: 8,
          warmTrigger: 12,
        },
        paymentDetailsExpiring: {
          // New
          today: { count: 0, amount: 0 },
          tomorrow: { count: 1, amount: 3000 },
          dayAfterTomorrow: { count: 1, amount: 7000 },
        },
      },
    },
    {
      id: 3,
      name: "Sneha Patel",
      avatar: "/placeholder.svg?height=40&width=40",
      leadsAssigned: 134,
      consultations: 82,
      salesClosed: 15,
      conversionRate: 11.2,
      revenue: 60000,
      avgPitchPerDay: 8.9,
      status: "active",
      lastActive: "30 minutes ago",
      paymentDetailsShared: { count: 13, amount: 65000 },
      bestConversionSource: "Referral",
      snapshot: {
        leadsByStatusDetail: {
          toPay: 4,
          payLater: 2,
          negotiatingPrice: 3,
        },
        leadsByEngagementDetail: {
          rateShared: 7,
          buildFaith: 5,
          notForSpecialStack: 2,
        },
        leadsByOutcomeDetail: {
          discarded: 6,
          notAffordable: 1,
          unresponsive: 3,
        },
        missesAndRisks: {
          highPotentialCold: 0,
          hotLeadsFUNotSet: 2,
          leadsStillToEngage: 1,
          toPayOD: 0, // New
          payLaterOD: 0, // New
          paymentDetailsExpired: 2, // New
        },
        downgradedLeads: {
          hotToWarm: 0,
          warmToCold: 2,
          hotToCold: 1,
        },
        triggersCrossed: {
          hotTrigger: 12,
          warmTrigger: 10,
        },
        paymentDetailsExpiring: {
          // New
          today: { count: 0, amount: 0 },
          tomorrow: { count: 0, amount: 0 },
          dayAfterTomorrow: { count: 3, amount: 15000 },
        },
      },
    },
    {
      id: 4,
      name: "Amit Kumar",
      avatar: "/placeholder.svg?height=40&width=40",
      leadsAssigned: 128,
      consultations: 65,
      salesClosed: 9,
      conversionRate: 7.0,
      revenue: 36000,
      avgPitchPerDay: 6.5,
      status: "active",
      lastActive: "1 day ago",
      paymentDetailsShared: { count: 8, amount: 40000 },
      bestConversionSource: "Google Ads",
      snapshot: {
        leadsByStatusDetail: {
          toPay: 2,
          payLater: 1,
          negotiatingPrice: 0,
        },
        leadsByEngagementDetail: {
          rateShared: 5,
          buildFaith: 2,
          notForSpecialStack: 1,
        },
        leadsByOutcomeDetail: {
          discarded: 8,
          notAffordable: 4,
          unresponsive: 6,
        },
        missesAndRisks: {
          highPotentialCold: 3,
          hotLeadsFUNotSet: 1,
          leadsStillToEngage: 4,
          toPayOD: 2, // New
          payLaterOD: 0, // New
          paymentDetailsExpired: 0, // New
        },
        downgradedLeads: {
          hotToWarm: 1,
          warmToCold: 1,
          hotToCold: 0,
        },
        triggersCrossed: {
          hotTrigger: 7,
          warmTrigger: 9,
        },
        paymentDetailsExpiring: {
          // New
          today: { count: 1, amount: 4000 },
          tomorrow: { count: 0, amount: 0 },
          dayAfterTomorrow: { count: 1, amount: 6000 },
        },
      },
    },
    {
      id: 5,
      name: "Kavya Reddy",
      avatar: "/placeholder.svg?height=40&width=40",
      leadsAssigned: 118,
      consultations: 72,
      salesClosed: 11,
      conversionRate: 9.3,
      revenue: 44000,
      avgPitchPerDay: 7.2,
      status: "active",
      lastActive: "3 hours ago",
      paymentDetailsShared: { count: 9, amount: 45000 },
      bestConversionSource: "Website",
      snapshot: {
        leadsByStatusDetail: {
          toPay: 3,
          payLater: 2,
          negotiatingPrice: 1,
        },
        leadsByEngagementDetail: {
          rateShared: 6,
          buildFaith: 3,
          notForSpecialStack: 0,
        },
        leadsByOutcomeDetail: {
          discarded: 4,
          notAffordable: 2,
          unresponsive: 3,
        },
        missesAndRisks: {
          highPotentialCold: 1,
          hotLeadsFUNotSet: 0,
          leadsStillToEngage: 2,
          toPayOD: 0, // New
          payLaterOD: 2, // New
          paymentDetailsExpired: 0, // New
        },
        downgradedLeads: {
          hotToWarm: 0,
          warmToCold: 1,
          hotToCold: 0,
        },
        triggersCrossed: {
          hotTrigger: 9,
          warmTrigger: 11,
        },
        paymentDetailsExpiring: {
          // New
          today: { count: 0, amount: 0 },
          tomorrow: { count: 0, amount: 0 },
          dayAfterTomorrow: { count: 2, amount: 8000 },
        },
      },
    },
    {
      id: 6,
      name: "Arjun Mehta",
      avatar: "/placeholder.svg?height=40&width=40",
      leadsAssigned: 114,
      consultations: 68,
      salesClosed: 13,
      conversionRate: 11.4,
      revenue: 52000,
      avgPitchPerDay: 8.1,
      status: "active",
      lastActive: "1 hour ago",
      paymentDetailsShared: { count: 11, amount: 55000 },
      bestConversionSource: "Referral",
      snapshot: {
        leadsByStatusDetail: {
          toPay: 4,
          payLater: 3,
          negotiatingPrice: 2,
        },
        leadsByEngagementDetail: {
          rateShared: 7,
          buildFaith: 4,
          notForSpecialStack: 1,
        },
        leadsByOutcomeDetail: {
          discarded: 5,
          notAffordable: 2,
          unresponsive: 4,
        },
        missesAndRisks: {
          highPotentialCold: 0,
          hotLeadsFUNotSet: 1,
          leadsStillToEngage: 1,
          toPayOD: 1, // New
          payLaterOD: 1, // New
          paymentDetailsExpired: 0, // New
        },
        downgradedLeads: {
          hotToWarm: 1,
          warmToCold: 0,
          hotToCold: 0,
        },
        triggersCrossed: {
          hotTrigger: 11,
          warmTrigger: 13,
        },
        paymentDetailsExpiring: {
          // New
          today: { count: 2, amount: 10000 },
          tomorrow: { count: 1, amount: 5000 },
          dayAfterTomorrow: { count: 0, amount: 0 },
        },
      },
    },
  ],
  recentLeads: [
    {
      id: 1,
      name: "Anita Desai",
      phone: "+91 98765 43210",
      source: "Website",
      assignedTo: "Priya Sharma",
      status: "contacted",
      createdAt: "2024-01-15T10:30:00Z",
    },
    {
      id: 2,
      name: "Vikram Singh",
      phone: "+91 87654 32109",
      source: "Social Media",
      assignedTo: "Rahul Gupta",
      status: "new",
      createdAt: "2024-01-15T09:15:00Z",
    },
    {
      id: 3,
      name: "Meera Joshi",
      phone: "+91 76543 21098",
      source: "Referral",
      assignedTo: "Sneha Patel",
      status: "follow-up",
      createdAt: "2024-01-15T08:45:00Z",
    },
  ],
  // New data for Analytics section
  leadSourceAnalytics: [
    { source: "Website", totalLeads: 500, convertedLeads: 50, unitsSold: 60, revenue: 300000, conversionRate: 10.0 },
    {
      source: "Social Media",
      totalLeads: 300,
      convertedLeads: 25,
      unitsSold: 30,
      revenue: 120000,
      conversionRate: 8.3,
    },
    { source: "Referral", totalLeads: 200, convertedLeads: 20, unitsSold: 25, revenue: 100000, conversionRate: 10.0 },
    { source: "Google Ads", totalLeads: 150, convertedLeads: 10, unitsSold: 12, revenue: 45000, conversionRate: 6.7 },
  ],
  leadDowngrades: {
    hotToWarm: 15,
    warmToCold: 8,
    hotToCold: 3,
  },
  triggers: {
    hotTrigger: 45,
    warmTrigger: 60,
    walletTrigger: 20,
  },
  // New lead status and phase-wise data
  leadStatus: {
    hot: 150,
    warm: 400,
    cold: 697,
  },
  phaseLeads: {
    phase4: 120, // High intent, ready to close
    phase3: 250, // Engaged, considering
    phase2: 400, // Initial contact, discovery
    phase1: 477, // New leads, unqualified
  },
  // New App Related Analytics data
  appAnalytics: {
    appDownloadsBreakdown: {
      today: { lead: 50, organic: 20, total: 70 },
      yesterday: { lead: 45, organic: 15, total: 60 },
      last3Days: { lead: 120, organic: 40, total: 160 }, // Cumulative
      last7Days: { lead: 250, organic: 80, total: 330 }, // Cumulative
      month: { lead: 1000, organic: 300, total: 1300 }, // Cumulative for the month (MTD)
    },
    totalPV: { day: 2500, mtd: 250000 },
    totalCV: { day: 120, mtd: 12000 },
    recipeVisits: { day: 800, mtd: 80000 },
    hsTaken: { day: 50, mtd: 500 },
    consultationBooked: { day: 30, mtd: 300 },
    uninstalls: { day: 15, mtd: 1500 },
    totalLeadsWithApp: { day: 80, mtd: 800 },
    totalLeadsWithoutApp: { day: 40, mtd: 447 },
    tipsVisit: { day: 120, mtd: 1200 },
    videoVisits: { day: 85, mtd: 850 },
    successStoriesVisits: { day: 30, mtd: 300 },
    walletVisits: { day: 45, mtd: 450 },
    alcoholGuideFilled: { day: 8, mtd: 80 },
    restaurantGuideFilled: { day: 6, mtd: 60 },
    recipeBookCreated: { day: 15, mtd: 150 },
    peerGroupVisit: { day: 20, mtd: 200 },
    programPageVisits: { day: 70, mtd: 700 },
    checkoutPageVisits: { day: 25, mtd: 250 },
    freeGuideActivated: { day: 10, mtd: 100 },
    couponCodeActivated: { day: 5, mtd: 50 },
    spinToWinActivated: { day: 12, mtd: 120 },
    leadsWithGoPro: { day: 20, mtd: 200 },
  },
  // New data for Risks, Opportunities, and MTD Sales Risks
  risksMissesOD: {
    balancePaymentOverdue: { day: 3, mtd: 34 },
    callsMissed: { day: 6, mtd: 28 },
    engagementMissed: { day: 0, mtd: 5 },
    followUpMissed: { day: 9, mtd: 42 },
    consultationFeedbackMissed: { day: 0, mtd: 2 },
    additionalQuestionsPending: { day: 0, mtd: 7 },
    crossCallOD: { day: 0, mtd: 1 },
    leadsWithoutApp: { day: 0, mtd: 3 },
  },
  solidSalesOpportunity: {
    checkoutVisit: { day: 0, mtd: 12 },
    paymentDetailsShared: { day: 0, mtd: 8 },
    leadsWithDoubleDiscount: { day: 0, mtd: 3 },
    referrals: { day: 0, mtd: 5 },
    leadsWithGOPro: { day: 0, mtd: 7 },
    leadsWithFreeCourse: { day: 0, mtd: 4 },
    goodWeightLoss: { day: 0, mtd: 2 },
    milestone: { day: 0, mtd: 10 },
    goodConsultationFeedback: { day: 0, mtd: 6 },
  },
  mtdSalesRisks: {
    hotFollowupsPending: { day: 91, mtd: 150 },
    unacknowledgedMilestones: { day: 0, mtd: 1 },
    toPayOD: { day: 0, mtd: 2 },
    payLaterOD: { day: 0, mtd: 1 },
    walletExpiringTomorrow: { day: 0, mtd: 5 },
    extraDiscountExpiringTomorrow: { day: 0, mtd: 2 },
    hotLeadWithNegativeFeedback: { day: 0, mtd: 0 },
    unconvertedLeadsWithGOPro: { day: 0, mtd: 3 },
    unconvertedLeadsWithFreeCourse: { day: 0, mtd: 1 },
  },
  socialMediaLeads: {
    instagram: {
      smo: { total: 50, converted: 5 },
      sme: { total: 30, converted: 3 },
    },
    facebook: {
      smo: { total: 70, converted: 8 },
      sme: { total: 40, converted: 4 },
    },
    youtube: {
      smo: { total: 20, converted: 2 },
      sme: { total: 15, converted: 1 },
    },
  },
  digitalMarketingAnalytics: {
    adSpend: { day: 500, mtd: 15000 },
    roi: { day: 2.5, mtd: 2.8 }, // ratio
    clicks: { day: 1200, mtd: 35000 },
    conversions: { day: 10, mtd: 300 },
    leadsFromGoogleAds: { day: 57, mtd: 1800 }, // Corresponds to leadsSources.unassigned.googleAds
    cpc: { day: 0.45, mtd: 0.42 }, // Cost Per Click
    totalUsers: { day: 10000, mtd: 300000 }, // New
    uniqueEngagement: { day: 800, mtd: 25000 }, // New
  },
  socialMediaAnalytics: {
    totalReach: {
      today: 1200,
      week: 8000,
      month: 30000,
      quarter: 80000,
    },
    impressions: {
      today: 1500,
      week: 10000,
      month: 40000,
      quarter: 100000,
    },
    engagementRate: {
      today: 2.5,
      week: 3.0,
      month: 3.5,
      quarter: 4.0,
    },
    leadsFromSocial: {
      today: 15,
      week: 100,
      month: 400,
      quarter: 1000,
    }, // Overall leads
    instagram: {
      followers: { current: 150000, change: 5000 },
      totalVisitors: { today: 500, week: 3500, month: 15000, quarter: 45000 }, // Updated
      uniqueEngagement: { today: 100, week: 700, month: 3000, quarter: 9000 }, // Updated
    },
    facebook: {
      followers: { current: 200000, change: -2000 },
      totalVisitors: { today: 700, week: 4900, month: 20000, quarter: 60000 }, // Updated
      uniqueEngagement: { today: 150, week: 1050, month: 4500, quarter: 13500 }, // Updated
    },
    youtube: {
      subscribers: { current: 80000, change: 1500 },
      totalVisitors: { today: 300, week: 2100, month: 10000, quarter: 30000 }, // Updated
      uniqueEngagement: { today: 50, week: 350, month: 1500, quarter: 4500 }, // Updated
    },
  },
  // New data for Website Analytics
  websiteAnalytics: {
    // totalVisitors: { day: 5000, mtd: 150000 },
    pageViews: { day: 73, mtd: 34973 },
    bounceRate: { day: "79.4", mtd: "57.5" }, // percentage
    avgSessionDuration: { day: "00:01:58", mtd: "00:01:09" }, // HH:MM:SS
    leadsFromWebsite: { day: 0, mtd: 0 }, // Corresponds to leadsSources.unassigned.website
    totalUsers: { day: 17, mtd: 8559 }, // New
    uniqueEngagement: { day: 7, mtd: 7960 }, // New
  },
  // New data for Campaigns
  campaigns: [
    {
      id: 1,
      name: "1 day Weight Loss Cleasne",
      type: "Meta",
      status: "Active",
      startDate: "2025-06-01",
      endDate: "2025-08-31",
      adSpend: 5000,
      leadsGenerated: 150,
      revenueGenerated: 75000,
      usersTargeted: ["Weight Loss Seekers", "Fitness Enthusiasts", "Health-Conscious Individuals"],
      conversionRate: 15,
      roi: 1.5,
    },
    // {
    //   id: 2,
    //   name: "Healthy Habits Challenge",
    //   type: "Facebook Ads",
    //   status: "Completed",
    //   startDate: "2025-04-01",
    //   endDate: "2025-05-31",
    //   adSpend: 3000,
    //   leadsGenerated: 100,
    //   revenueGenerated: 40000,
    //   usersTargeted: ["Busy Professionals", "New Parents", "Meal Prep Enthusiasts"],
    //   conversionRate: 13.3,
    //   roi: 1.3,
    // },
    // {
    //   id: 3,
    //   name: "Nutrition Masterclass",
    //   type: "YouTube Ads",
    //   status: "Active",
    //   startDate: "2025-07-15",
    //   endDate: "2025-09-15",
    //   adSpend: 2000,
    //   leadsGenerated: 80,
    //   revenueGenerated: 30000,
    //   usersTargeted: ["Students", "Budget-Conscious", "Cooking Enthusiasts"],
    //   conversionRate: 12.5,
    //   roi: 1.2,
    // },
    // {
    //   id: 4,
    //   name: "Referral Program Boost",
    //   type: "Referral Campaign",
    //   status: "Active",
    //   startDate: "2025-01-01",
    //   endDate: "2025-12-31",
    //   adSpend: 0, // No direct ad spend for referral
    //   leadsGenerated: 200,
    //   revenueGenerated: 100000,
    //   usersTargeted: ["Existing Clients", "Friends & Family of Clients"],
    //   conversionRate: 50, // High conversion for referrals
    //   roi: 0, // N/A for direct ad spend
    // },
  ],
  // New data for Lead MIS
  leads: [
    {
      id: 1,
      name: "Rohan Sharma",
      gender: "Male",
      ageGroup: "25-34",
      clinicalCondition: ["Diabetes", "PCOS"],
      region: "North",
      country: "India",
      state: "Delhi",
      city: "New Delhi",
      salesStatus: "HOT",
      stage: "Stage 4",
      previousCampaigns: ["Summer Slimdown 2025", "Healthy Habits Challenge"],
    },
    {
      id: 2,
      name: "Pooja Singh",
      gender: "Female",
      ageGroup: "35-44",
      clinicalCondition: ["Thyroid"],
      region: "South",
      country: "India",
      state: "Karnataka",
      city: "Bengaluru",
      salesStatus: "WARM",
      stage: "Stage 3",
      previousCampaigns: ["Nutrition Masterclass"],
    },
    {
      id: 3,
      name: "Amit Patel",
      gender: "Male",
      ageGroup: "45-54",
      clinicalCondition: ["Hypertension"],
      region: "West",
      country: "India",
      state: "Maharashtra",
      city: "Mumbai",
      salesStatus: "COLD",
      stage: "Stage 2",
      previousCampaigns: [],
    },
    {
      id: 4,
      name: "Sneha Gupta",
      gender: "Female",
      ageGroup: "25-34",
      clinicalCondition: ["Weight Loss"],
      region: "East",
      country: "India",
      state: "West Bengal",
      city: "Kolkata",
      salesStatus: "HOT",
      stage: "Stage 4",
      previousCampaigns: ["Summer Slimdown 2025"],
    },
    {
      id: 5,
      name: "Rajesh Kumar",
      gender: "Male",
      ageGroup: "55+",
      clinicalCondition: ["Diabetes", "Heart Disease"],
      region: "North",
      country: "India",
      state: "Uttar Pradesh",
      city: "Lucknow",
      salesStatus: "WARM",
      stage: "Stage 3",
      previousCampaigns: ["Referral Program Boost"],
    },
    {
      id: 6,
      name: "Divya Sharma",
      gender: "Female",
      ageGroup: "18-24",
      clinicalCondition: ["PCOS"],
      region: "South",
      country: "India",
      state: "Tamil Nadu",
      city: "Chennai",
      salesStatus: "NEW",
      stage: "Stage 1",
      previousCampaigns: [],
    },
    {
      id: 7,
      name: "Suresh Rao",
      gender: "Male",
      ageGroup: "35-44",
      clinicalCondition: ["Thyroid", "Weight Loss"],
      region: "West",
      country: "India",
      state: "Gujarat",
      city: "Ahmedabad",
      salesStatus: "HOT",
      stage: "Stage 4",
      previousCampaigns: ["Healthy Habits Challenge"],
    },
    {
      id: 8,
      name: "Anjali Devi",
      gender: "Female",
      ageGroup: "45-54",
      clinicalCondition: ["Diabetes"],
      region: "East",
      country: "India",
      state: "Odisha",
      city: "Bhubaneswar",
      salesStatus: "WARM",
      stage: "Stage 3",
      previousCampaigns: [],
    },
    {
      id: 9,
      name: "Gaurav Jain",
      gender: "Male",
      ageGroup: "25-34",
      clinicalCondition: ["Hypertension", "Weight Loss"],
      region: "North",
      country: "India",
      state: "Rajasthan",
      city: "Jaipur",
      salesStatus: "COLD",
      stage: "Stage 2",
      previousCampaigns: ["Summer Slimdown 2025"],
    },
    {
      id: 10,
      name: "Kiran Verma",
      gender: "Female",
      ageGroup: "55+",
      clinicalCondition: ["Heart Disease"],
      region: "South",
      country: "India",
      state: "Kerala",
      city: "Kochi",
      salesStatus: "NEW",
      stage: "Stage 1",
      previousCampaigns: [],
    },
  ],
  watiTemplates: [
    { id: "temp1", name: "Welcome Message" },
    { id: "temp2", name: "Discount Offer" },
    { id: "temp3", name: "Follow-up Reminder" },
    { id: "temp4", name: "Program Details" },
  ],
  // New mock data for clinical conditions analytics based on image (29).png
  clinicalConditionsAnalytics: {
    "Women & Child": { olr: { count: 315, value: 2890 }, ocl: { count: 432, value: 3580 } },
    "Menopause (Peri & Post)": { olr: { count: 412, value: 5160 }, ocl: { count: 328, value: 8930 } },
    "Hormonal Disorder": { olr: { count: 325, value: 7130 }, ocl: { count: 189, value: 6505 } },
    Diabetes: { olr: { count: 1151, value: 1890 }, ocl: { count: 432, value: 3580 } },
    Thyroid: { olr: { count: 102, value: 8920 }, ocl: { count: 111, value: 7850 } },
    Cholesterol: { olr: { count: 89, value: 5121 }, ocl: { count: 85, value: 3528 } },
  },
}

export const keyMetricsData = {
  hot: {
    count: 88,
    dayWiseData: {
      day3: {
        engagement: 180,
        conversions: 35,
        clicks: 210,
      },
      day5: {
        engagement: 220,
        conversions: 42,
        clicks: 250,
      },
      day7: {
        engagement: 260,
        conversions: 50,
        clicks: 290,
      },
    },
  },
  warm: {
    count: 77,
    dayWiseData: {
      day3: {
        engagement: 100,
        conversions: 18,
        clicks: 130,
      },
      day5: {
        engagement: 120,
        conversions: 22,
        clicks: 160,
      },
      day7: {
        engagement: 140,
        conversions: 28,
        clicks: 180,
      },
    },
  },
}


export const simpleRowMetricsData = {
  hot: {
    count: 124,
    dayWiseData: {
      day3: {
        engagement: 320,
        conversions: 48,
        clicks: 210,
      },
      day5: {
        engagement: 410,
        conversions: 52,
        clicks: 265,
      },
      day7: {
        engagement: 500,
        conversions: 65,
        clicks: 310,
      },
    },
  },
  warm: {
    count: 87,
    dayWiseData: {
      day3: {
        engagement: 210,
        conversions: 22,
        clicks: 130,
      },
      day5: {
        engagement: 270,
        conversions: 30,
        clicks: 175,
      },
      day7: {
        engagement: 300,
        conversions: 38,
        clicks: 190,
      },
    },
  },
  salesProjection: {
    totalPitched: {
      count: 340,
      amount: 156000,
      rateShared: {
        units: 120,
        amount: 60000,
      },
      linkShared: {
        units: 90,
        amount: 45000,
      },
    },
    toPay: {
      count: 180,
      amount: 78000,
      rateShared: {
        units: 70,
        amount: 30000,
      },
      linkShared: {
        units: 50,
        amount: 20000,
      },
    },
    payLater: {
      count: 95,
      amount: 42000,
      rateShared: {
        units: 40,
        amount: 16000,
      },
      linkShared: {
        units: 30,
        amount: 12000,
      },
    },
  },
};
