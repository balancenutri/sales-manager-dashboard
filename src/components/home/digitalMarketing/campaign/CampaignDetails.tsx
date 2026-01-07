import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { keyString } from "@/lib/utils";
import { useGetAdPerformnaceReportOverviewQuery } from "@/service/dashboard/api";
import {
  BarChart2,
  CheckCircle,
  GaugeCircle,
  LineChart,
  MousePointerClick,
  Rocket,
  TrendingUp,
  UserPlus,
  Users,
  IndianRupee,
} from "lucide-react";
import { useState } from "react";
import { type LucideIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import dayjs from "dayjs";
import CustomDatePicker from "@/components/ui/custom-date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type IconTypes = {
  [key: string]: LucideIcon;
};

export default function CampaignDetails() {
  const [selected, setSelected] = useState<undefined | string>(undefined);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { data, isFetching } = useGetAdPerformnaceReportOverviewQuery({
    funnel: selected,
    ...(selectedDate
      ? {
          start_date: dayjs(selectedDate)
            ?.startOf("month")
            .format("YYYY-MM-DD"),
          end_date: dayjs(selectedDate)?.endOf("month").format("YYYY-MM-DD"),
        }
      : {}),
  });

  const SkeletonArray = Array(9)
    .fill(null)
    .map((_, index: number) => (
      <div
        className="flex justify-between py-3 px-4 bg-muted rounded-lg"
        key={index}
      >
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-5 w-20" />
      </div>
    ));

  const allIcons: IconTypes = {
    total_campaigns: Rocket,
    // total_campaigns_inactive: Rocket,
    total_amount_spent: IndianRupee,
    total_impressions: BarChart2,
    total_reach: Users,
    clicks: MousePointerClick,
    CPL: GaugeCircle,
    CAC: TrendingUp,
    total_ctr: LineChart,
    total_leads_generated: UserPlus,
    total_conversions: CheckCircle,
    total_revenue_generated: IndianRupee,
  };

  const CustomTooltip = (value: {
    active: number;
    inactive: number;
    total: number;
  }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="font-semibold text-red-500 cursor-pointer hover:text-red-700 transition-colors duration-200 px-2 py-1 rounded-md hover:bg-red-50">
            {value?.total}
          </span>
        </TooltipTrigger>
        <TooltipContent className="p-0 bg-white border border-gray-200 shadow-lg rounded-lg max-w-xs z-50">
          <div className="p-4 space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <h4 className="font-semibold text-gray-900 text-sm">
                  Total Campaigns
                </h4>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-2 bg-green-50 rounded-md">
                  <p className="text-xs text-gray-600 font-medium">
                    Active Campaign
                  </p>
                  <p className="text-sm font-bold text-green-700">
                    {value.active}
                  </p>
                </div>
                <div className="text-center p-2 bg-green-50 rounded-md">
                  <p className="text-xs text-gray-600 font-medium">
                    Inactive Campaign
                  </p>
                  <p className="text-sm font-bold text-green-700">
                    {value.inactive}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <CardTitle>Campaign Details</CardTitle>
              <CardDescription className="mt-1">
                Campaign Overview
              </CardDescription>
            </div>

            <div className="flex gap-2">
              <div className="space-y-2">
                <Select
                  value={selected}
                  onValueChange={(value) => setSelected(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select funnel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={""}>All</SelectItem>
                    {data?.table_meta_data.funnels?.map((item) => (
                      <SelectItem value={item}>{keyString(item)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-3">
                <CustomDatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  showMonthYearPicker={true}
                  dateFormat="MM/yyyy"
                  maxDate={dayjs()}
                  clearable={true}
                />
              </div>
            </div>
          </div>
        </CardHeader>
        {data?.data && !isFetching ? (
          <CardContent>
            <div className="grid grid-cols-3 gap-3">
              {Object.entries(data?.data[0]).map(([key, value]) => {
                const Icon = allIcons[key];
                return (
                  !["active_count", "inactive_count"].includes(key) && (
                    <div className="flex justify-between py-3 px-4 bg-muted rounded-lg">
                      <div className="flex items-center space-x-3">
                        {Icon && <Icon className="h-4 w-4 text-purple-500" />}
                        <span className="font-medium">{keyString(key)}</span>
                      </div>
                      <div className="font-semibold text-lg">
                        {key == "total_count"
                          ? CustomTooltip({
                              active: data?.data[0]?.active_count,
                              inactive: data?.data[0]?.inactive_count,
                              total: data?.data[0]?.total_count,
                            })
                          : value}
                      </div>
                    </div>
                  )
                );
              })}
            </div>
          </CardContent>
        ) : (
          <div className="grid grid-cols-3 gap-3 mx-6">{SkeletonArray}</div>
        )}
      </Card>
    </div>
  );
}
