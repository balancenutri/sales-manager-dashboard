// "use client"

// import { useState, useMemo } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Progress } from "@/components/ui/progress"
// // import { useToast } from "@/components/ui/use-toast" // Import useToast
// // import { Toaster } from "@/components/ui/toaster" // Import Toaster
// import {
//   Users,
//   Target,
//   TrendingUp,
//   Filter,
//   Download,
//   Bell,
//   Settings,
//   ChevronDown,
//   ArrowUp,
//   UserCheck,
//   PhoneCall,
//   ArrowDown,
//   Smartphone,
//   BookOpen,
//   HeartHandshake,
//   XCircle,
//   ClipboardList,
//   Video,
//   Book,
//   Award,
//   CreditCard,
//   Utensils,
//   UsersRound,
//   ShoppingCart,
//   BookText,
//   Gift,
//   Ticket,
//   RefreshCw,
//   UserPlus,
//   DollarSign,
//   Megaphone,
//   LineChart,
//   Users2,
//   Eye,
//   Activity,
//   Send,
// } from "lucide-react"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// // Mock data for the dashboard
// const mockData = {
//   overview: {
//     totalLeads: 1247,
//     assignedLeads: 892,
//     unassignedLeads: 355,
//     totalSales: 89,
//     targetSales: 120,
//     conversionRate: 7.1,
//     revenue: 445000,
//     targetRevenue: 600000,
//     activeCounsellors: 12,
//     avgPitchPerDay: 8.5,
//     totalSalesOpportunity: 0, // Placeholder, will be calculated below
//     benchmarkConversionRate: 12, // Example benchmark conversion rate
//   },
//   // Add team performance data
//   teams: [
//     {
//       id: 1,
//       name: "Team Alpha",
//       mentor: "Rajesh Kumar",
//       mentorAvatar: "/placeholder.svg?height=32&width=32",
//       totalLeadsAssigned: 298,
//       totalSalesUnits: 32,
//       targetSalesUnits: 45,
//       counsellors: ["Priya Sharma", "Rahul Gupta", "Sneha Patel"],
//     },
//     {
//       id: 2,
//       name: "Team Beta",
//       mentor: "Sunita Verma",
//       mentorAvatar: "/placeholder.svg?height=32&width=32",
//       totalLeadsAssigned: 267,
//       totalSalesUnits: 28,
//       targetSalesUnits: 38,
//       counsellors: ["Amit Kumar", "Kavya Reddy"],
//     },
//     {
//       id: 3,
//       name: "Team Gamma",
//       mentor: "Vikram Singh",
//       mentorAvatar: "/placeholder.svg?height=32&width=32",
//       totalLeadsAssigned: 327,
//       totalSalesUnits: 29,
//       targetSalesUnits: 37,
//       counsellors: ["Arjun Mehta", "Pooja Agarwal", "Ravi Sharma", "Meera Joshi"],
//     },
//   ],
//   leadsSources: {
//     unassigned: {
//       website: 142,
//       socialMedia: 89,
//       referral: 67,
//       googleAds: 57,
//     },
//   },
//   salesTypes: {
//     basicStack: 34,
//     specialStack: 28,
//     platinumStack: 27,
//   },
//   // Add new counsellor revenue breakdown data
//   counsellorRevenue: [
//     {
//       id: 1,
//       name: "Priya Sharma",
//       avatar: "/placeholder.svg?height=40&width=40",
//       basicStack: { units: 6, amount: 18000 },
//       specialStack: { units: 7, amount: 28000 },
//       platinumStack: { units: 5, amount: 25000 },
//       target: { units: 20, amount: 80000 },
//     },
//     {
//       id: 2,
//       name: "Rahul Gupta",
//       avatar: "/placeholder.svg?height=40&width=40",
//       basicStack: { units: 4, amount: 12000 },
//       specialStack: { units: 5, amount: 20000 },
//       platinumStack: { units: 3, amount: 15000 },
//       target: { units: 15, amount: 60000 },
//     },
//     {
//       id: 3,
//       name: "Sneha Patel",
//       avatar: "/placeholder.svg?height=40&width=40",
//       basicStack: { units: 5, amount: 15000 },
//       specialStack: { units: 6, amount: 24000 },
//       platinumStack: { units: 4, amount: 20000 },
//       target: { units: 18, amount: 70000 },
//     },
//     {
//       id: 4,
//       name: "Amit Kumar",
//       avatar: "/placeholder.svg?height=40&width=40",
//       basicStack: { units: 3, amount: 9000 },
//       specialStack: { units: 4, amount: 16000 },
//       platinumStack: { units: 2, amount: 10000 },
//       target: { units: 12, amount: 45000 },
//     },
//     {
//       id: 5,
//       name: "Kavya Reddy",
//       avatar: "/placeholder.svg?height=40&width=40",
//       basicStack: { units: 4, amount: 12000 },
//       specialStack: { units: 4, amount: 16000 },
//       platinumStack: { units: 3, amount: 15000 },
//       target: { units: 14, amount: 55000 },
//     },
//     {
//       id: 6,
//       name: "Arjun Mehta",
//       avatar: "/placeholder.svg?height=40&width=40",
//       basicStack: { units: 5, amount: 15000 },
//       specialStack: { units: 5, amount: 20000 },
//       platinumStack: { units: 3, amount: 15000 },
//       target: { units: 16, amount: 65000 },
//     },
//   ],
//   counsellors: [
//     {
//       id: 1,
//       name: "Priya Sharma",
//       avatar: "/placeholder.svg?height=40&width=40",
//       leadsAssigned: 156,
//       consultations: 89,
//       salesClosed: 18,
//       conversionRate: 11.5,
//       revenue: 72000,
//       avgPitchPerDay: 9.2,
//       status: "active",
//       lastActive: "2 hours ago",
//       paymentDetailsShared: { count: 15, amount: 75000 },
//       bestConversionSource: "Website",
//       snapshot: {
//         leadsByStatusDetail: {
//           toPay: 5,
//           payLater: 3,
//           negotiatingPrice: 2,
//         },
//         leadsByEngagementDetail: {
//           rateShared: 8,
//           buildFaith: 4,
//           notForSpecialStack: 1,
//         },
//         leadsByOutcomeDetail: {
//           discarded: 7,
//           notAffordable: 3,
//           unresponsive: 5,
//         },
//         missesAndRisks: {
//           highPotentialCold: 2,
//           hotLeadsFUNotSet: 1,
//           leadsStillToEngage: 3,
//           toPayOD: 1, // New
//           payLaterOD: 0, // New
//           paymentDetailsExpired: 1, // New
//         },
//         downgradedLeads: {
//           hotToWarm: 2,
//           warmToCold: 1,
//           hotToCold: 0,
//         },
//         triggersCrossed: {
//           hotTrigger: 10,
//           warmTrigger: 15,
//         },
//         paymentDetailsExpiring: {
//           // New
//           today: { count: 1, amount: 5000 },
//           tomorrow: { count: 2, amount: 10000 },
//           dayAfterTomorrow: { count: 0, amount: 0 },
//         },
//       },
//     },
//     {
//       id: 2,
//       name: "Rahul Gupta",
//       avatar: "/placeholder.svg?height=40&width=40",
//       leadsAssigned: 142,
//       consultations: 78,
//       salesClosed: 12,
//       conversionRate: 8.5,
//       revenue: 48000,
//       avgPitchPerDay: 7.8,
//       status: "active",
//       lastActive: "1 hour ago",
//       paymentDetailsShared: { count: 10, amount: 50000 },
//       bestConversionSource: "Social Media",
//       snapshot: {
//         leadsByStatusDetail: {
//           toPay: 3,
//           payLater: 2,
//           negotiatingPrice: 1,
//         },
//         leadsByEngagementDetail: {
//           rateShared: 6,
//           buildFaith: 3,
//           notForSpecialStack: 0,
//         },
//         leadsByOutcomeDetail: {
//           discarded: 5,
//           notAffordable: 2,
//           unresponsive: 4,
//         },
//         missesAndRisks: {
//           highPotentialCold: 1,
//           hotLeadsFUNotSet: 0,
//           leadsStillToEngage: 2,
//           toPayOD: 0, // New
//           payLaterOD: 1, // New
//           paymentDetailsExpired: 0, // New
//         },
//         downgradedLeads: {
//           hotToWarm: 1,
//           warmToCold: 0,
//           hotToCold: 0,
//         },
//         triggersCrossed: {
//           hotTrigger: 8,
//           warmTrigger: 12,
//         },
//         paymentDetailsExpiring: {
//           // New
//           today: { count: 0, amount: 0 },
//           tomorrow: { count: 1, amount: 3000 },
//           dayAfterTomorrow: { count: 1, amount: 7000 },
//         },
//       },
//     },
//     {
//       id: 3,
//       name: "Sneha Patel",
//       avatar: "/placeholder.svg?height=40&width=40",
//       leadsAssigned: 134,
//       consultations: 82,
//       salesClosed: 15,
//       conversionRate: 11.2,
//       revenue: 60000,
//       avgPitchPerDay: 8.9,
//       status: "active",
//       lastActive: "30 minutes ago",
//       paymentDetailsShared: { count: 13, amount: 65000 },
//       bestConversionSource: "Referral",
//       snapshot: {
//         leadsByStatusDetail: {
//           toPay: 4,
//           payLater: 2,
//           negotiatingPrice: 3,
//         },
//         leadsByEngagementDetail: {
//           rateShared: 7,
//           buildFaith: 5,
//           notForSpecialStack: 2,
//         },
//         leadsByOutcomeDetail: {
//           discarded: 6,
//           notAffordable: 1,
//           unresponsive: 3,
//         },
//         missesAndRisks: {
//           highPotentialCold: 0,
//           hotLeadsFUNotSet: 2,
//           leadsStillToEngage: 1,
//           toPayOD: 0, // New
//           payLaterOD: 0, // New
//           paymentDetailsExpired: 2, // New
//         },
//         downgradedLeads: {
//           hotToWarm: 0,
//           warmToCold: 2,
//           hotToCold: 1,
//         },
//         triggersCrossed: {
//           hotTrigger: 12,
//           warmTrigger: 10,
//         },
//         paymentDetailsExpiring: {
//           // New
//           today: { count: 0, amount: 0 },
//           tomorrow: { count: 0, amount: 0 },
//           dayAfterTomorrow: { count: 3, amount: 15000 },
//         },
//       },
//     },
//     {
//       id: 4,
//       name: "Amit Kumar",
//       avatar: "/placeholder.svg?height=40&width=40",
//       leadsAssigned: 128,
//       consultations: 65,
//       salesClosed: 9,
//       conversionRate: 7.0,
//       revenue: 36000,
//       avgPitchPerDay: 6.5,
//       status: "active",
//       lastActive: "1 day ago",
//       paymentDetailsShared: { count: 8, amount: 40000 },
//       bestConversionSource: "Google Ads",
//       snapshot: {
//         leadsByStatusDetail: {
//           toPay: 2,
//           payLater: 1,
//           negotiatingPrice: 0,
//         },
//         leadsByEngagementDetail: {
//           rateShared: 5,
//           buildFaith: 2,
//           notForSpecialStack: 1,
//         },
//         leadsByOutcomeDetail: {
//           discarded: 8,
//           notAffordable: 4,
//           unresponsive: 6,
//         },
//         missesAndRisks: {
//           highPotentialCold: 3,
//           hotLeadsFUNotSet: 1,
//           leadsStillToEngage: 4,
//           toPayOD: 2, // New
//           payLaterOD: 0, // New
//           paymentDetailsExpired: 0, // New
//         },
//         downgradedLeads: {
//           hotToWarm: 1,
//           warmToCold: 1,
//           hotToCold: 0,
//         },
//         triggersCrossed: {
//           hotTrigger: 7,
//           warmTrigger: 9,
//         },
//         paymentDetailsExpiring: {
//           // New
//           today: { count: 1, amount: 4000 },
//           tomorrow: { count: 0, amount: 0 },
//           dayAfterTomorrow: { count: 1, amount: 6000 },
//         },
//       },
//     },
//     {
//       id: 5,
//       name: "Kavya Reddy",
//       avatar: "/placeholder.svg?height=40&width=40",
//       leadsAssigned: 118,
//       consultations: 72,
//       salesClosed: 11,
//       conversionRate: 9.3,
//       revenue: 44000,
//       avgPitchPerDay: 7.2,
//       status: "active",
//       lastActive: "3 hours ago",
//       paymentDetailsShared: { count: 9, amount: 45000 },
//       bestConversionSource: "Website",
//       snapshot: {
//         leadsByStatusDetail: {
//           toPay: 3,
//           payLater: 2,
//           negotiatingPrice: 1,
//         },
//         leadsByEngagementDetail: {
//           rateShared: 6,
//           buildFaith: 3,
//           notForSpecialStack: 0,
//         },
//         leadsByOutcomeDetail: {
//           discarded: 4,
//           notAffordable: 2,
//           unresponsive: 3,
//         },
//         missesAndRisks: {
//           highPotentialCold: 1,
//           hotLeadsFUNotSet: 0,
//           leadsStillToEngage: 2,
//           toPayOD: 0, // New
//           payLaterOD: 2, // New
//           paymentDetailsExpired: 0, // New
//         },
//         downgradedLeads: {
//           hotToWarm: 0,
//           warmToCold: 1,
//           hotToCold: 0,
//         },
//         triggersCrossed: {
//           hotTrigger: 9,
//           warmTrigger: 11,
//         },
//         paymentDetailsExpiring: {
//           // New
//           today: { count: 0, amount: 0 },
//           tomorrow: { count: 0, amount: 0 },
//           dayAfterTomorrow: { count: 2, amount: 8000 },
//         },
//       },
//     },
//     {
//       id: 6,
//       name: "Arjun Mehta",
//       avatar: "/placeholder.svg?height=40&width=40",
//       leadsAssigned: 114,
//       consultations: 68,
//       salesClosed: 13,
//       conversionRate: 11.4,
//       revenue: 52000,
//       avgPitchPerDay: 8.1,
//       status: "active",
//       lastActive: "1 hour ago",
//       paymentDetailsShared: { count: 11, amount: 55000 },
//       bestConversionSource: "Referral",
//       snapshot: {
//         leadsByStatusDetail: {
//           toPay: 4,
//           payLater: 3,
//           negotiatingPrice: 2,
//         },
//         leadsByEngagementDetail: {
//           rateShared: 7,
//           buildFaith: 4,
//           notForSpecialStack: 1,
//         },
//         leadsByOutcomeDetail: {
//           discarded: 5,
//           notAffordable: 2,
//           unresponsive: 4,
//         },
//         missesAndRisks: {
//           highPotentialCold: 0,
//           hotLeadsFUNotSet: 1,
//           leadsStillToEngage: 1,
//           toPayOD: 1, // New
//           payLaterOD: 1, // New
//           paymentDetailsExpired: 0, // New
//         },
//         downgradedLeads: {
//           hotToWarm: 1,
//           warmToCold: 0,
//           hotToCold: 0,
//         },
//         triggersCrossed: {
//           hotTrigger: 11,
//           warmTrigger: 13,
//         },
//         paymentDetailsExpiring: {
//           // New
//           today: { count: 2, amount: 10000 },
//           tomorrow: { count: 1, amount: 5000 },
//           dayAfterTomorrow: { count: 0, amount: 0 },
//         },
//       },
//     },
//   ],
//   recentLeads: [
//     {
//       id: 1,
//       name: "Anita Desai",
//       phone: "+91 98765 43210",
//       source: "Website",
//       assignedTo: "Priya Sharma",
//       status: "contacted",
//       createdAt: "2024-01-15T10:30:00Z",
//     },
//     {
//       id: 2,
//       name: "Vikram Singh",
//       phone: "+91 87654 32109",
//       source: "Social Media",
//       assignedTo: "Rahul Gupta",
//       status: "new",
//       createdAt: "2024-01-15T09:15:00Z",
//     },
//     {
//       id: 3,
//       name: "Meera Joshi",
//       phone: "+91 76543 21098",
//       source: "Referral",
//       assignedTo: "Sneha Patel",
//       status: "follow-up",
//       createdAt: "2024-01-15T08:45:00Z",
//     },
//   ],
//   // New data for Analytics section
//   leadSourceAnalytics: [
//     { source: "Website", totalLeads: 500, convertedLeads: 50, unitsSold: 60, revenue: 300000, conversionRate: 10.0 },
//     {
//       source: "Social Media",
//       totalLeads: 300,
//       convertedLeads: 25,
//       unitsSold: 30,
//       revenue: 120000,
//       conversionRate: 8.3,
//     },
//     { source: "Referral", totalLeads: 200, convertedLeads: 20, unitsSold: 25, revenue: 100000, conversionRate: 10.0 },
//     { source: "Google Ads", totalLeads: 150, convertedLeads: 10, unitsSold: 12, revenue: 45000, conversionRate: 6.7 },
//   ],
//   leadDowngrades: {
//     hotToWarm: 15,
//     warmToCold: 8,
//     hotToCold: 3,
//   },
//   triggers: {
//     hotTrigger: 45,
//     warmTrigger: 60,
//     walletTrigger: 20,
//   },
//   // New lead status and phase-wise data
//   leadStatus: {
//     hot: 150,
//     warm: 400,
//     cold: 697,
//   },
//   phaseLeads: {
//     phase4: 120, // High intent, ready to close
//     phase3: 250, // Engaged, considering
//     phase2: 400, // Initial contact, discovery
//     phase1: 477, // New leads, unqualified
//   },
//   // New App Related Analytics data
//   appAnalytics: {
//     appDownloadsBreakdown: {
//       today: { lead: 50, organic: 20, total: 70 },
//       yesterday: { lead: 45, organic: 15, total: 60 },
//       last3Days: { lead: 120, organic: 40, total: 160 }, // Cumulative
//       last7Days: { lead: 250, organic: 80, total: 330 }, // Cumulative
//       month: { lead: 1000, organic: 300, total: 1300 }, // Cumulative for the month (MTD)
//     },
//     totalPV: { day: 2500, mtd: 250000 },
//     totalCV: { day: 120, mtd: 12000 },
//     recipeVisits: { day: 800, mtd: 80000 },
//     hsTaken: { day: 50, mtd: 500 },
//     consultationBooked: { day: 30, mtd: 300 },
//     uninstalls: { day: 15, mtd: 1500 },
//     totalLeadsWithApp: { day: 80, mtd: 800 },
//     totalLeadsWithoutApp: { day: 40, mtd: 447 },
//     tipsVisit: { day: 120, mtd: 1200 },
//     videoVisits: { day: 85, mtd: 850 },
//     successStoriesVisits: { day: 30, mtd: 300 },
//     walletVisits: { day: 45, mtd: 450 },
//     alcoholGuideFilled: { day: 8, mtd: 80 },
//     restaurantGuideFilled: { day: 6, mtd: 60 },
//     recipeBookCreated: { day: 15, mtd: 150 },
//     peerGroupVisit: { day: 20, mtd: 200 },
//     programPageVisits: { day: 70, mtd: 700 },
//     checkoutPageVisits: { day: 25, mtd: 250 },
//     freeGuideActivated: { day: 10, mtd: 100 },
//     couponCodeActivated: { day: 5, mtd: 50 },
//     spinToWinActivated: { day: 12, mtd: 120 },
//     leadsWithGoPro: { day: 20, mtd: 200 },
//   },
//   // New data for Risks, Opportunities, and MTD Sales Risks
//   risksMissesOD: {
//     balancePaymentOverdue: { day: 3, mtd: 34 },
//     callsMissed: { day: 6, mtd: 28 },
//     engagementMissed: { day: 0, mtd: 5 },
//     followUpMissed: { day: 9, mtd: 42 },
//     consultationFeedbackMissed: { day: 0, mtd: 2 },
//     additionalQuestionsPending: { day: 0, mtd: 7 },
//     crossCallOD: { day: 0, mtd: 1 },
//     leadsWithoutApp: { day: 0, mtd: 3 },
//   },
//   solidSalesOpportunity: {
//     checkoutVisit: { day: 0, mtd: 12 },
//     paymentDetailsShared: { day: 0, mtd: 8 },
//     leadsWithDoubleDiscount: { day: 0, mtd: 3 },
//     referrals: { day: 0, mtd: 5 },
//     leadsWithGOPro: { day: 0, mtd: 7 },
//     leadsWithFreeCourse: { day: 0, mtd: 4 },
//     goodWeightLoss: { day: 0, mtd: 2 },
//     milestone: { day: 0, mtd: 10 },
//     goodConsultationFeedback: { day: 0, mtd: 6 },
//   },
//   mtdSalesRisks: {
//     hotFollowupsPending: { day: 91, mtd: 150 },
//     unacknowledgedMilestones: { day: 0, mtd: 1 },
//     toPayOD: { day: 0, mtd: 2 },
//     payLaterOD: { day: 0, mtd: 1 },
//     walletExpiringTomorrow: { day: 0, mtd: 5 },
//     extraDiscountExpiringTomorrow: { day: 0, mtd: 2 },
//     hotLeadWithNegativeFeedback: { day: 0, mtd: 0 },
//     unconvertedLeadsWithGOPro: { day: 0, mtd: 3 },
//     unconvertedLeadsWithFreeCourse: { day: 0, mtd: 1 },
//   },
//   socialMediaLeads: {
//     instagram: {
//       smo: { total: 50, converted: 5 },
//       sme: { total: 30, converted: 3 },
//     },
//     facebook: {
//       smo: { total: 70, converted: 8 },
//       sme: { total: 40, converted: 4 },
//     },
//     youtube: {
//       smo: { total: 20, converted: 2 },
//       sme: { total: 15, converted: 1 },
//     },
//   },
//   digitalMarketingAnalytics: {
//     adSpend: { day: 500, mtd: 15000 },
//     roi: { day: 2.5, mtd: 2.8 }, // ratio
//     clicks: { day: 1200, mtd: 35000 },
//     conversions: { day: 10, mtd: 300 },
//     leadsFromGoogleAds: { day: 57, mtd: 1800 }, // Corresponds to leadsSources.unassigned.googleAds
//     cpc: { day: 0.45, mtd: 0.42 }, // Cost Per Click
//     totalUsers: { day: 10000, mtd: 300000 }, // New
//     uniqueEngagement: { day: 800, mtd: 25000 }, // New
//   },
//   socialMediaAnalytics: {
//     totalReach: {
//       today: 1200,
//       week: 8000,
//       month: 30000,
//       quarter: 80000,
//     },
//     impressions: {
//       today: 1500,
//       week: 10000,
//       month: 40000,
//       quarter: 100000,
//     },
//     engagementRate: {
//       today: 2.5,
//       week: 3.0,
//       month: 3.5,
//       quarter: 4.0,
//     },
//     leadsFromSocial: {
//       today: 15,
//       week: 100,
//       month: 400,
//       quarter: 1000,
//     }, // Overall leads
//     instagram: {
//       followers: { current: 150000, change: 5000 },
//       totalVisitors: { today: 500, week: 3500, month: 15000, quarter: 45000 }, // Updated
//       uniqueEngagement: { today: 100, week: 700, month: 3000, quarter: 9000 }, // Updated
//     },
//     facebook: {
//       followers: { current: 200000, change: -2000 },
//       totalVisitors: { today: 700, week: 4900, month: 20000, quarter: 60000 }, // Updated
//       uniqueEngagement: { today: 150, week: 1050, month: 4500, quarter: 13500 }, // Updated
//     },
//     youtube: {
//       subscribers: { current: 80000, change: 1500 },
//       totalVisitors: { today: 300, week: 2100, month: 10000, quarter: 30000 }, // Updated
//       uniqueEngagement: { today: 50, week: 350, month: 1500, quarter: 4500 }, // Updated
//     },
//   },
//   // New data for Website Analytics
//   websiteAnalytics: {
//     totalVisitors: { day: 5000, mtd: 150000 },
//     pageViews: { day: 15000, mtd: 450000 },
//     bounceRate: { day: 45, mtd: 40 }, // percentage
//     avgSessionDuration: { day: "00:02:30", mtd: "00:03:15" }, // HH:MM:SS
//     leadsFromWebsite: { day: 142, mtd: 5000 }, // Corresponds to leadsSources.unassigned.website
//     totalUsers: { day: 4500, mtd: 130000 }, // New
//     uniqueEngagement: { day: 1000, mtd: 35000 }, // New
//   },
//   // New data for Campaigns
//   campaigns: [
//     {
//       id: 1,
//       name: "Summer Slimdown 2025",
//       type: "Google Ads",
//       status: "Active",
//       startDate: "2025-06-01",
//       endDate: "2025-08-31",
//       adSpend: 5000,
//       leadsGenerated: 150,
//       revenueGenerated: 75000,
//       usersTargeted: ["Weight Loss Seekers", "Fitness Enthusiasts", "Health-Conscious Individuals"],
//       conversionRate: 15,
//       roi: 1.5,
//     },
//     {
//       id: 2,
//       name: "Healthy Habits Challenge",
//       type: "Facebook Ads",
//       status: "Completed",
//       startDate: "2025-04-01",
//       endDate: "2025-05-31",
//       adSpend: 3000,
//       leadsGenerated: 100,
//       revenueGenerated: 40000,
//       usersTargeted: ["Busy Professionals", "New Parents", "Meal Prep Enthusiasts"],
//       conversionRate: 13.3,
//       roi: 1.3,
//     },
//     {
//       id: 3,
//       name: "Nutrition Masterclass",
//       type: "YouTube Ads",
//       status: "Active",
//       startDate: "2025-07-15",
//       endDate: "2025-09-15",
//       adSpend: 2000,
//       leadsGenerated: 80,
//       revenueGenerated: 30000,
//       usersTargeted: ["Students", "Budget-Conscious", "Cooking Enthusiasts"],
//       conversionRate: 12.5,
//       roi: 1.2,
//     },
//     {
//       id: 4,
//       name: "Referral Program Boost",
//       type: "Referral Campaign",
//       status: "Active",
//       startDate: "2025-01-01",
//       endDate: "2025-12-31",
//       adSpend: 0, // No direct ad spend for referral
//       leadsGenerated: 200,
//       revenueGenerated: 100000,
//       usersTargeted: ["Existing Clients", "Friends & Family of Clients"],
//       conversionRate: 50, // High conversion for referrals
//       roi: 0, // N/A for direct ad spend
//     },
//   ],
//   // New data for Lead MIS
//   leads: [
//     {
//       id: 1,
//       name: "Rohan Sharma",
//       gender: "Male",
//       ageGroup: "25-34",
//       clinicalCondition: ["Diabetes", "PCOS"],
//       region: "North",
//       country: "India",
//       state: "Delhi",
//       city: "New Delhi",
//       salesStatus: "HOT",
//       stage: "Stage 4",
//       previousCampaigns: ["Summer Slimdown 2025", "Healthy Habits Challenge"],
//     },
//     {
//       id: 2,
//       name: "Pooja Singh",
//       gender: "Female",
//       ageGroup: "35-44",
//       clinicalCondition: ["Thyroid"],
//       region: "South",
//       country: "India",
//       state: "Karnataka",
//       city: "Bengaluru",
//       salesStatus: "WARM",
//       stage: "Stage 3",
//       previousCampaigns: ["Nutrition Masterclass"],
//     },
//     {
//       id: 3,
//       name: "Amit Patel",
//       gender: "Male",
//       ageGroup: "45-54",
//       clinicalCondition: ["Hypertension"],
//       region: "West",
//       country: "India",
//       state: "Maharashtra",
//       city: "Mumbai",
//       salesStatus: "COLD",
//       stage: "Stage 2",
//       previousCampaigns: [],
//     },
//     {
//       id: 4,
//       name: "Sneha Gupta",
//       gender: "Female",
//       ageGroup: "25-34",
//       clinicalCondition: ["Weight Loss"],
//       region: "East",
//       country: "India",
//       state: "West Bengal",
//       city: "Kolkata",
//       salesStatus: "HOT",
//       stage: "Stage 4",
//       previousCampaigns: ["Summer Slimdown 2025"],
//     },
//     {
//       id: 5,
//       name: "Rajesh Kumar",
//       gender: "Male",
//       ageGroup: "55+",
//       clinicalCondition: ["Diabetes", "Heart Disease"],
//       region: "North",
//       country: "India",
//       state: "Uttar Pradesh",
//       city: "Lucknow",
//       salesStatus: "WARM",
//       stage: "Stage 3",
//       previousCampaigns: ["Referral Program Boost"],
//     },
//     {
//       id: 6,
//       name: "Divya Sharma",
//       gender: "Female",
//       ageGroup: "18-24",
//       clinicalCondition: ["PCOS"],
//       region: "South",
//       country: "India",
//       state: "Tamil Nadu",
//       city: "Chennai",
//       salesStatus: "NEW",
//       stage: "Stage 1",
//       previousCampaigns: [],
//     },
//     {
//       id: 7,
//       name: "Suresh Rao",
//       gender: "Male",
//       ageGroup: "35-44",
//       clinicalCondition: ["Thyroid", "Weight Loss"],
//       region: "West",
//       country: "India",
//       state: "Gujarat",
//       city: "Ahmedabad",
//       salesStatus: "HOT",
//       stage: "Stage 4",
//       previousCampaigns: ["Healthy Habits Challenge"],
//     },
//     {
//       id: 8,
//       name: "Anjali Devi",
//       gender: "Female",
//       ageGroup: "45-54",
//       clinicalCondition: ["Diabetes"],
//       region: "East",
//       country: "India",
//       state: "Odisha",
//       city: "Bhubaneswar",
//       salesStatus: "WARM",
//       stage: "Stage 3",
//       previousCampaigns: [],
//     },
//     {
//       id: 9,
//       name: "Gaurav Jain",
//       gender: "Male",
//       ageGroup: "25-34",
//       clinicalCondition: ["Hypertension", "Weight Loss"],
//       region: "North",
//       country: "India",
//       state: "Rajasthan",
//       city: "Jaipur",
//       salesStatus: "COLD",
//       stage: "Stage 2",
//       previousCampaigns: ["Summer Slimdown 2025"],
//     },
//     {
//       id: 10,
//       name: "Kiran Verma",
//       gender: "Female",
//       ageGroup: "55+",
//       clinicalCondition: ["Heart Disease"],
//       region: "South",
//       country: "India",
//       state: "Kerala",
//       city: "Kochi",
//       salesStatus: "NEW",
//       stage: "Stage 1",
//       previousCampaigns: [],
//     },
//   ],
//   watiTemplates: [
//     { id: "temp1", name: "Welcome Message" },
//     { id: "temp2", name: "Discount Offer" },
//     { id: "temp3", name: "Follow-up Reminder" },
//     { id: "temp4", name: "Program Details" },
//   ],
//   // New mock data for clinical conditions analytics based on image (29).png
//   clinicalConditionsAnalytics: {
//     "Women & Child": { olr: { count: 315, value: 2890 }, ocl: { count: 432, value: 3580 } },
//     "Menopause (Peri & Post)": { olr: { count: 412, value: 5160 }, ocl: { count: 328, value: 8930 } },
//     "Hormonal Disorder": { olr: { count: 325, value: 7130 }, ocl: { count: 189, value: 6505 } },
//     Diabetes: { olr: { count: 1151, value: 1890 }, ocl: { count: 432, value: 3580 } },
//     Thyroid: { olr: { count: 102, value: 8920 }, ocl: { count: 111, value: 7850 } },
//     Cholesterol: { olr: { count: 89, value: 5121 }, ocl: { count: 85, value: 3528 } },
//   },
// }

// // Calculate total sales opportunity and add to overview
// mockData.overview.totalSalesOpportunity = Object.values(mockData.solidSalesOpportunity).reduce(
//   (sum, item) => sum + item.mtd,
//   0,
// )

// export default function SalesManagerDashboard() {
//   const [selectedPeriod, setSelectedPeriod] = useState("today")
//   // const [searchTerm, setSearchTerm] = useState("")
//   const [showLeadsModal, setShowLeadsModal] = useState(false)
//   const [showSalesModal, setShowSalesModal] = useState(false)
//   const [showRevenueModal, setShowRevenueModal] = useState(false)
//   const [showTeamModal, setShowTeamModal] = useState(false)
//   const [showCounsellorSnapshotModal, setShowCounsellorSnapshotModal] = useState(false) // New state
//   const [selectedCounsellor, setSelectedCounsellor] = useState<(typeof mockData.counsellors)[0] | null>(null) // New state
//   const [showCampaignSnapshotModal, setShowCampaignSnapshotModal] = useState(false) // New state
//   const [selectedCampaign, setSelectedCampaign] = useState<(typeof mockData.campaigns)[0] | null>(null) // New state
//   const [modalType, setModalType] = useState<"assigned" | "unassigned" | "sales" | "revenue" | "team" | null>(null)

//   // New states for Lead MIS filters
//   const [genderFilter, setGenderFilter] = useState<string | null>(null)
//   const [ageGroupFilter, setAgeGroupFilter] = useState<string | null>(null)
//   const [clinicalConditionFilter, setClinicalConditionFilter] = useState<string | null>(null)
//   const [regionFilter, setRegionFilter] = useState<string | null>(null)
//   const [countryFilter, setCountryFilter] = useState<string | null>(null)
//   const [stateFilter, setStateFilter] = useState<string | null>(null)
//   const [cityFilter, setCityFilter] = useState<string | null>(null)
//   const [salesStatusFilter, setSalesStatusFilter] = useState<string | null>(null)
//   const [stageFilter, setStageFilter] = useState<string | null>(null)
//   const [selectedWatiTemplate, setSelectedWatiTemplate] = useState<string | null>(null)

//   // const { toast } = useToast()

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "active":
//         return "bg-green-100 text-green-800"
//       case "inactive":
//         return "bg-red-100 text-red-800"
//       case "new":
//         return "bg-blue-100 text-blue-800"
//       case "contacted":
//         return "bg-yellow-100 text-yellow-800"
//       case "follow-up":
//         return "bg-purple-100 text-purple-800"
//       case "HOT":
//         return "bg-red-100 text-red-800"
//       case "WARM":
//         return "bg-orange-100 text-orange-800"
//       case "COLD":
//         return "bg-blue-100 text-blue-800"
//       default:
//         return "bg-gray-100 text-gray-800"
//     }
//   }

//   const handleLeadsClick = (type: "assigned" | "unassigned") => {
//     setModalType(type)
//     setShowLeadsModal(true)
//   }

//   const handleSalesClick = () => {
//     setModalType("sales")
//     setShowSalesModal(true)
//   }

//   const handleRevenueClick = () => {
//     setModalType("revenue")
//     setShowRevenueModal(true)
//   }

//   const handleTeamClick = () => {
//     setModalType("team")
//     setShowTeamModal(true)
//   }

//   const handleCounsellorCardClick = (counsellor: (typeof mockData.counsellors)[0]) => {
//     setSelectedCounsellor(counsellor)
//     setShowCounsellorSnapshotModal(true)
//   }

//   const handleCampaignClick = (campaign: (typeof mockData.campaigns)[0]) => {
//     setSelectedCampaign(campaign)
//     setShowCampaignSnapshotModal(true)
//   }

//   const handleExportLeads = () => {
//     // In a real application, you would generate and download a CSV/Excel file
//     // toast({
//     //   title: "Export Initiated",
//     //   description: `Exporting ${filteredLeads.length} leads... (This is a placeholder action)`,
//     // })
//   }

//   const handleWatiBroadcast = () => {
//     if (!selectedWatiTemplate) {
//       // toast({
//       //   title: "Broadcast Failed",
//       //   description: "Please select a WATI template.",
//       //   variant: "destructive",
//       // })
//       return
//     }
//     // In a real application, you would send the filtered leads to WATI API
//     // toast({
//     //   title: "WATI Broadcast Sent",
//     //   description: `Broadcast with template "${selectedWatiTemplate}" sent to ${filteredLeads.length} leads. (This is a placeholder action)`,
//     // })
//   }

//   // Calculate average conversion rate for performance tags
//   const totalConversionRates = mockData.counsellors.reduce((sum, c) => sum + c.conversionRate, 0)
//   const averageConversionRate = totalConversionRates / mockData.counsellors.length

//   const getPerformanceTag = (conversionRate: number) => {
//     const benchmark = mockData.overview.benchmarkConversionRate
//     const avg = averageConversionRate

//     if (conversionRate >= benchmark) {
//       return { tag: "Excellent", color: "bg-green-500 text-white" }
//     } else if (conversionRate >= benchmark * 0.95) {
//       return { tag: "Good", color: "bg-teal-500 text-white" }
//     } else if (conversionRate >= avg * 1.05) {
//       return { tag: "Fair", color: "bg-yellow-500 text-white" }
//     } else if (conversionRate >= avg * 0.95) {
//       return { tag: "Poor", color: "bg-orange-500 text-white" }
//     } else {
//       return { tag: "High Risk", color: "bg-red-500 text-white" }
//     }
//   }

//   // Calculate App Conversion
//   const appConversion =
//     mockData.appAnalytics.appDownloadsBreakdown.month.total > 0
//       ? (
//           (mockData.appAnalytics.consultationBooked.mtd / mockData.appAnalytics.appDownloadsBreakdown.month.total) *
//           100
//         ).toFixed(1)
//       : "0.0"

//   // Calculate total converted social media leads for revenue distribution
//   const totalSocialMediaConvertedLeads =
//     mockData.socialMediaLeads.instagram.smo.converted +
//     mockData.socialMediaLeads.instagram.sme.converted +
//     mockData.socialMediaLeads.facebook.smo.converted +
//     mockData.socialMediaLeads.facebook.sme.converted +
//     mockData.socialMediaLeads.youtube.smo.converted +
//     mockData.socialMediaLeads.youtube.sme.converted

//   const socialMediaRevenue = mockData.leadSourceAnalytics.find((s) => s.source === "Social Media")?.revenue || 0

//   const calculatePlatformRevenue = (platformConvertedLeads: number) => {
//     if (totalSocialMediaConvertedLeads === 0) return 0
//     return (platformConvertedLeads / totalSocialMediaConvertedLeads) * socialMediaRevenue
//   }

//   // Calculate social media leads distribution for the new section
//   const totalSocialLeads = mockData.socialMediaAnalytics.leadsFromSocial[selectedPeriod] // Use selectedPeriod
//   const unassignedSocialLeads = mockData.leadsSources.unassigned.socialMedia
//   const assignedSocialLeads = totalSocialLeads - unassignedSocialLeads

//   const totalAssignedLeadsOverall = mockData.overview.assignedLeads
//   const socialLeadRatio = totalAssignedLeadsOverall > 0 ? assignedSocialLeads / totalAssignedLeadsOverall : 0

//   const counsellorSocialLeadDistribution = mockData.counsellors.map((counsellor) => {
//     const estimatedSocialLeads = Math.round(counsellor.leadsAssigned * socialLeadRatio)
//     const estimatedSocialConsultations = Math.round(counsellor.consultations * socialLeadRatio)
//     const estimatedSocialSales = Math.round(counsellor.salesClosed * socialLeadRatio)
//     return {
//       id: counsellor.id,
//       name: counsellor.name,
//       avatar: counsellor.avatar,
//       estimatedSocialLeads,
//       estimatedSocialConsultations,
//       estimatedSocialSales,
//     }
//   })

//   const teamSocialLeadDistribution = mockData.teams.map((team) => {
//     const teamCounsellors = mockData.counsellors.filter((c) => team.counsellors.includes(c.name))
//     const estimatedTeamSocialLeads = teamCounsellors.reduce(
//       (sum, c) => sum + Math.round(c.leadsAssigned * socialLeadRatio),
//       0,
//     )
//     const estimatedTeamSocialConsultations = teamCounsellors.reduce(
//       (sum, c) => sum + Math.round(c.consultations * socialLeadRatio),
//       0,
//     )
//     const estimatedTeamSocialSales = teamCounsellors.reduce(
//       (sum, c) => sum + Math.round(c.salesClosed * socialLeadRatio),
//       0,
//     )
//     return {
//       id: team.id,
//       name: team.name,
//       mentor: team.mentor,
//       estimatedSocialLeads: estimatedTeamSocialLeads,
//       estimatedSocialConsultations: estimatedTeamSocialConsultations,
//       estimatedSocialSales: estimatedTeamSocialSales,
//     }
//   })

//   // Aggregate for "Mentor" (sum of all teams' estimated social performance)
//   const aggregateMentorSocialLeads = teamSocialLeadDistribution.reduce(
//     (sum, team) => sum + team.estimatedSocialLeads,
//     0,
//   )
//   const aggregateMentorSocialConsultations = teamSocialLeadDistribution.reduce(
//     (sum, team) => sum + team.estimatedSocialConsultations,
//     0,
//   )
//   const aggregateMentorSocialSales = teamSocialLeadDistribution.reduce(
//     (sum, team) => sum + team.estimatedSocialSales,
//     0,
//   )
//   const aggregateMentorSocialRevenue = socialMediaRevenue // Total social media revenue

//   // Aggregate for "Counsellor" (sum of all individual counsellors' estimated social performance)
//   const aggregateCounsellorSocialLeads = counsellorSocialLeadDistribution.reduce(
//     (sum, c) => sum + c.estimatedSocialLeads,
//     0,
//   )
//   const aggregateCounsellorSocialConsultations = counsellorSocialLeadDistribution.reduce(
//     (sum, c) => sum + c.estimatedSocialConsultations,
//     0,
//   )
//   const aggregateCounsellorSocialSales = counsellorSocialLeadDistribution.reduce(
//     (sum, c) => sum + c.estimatedSocialSales,
//     0,
//   )
//   const aggregateCounsellorSocialRevenue = socialMediaRevenue // Total social media revenue

//   // Function to format to Lacs
//   const formatToLacs = (amount: number) => {
//     if (amount === 0) return "₹0 Lac"
//     return `₹${(amount / 100000).toFixed(1)} Lac`
//   }

//   // Calculate Male/Female Leads
//   const maleLeadsCount = mockData.leads.filter((lead) => lead.gender === "Male").length
//   const femaleLeadsCount = mockData.leads.filter((lead) => lead.gender === "Female").length

//   // Filtered Leads for MIS
//   const filteredLeads = useMemo(() => {
//     return mockData.leads.filter((lead) => {
//       if (genderFilter && genderFilter !== "all" && lead.gender !== genderFilter) return false
//       if (ageGroupFilter && ageGroupFilter !== "all" && lead.ageGroup !== ageGroupFilter) return false
//       // For clinical condition, check if the selected filter is present in the lead's conditions
//       if (
//         clinicalConditionFilter &&
//         clinicalConditionFilter !== "all" &&
//         !lead.clinicalCondition.includes(clinicalConditionFilter)
//       )
//         return false
//       if (regionFilter && regionFilter !== "all" && lead.region !== regionFilter) return false
//       if (countryFilter && countryFilter !== "all" && lead.country !== countryFilter) return false
//       if (stateFilter && stateFilter !== "all" && lead.state !== stateFilter) return false
//       if (cityFilter && cityFilter !== "all" && lead.city !== cityFilter) return false
//       if (salesStatusFilter && salesStatusFilter !== "all" && lead.salesStatus !== salesStatusFilter) return false
//       if (stageFilter && stageFilter !== "all" && lead.stage !== stageFilter) return false
//       return true
//     })
//   }, [
//     genderFilter,
//     ageGroupFilter,
//     clinicalConditionFilter,
//     regionFilter,
//     countryFilter,
//     stateFilter,
//     cityFilter,
//     salesStatusFilter,
//     stageFilter,
//   ])

//   // Unique filter options from mockData
//   const uniqueGenders = useMemo(() => Array.from(new Set(mockData.leads.map((l) => l.gender))), [])
//   const uniqueAgeGroups = useMemo(() => Array.from(new Set(mockData.leads.map((l) => l.ageGroup))), [])
//   const uniqueClinicalConditions = useMemo(
//     () => Array.from(new Set(mockData.leads.flatMap((l) => l.clinicalCondition))),
//     [],
//   )
//   const uniqueRegions = useMemo(() => Array.from(new Set(mockData.leads.map((l) => l.region))), [])
//   const uniqueCountries = useMemo(() => Array.from(new Set(mockData.leads.map((l) => l.country))), [])
//   const uniqueStates = useMemo(() => Array.from(new Set(mockData.leads.map((l) => l.state))), [])
//   const uniqueCities = useMemo(() => Array.from(new Set(mockData.leads.map((l) => l.city))), [])
//   const uniqueSalesStatuses = useMemo(() => Array.from(new Set(mockData.leads.map((l) => l.salesStatus))), [])
//   const uniqueStages = useMemo(() => Array.from(new Set(mockData.leads.map((l) => l.stage))), [])

//   // Overall Social Media Performance Calculations
//   const overallSocialVisitors =
//     mockData.socialMediaAnalytics.instagram.totalVisitors[selectedPeriod] +
//     mockData.socialMediaAnalytics.facebook.totalVisitors[selectedPeriod] +
//     mockData.socialMediaAnalytics.youtube.totalVisitors[selectedPeriod]
//   const overallSocialUniqueEngagement =
//     mockData.socialMediaAnalytics.instagram.uniqueEngagement[selectedPeriod] +
//     mockData.socialMediaAnalytics.facebook.uniqueEngagement[selectedPeriod] +
//     mockData.socialMediaAnalytics.youtube.uniqueEngagement[selectedPeriod]
//   const overallSocialLeadsGenerated = mockData.socialMediaAnalytics.leadsFromSocial[selectedPeriod]
//   const overallSocialLeadsConverted =
//     mockData.leadSourceAnalytics.find((s) => s.source === "Social Media")?.convertedLeads || 0
//   const overallSocialRevenue = mockData.leadSourceAnalytics.find((s) => s.source === "Social Media")?.revenue || 0

//   // Team Performance (Social Media) Calculations
//   // const totalSocialLeadsAssignedToCounsellors = counsellorSocialLeadDistribution.reduce(
//   //   (sum, c) => sum + c.estimatedSocialLeads,
//   //   0,
//   // )
//   // const totalCounsellorConsultations = mockData.counsellors.reduce((sum, c) => sum + c.consultations, 0)
//   // const estimatedSocialConsultations = Math.round(totalCounsellorConsultations * socialLeadRatio)
//   const totalCounsellorSales = mockData.counsellors.reduce((sum, c) => sum + c.salesClosed, 0)
//   // const estimatedSocialSales = Math.round(totalCounsellorSales * socialLeadRatio)
//   // const estimatedSocialConversionRate =
//   //   totalSocialLeadsAssignedToCounsellors > 0
//   //     ? ((estimatedSocialSales / totalSocialLeadsAssignedToCounsellors) * 100).toFixed(1)
//   //     : "0.0"

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* <Toaster /> Add Toaster component for displaying messages */}
//       {/* Header */}
//       <header className="bg-white border-b border-gray-200 px-6 py-4">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-4">
//             <div className="flex items-center space-x-2">
//               <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
//                 <span className="text-white font-bold text-sm">B</span>
//               </div>
//               <h1 className="text-xl font-semibold text-gray-900">Balance Nutrition</h1>
//             </div>
//             <div className="hidden md:block">
//               <Badge variant="secondary" className="bg-teal-100 text-teal-800">
//                 Sales Manager Dashboard
//               </Badge>
//             </div>
//           </div>

//           <div className="flex items-center space-x-4">
//             <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
//               <SelectTrigger className="w-32">
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="today">Today</SelectItem>
//                 <SelectItem value="week">This Week</SelectItem>
//                 <SelectItem value="month">This Month</SelectItem>
//                 <SelectItem value="quarter">This Quarter</SelectItem>
//               </SelectContent>
//             </Select>

//             <Button variant="outline" size="icon">
//               <Bell className="h-4 w-4" />
//             </Button>

//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="ghost" className="flex items-center space-x-2">
//                   <Avatar className="h-8 w-8">
//                     <AvatarImage src="/placeholder.svg?height=32&width=32" />
//                     <AvatarFallback>SM</AvatarFallback>
//                   </Avatar>
//                   <span className="hidden md:block">Sales Manager</span>
//                   <ChevronDown className="h-4 w-4" />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end">
//                 <DropdownMenuLabel>My Account</DropdownMenuLabel>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem>
//                   <Settings className="mr-2 h-4 w-4" />
//                   Settings
//                 </DropdownMenuItem>
//                 <DropdownMenuItem>Logout</DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div>
//         </div>
//       </header>
//       <div className="p-6">
//         {/* Main Content Tabs */}
//         <Tabs defaultValue="overview" className="space-y-6">
//           <TabsList className="grid w-full grid-cols-4">
//             <TabsTrigger value="overview">Overview</TabsTrigger>
//             <TabsTrigger value="social-media">Social Media</TabsTrigger>
//             <TabsTrigger value="digital-marketing">Digital Marketing</TabsTrigger>
//             <TabsTrigger value="app-analytics">App Analytics</TabsTrigger>
//           </TabsList>

//           {/* Overview Tab Content */}
//           <TabsContent value="overview" className="space-y-6">
//             {/* Key Metrics */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//               {/* Combined Leads Card */}
//               <Card className="cursor-pointer hover:shadow-md transition-shadow">
//                 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                   <CardTitle className="text-sm font-medium">Lead Management</CardTitle>
//                   <Users className="h-4 w-4 text-muted-foreground" />
//                 </CardHeader>
//                 <CardContent className="space-y-3">
//                   <div
//                     className="flex items-center justify-between p-2 rounded-lg bg-green-50 hover:bg-green-100 transition-colors cursor-pointer"
//                     onClick={() => handleLeadsClick("assigned")}
//                   >
//                     <div>
//                       <p className="text-sm text-muted-foreground">Assigned</p>
//                       <p className="text-xl font-bold text-green-700">{mockData.overview.assignedLeads}</p>
//                     </div>
//                     <ArrowUp className="h-4 w-4 text-green-500" />
//                   </div>
//                   <div
//                     className="flex items-center justify-between p-2 rounded-lg bg-orange-50 hover:bg-orange-100 transition-colors cursor-pointer"
//                     onClick={() => handleLeadsClick("unassigned")}
//                   >
//                     <div>
//                       <p className="text-sm text-muted-foreground">Unassigned</p>
//                       <p className="text-xl font-bold text-orange-700">{mockData.overview.unassignedLeads}</p>
//                     </div>
//                     <UserCheck className="h-4 w-4 text-orange-500" />
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* Combined Sales & Revenue Card */}
//               <Card className="hover:shadow-md transition-shadow">
//                 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                   <CardTitle className="text-sm font-medium">Sales Performance</CardTitle>
//                   <Target className="h-4 w-4 text-muted-foreground" />
//                 </CardHeader>
//                 <CardContent className="space-y-3">
//                   <div
//                     className="flex items-center justify-between p-2 rounded-lg bg-green-50 hover:bg-green-100 transition-colors cursor-pointer"
//                     onClick={handleSalesClick}
//                   >
//                     <div>
//                       <p className="text-sm text-muted-foreground">Sales Closed</p>
//                       <p className="text-2xl font-bold">{mockData.overview.totalSales}</p>
//                     </div>
//                     <ArrowUp className="h-4 w-4 text-green-500" />
//                   </div>
//                   <div
//                     className="flex items-center justify-between p-2 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer"
//                     onClick={handleRevenueClick}
//                   >
//                     <div>
//                       <p className="text-sm text-muted-foreground">Revenue</p>
//                       <p className="text-xl font-bold">₹{(mockData.overview.revenue / 1000).toFixed(0)}K</p>
//                     </div>
//                     <div className="text-right">
//                       <p className="text-xs text-muted-foreground">
//                         Target: ₹{(mockData.overview.targetRevenue / 1000).toFixed(0)}K
//                       </p>
//                       <p className="text-xs text-orange-600">
//                         Pending: ₹{((mockData.overview.targetRevenue - mockData.overview.revenue) / 1000).toFixed(0)}K
//                       </p>
//                     </div>
//                   </div>
//                   <div className="space-y-2">
//                     <div className="flex items-center justify-between text-sm">
//                       <span>Revenue Target Progress</span>
//                       <span>{((mockData.overview.revenue / mockData.overview.targetRevenue) * 100).toFixed(1)}%</span>
//                     </div>
//                     <Progress
//                       value={(mockData.overview.revenue / mockData.overview.targetRevenue) * 100}
//                       className="h-2"
//                     />
//                   </div>
//                   <div className="flex items-center justify-between pt-2 border-t">
//                     <div>
//                       <p className="text-sm text-muted-foreground">Conversion Rate</p>
//                       <p className="text-lg font-bold text-teal-600">{mockData.overview.conversionRate}%</p>
//                     </div>
//                     <TrendingUp className="h-4 w-4 text-teal-500" />
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* Social Media Performance Card */}
//               <Card className="hover:shadow-md transition-shadow">
//                 <CardHeader>
//                   <CardTitle>Team Performance (Social Media)</CardTitle>
//                   <CardDescription>Consolidated social media performance by team/counsellor</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <Table>
//                     <TableHeader>
//                       <TableRow>
//                         <TableHead className="w-[150px]">Team Performance</TableHead>
//                         <TableHead>Leads</TableHead>
//                         <TableHead>Consultation</TableHead>
//                         <TableHead>Conversion</TableHead>
//                       </TableRow>
//                     </TableHeader>
//                     <TableBody>
//                       <TableRow>
//                         <TableCell className="font-medium">Mentor</TableCell>
//                         <TableCell className="font-semibold">{aggregateMentorSocialLeads}</TableCell>
//                         <TableCell className="font-semibold">{aggregateMentorSocialConsultations}</TableCell>
//                         <TableCell className="font-semibold">
//                           {aggregateMentorSocialSales} / {formatToLacs(aggregateMentorSocialRevenue)}
//                         </TableCell>
//                       </TableRow>
//                       <TableRow>
//                         <TableCell className="font-medium">Counsellor</TableCell>
//                         <TableCell className="font-semibold">{aggregateCounsellorSocialLeads}</TableCell>
//                         <TableCell className="font-semibold">{aggregateCounsellorSocialConsultations}</TableCell>
//                         <TableCell className="font-semibold">
//                           {aggregateCounsellorSocialSales} / {formatToLacs(aggregateCounsellorSocialRevenue)}
//                         </TableCell>
//                       </TableRow>
//                     </TableBody>
//                   </Table>
//                 </CardContent>
//               </Card>
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               {/* Top Performers */}
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Top Performers</CardTitle>
//                   <CardDescription>Best performing counsellors this month</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-4">
//                     {mockData.counsellors
//                       .sort((a, b) => b.conversionRate - a.conversionRate)
//                       .slice(0, 3)
//                       .map((counsellor, index) => (
//                         <div key={counsellor.id} className="flex items-center space-x-4">
//                           <div className="flex items-center justify-center w-8 h-8 rounded-full bg-teal-100 text-teal-800 font-bold text-sm">
//                             {index + 1}
//                           </div>
//                           <Avatar className="h-10 w-10">
//                             <AvatarImage src={counsellor.avatar || "/placeholder.svg"} />
//                             <AvatarFallback>
//                               {counsellor.name
//                                 .split(" ")
//                                 .map((n) => n[0])
//                                 .join("")}
//                             </AvatarFallback>
//                           </Avatar>
//                           <div className="flex-1">
//                             <p className="text-sm font-medium">{counsellor.name}</p>
//                             <p className="text-xs text-muted-foreground">
//                               {counsellor.conversionRate}% conversion rate
//                             </p>
//                           </div>
//                           <Badge variant="secondary">₹{(counsellor.revenue / 1000).toFixed(0)}K</Badge>
//                         </div>
//                       ))}
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* Recent Activity */}
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Recent Activity</CardTitle>
//                   <CardDescription>Latest updates from your team</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-4">
//                     <div className="flex items-center space-x-3">
//                       <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                       <div className="flex-1">
//                         <p className="text-sm font-medium">Priya Sharma closed a Platinum Stack sale</p>
//                         <p className="text-xs text-muted-foreground">2 hours ago</p>
//                       </div>
//                     </div>
//                     <div className="flex items-center space-x-3">
//                       <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//                       <div className="flex-1">
//                         <p className="text-sm font-medium">15 new leads assigned to team</p>
//                         <p className="text-xs text-muted-foreground">4 hours ago</p>
//                       </div>
//                     </div>
//                     <div className="flex items-center space-x-3">
//                       <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
//                       <div className="flex-1">
//                         <p className="text-sm font-medium">Sneha Patel completed 5 consultations</p>
//                         <p className="text-xs text-muted-foreground">6 hours ago</p>
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>

//             {/* New Cards: Risks, Opportunities, MTD Sales Risks */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {/* Risks, Misses & OD */}
//               <Card>
//                 <CardHeader className="pb-2">
//                   <CardTitle className="text-sm font-medium">
//                     <span className="inline-block px-3 py-1 rounded-md bg-orange-100 text-orange-800">
//                       Risks, Misses & OD
//                     </span>
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-2">
//                   {Object.entries(mockData.risksMissesOD).map(([key, value]) => (
//                     <div
//                       key={key}
//                       className="flex items-center justify-between border-b pb-2 last:border-b-0 last:pb-0"
//                     >
//                       <span className="text-sm text-muted-foreground capitalize">
//                         {key
//                           .replace(/([A-Z])/g, " $1")
//                           .replace(/OD/g, "OD")
//                           .trim()}
//                       </span>
//                       <span className="font-semibold text-base">
//                         {value.day} | {value.mtd}
//                       </span>
//                     </div>
//                   ))}
//                 </CardContent>
//               </Card>

//               {/* Solid Sales Opportunity */}
//               <Card>
//                 <CardHeader className="pb-2">
//                   <CardTitle className="text-sm font-medium">
//                     <span className="inline-block px-3 py-1 rounded-md bg-green-100 text-green-800">
//                       Solid Sales Opportunity
//                     </span>
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-2">
//                   {Object.entries(mockData.solidSalesOpportunity).map(([key, value]) => (
//                     <div
//                       key={key}
//                       className="flex items-center justify-between border-b pb-2 last:border-b-0 last:pb-0"
//                     >
//                       <span className="text-sm text-muted-foreground capitalize">
//                         {key
//                           .replace(/([A-Z])/g, " $1")
//                           .replace(/GOPro/g, "GO Pro")
//                           .trim()}
//                       </span>
//                       <span className="font-semibold text-base">
//                         {value.day} | {value.mtd}
//                       </span>
//                     </div>
//                   ))}
//                 </CardContent>
//               </Card>

//               {/* MTD Sales Risks */}
//               <Card>
//                 <CardHeader className="pb-2">
//                   <CardTitle className="text-sm font-medium">
//                     <span className="inline-block px-3 py-1 rounded-md bg-red-100 text-red-800">MTD Sales Risks</span>
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-2">
//                   {Object.entries(mockData.mtdSalesRisks).map(([key, value]) => (
//                     <div
//                       key={key}
//                       className="flex items-center justify-between border-b pb-2 last:border-b-0 last:pb-0"
//                     >
//                       <span className="text-sm text-muted-foreground capitalize">
//                         {key
//                           .replace(/([A-Z])/g, " $1")
//                           .replace(/OD/g, "OD")
//                           .replace(/HOT/g, "HOT")
//                           .replace(/GOPro/g, "GO Pro")
//                           .trim()}
//                       </span>
//                       <span className="font-semibold text-base">
//                         {value.day} | {value.mtd}
//                       </span>
//                     </div>
//                   ))}
//                 </CardContent>
//               </Card>
//             </div>
//           </TabsContent>

//           <TabsContent value="social-media" className="space-y-6">
//             <h2 className="text-2xl font-bold">Social Media Performance by Platform</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {/* Instagram Performance Card */}
//               <Card>
//                 <CardHeader>
//                   <div className="flex items-center space-x-2">
//                     <img src="/placeholder.svg?height=24&width=24" alt="Instagram" className="h-6 w-6" />
//                     <CardTitle>Instagram Performance</CardTitle>
//                   </div>
//                   <CardDescription>Leads and Revenue from Instagram</CardDescription>
//                 </CardHeader>
//                 <CardContent className="space-y-3">
//                   <div className="flex items-center justify-between border-b pb-2">
//                     <span className="font-medium">Total Followers</span>
//                     <div className="flex items-center space-x-1">
//                       <span className="font-semibold text-lg">
//                         {mockData.socialMediaAnalytics.instagram.followers.current.toLocaleString()}
//                       </span>
//                       {mockData.socialMediaAnalytics.instagram.followers.change > 0 ? (
//                         <ArrowUp className="h-4 w-4 text-green-500" />
//                       ) : (
//                         <ArrowDown className="h-4 w-4 text-red-500" />
//                       )}
//                       <span
//                         className={`text-sm ${
//                           mockData.socialMediaAnalytics.instagram.followers.change > 0
//                             ? "text-green-500"
//                             : "text-red-500"
//                         }`}
//                       >
//                         {Math.abs(mockData.socialMediaAnalytics.instagram.followers.change).toLocaleString()}
//                       </span>
//                     </div>
//                   </div>
//                   <div className="flex items-center justify-between border-b pb-2">
//                     <span className="font-medium">Total Visitors</span>
//                     <span className="font-semibold text-lg">
//                       {mockData.socialMediaAnalytics.instagram.totalVisitors[selectedPeriod].toLocaleString()}
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between border-b pb-2">
//                     <span className="font-medium">Unique Engagement</span>
//                     <span className="font-semibold text-lg">
//                       {mockData.socialMediaAnalytics.instagram.uniqueEngagement[selectedPeriod].toLocaleString()}
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between border-b pb-2">
//                     <span className="font-medium">Total Reach</span>
//                     <span className="font-semibold text-lg">
//                       {mockData.socialMediaAnalytics.totalReach[selectedPeriod].toLocaleString()}
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between border-b pb-2">
//                     <span className="font-medium">Impressions</span>
//                     <span className="font-semibold text-lg">
//                       {mockData.socialMediaAnalytics.impressions[selectedPeriod].toLocaleString()}
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between border-b pb-2">
//                     <span className="font-medium">Engagement Rate</span>
//                     <span className="font-semibold text-lg">
//                       {mockData.socialMediaAnalytics.engagementRate[selectedPeriod]}%
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between border-b pb-2">
//                     <span className="font-medium">Leads Generated</span>
//                     <span className="font-semibold text-lg">
//                       {mockData.socialMediaLeads.instagram.smo.total + mockData.socialMediaLeads.instagram.sme.total}
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between border-b pb-2">
//                     <span className="font-medium">Leads Converted</span>
//                     <span className="font-semibold text-lg">
//                       {mockData.socialMediaLeads.instagram.smo.converted +
//                         mockData.socialMediaLeads.instagram.sme.converted}
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between pt-2 border-t">
//                     <span className="font-medium">Revenue Generated</span>
//                     <span className="font-semibold text-lg text-green-600">
//                       ₹
//                       {(
//                         calculatePlatformRevenue(
//                           mockData.socialMediaLeads.instagram.smo.converted +
//                             mockData.socialMediaLeads.instagram.sme.converted,
//                         ) / 1000
//                       ).toFixed(0)}
//                       K
//                     </span>
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* Facebook Performance Card */}
//               <Card>
//                 <CardHeader>
//                   <div className="flex items-center space-x-2">
//                     <img src="/placeholder.svg?height=24&width=24" alt="Facebook" className="h-6 w-6" />
//                     <CardTitle>Facebook Performance</CardTitle>
//                   </div>
//                   <CardDescription>Leads and Revenue from Facebook</CardDescription>
//                 </CardHeader>
//                 <CardContent className="space-y-3">
//                   <div className="flex items-center justify-between border-b pb-2">
//                     <span className="font-medium">Total Followers</span>
//                     <div className="flex items-center space-x-1">
//                       <span className="font-semibold text-lg">
//                         {mockData.socialMediaAnalytics.facebook.followers.current.toLocaleString()}
//                       </span>
//                       {mockData.socialMediaAnalytics.facebook.followers.change > 0 ? (
//                         <ArrowUp className="h-4 w-4 text-green-500" />
//                       ) : (
//                         <ArrowDown className="h-4 w-4 text-red-500" />
//                       )}
//                       <span
//                         className={`text-sm ${
//                           mockData.socialMediaAnalytics.facebook.followers.change > 0
//                             ? "text-green-500"
//                             : "text-red-500"
//                         }`}
//                       >
//                         {Math.abs(mockData.socialMediaAnalytics.facebook.followers.change).toLocaleString()}
//                       </span>
//                     </div>
//                   </div>
//                   <div className="flex items-center justify-between border-b pb-2">
//                     <span className="font-medium">Total Visitors</span>
//                     <span className="font-semibold text-lg">
//                       {mockData.socialMediaAnalytics.facebook.totalVisitors[selectedPeriod].toLocaleString()}
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between border-b pb-2">
//                     <span className="font-medium">Unique Engagement</span>
//                     <span className="font-semibold text-lg">
//                       {mockData.socialMediaAnalytics.facebook.uniqueEngagement[selectedPeriod].toLocaleString()}
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between border-b pb-2">
//                     <span className="font-medium">Total Reach</span>
//                     <span className="font-semibold text-lg">
//                       {mockData.socialMediaAnalytics.totalReach[selectedPeriod].toLocaleString()}
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between border-b pb-2">
//                     <span className="font-medium">Impressions</span>
//                     <span className="font-semibold text-lg">
//                       {mockData.socialMediaAnalytics.impressions[selectedPeriod].toLocaleString()}
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between border-b pb-2">
//                     <span className="font-medium">Engagement Rate</span>
//                     <span className="font-semibold text-lg">
//                       {mockData.socialMediaAnalytics.engagementRate[selectedPeriod]}%
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between border-b pb-2">
//                     <span className="font-medium">Leads Generated</span>
//                     <span className="font-semibold text-lg">
//                       {mockData.socialMediaLeads.facebook.smo.total + mockData.socialMediaLeads.facebook.sme.total}
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between border-b pb-2">
//                     <span className="font-medium">Leads Converted</span>
//                     <span className="font-semibold text-lg">
//                       {mockData.socialMediaLeads.facebook.smo.converted +
//                         mockData.socialMediaLeads.facebook.sme.converted}
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between pt-2 border-t">
//                     <span className="font-medium">Revenue Generated</span>
//                     <span className="font-semibold text-lg text-green-600">
//                       ₹
//                       {(
//                         calculatePlatformRevenue(
//                           mockData.socialMediaLeads.facebook.smo.converted +
//                             mockData.socialMediaLeads.facebook.sme.converted,
//                         ) / 1000
//                       ).toFixed(0)}
//                       K
//                     </span>
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* YouTube Performance Card */}
//               <Card>
//                 <CardHeader>
//                   <div className="flex items-center space-x-2">
//                     <img src="/placeholder.svg?height=24&width=24" alt="YouTube" className="h-6 w-6" />
//                     <CardTitle>YouTube Performance</CardTitle>
//                   </div>
//                   <CardDescription>Leads and Revenue from YouTube</CardDescription>
//                 </CardHeader>
//                 <CardContent className="space-y-3">
//                   <div className="flex items-center justify-between border-b pb-2">
//                     <span className="font-medium">Total Subscribers</span>
//                     <div className="flex items-center space-x-1">
//                       <span className="font-semibold text-lg">
//                         {mockData.socialMediaAnalytics.youtube.subscribers.current.toLocaleString()}
//                       </span>
//                       {mockData.socialMediaAnalytics.youtube.subscribers.change > 0 ? (
//                         <ArrowUp className="h-4 w-4 text-green-500" />
//                       ) : (
//                         <ArrowDown className="h-4 w-4 text-red-500" />
//                       )}
//                       <span
//                         className={`text-sm ${
//                           mockData.socialMediaAnalytics.youtube.subscribers.change > 0
//                             ? "text-green-500"
//                             : "text-red-500"
//                         }`}
//                       >
//                         {Math.abs(mockData.socialMediaAnalytics.youtube.subscribers.change).toLocaleString()}
//                       </span>
//                     </div>
//                   </div>
//                   <div className="flex items-center justify-between border-b pb-2">
//                     <span className="font-medium">Total Visitors</span>
//                     <span className="font-semibold text-lg">
//                       {mockData.socialMediaAnalytics.youtube.totalVisitors[selectedPeriod].toLocaleString()}
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between border-b pb-2">
//                     <span className="font-medium">Unique Engagement</span>
//                     <span className="font-semibold text-lg">
//                       {mockData.socialMediaAnalytics.youtube.uniqueEngagement[selectedPeriod].toLocaleString()}
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between border-b pb-2">
//                     <span className="font-medium">Total Reach</span>
//                     <span className="font-semibold text-lg">
//                       {mockData.socialMediaAnalytics.totalReach[selectedPeriod].toLocaleString()}
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between border-b pb-2">
//                     <span className="font-medium">Impressions</span>
//                     <span className="font-semibold text-lg">
//                       {mockData.socialMediaAnalytics.impressions[selectedPeriod].toLocaleString()}
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between border-b pb-2">
//                     <span className="font-medium">Engagement Rate</span>
//                     <span className="font-semibold text-lg">
//                       {mockData.socialMediaAnalytics.engagementRate[selectedPeriod]}%
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between border-b pb-2">
//                     <span className="font-medium">Leads Generated</span>
//                     <span className="font-semibold text-lg">
//                       {mockData.socialMediaLeads.youtube.smo.total + mockData.socialMediaLeads.youtube.sme.total}
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between border-b pb-2">
//                     <span className="font-medium">Leads Converted</span>
//                     <span className="font-semibold text-lg">
//                       {mockData.socialMediaLeads.youtube.smo.converted +
//                         mockData.socialMediaLeads.youtube.sme.converted}
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between pt-2 border-t">
//                     <span className="font-medium">Revenue Generated</span>
//                     <span className="font-semibold text-lg text-green-600">
//                       ₹
//                       {(
//                         calculatePlatformRevenue(
//                           mockData.socialMediaLeads.youtube.smo.converted +
//                             mockData.socialMediaLeads.youtube.sme.converted,
//                         ) / 1000
//                       ).toFixed(0)}
//                       K
//                     </span>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>

//             {/* Overall Social Media Performance */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Overall Social Media Performance</CardTitle>
//                   <CardDescription>Consolidated metrics across all social platforms</CardDescription>
//                 </CardHeader>
//                 <CardContent className="space-y-3">
//                   <div className="flex items-center justify-between border-b pb-2">
//                     <span className="font-medium">Total Visitors</span>
//                     <span className="font-semibold text-lg">{overallSocialVisitors.toLocaleString()}</span>
//                   </div>
//                   <div className="flex items-center justify-between border-b pb-2">
//                     <span className="font-medium">Unique Engagement</span>
//                     <span className="font-semibold text-lg">{overallSocialUniqueEngagement.toLocaleString()}</span>
//                   </div>
//                   <div className="flex items-center justify-between border-b pb-2">
//                     <span className="font-medium">Leads Generated</span>
//                     <span className="font-semibold text-lg">{overallSocialLeadsGenerated.toLocaleString()}</span>
//                   </div>
//                   <div className="flex items-center justify-between border-b pb-2">
//                     <span className="font-medium">Leads Converted</span>
//                     <span className="font-semibold text-lg">{overallSocialLeadsConverted.toLocaleString()}</span>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className="font-medium">Revenue</span>
//                     <span className="font-semibold text-lg">₹{(overallSocialRevenue / 1000).toFixed(0)}K</span>
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* Team Performance (Social Media) - Summary Card (This was the old card, now replaced by the new table above) */}
//               {/* The previous card content was here, now replaced by the new table in the Overview tab */}
//             </div>

//             {/* Counsellor Social Media Performance */}
//             <div className="space-y-6 mt-8">
//               <h2 className="text-2xl font-bold">Counsellor Social Media Performance</h2>
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Individual Counsellor Social Media Metrics</CardTitle>
//                   <CardDescription>
//                     Breakdown of social media leads, consultations, and conversions per counsellor
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <Table>
//                     <TableHeader>
//                       <TableRow>
//                         <TableHead>Counsellor</TableHead>
//                         <TableHead>Estimated Social Leads Assigned</TableHead>
//                         <TableHead>Estimated Social Consultations</TableHead>
//                         <TableHead>Estimated Social Sales</TableHead>
//                       </TableRow>
//                     </TableHeader>
//                     <TableBody>
//                       {counsellorSocialLeadDistribution.map((counsellor) => {
//                         return (
//                           <TableRow key={counsellor.id}>
//                             <TableCell>
//                               <div className="flex items-center space-x-3">
//                                 <Avatar className="h-8 w-8">
//                                   <AvatarImage src={counsellor.avatar || "/placeholder.svg"} />
//                                   <AvatarFallback>
//                                     {counsellor.name
//                                       .split(" ")
//                                       .map((n) => n[0])
//                                       .join("")}
//                                   </AvatarFallback>
//                                 </Avatar>
//                                 <span className="font-medium">{counsellor.name}</span>
//                               </div>
//                             </TableCell>
//                             <TableCell className="font-semibold">{counsellor.estimatedSocialLeads}</TableCell>
//                             <TableCell className="font-semibold">{counsellor.estimatedSocialConsultations}</TableCell>
//                             <TableCell className="font-semibold">{counsellor.estimatedSocialSales}</TableCell>
//                           </TableRow>
//                         )
//                       })}
//                     </TableBody>
//                   </Table>
//                 </CardContent>
//               </Card>
//             </div>

//             {/* New Team Performance Consolidated Table */}
//             <div className="space-y-6 mt-8">
//               <h2 className="text-2xl font-bold">Consolidated Team Performance</h2>
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Team & Mentor Performance Summary</CardTitle>
//                   <CardDescription>Leads, Consultations, and Sales by Team and Mentor</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <Table>
//                     <TableHeader>
//                       <TableRow>
//                         <TableHead>Team / Mentor</TableHead>
//                         <TableHead>Leads Assigned</TableHead>
//                         <TableHead>Consultations Done</TableHead>
//                         <TableHead>Sales Done</TableHead>
//                       </TableRow>
//                     </TableHeader>
//                     <TableBody>
//                       {teamSocialLeadDistribution.map((team) => (
//                         <TableRow key={team.id}>
//                           <TableCell>
//                             <div className="flex items-center space-x-3">
//                               <Avatar className="h-8 w-8">
//                                 <AvatarImage
//                                   src={mockData.teams.find((t) => t.id === team.id)?.mentorAvatar || "/placeholder.svg"}
//                                 />
//                                 <AvatarFallback>
//                                   {team.mentor
//                                     .split(" ")
//                                     .map((n) => n[0])
//                                     .join("")}
//                                 </AvatarFallback>
//                               </Avatar>
//                               <div>
//                                 <span className="font-medium">{team.name}</span>
//                                 <p className="text-xs text-muted-foreground">{team.mentor}</p>
//                               </div>
//                             </div>
//                           </TableCell>
//                           <TableCell className="font-semibold">{team.estimatedSocialLeads}</TableCell>
//                           <TableCell className="font-semibold">{team.estimatedSocialConsultations}</TableCell>
//                           <TableCell className="font-semibold">{team.estimatedSocialSales}</TableCell>
//                         </TableRow>
//                       ))}
//                     </TableBody>
//                   </Table>
//                 </CardContent>
//               </Card>
//             </div>
//           </TabsContent>

//           {/* Digital Marketing Tab Content */}
//           <TabsContent value="digital-marketing" className="space-y-6">
//             <h2 className="text-2xl font-bold">Digital Marketing Analytics</h2>
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Campaign Performance</CardTitle>
//                   <CardDescription>Key metrics for digital marketing campaigns</CardDescription>
//                 </CardHeader>
//                 <CardContent className="space-y-3">
//                   <div className="flex items-center justify-between border-b pb-2">
//                     <div className="flex items-center space-x-3">
//                       <Megaphone className="h-4 w-4 text-red-500" />
//                       <span className="font-medium">Ad Spend</span>
//                     </div>
//                     <div className="font-semibold text-lg">
//                       ₹{mockData.digitalMarketingAnalytics.adSpend.day} | ₹
//                       {mockData.digitalMarketingAnalytics.adSpend.mtd.toLocaleString()}
//                     </div>
//                   </div>
//                   <div className="flex items-center justify-between border-b pb-2">
//                     <div className="flex items-center space-x-3">
//                       <TrendingUp className="h-4 w-4 text-green-500" />
//                       <span className="font-medium">ROI</span>
//                     </div>
//                     <div className="font-semibold text-lg">
//                       {mockData.digitalMarketingAnalytics.roi.day}x | {mockData.digitalMarketingAnalytics.roi.mtd}x
//                     </div>
//                   </div>
//                   <div className="flex items-center justify-between border-b pb-2">
//                     <div className="flex items-center space-x-3">
//                       <ShoppingCart className="h-4 w-4 text-blue-500" />
//                       <span className="font-medium">Clicks</span>
//                     </div>
//                     <div className="font-semibold text-lg">
//                       {mockData.digitalMarketingAnalytics.clicks.day} |{" "}
//                       {mockData.digitalMarketingAnalytics.clicks.mtd.toLocaleString()}
//                     </div>
//                   </div>
//                   <div className="flex items-center justify-between border-b pb-2">
//                     <div className="flex items-center space-x-3">
//                       <Users className="h-4 w-4 text-purple-500" />
//                       <span className="font-medium">Total Users</span>
//                     </div>
//                     <div className="font-semibold text-lg">
//                       {mockData.digitalMarketingAnalytics.totalUsers.day.toLocaleString()} |{" "}
//                       {mockData.digitalMarketingAnalytics.totalUsers.mtd.toLocaleString()}
//                     </div>
//                   </div>
//                   <div className="flex items-center justify-between border-b pb-2">
//                     <div className="flex items-center space-x-3">
//                       <Activity className="h-4 w-4 text-orange-500" />
//                       <span className="font-medium">Unique Engagement</span>
//                     </div>
//                     <div className="font-semibold text-lg">
//                       {mockData.digitalMarketingAnalytics.uniqueEngagement.day.toLocaleString()} |{" "}
//                       {mockData.digitalMarketingAnalytics.uniqueEngagement.mtd.toLocaleString()}
//                     </div>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center space-x-3">
//                       <UserPlus className="h-4 w-4 text-orange-500" />
//                       <span className="font-medium">Leads Generated</span>
//                     </div>
//                     <div className="font-semibold text-lg">
//                       {mockData.digitalMarketingAnalytics.leadsFromGoogleAds.day} |{" "}
//                       {mockData.digitalMarketingAnalytics.leadsFromGoogleAds.mtd}
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Conversion & Cost</CardTitle>
//                   <CardDescription>Conversion metrics and cost efficiency</CardDescription>
//                 </CardHeader>
//                 <CardContent className="space-y-3">
//                   <div className="flex items-center justify-between border-b pb-2">
//                     <div className="flex items-center space-x-3">
//                       <Award className="h-4 w-4 text-yellow-500" />
//                       <span className="font-medium">Conversions</span>
//                     </div>
//                     <div className="font-semibold text-lg">
//                       {mockData.digitalMarketingAnalytics.conversions.day} |{" "}
//                       {mockData.digitalMarketingAnalytics.conversions.mtd}
//                     </div>
//                   </div>
//                   <div className="flex items-center justify-between border-b pb-2">
//                     <div className="flex items-center space-x-3">
//                       <DollarSign className="h-4 w-4 text-purple-500" />
//                       <span className="font-medium">Cost Per Click (CPC)</span>
//                     </div>
//                     <div className="font-semibold text-lg">
//                       ${mockData.digitalMarketingAnalytics.cpc.day} | ${mockData.digitalMarketingAnalytics.cpc.mtd}
//                     </div>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center space-x-3">
//                       <LineChart className="h-4 w-4 text-green-500" />
//                       <span className="font-medium">Revenue from Digital</span>
//                     </div>
//                     <div className="font-semibold text-lg">
//                       ₹{(mockData.leadSourceAnalytics[3].revenue / 1000).toFixed(0)}K
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//               {/* Combined Website Performance Card */}
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Website Performance</CardTitle>
//                   <CardDescription>Traffic, engagement, and leads from the website</CardDescription>
//                 </CardHeader>
//                 <CardContent className="space-y-3">
//                   <h3 className="text-md font-semibold mb-2">Traffic Overview</h3>
//                   <div className="flex items-center justify-between border-b pb-2">
//                     <div className="flex items-center space-x-3">
//                       <Users2 className="h-4 w-4 text-blue-500" />
//                       <span className="font-medium">Total Visitors</span>
//                     </div>
//                     <div className="font-semibold text-lg">
//                       {mockData.websiteAnalytics.totalVisitors.day} |{" "}
//                       {mockData.websiteAnalytics.totalVisitors.mtd.toLocaleString()}
//                     </div>
//                   </div>
//                   <div className="flex items-center justify-between border-b pb-2">
//                     <div className="flex items-center space-x-3">
//                       <Eye className="h-4 w-4 text-purple-500" />
//                       <span className="font-medium">Page Views</span>
//                     </div>
//                     <div className="font-semibold text-lg">
//                       {mockData.websiteAnalytics.pageViews.day} |{" "}
//                       {mockData.websiteAnalytics.pageViews.mtd.toLocaleString()}
//                     </div>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center space-x-3">
//                       <Activity className="h-4 w-4 text-orange-500" />
//                       <span className="font-medium">Avg. Session Duration</span>
//                     </div>
//                     <div className="font-semibold text-lg">
//                       {mockData.websiteAnalytics.avgSessionDuration.day} |{" "}
//                       {mockData.websiteAnalytics.avgSessionDuration.mtd}
//                     </div>
//                   </div>

//                   <h3 className="text-md font-semibold mt-4 mb-2 pt-3 border-t">Engagement & Leads</h3>
//                   <div className="flex items-center justify-between border-b pb-2">
//                     <div className="flex items-center space-x-3">
//                       <TrendingUp className="h-4 w-4 text-green-500" />
//                       <span className="font-medium">Bounce Rate</span>
//                     </div>
//                     <div className="font-semibold text-lg">
//                       {mockData.websiteAnalytics.bounceRate.day}% | {mockData.websiteAnalytics.bounceRate.mtd}%
//                     </div>
//                   </div>
//                   <div className="flex items-center justify-between border-b pb-2">
//                     <div className="flex items-center space-x-3">
//                       <Users className="h-4 w-4 text-purple-500" />
//                       <span className="font-medium">Total Users</span>
//                     </div>
//                     <div className="font-semibold text-lg">
//                       {mockData.websiteAnalytics.totalUsers.day.toLocaleString()} |{" "}
//                       {mockData.websiteAnalytics.totalUsers.mtd.toLocaleString()}
//                     </div>
//                   </div>
//                   <div className="flex items-center justify-between border-b pb-2">
//                     <div className="flex items-center space-x-3">
//                       <Activity className="h-4 w-4 text-orange-500" />
//                       <span className="font-medium">Unique Engagement</span>
//                     </div>
//                     <div className="font-semibold text-lg">
//                       {mockData.websiteAnalytics.uniqueEngagement.day.toLocaleString()} |{" "}
//                       {mockData.websiteAnalytics.uniqueEngagement.mtd.toLocaleString()}
//                     </div>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center space-x-3">
//                       <UserPlus className="h-4 w-4 text-teal-500" />
//                       <span className="font-medium">Leads from Website</span>
//                     </div>
//                     <div className="font-semibold text-lg">
//                       {mockData.websiteAnalytics.leadsFromWebsite.day} |{" "}
//                       {mockData.websiteAnalytics.leadsFromWebsite.mtd}
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>

//             {/* Overall Male/Female Leads */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Overall Male Leads</CardTitle>
//                   <CardDescription>Total male leads in the system</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="flex items-center justify-between">
//                     <span className="text-4xl font-bold">{maleLeadsCount}</span>
//                     <span className="text-lg text-muted-foreground">Male Leads</span>
//                   </div>
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Overall Female Leads</CardTitle>
//                   <CardDescription>Total female leads in the system</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="flex items-center justify-between">
//                     <span className="text-4xl font-bold">{femaleLeadsCount}</span>
//                     <span className="text-lg text-muted-foreground">Female Leads</span>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>

//             {/* Clinical Conditions Section */}
//             <div className="space-y-6 mt-8">
//               <h2 className="text-2xl font-bold">Clinical Conditions</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {Object.entries(mockData.clinicalConditionsAnalytics)
//                   .slice(0, 3)
//                   .map(([condition, data]) => (
//                     <Card key={condition}>
//                       <CardHeader className="pb-2">
//                         <CardTitle className="text-sm font-medium">
//                           <Badge className="bg-purple-600 text-white">{condition}</Badge>
//                         </CardTitle>
//                       </CardHeader>
//                       <CardContent className="space-y-2">
//                         <div className="flex items-center justify-between">
//                           <span className="text-sm text-muted-foreground">OLR</span>
//                           <span className="font-semibold text-base">
//                             {data.olr.count} | {data.olr.value}
//                           </span>
//                         </div>
//                         <div className="flex items-center justify-between">
//                           <span className="text-sm text-muted-foreground">OCL</span>
//                           <span className="font-semibold text-base">
//                             {data.ocl.count} | {data.ocl.value}
//                           </span>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   ))}
//               </div>
//               <h2 className="text-2xl font-bold mt-8">Other Clinical Conditions</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {Object.entries(mockData.clinicalConditionsAnalytics)
//                   .slice(3)
//                   .map(([condition, data]) => (
//                     <Card key={condition}>
//                       <CardHeader className="pb-2">
//                         <CardTitle className="text-sm font-medium">
//                           <Badge className="bg-purple-600 text-white">{condition}</Badge>
//                         </CardTitle>
//                       </CardHeader>
//                       <CardContent className="space-y-2">
//                         <div className="flex items-center justify-between">
//                           <span className="text-sm text-muted-foreground">OLR</span>
//                           <span className="font-semibold text-base">
//                             {data.olr.count} | {data.olr.value}
//                           </span>
//                         </div>
//                         <div className="flex items-center justify-between">
//                           <span className="text-sm text-muted-foreground">OCL</span>
//                           <span className="font-semibold text-base">
//                             {data.ocl.count} | {data.ocl.value}
//                           </span>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   ))}
//               </div>
//             </div>

//             {/* Campaigns Overview Section */}
//             <div className="space-y-6 mt-8">
//               <div className="flex items-center justify-between">
//                 <h2 className="text-2xl font-bold">Campaigns Overview</h2>
//                 <div className="flex items-center space-x-2">
//                   <Button variant="outline">
//                     <Filter className="mr-2 h-4 w-4" />
//                     Filter
//                   </Button>
//                   <Button variant="outline">
//                     <Download className="mr-2 h-4 w-4" />
//                     Export
//                   </Button>
//                 </div>
//               </div>

//               <Card>
//                 <CardHeader>
//                   <CardTitle>Campaign List</CardTitle>
//                   <CardDescription>Click on a campaign to view its snapshot</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <Table>
//                     <TableHeader>
//                       <TableRow>
//                         <TableHead>Campaign Name</TableHead>
//                         <TableHead>Type</TableHead>
//                         <TableHead>Status</TableHead>
//                         <TableHead className="text-right">Leads Generated</TableHead>
//                         <TableHead className="text-right">Revenue Generated</TableHead>
//                       </TableRow>
//                     </TableHeader>
//                     <TableBody>
//                       {mockData.campaigns.map((campaign) => (
//                         <TableRow
//                           key={campaign.id}
//                           className="cursor-pointer hover:bg-gray-50"
//                           onClick={() => handleCampaignClick(campaign)}
//                         >
//                           <TableCell className="font-medium">{campaign.name}</TableCell>
//                           <TableCell>{campaign.type}</TableCell>
//                           <TableCell>
//                             <Badge
//                               variant="outline"
//                               className={
//                                 campaign.status === "Active"
//                                   ? "bg-green-100 text-green-800"
//                                   : "bg-gray-100 text-gray-800"
//                               }
//                             >
//                               {campaign.status}
//                             </Badge>
//                           </TableCell>
//                           <TableCell className="text-right">{campaign.leadsGenerated}</TableCell>
//                           <TableCell className="text-right">
//                             ₹{(campaign.revenueGenerated / 1000).toFixed(0)}K
//                           </TableCell>
//                         </TableRow>
//                       ))}
//                     </TableBody>
//                   </Table>
//                 </CardContent>
//               </Card>
//             </div>

//             {/* Lead MIS Section */}
//             <div className="space-y-6 mt-8">
//               <div className="flex items-center justify-between">
//                 <h2 className="text-2xl font-bold">Lead MIS for Retargeting</h2>
//                 <div className="flex items-center space-x-2">
//                   <Button variant="outline" onClick={handleExportLeads}>
//                     <Download className="mr-2 h-4 w-4" />
//                     Export Filtered Leads ({filteredLeads.length})
//                   </Button>
//                   <Select value={selectedWatiTemplate} onValueChange={setSelectedWatiTemplate}>
//                     <SelectTrigger className="w-[200px]">
//                       <SelectValue placeholder="Select WATI Template" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {mockData.watiTemplates.map((template) => (
//                         <SelectItem key={template.id} value={template.name}>
//                           {template.name}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                   <Button onClick={handleWatiBroadcast} disabled={!selectedWatiTemplate}>
//                     <Send className="mr-2 h-4 w-4" />
//                     Run WATI Broadcast
//                   </Button>
//                 </div>
//               </div>

//               {/* Filters */}
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Filter Leads</CardTitle>
//                   <CardDescription>Apply filters to segment leads for retargeting</CardDescription>
//                 </CardHeader>
//                 <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//                   <Select
//                     value={genderFilter || "all"}
//                     onValueChange={(value) => setGenderFilter(value === "all" ? null : value)}
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="Gender" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="all">All Genders</SelectItem>
//                       {uniqueGenders.map((gender) => (
//                         <SelectItem key={gender} value={gender}>
//                           {gender}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>

//                   <Select
//                     value={ageGroupFilter || "all"}
//                     onValueChange={(value) => setAgeGroupFilter(value === "all" ? null : value)}
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="Age Group" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="all">All Age Groups</SelectItem>
//                       {uniqueAgeGroups.map((group) => (
//                         <SelectItem key={group} value={group}>
//                           {group}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>

//                   <Select
//                     value={clinicalConditionFilter || "all"}
//                     onValueChange={(value) => setClinicalConditionFilter(value === "all" ? null : value)}
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="Clinical Condition" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="all">All Conditions</SelectItem>
//                       {uniqueClinicalConditions.map((condition) => (
//                         <SelectItem key={condition} value={condition}>
//                           {condition}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>

//                   <Select
//                     value={regionFilter || "all"}
//                     onValueChange={(value) => setRegionFilter(value === "all" ? null : value)}
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="Region" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="all">All Regions</SelectItem>
//                       {uniqueRegions.map((region) => (
//                         <SelectItem key={region} value={region}>
//                           {region}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>

//                   <Select
//                     value={countryFilter || "all"}
//                     onValueChange={(value) => setCountryFilter(value === "all" ? null : value)}
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="Country" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="all">All Countries</SelectItem>
//                       {uniqueCountries.map((country) => (
//                         <SelectItem key={country} value={country}>
//                           {country}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>

//                   <Select
//                     value={stateFilter || "all"}
//                     onValueChange={(value) => setStateFilter(value === "all" ? null : value)}
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="State" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="all">All States</SelectItem>
//                       {uniqueStates.map((state) => (
//                         <SelectItem key={state} value={state}>
//                           {state}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>

//                   <Select
//                     value={cityFilter || "all"}
//                     onValueChange={(value) => setCityFilter(value === "all" ? null : value)}
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="City" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="all">All Cities</SelectItem>
//                       {uniqueCities.map((city) => (
//                         <SelectItem key={city} value={city}>
//                           {city}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>

//                   <Select
//                     value={salesStatusFilter || "all"}
//                     onValueChange={(value) => setSalesStatusFilter(value === "all" ? null : value)}
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="Sales Status" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="all">All Statuses</SelectItem>
//                       {uniqueSalesStatuses.map((status) => (
//                         <SelectItem key={status} value={status}>
//                           {status}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>

//                   <Select
//                     value={stageFilter || "all"}
//                     onValueChange={(value) => setStageFilter(value === "all" ? null : value)}
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="Stage" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="all">All Stages</SelectItem>
//                       {uniqueStages.map((stage) => (
//                         <SelectItem key={stage} value={stage}>
//                           {stage}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>

//                   <Button
//                     variant="outline"
//                     onClick={() => {
//                       setGenderFilter(null)
//                       setAgeGroupFilter(null)
//                       setClinicalConditionFilter(null)
//                       setRegionFilter(null)
//                       setCountryFilter(null)
//                       setStateFilter(null)
//                       setCityFilter(null)
//                       setSalesStatusFilter(null)
//                       setStageFilter(null)
//                     }}
//                   >
//                     Clear Filters
//                   </Button>
//                 </CardContent>
//               </Card>

//               {/* Filtered Leads Table */}
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Filtered Leads ({filteredLeads.length})</CardTitle>
//                   <CardDescription>List of leads matching the applied filters</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <Table>
//                     <TableHeader>
//                       <TableRow>
//                         <TableHead>Name</TableHead>
//                         <TableHead>Gender</TableHead>
//                         <TableHead>Age Group</TableHead>
//                         <TableHead>Clinical Condition</TableHead>
//                         <TableHead>Region</TableHead>
//                         <TableHead>Sales Status</TableHead>
//                         <TableHead>Stage</TableHead>
//                         <TableHead>Previous Campaigns</TableHead>
//                       </TableRow>
//                     </TableHeader>
//                     <TableBody>
//                       {filteredLeads.length > 0 ? (
//                         filteredLeads.map((lead) => (
//                           <TableRow key={lead.id}>
//                             <TableCell className="font-medium">{lead.name}</TableCell>
//                             <TableCell>{lead.gender}</TableCell>
//                             <TableCell>{lead.ageGroup}</TableCell>
//                             <TableCell>{lead.clinicalCondition.join(", ")}</TableCell>
//                             <TableCell>{`${lead.city}, ${lead.state}, ${lead.country}`}</TableCell>
//                             <TableCell>
//                               <Badge className={getStatusColor(lead.salesStatus)}>{lead.salesStatus}</Badge>
//                             </TableCell>
//                             <TableCell>{lead.stage}</TableCell>
//                             <TableCell>
//                               {lead.previousCampaigns.length > 0 ? (
//                                 <div className="flex flex-wrap gap-1">
//                                   {lead.previousCampaigns.map((campaign, index) => (
//                                     <Badge key={index} variant="secondary">
//                                       {campaign}
//                                     </Badge>
//                                   ))}
//                                 </div>
//                               ) : (
//                                 <span className="text-muted-foreground">None</span>
//                               )}
//                             </TableCell>
//                           </TableRow>
//                         ))
//                       ) : (
//                         <TableRow>
//                           <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
//                             No leads found matching the filters.
//                           </TableCell>
//                         </TableRow>
//                       )}
//                     </TableBody>
//                   </Table>
//                 </CardContent>
//               </Card>
//             </div>
//           </TabsContent>

//           {/* App Analytics Tab Content (Moved from previous location) */}
//           <TabsContent value="app-analytics" className="space-y-6">
//             <h2 className="text-2xl font-bold">App Analytics Overview</h2>
//             {/* App Download Counts */}
//             <h2 className="text-2xl font-bold mt-8">App Download Counts</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 overflow-x-auto pb-4">
//               {Object.entries(mockData.appAnalytics.appDownloadsBreakdown).map(([period, data]) => (
//                 <Card key={period} className="min-w-[200px]">
//                   {" "}
//                   {/* Added min-w to ensure cards don't shrink too much */}
//                   <CardHeader className="pb-2">
//                     <CardTitle className="text-sm font-medium capitalize">
//                       {period
//                         .replace(/([A-Z])/g, " $1")
//                         .replace(/month/, "This Month")
//                         .trim()}{" "}
//                       Downloads
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent className="space-y-2">
//                     <div className="flex items-center justify-between">
//                       <span className="text-sm text-muted-foreground">Lead</span>
//                       <span className="font-semibold text-base">{data.lead}</span>
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <span className="text-sm text-muted-foreground">OC</span> {/* Changed from Organic Conversions */}
//                       <span className="font-semibold text-base">{data.organic}</span>
//                     </div>
//                     <div className="flex items-center justify-between pt-2 border-t">
//                       <span className="font-medium">Total</span>
//                       <span className="font-semibold text-lg">{data.total}</span>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//             {/* App Usage Overview */}
//             <Card>
//               <CardHeader>
//                 <CardTitle>App Usage Overview</CardTitle>
//                 <CardDescription>Key metrics related to app downloads and user base</CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-3">
//                 <div className="flex items-center justify-between border-b pb-2">
//                   <div className="flex items-center space-x-3">
//                     <Smartphone className="h-4 w-4 text-teal-500" />
//                     <span className="font-medium">Total Downloads</span>
//                   </div>
//                   <div className="font-semibold text-lg">
//                     {mockData.appAnalytics.appDownloadsBreakdown.today.total} |{" "}
//                     {mockData.appAnalytics.appDownloadsBreakdown.month.total.toLocaleString()}
//                   </div>
//                 </div>
//                 <div className="flex items-center justify-between border-b pb-2">
//                   <div className="flex items-center space-x-3">
//                     <Users className="h-4 w-4 text-green-500" />
//                     <span className="font-medium">Total Leads with App</span>
//                   </div>
//                   <div className="font-semibold text-lg">
//                     {mockData.appAnalytics.totalLeadsWithApp.day} |{" "}
//                     {mockData.appAnalytics.totalLeadsWithApp.mtd.toLocaleString()}
//                   </div>
//                 </div>
//                 <div className="flex items-center justify-between border-b pb-2">
//                   <div className="flex items-center space-x-3">
//                     <Users className="h-4 w-4 text-red-500" />
//                     <span className="font-medium">Total Leads Without App</span>
//                   </div>
//                   <div className="font-semibold text-lg">
//                     {mockData.appAnalytics.totalLeadsWithoutApp.day} |{" "}
//                     {mockData.appAnalytics.totalLeadsWithoutApp.mtd.toLocaleString()}
//                   </div>
//                 </div>
//                 <div className="flex items-center justify-between border-b pb-2">
//                   <div className="flex items-center space-x-3">
//                     <XCircle className="h-4 w-4 text-gray-500" />
//                     <span className="font-medium">Uninstalls</span>
//                   </div>
//                   <div className="font-semibold text-lg">
//                     {mockData.appAnalytics.uninstalls.day} | {mockData.appAnalytics.uninstalls.mtd.toLocaleString()}
//                   </div>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-3">
//                     <TrendingUp className="h-4 w-4 text-purple-500" />
//                     <span className="font-medium">App Conversion</span>
//                   </div>
//                   <div className="font-semibold text-lg">{appConversion}%</div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Key Engagement Metrics */}
//             <Card>
//               <CardHeader>
//                 <CardTitle>Key Engagement Metrics</CardTitle>
//                 <CardDescription>Important user actions within the app</CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-3">
//                 <div className="flex items-center justify-between border-b pb-2">
//                   <div className="flex items-center space-x-3">
//                     <HeartHandshake className="h-4 w-4 text-orange-500" />
//                     <span className="font-medium">Health Score Taken</span>
//                   </div>
//                   <div className="font-semibold text-lg">
//                     {mockData.appAnalytics.hsTaken.day} | {mockData.appAnalytics.hsTaken.mtd.toLocaleString()}
//                   </div>
//                 </div>
//                 <div className="flex items-center justify-between border-b pb-2">
//                   <div className="flex items-center space-x-3">
//                     <PhoneCall className="h-4 w-4 text-red-500" />
//                     <span className="font-medium">Consultations Booked</span>
//                   </div>
//                   <div className="font-semibold text-lg">
//                     {mockData.appAnalytics.consultationBooked.day} |{" "}
//                     {mockData.appAnalytics.consultationBooked.mtd.toLocaleString()}
//                   </div>
//                 </div>
//                 <div className="flex items-center justify-between border-b pb-2">
//                   <div className="flex items-center space-x-3">
//                     <BookText className="h-4 w-4 text-blue-500" />
//                     <span className="font-medium">Program Page Visits</span>
//                   </div>
//                   <div className="font-semibold text-lg">
//                     {mockData.appAnalytics.programPageVisits.day} |{" "}
//                     {mockData.appAnalytics.programPageVisits.mtd.toLocaleString()}
//                   </div>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-3">
//                     <ShoppingCart className="h-4 w-4 text-green-500" />
//                     <span className="font-medium">Checkout Page Visits</span>
//                   </div>
//                   <div className="font-semibold text-lg">
//                     {mockData.appAnalytics.checkoutPageVisits.day} |{" "}
//                     {mockData.appAnalytics.checkoutPageVisits.mtd.toLocaleString()}
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Activated Features */}
//             <Card>
//               <CardHeader>
//                 <CardTitle>Activated Features</CardTitle>
//                 <CardDescription>User activations of key app features</CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-3">
//                 <div className="flex items-center justify-between border-b pb-2">
//                   <div className="flex items-center space-x-3">
//                     <Gift className="h-4 w-4 text-purple-500" />
//                     <span className="font-medium">Free Guide Activated</span>
//                   </div>
//                   <div className="font-semibold text-lg">
//                     {mockData.appAnalytics.freeGuideActivated.day} |{" "}
//                     {mockData.appAnalytics.freeGuideActivated.mtd.toLocaleString()}
//                   </div>
//                 </div>
//                 <div className="flex items-center justify-between border-b pb-2">
//                   <div className="flex items-center space-x-3">
//                     <Ticket className="h-4 w-4 text-orange-500" />
//                     <span className="font-medium">Coupon Code Activated</span>
//                   </div>
//                   <div className="font-semibold text-lg">
//                     {mockData.appAnalytics.couponCodeActivated.day} |{" "}
//                     {mockData.appAnalytics.couponCodeActivated.mtd.toLocaleString()}
//                   </div>
//                 </div>
//                 <div className="flex items-center justify-between border-b pb-2">
//                   <div className="flex items-center space-x-3">
//                     <RefreshCw className="h-4 w-4 text-blue-500" />
//                     <span className="font-medium">Spin to Win Activated</span>
//                   </div>
//                   <div className="font-semibold text-lg">
//                     {mockData.appAnalytics.spinToWinActivated.day} |{" "}
//                     {mockData.appAnalytics.spinToWinActivated.mtd.toLocaleString()}
//                   </div>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-3">
//                     <UserPlus className="h-4 w-4 text-green-500" />
//                     <span className="font-medium">Leads with Go Pro</span>
//                   </div>
//                   <div className="font-semibold text-lg">
//                     {mockData.appAnalytics.leadsWithGoPro.day} |{" "}
//                     {mockData.appAnalytics.leadsWithGoPro.mtd.toLocaleString()}
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>
//         </Tabs>

//         {/* Content Engagement Section */}
//         <h2 className="text-2xl font-bold mt-8">Content Engagement</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           <Card>
//             <CardHeader>
//               <CardTitle>Content Visits</CardTitle>
//               <CardDescription>User engagement with various content types</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-2">
//               <div className="flex items-center justify-between border-b pb-2">
//                 <div className="flex items-center space-x-2">
//                   <ClipboardList className="h-4 w-4 text-blue-500" />
//                   <span className="font-medium">Tips Visit</span>
//                 </div>
//                 <span className="font-semibold text-red-500">
//                   {mockData.appAnalytics.tipsVisit.day} | {mockData.appAnalytics.tipsVisit.mtd}
//                 </span>
//               </div>
//               <div className="flex items-center justify-between border-b pb-2">
//                 <div className="flex items-center space-x-2">
//                   <Video className="h-4 w-4 text-purple-500" />
//                   <span className="font-medium">Video Visits</span>
//                 </div>
//                 <span className="font-semibold text-red-500">
//                   {mockData.appAnalytics.videoVisits.day} | {mockData.appAnalytics.videoVisits.mtd}
//                 </span>
//               </div>
//               <div className="flex items-center justify-between border-b pb-2">
//                 <div className="flex items-center space-x-2">
//                   <BookOpen className="h-4 w-4 text-orange-500" />
//                   <span className="font-medium">Recipe Visits</span>
//                 </div>
//                 <span className="font-semibold text-red-500">
//                   {mockData.appAnalytics.recipeVisits.day} | {mockData.appAnalytics.recipeVisits.mtd}
//                 </span>
//               </div>
//               <div className="flex items-center justify-between border-b pb-2">
//                 <div className="flex items-center space-x-2">
//                   <Award className="h-4 w-4 text-yellow-500" />
//                   <span className="font-medium">Success Stories Visits</span>
//                 </div>
//                 <span className="font-semibold text-red-500">
//                   {mockData.appAnalytics.successStoriesVisits.day} | {mockData.appAnalytics.successStoriesVisits.mtd}
//                 </span>
//               </div>
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-2">
//                   <CreditCard className="h-4 w-4 text-green-500" />
//                   <span className="font-medium">Wallet Visits</span>
//                 </div>
//                 <span className="font-semibold text-red-500">
//                   {mockData.appAnalytics.walletVisits.day} | {mockData.appAnalytics.walletVisits.mtd}
//                 </span>
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle>Guide & Book Interactions</CardTitle>
//               <CardDescription>User interactions with guides and recipe books</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-2">
//               <div className="flex items-center justify-between border-b pb-2">
//                 <div className="flex items-center space-x-2">
//                   <Book className="h-4 w-4 text-red-500" />
//                   <span className="font-medium">Alcohol Guide Filled</span>
//                 </div>
//                 <span className="font-semibold text-red-500">
//                   {mockData.appAnalytics.alcoholGuideFilled.day} | {mockData.appAnalytics.alcoholGuideFilled.mtd}
//                 </span>
//               </div>
//               <div className="flex items-center justify-between border-b pb-2">
//                 <div className="flex items-center space-x-2">
//                   <Utensils className="h-4 w-4 text-brown-500" />
//                   <span className="font-medium">Restaurant Guide Filled</span>
//                 </div>
//                 <span className="font-semibold text-red-500">
//                   {mockData.appAnalytics.restaurantGuideFilled.day} | {mockData.appAnalytics.restaurantGuideFilled.mtd}
//                 </span>
//               </div>
//               <div className="flex items-center justify-between border-b pb-2">
//                 <div className="flex items-center space-x-2">
//                   <BookOpen className="h-4 w-4 text-teal-500" />
//                   <span className="font-medium">Recipe Book Created</span>
//                 </div>
//                 <span className="font-semibold text-red-500">
//                   {mockData.appAnalytics.recipeBookCreated.day} | {mockData.appAnalytics.recipeBookCreated.mtd}
//                 </span>
//               </div>
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-2">
//                   <UsersRound className="h-4 w-4 text-indigo-500" />
//                   <span className="font-medium">Peer Group Visit</span>
//                 </div>
//                 <span className="font-semibold text-red-500">
//                   {mockData.appAnalytics.peerGroupVisit.day} | {mockData.appAnalytics.peerGroupVisit.mtd}
//                 </span>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//       {/* Leads Modal */}
//       <Dialog open={showLeadsModal} onOpenChange={setShowLeadsModal}>
//         <DialogContent className="max-w-4xl">
//           <DialogHeader>
//             <DialogTitle>
//               {modalType === "assigned"
//                 ? "Assigned Leads - Counsellor Performance"
//                 : "Unassigned Leads - Source Breakdown"}
//             </DialogTitle>
//             <DialogDescription>
//               {modalType === "assigned"
//                 ? "Detailed performance metrics for each counsellor including consultation and sales ratios"
//                 : "Source-wise distribution of unassigned leads"}
//             </DialogDescription>
//           </DialogHeader>

//           {modalType === "assigned" ? (
//             <div className="space-y-4">
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Counsellor</TableHead>
//                     <TableHead>Leads Assigned</TableHead>
//                     <TableHead>Consultations</TableHead>
//                     <TableHead>Sales</TableHead>
//                     <TableHead>Lead→Consultation</TableHead>
//                     <TableHead>Consultation→Sales</TableHead>
//                     <TableHead>Lead→Sales</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {mockData.counsellors.map((counsellor) => {
//                     const leadToConsultationRatio =
//                       counsellor.leadsAssigned > 0
//                         ? ((counsellor.consultations / counsellor.leadsAssigned) * 100).toFixed(1)
//                         : "0.0"
//                     const consultationToSalesRatio =
//                       counsellor.consultations > 0
//                         ? ((counsellor.salesClosed / counsellor.consultations) * 100).toFixed(1)
//                         : "0.0"
//                     const leadToSalesRatio =
//                       counsellor.leadsAssigned > 0
//                         ? ((counsellor.salesClosed / counsellor.leadsAssigned) * 100).toFixed(1)
//                         : "0.0"

//                     return (
//                       <TableRow key={counsellor.id}>
//                         <TableCell>
//                           <div className="flex items-center space-x-3">
//                             <Avatar className="h-8 w-8">
//                               <AvatarImage src={counsellor.avatar || "/placeholder.svg"} />
//                               <AvatarFallback>
//                                 {counsellor.name
//                                   .split(" ")
//                                   .map((n) => n[0])
//                                   .join("")}
//                               </AvatarFallback>
//                             </Avatar>
//                             <span className="font-medium">{counsellor.name}</span>
//                           </div>
//                         </TableCell>
//                         <TableCell className="font-semibold">{counsellor.leadsAssigned}</TableCell>
//                         <TableCell className="font-semibold">{counsellor.consultations}</TableCell>
//                         <TableCell className="font-semibold">{counsellor.salesClosed}</TableCell>
//                         <TableCell>
//                           <Badge variant="outline" className="bg-blue-50 text-blue-700">
//                             {leadToConsultationRatio}%
//                           </Badge>
//                         </TableCell>
//                         <TableCell>
//                           <Badge variant="outline" className="bg-green-50 text-green-700">
//                             {consultationToSalesRatio}%
//                           </Badge>
//                         </TableCell>
//                         <TableCell>
//                           <Badge variant="outline" className="bg-purple-50 text-purple-700">
//                             {leadToSalesRatio}%
//                           </Badge>
//                         </TableCell>
//                       </TableRow>
//                     )
//                   })}
//                 </TableBody>
//               </Table>

//               <div className="pt-4 border-t">
//                 <div className="grid grid-cols-3 gap-4 text-sm">
//                   <div className="text-center">
//                     <p className="text-muted-foreground">Total Leads Assigned</p>
//                     <p className="text-2xl font-bold">{mockData.overview.assignedLeads}</p>
//                   </div>
//                   <div className="text-center">
//                     <p className="text-muted-foreground">Total Consultations</p>
//                     <p className="text-2xl font-bold">
//                       {mockData.counsellors.reduce((sum, c) => sum + c.consultations, 0)}
//                     </p>
//                   </div>
//                   <div className="text-center">
//                     <p className="text-muted-foreground">Total Sales</p>
//                     <p className="text-2xl font-bold">{mockData.overview.totalSales}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {Object.entries(mockData.leadsSources.unassigned).map(([source, count]) => {
//                 const percentage = ((count / mockData.overview.unassignedLeads) * 100).toFixed(1)
//                 return (
//                   <div key={source} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
//                     <div className="flex items-center space-x-3">
//                       <div className="w-3 h-3 rounded-full bg-orange-500"></div>
//                       <span className="capitalize font-medium">{source.replace(/([A-Z])/g, " $1").trim()}</span>
//                     </div>
//                     <div className="text-right">
//                       <div className="font-semibold text-lg">{count}</div>
//                       <div className="text-xs text-muted-foreground">{percentage}%</div>
//                     </div>
//                   </div>
//                 )
//               })}
//               <div className="pt-4 border-t">
//                 <div className="flex justify-between items-center font-semibold">
//                   <span>Total Unassigned Leads</span>
//                   <span className="text-xl">{mockData.overview.unassignedLeads}</span>
//                 </div>
//               </div>
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>
//       {/* Sales Types Modal */}
//       <Dialog open={showSalesModal} onOpenChange={setShowSalesModal}>
//         <DialogContent className="max-w-md">
//           <DialogHeader>
//             <DialogTitle>Sales Breakdown by Stack Type</DialogTitle>
//             <DialogDescription>Distribution of sales across different nutrition stacks</DialogDescription>
//           </DialogHeader>
//           <div className="space-y-4">
//             {Object.entries(mockData.salesTypes).map(([type, count]) => {
//               const percentage = ((count / mockData.overview.totalSales) * 100).toFixed(1)
//               const getStackColor = (stackType: string) => {
//                 switch (stackType) {
//                   case "basicStack":
//                     return "bg-blue-500"
//                   case "specialStack":
//                     return "bg-green-500"
//                   case "platinumStack":
//                     return "bg-purple-500"
//                   default:
//                     return "bg-gray-500"
//                 }
//               }
//               const getStackName = (stackType: string) => {
//                 switch (stackType) {
//                   case "basicStack":
//                     return "Basic Stack"
//                   case "specialStack":
//                     return "Special Stack"
//                   case "platinumStack":
//                     return "Platinum Stack"
//                   default:
//                     return type
//                 }
//               }
//               return (
//                 <div key={type} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
//                   <div className="flex items-center space-x-3">
//                     <div className={`w-3 h-3 rounded-full ${getStackColor(type)}`}></div>
//                     <span className="font-medium">{getStackName(type)}</span>
//                   </div>
//                   <div className="text-right">
//                     <div className="font-semibold text-lg">{count}</div>
//                     <div className="text-xs text-muted-foreground">{percentage}%</div>
//                   </div>
//                 </div>
//               )
//             })}
//           </div>
//           <div className="pt-4 border-t">
//             <div className="grid grid-cols-2 gap-4 text-sm">
//               <div className="text-center">
//                 <p className="text-muted-foreground">Total Sales</p>
//                 <p className="text-xl font-bold">{mockData.overview.totalSales}</p>
//               </div>
//               <div className="text-center">
//                 <p className="text-muted-foreground">Total Revenue</p>
//                 <p className="text-xl font-bold">₹{(mockData.overview.revenue / 1000).toFixed(0)}K</p>
//               </div>
//             </div>
//           </div>
//         </DialogContent>
//       </Dialog>
//       {/* Team Performance Modal */}
//       <Dialog open={showTeamModal} onOpenChange={setShowTeamModal}>
//         <DialogContent className="max-w-5xl">
//           <DialogHeader>
//             <DialogTitle>Team Performance Overview</DialogTitle>
//             <DialogDescription>Counsellor and mentor team-wise performance analysis</DialogDescription>
//           </DialogHeader>

//           <div className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {mockData.teams.map((team) => {
//                 const achievementPercentage =
//                   team.targetSalesUnits > 0 ? (team.totalSalesUnits / team.targetSalesUnits) * 100 : 0
//                 const getPerformanceColor = (percentage: number) => {
//                   if (percentage >= 80) return "text-green-600"
//                   if (percentage >= 60) return "text-yellow-600"
//                   return "text-red-600"
//                 }

//                 return (
//                   <Card key={team.id} className="hover:shadow-md transition-shadow">
//                     <CardHeader className="pb-3">
//                       <div className="flex items-center justify-between">
//                         <CardTitle className="text-lg">{team.name}</CardTitle>
//                         <Badge variant="outline" className={getPerformanceColor(achievementPercentage)}>
//                           {achievementPercentage.toFixed(1)}%
//                         </Badge>
//                       </div>
//                       <div className="flex items-center space-x-3">
//                         <Avatar className="h-10 w-10">
//                           <AvatarImage src={team.mentorAvatar || "/placeholder.svg"} />
//                           <AvatarFallback>
//                             {team.mentor
//                               .split(" ")
//                               .map((n) => n[0])
//                               .join("")}
//                           </AvatarFallback>
//                         </Avatar>
//                         <div>
//                           <p className="text-sm font-medium">{team.mentor}</p>
//                           <p className="text-xs text-muted-foreground">Team Mentor</p>
//                         </div>
//                       </div>
//                     </CardHeader>
//                     <CardContent className="space-y-4">
//                       <div className="grid grid-cols-2 gap-4 text-sm">
//                         <div>
//                           <p className="text-muted-foreground">Leads Assigned</p>
//                           <p className="text-xl font-bold">{team.totalLeadsAssigned}</p>
//                         </div>
//                         <div>
//                           <p className="text-muted-foreground">Team Size</p>
//                           <p className="text-xl font-bold">{team.counsellors.length}</p>
//                         </div>
//                       </div>

//                       <div className="space-y-2">
//                         <div className="flex items-center justify-between text-sm">
//                           <span>Sales Progress</span>
//                           <span>
//                             {team.totalSalesUnits}/{team.targetSalesUnits}
//                           </span>
//                         </div>
//                         <Progress value={achievementPercentage} className="h-2" />
//                         <p className="text-xs text-center text-muted-foreground">
//                           {achievementPercentage.toFixed(1)}% of target achieved
//                         </p>
//                       </div>

//                       <div className="pt-2 border-t">
//                         <p className="text-xs text-muted-foreground mb-2">Team Members:</p>
//                         <div className="flex flex-wrap gap-1">
//                           {team.counsellors.map((counsellor, index) => (
//                             <Badge key={index} variant="secondary" className="text-xs">
//                               {counsellor.split(" ")[0]}
//                             </Badge>
//                           ))}
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 )
//               })}
//             </div>

//             {/* Team Summary */}
//             <div className="pt-4 border-t">
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                 <Card className="p-4">
//                   <div className="text-center">
//                     <div className="text-2xl font-bold text-blue-600">
//                       {mockData.teams.reduce((sum, team) => sum + team.totalLeadsAssigned, 0)}
//                     </div>
//                     <div className="text-sm text-muted-foreground">Total Leads Assigned</div>
//                   </div>
//                 </Card>

//                 <Card className="p-4">
//                   <div className="text-center">
//                     <div className="text-2xl font-bold text-green-600">
//                       {mockData.teams.reduce((sum, team) => sum + team.totalSalesUnits, 0)}
//                     </div>
//                     <div className="text-sm text-muted-foreground">Total Sales Units</div>
//                   </div>
//                 </Card>

//                 <Card className="p-4">
//                   <div className="text-center">
//                     <div className="text-2xl font-bold text-orange-600">
//                       {mockData.teams.reduce((sum, team) => sum + team.targetSalesUnits, 0)}
//                     </div>
//                     <div className="text-sm text-muted-foreground">Total Target Units</div>
//                   </div>
//                 </Card>

//                 <Card className="p-4">
//                   <div className="text-center">
//                     <div className="text-2xl font-bold text-teal-600">
//                       {(
//                         (mockData.teams.reduce((sum, team) => sum + team.totalSalesUnits, 0) /
//                           mockData.teams.reduce((sum, team) => sum + team.targetSalesUnits, 0)) *
//                         100
//                       ).toFixed(1)}
//                       %
//                     </div>
//                     <div className="text-sm text-muted-foreground">Overall Achievement</div>
//                   </div>
//                 </Card>
//               </div>
//             </div>
//           </div>
//         </DialogContent>
//       </Dialog>
//       {/* Revenue Modal */}
//       <Dialog open={showRevenueModal} onOpenChange={setShowRevenueModal}>
//         <DialogContent className="max-w-md">
//           <DialogHeader>
//             <DialogTitle>Revenue Breakdown by Stack Type</DialogTitle>
//             <DialogDescription>Distribution of revenue across different nutrition stacks</DialogDescription>
//           </DialogHeader>
//           <div className="space-y-4">
//             {Object.entries(mockData.salesTypes).map(([type, count]) => {
//               const percentage = ((count / mockData.overview.totalSales) * 100).toFixed(1)
//               const getStackColor = (stackType: string) => {
//                 switch (stackType) {
//                   case "basicStack":
//                     return "bg-blue-500"
//                   case "specialStack":
//                     return "bg-green-500"
//                   case "platinumStack":
//                     return "bg-purple-500"
//                   default:
//                     return "bg-gray-500"
//                 }
//               }
//               const getStackName = (stackType: string) => {
//                 switch (stackType) {
//                   case "basicStack":
//                     return "Basic Stack"
//                   case "specialStack":
//                     return "Special Stack"
//                   case "platinumStack":
//                     return "Platinum Stack"
//                   default:
//                     return type
//                 }
//               }
//               return (
//                 <div key={type} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
//                   <div className="flex items-center space-x-3">
//                     <div className={`w-3 h-3 rounded-full ${getStackColor(type)}`}></div>
//                     <span className="font-medium">{getStackName(type)}</span>
//                   </div>
//                   <div className="text-right">
//                     <div className="font-semibold text-lg">{count}</div>
//                     <div className="text-xs text-muted-foreground">{percentage}%</div>
//                   </div>
//                 </div>
//               )
//             })}
//           </div>
//           <div className="pt-4 border-t">
//             <div className="grid grid-cols-2 gap-4 text-sm">
//               <div className="text-center">
//                 <p className="text-muted-foreground">Total Sales</p>
//                 <p className="text-xl font-bold">{mockData.overview.totalSales}</p>
//               </div>
//               <div className="text-center">
//                 <p className="text-muted-foreground">Total Revenue</p>
//                 <p className="text-xl font-bold">₹{(mockData.overview.revenue / 1000).toFixed(0)}K</p>
//               </div>
//             </div>
//           </div>
//         </DialogContent>
//       </Dialog>
//       {/* Counsellor Snapshot Modal */}
//       <Dialog open={showCounsellorSnapshotModal} onOpenChange={setShowCounsellorSnapshotModal}>
//         <DialogContent className="max-w-4xl">
//           <DialogHeader>
//             <DialogTitle>Counsellor Snapshot</DialogTitle>
//             <DialogDescription>Detailed snapshot of the selected counsellor's performance</DialogDescription>
//           </DialogHeader>
//           {selectedCounsellor && (
//             <div className="space-y-6">
//               <div className="flex items-center space-x-4">
//                 <Avatar className="h-16 w-16">
//                   <AvatarImage src={selectedCounsellor.avatar || "/placeholder.svg"} />
//                   <AvatarFallback>
//                     {selectedCounsellor.name
//                       .split(" ")
//                       .map((n) => n[0])
//                       .join("")}
//                   </AvatarFallback>
//                 </Avatar>
//                 <div>
//                   <p className="text-xl font-semibold">{selectedCounsellor.name}</p>
//                   <p className="text-muted-foreground">Counsellor ID: {selectedCounsellor.id}</p>
//                 </div>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Key Metrics</CardTitle>
//                     <CardDescription>Overview of counsellor performance</CardDescription>
//                   </CardHeader>
//                   <CardContent className="space-y-3">
//                     <div className="flex items-center justify-between">
//                       <span className="font-medium">Leads Assigned</span>
//                       <span className="font-semibold text-lg">{selectedCounsellor.leadsAssigned}</span>
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <span className="font-medium">Consultations</span>
//                       <span className="font-semibold text-lg">{selectedCounsellor.consultations}</span>
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <span className="font-medium">Sales Closed</span>
//                       <span className="font-semibold text-lg">{selectedCounsellor.salesClosed}</span>
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <span className="font-medium">Conversion Rate</span>
//                       <span className="font-semibold text-lg">{selectedCounsellor.conversionRate}%</span>
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <span className="font-medium">Revenue</span>
//                       <span className="font-semibold text-lg">₹{(selectedCounsellor.revenue / 1000).toFixed(0)}K</span>
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <span className="font-medium">Avg. Pitch Per Day</span>
//                       <span className="font-semibold text-lg">{selectedCounsellor.avgPitchPerDay}</span>
//                     </div>
//                   </CardContent>
//                 </Card>
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Performance Tags</CardTitle>
//                     <CardDescription>Performance evaluation based on conversion rate</CardDescription>
//                   </CardHeader>
//                   <CardContent className="space-y-3">
//                     {/* Performance Tag */}
//                     {(() => {
//                       const performance = getPerformanceTag(selectedCounsellor.conversionRate)
//                       return (
//                         <div className="flex items-center justify-between">
//                           <span className="font-medium">Performance</span>
//                           <Badge className={performance.color}>{performance.tag}</Badge>
//                         </div>
//                       )
//                     })()}
//                     <div className="flex items-center justify-between">
//                       <span className="font-medium">Status</span>
//                       <Badge className={getStatusColor(selectedCounsellor.status)}>{selectedCounsellor.status}</Badge>
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <span className="font-medium">Last Active</span>
//                       <span className="font-semibold text-lg">{selectedCounsellor.lastActive}</span>
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <span className="font-medium">Best Conversion Source</span>
//                       <span className="font-semibold text-lg">{selectedCounsellor.bestConversionSource}</span>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </div>
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Leads by Status</CardTitle>
//                   <CardDescription>Breakdown of leads by their current status</CardDescription>
//                 </CardHeader>
//                 <CardContent className="space-y-3">
//                   {Object.entries(selectedCounsellor.snapshot.leadsByStatusDetail).map(([status, count]) => (
//                     <div key={status} className="flex items-center justify-between">
//                       <span className="font-medium capitalize">{status.replace(/([A-Z])/g, " $1").trim()}</span>
//                       <span className="font-semibold text-lg">{count}</span>
//                     </div>
//                   ))}
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Leads by Engagement</CardTitle>
//                   <CardDescription>Breakdown of leads by their engagement level</CardDescription>
//                 </CardHeader>
//                 <CardContent className="space-y-3">
//                   {Object.entries(selectedCounsellor.snapshot.leadsByEngagementDetail).map(([engagement, count]) => (
//                     <div key={engagement} className="flex items-center justify-between">
//                       <span className="font-medium capitalize">{engagement.replace(/([A-Z])/g, " $1").trim()}</span>
//                       <span className="font-semibold text-lg">{count}</span>
//                     </div>
//                   ))}
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Leads by Outcome</CardTitle>
//                   <CardDescription>Breakdown of leads by their final outcome</CardDescription>
//                 </CardHeader>
//                 <CardContent className="space-y-3">
//                   {Object.entries(selectedCounsellor.snapshot.leadsByOutcomeDetail).map(([outcome, count]) => (
//                     <div key={outcome} className="flex items-center justify-between">
//                       <span className="font-medium capitalize">{outcome.replace(/([A-Z])/g, " $1").trim()}</span>
//                       <span className="font-semibold text-lg">{count}</span>
//                     </div>
//                   ))}
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Misses and Risks</CardTitle>
//                   <CardDescription>Potential risks and missed opportunities</CardDescription>
//                 </CardHeader>
//                 <CardContent className="space-y-3">
//                   {Object.entries(selectedCounsellor.snapshot.missesAndRisks).map(([risk, count]) => (
//                     <div key={risk} className="flex items-center justify-between">
//                       <span className="font-medium capitalize">{risk.replace(/([A-Z])/g, " $1").trim()}</span>
//                       <span className="font-semibold text-lg">{count}</span>
//                     </div>
//                   ))}
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Downgraded Leads</CardTitle>
//                   <CardDescription>Leads that have been downgraded in status</CardDescription>
//                 </CardHeader>
//                 <CardContent className="space-y-3">
//                   {Object.entries(selectedCounsellor.snapshot.downgradedLeads).map(([downgrade, count]) => (
//                     <div key={downgrade} className="flex items-center justify-between">
//                       <span className="font-medium capitalize">{downgrade.replace(/([A-Z])/g, " $1").trim()}</span>
//                       <span className="font-semibold text-lg">{count}</span>
//                     </div>
//                   ))}
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Triggers Crossed</CardTitle>
//                   <CardDescription>Number of triggers crossed by the counsellor</CardDescription>
//                 </CardHeader>
//                 <CardContent className="space-y-3">
//                   {Object.entries(selectedCounsellor.snapshot.triggersCrossed).map(([trigger, count]) => (
//                     <div key={trigger} className="flex items-center justify-between">
//                       <span className="font-medium capitalize">{trigger.replace(/([A-Z])/g, " $1").trim()}</span>
//                       <span className="font-semibold text-lg">{count}</span>
//                     </div>
//                   ))}
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Payment Details Expiring</CardTitle>
//                   <CardDescription>Payment details expiring soon</CardDescription>
//                 </CardHeader>
//                 <CardContent className="space-y-3">
//                   {Object.entries(selectedCounsellor.snapshot.paymentDetailsExpiring).map(([date, data]) => (
//                     <div key={date} className="flex items-center justify-between">
//                       <span className="font-medium capitalize">{date}</span>
//                       <span className="font-semibold text-lg">
//                         {data.count} (₹{data.amount})
//                       </span>
//                     </div>
//                   ))}
//                 </CardContent>
//               </Card>
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>
//       {/* Campaign Snapshot Modal */}
//       <Dialog open={showCampaignSnapshotModal} onOpenChange={setShowCampaignSnapshotModal}>
//         <DialogContent className="max-w-4xl">
//           <DialogHeader>
//             <DialogTitle>Campaign Snapshot</DialogTitle>
//             <DialogDescription>Detailed snapshot of the selected campaign's performance</DialogDescription>
//           </DialogHeader>
//           {selectedCampaign && (
//             <div className="space-y-6">
//               <div className="flex items-center space-x-4">
//                 <div>
//                   <p className="text-xl font-semibold">{selectedCampaign.name}</p>
//                   <p className="text-muted-foreground">Campaign ID: {selectedCampaign.id}</p>
//                 </div>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Key Metrics</CardTitle>
//                     <CardDescription>Overview of campaign performance</CardDescription>
//                   </CardHeader>
//                   <CardContent className="space-y-3">
//                     <div className="flex items-center justify-between">
//                       <span className="font-medium">Type</span>
//                       <span className="font-semibold text-lg">{selectedCampaign.type}</span>
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <span className="font-medium">Status</span>
//                       <Badge
//                         className={
//                           selectedCampaign.status === "Active"
//                             ? "bg-green-100 text-green-800"
//                             : "bg-gray-100 text-gray-800"
//                         }
//                       >
//                         {selectedCampaign.status}
//                       </Badge>
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <span className="font-medium">Start Date</span>
//                       <span className="font-semibold text-lg">{selectedCampaign.startDate}</span>
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <span className="font-medium">End Date</span>
//                       <span className="font-semibold text-lg">{selectedCampaign.endDate}</span>
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <span className="font-medium">Ad Spend</span>
//                       <span className="font-semibold text-lg">₹{selectedCampaign.adSpend}</span>
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <span className="font-medium">Leads Generated</span>
//                       <span className="font-semibold text-lg">{selectedCampaign.leadsGenerated}</span>
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <span className="font-medium">Revenue Generated</span>
//                       <span className="font-semibold text-lg">₹{selectedCampaign.revenueGenerated}</span>
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <span className="font-medium">Conversion Rate</span>
//                       <span className="font-semibold text-lg">{selectedCampaign.conversionRate}%</span>
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <span className="font-medium">ROI</span>
//                       <span className="font-semibold text-lg">{selectedCampaign.roi}</span>
//                     </div>
//                   </CardContent>
//                 </Card>
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Targeted Users</CardTitle>
//                     <CardDescription>List of targeted user segments</CardDescription>
//                   </CardHeader>
//                   <CardContent className="space-y-3">
//                     {selectedCampaign.usersTargeted.map((user, index) => (
//                       <div key={index} className="flex items-center justify-between">
//                         <span className="font-medium">{user}</span>
//                       </div>
//                     ))}
//                   </CardContent>
//                 </Card>
//               </div>
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>
//     </div>
//   )
// }

export default function test() {
  return (
    <div>
      
    </div>
  )
}
