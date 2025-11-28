import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MultiSelect } from "@/components/ui/multi-select";
import {
  Download,
  Filter,
  SquareChevronRight,
  SquareChevronLeft,
} from "lucide-react";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  useGetAllHealthIssueQuery,
  useGetCitiesQuery,
  useGetCountriesByRegionQuery,
  useGetRegionsQuery,
  useGetStatesQuery,
} from "@/service/common/api";
import {
  useGetLeadUserMisDataQuery,
  useGetLeadMisDataMutation,
} from "@/service/dashboard/api";
import { keyString } from "@/lib/utils";
import type { LeadMisBody } from "@/lib/types";

export default function LeadMIS() {
  // const [selectedWatiTemplate, setSelectedWatiTemplate] = useState<string>();
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

  const { control, watch, reset } = useForm({
    defaultValues: {
      gender: [] as string[],
      ageGroup: [] as string[],
      clinicalCondition: [] as string[],
      region: [] as number[],
      country: [] as number[],
      state: [] as number[],
      city: [] as number[],
      salesStatus: [] as number[],
      stage: [] as number[],
      userTypes: [] as string[],
    },
  });

  const filters = watch();

  const { data: regionData, isFetching: regionLoading } = useGetRegionsQuery();
  const { data: countryData, isFetching: countryLoading } =
    useGetCountriesByRegionQuery(
      filters.region.length > 0 ? filters.region : [],
      {
        skip: filters.region.length === 0,
      }
    );
  const { data: stateData, isFetching: stateLoading } = useGetStatesQuery(
    filters.country.length > 0 ? filters.country : [],
    {
      skip: filters.country.length === 0,
    }
  );
  const { data: cityData, isFetching: cityLoading } = useGetCitiesQuery(
    filters.state.length > 0 ? filters.state : [],
    {
      skip: filters.state.length === 0,
    }
  );

  const { data: healthData } = useGetAllHealthIssueQuery();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      case "new":
        return "bg-blue-100 text-blue-800";
      case "contacted":
        return "bg-yellow-100 text-yellow-800";
      case "follow-up":
        return "bg-purple-100 text-purple-800";
      case "HOT":
        return "bg-red-100 text-red-800";
      case "WARM":
        return "bg-orange-100 text-orange-800";
      case "COLD":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters).reduce((count, filterArray) => {
      return count + filterArray.length;
    }, 0);
  };

  // Handle country change - reset state and city when country changes
  const handleCountryChange = (selectedCountryIds: (string | number)[]) => {
    reset({
      ...filters,
      country: selectedCountryIds as number[],
      state: [],
      city: [],
    });
  };

  // Handle state change - reset city when state changes
  const handleStateChange = (selectedStateIds: (string | number)[]) => {
    reset({
      ...filters,
      state: selectedStateIds as number[],
      city: [],
    });
  };

  console.log(countryData, 7689);

  const salesStatus = [
    { name: "Hot", id: 2 },
    { name: "Warm", id: 3 },
    { name: "Cold", id: 4 },
    ...(filters.userTypes.includes("lead")
      ? [
          { name: "To Engage", id: 0 },
          { name: "First Pitched", id: 1 },
          { name: "Connected", id: 6 },
          { name: "Consultation Booked", id: 7 },
        ]
      : []),
  ];

  const buildQueryParams = (): LeadMisBody => {
    const query: LeadMisBody = { page, limit };

    const filterMap: Partial<Record<keyof LeadMisBody, any>> = {
      age_groups: filters.ageGroup,
      countries: filters.country,
      states: filters.state,
      cities: filters.city,
      genders: filters.gender,
      health_conditions: filters.clinicalCondition,
      regions: filters.region,
      stages: filters.stage,
      statuses: filters.salesStatus,
      user_types: filters.userTypes,
    };

    for (const [key, value] of Object.entries(filterMap)) {
      if (Array.isArray(value) && value.length > 0) {
        (query as any)[key] = value;
      }
    }

    return query;
  };

  const { data, isLoading } = useGetLeadUserMisDataQuery(buildQueryParams());

const [triggerExport, { isLoading: exportLoading }] = useGetLeadMisDataMutation();

const handleExportLeads = async () => {
  try {
    const body = {
      age_groups: filters.ageGroup,
      countries: filters.country,
      states: filters.state,
      cities: filters.city,
      genders: filters.gender,
      health_conditions: filters.clinicalCondition,
      regions: filters.region,
      stages: filters.stage,
      statuses: filters.salesStatus,
      user_types: filters.userTypes,
      page,
      limit,
      is_export: true,
    };

    const blob: Blob = await triggerExport(body).unwrap();

    if (!blob || blob.size === 0) {
      throw new Error("Empty file received");
    }

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "lead_mis.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (err: any) {
    console.error("Export failed:", err);
    alert(`Export failed: ${err.message || "Please try again."}`);
  }
};

  console.log({ data, isLoading });

  return (
    <div className="space-y-6 mt-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">MIS for Retargeting</h2>
          <p className="text-muted-foreground">
            {getActiveFiltersCount() > 0 && (
              <span className="inline-flex items-center gap-1">
                <Filter className="h-4 w-4" />
                {getActiveFiltersCount()} filters applied
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={handleExportLeads}
            disabled={exportLoading}
          >
            <Download className="mr-2 h-4 w-4 animate-collapsible-down" />
            Export ({data?.totalCount})
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter Users
          </CardTitle>
          <CardDescription>
            Apply multiple filters to segment leads for retargeting campaigns
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Gender Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Select User Type
              </label>
              <Controller
                name="userTypes"
                control={control}
                render={({ field }) => (
                  <MultiSelect
                    options={[
                      { name: "Lead", id: "lead" },
                      { name: "OC", id: "oc" },
                    ]}
                    selected={field.value}
                    onChange={field.onChange}
                    placeholder="Select User Type"
                  />
                )}
              />
            </div>

            {/* Gender Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Gender
              </label>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <MultiSelect
                    options={[
                      { name: "Male", id: "1" },
                      { name: "Female", id: "2" },
                    ]}
                    selected={field.value}
                    onChange={field.onChange}
                    placeholder="Select Gender"
                  />
                )}
              />
            </div>

            {/* Age Group Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Age Group
              </label>
              <Controller
                name="ageGroup"
                control={control}
                render={({ field }) => (
                  <MultiSelect
                    options={[
                      "18-25",
                      "25-35",
                      "35-45",
                      "45-55",
                      "55-65",
                      "65+",
                    ]}
                    selected={field.value}
                    onChange={field.onChange}
                    placeholder="Select Age Group"
                  />
                )}
              />
            </div>

            {/* Clinical Condition Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Clinical Condition
              </label>
              <Controller
                name="clinicalCondition"
                control={control}
                render={({ field }) => (
                  <MultiSelect
                    options={healthData?.data || []}
                    nameKey="name"
                    valueKey="name"
                    selected={field.value}
                    onChange={field.onChange}
                    placeholder="Select Clinical Condition"
                  />
                )}
              />
            </div>

            {/* Region Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Region
              </label>
              <Controller
                name="region"
                control={control}
                render={({ field }) => (
                  <MultiSelect
                    options={regionData?.data || []}
                    selected={field.value}
                    onChange={field.onChange}
                    placeholder={
                      regionLoading ? "Loading regions..." : "Select Region"
                    }
                    nameKey="region_name"
                    valueKey="region_id"
                  />
                )}
              />
            </div>

            {/* Country Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Country
              </label>
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <MultiSelect
                    options={countryData?.data || []}
                    selected={field.value}
                    onChange={handleCountryChange}
                    placeholder={
                      filters.region.length === 0
                        ? "Select Region First"
                        : countryLoading
                        ? "Loading Country..."
                        : "Select Country"
                    }
                    nameKey="country_name"
                    valueKey="country_id"
                  />
                )}
              />
            </div>

            {/* State Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">State</label>
              <Controller
                name="state"
                control={control}
                render={({ field }) => (
                  <MultiSelect
                    options={stateData?.[0]?.data || []}
                    selected={field.value}
                    onChange={handleStateChange}
                    placeholder={
                      filters.country.length === 0
                        ? "Select Country First"
                        : stateLoading
                        ? "Loading States..."
                        : "Select State"
                    }
                    nameKey="state_name"
                    valueKey="state_id"
                  />
                )}
              />
            </div>

            {/* City Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">City</label>
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <MultiSelect
                    options={cityData?.[0]?.data || []}
                    selected={field.value}
                    onChange={field.onChange}
                    placeholder={
                      filters.state.length === 0
                        ? "Select State First"
                        : cityLoading
                        ? "Loading Cities..."
                        : "Select City"
                    }
                    nameKey="city_name"
                    valueKey="city_id"
                  />
                )}
              />
            </div>

            {/* Sales Status Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Sales Status
              </label>
              <Controller
                name="salesStatus"
                control={control}
                render={({ field }) => (
                  <MultiSelect
                    options={salesStatus}
                    selected={field.value}
                    onChange={field.onChange}
                    placeholder="Select Sales Status"
                  />
                )}
              />
            </div>

            {/* Stage Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Stage</label>
              <Controller
                name="stage"
                control={control}
                render={({ field }) => (
                  <MultiSelect
                    options={[
                      { name: "Stage 1", id: 1 },
                      { name: "Stage 2", id: 2 },
                      { name: "Stage 3", id: 3 },
                      { name: "Stage 4", id: 4 },
                    ]}
                    selected={field.value}
                    onChange={field.onChange}
                    placeholder="Select Stage"
                  />
                )}
              />
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t">
            <div className="text-sm text-muted-foreground">
              {getActiveFiltersCount() > 0 &&
                `${getActiveFiltersCount()} filters applied • ${
                  data?.totalCount || 0
                } leads match`}
            </div>
            <Button
              variant="outline"
              onClick={() =>
                reset({
                  gender: [],
                  ageGroup: [],
                  clinicalCondition: [],
                  region: [],
                  country: [],
                  state: [],
                  city: [],
                  salesStatus: [],
                  stage: [],
                  userTypes: [],
                })
              }
            >
              Clear All Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Filtered Users ({data?.totalCount})</CardTitle>
              <CardDescription>
                List of leads matching the applied filters
              </CardDescription>
            </div>
            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4 gap-4">
              <Select
                value={limit.toString()}
                onValueChange={(val) => setLimit(Number(val))}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">Show 10</SelectItem>
                  <SelectItem value="20">Show 20</SelectItem>
                  <SelectItem value="50">Show 50</SelectItem>
                  <SelectItem value="100">Show 100</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                disabled={page === 1}
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              >
                <SquareChevronLeft size={40} />
              </Button>
              <div className="text-sm font-medium">
                Page {page} of {data && Math.ceil(data?.totalCount / limit)}
              </div>
              <Button
                variant="outline"
                // disabled={data?.totalCount / limit}
                onClick={() => setPage((prev) => prev + 1)}
              >
                <SquareChevronRight size={40} />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sr. No.</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone Code</TableHead>
                  <TableHead>Phone Number</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Age Group</TableHead>
                  <TableHead>User Type</TableHead>
                  <TableHead>Clinical Condition</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Sales Status</TableHead>
                  <TableHead>Stage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.isArray(data?.data) && data?.data?.length > 0 ? (
                  data?.data.map((lead, index: number) => (
                    <TableRow key={index}>
                      <TableCell className="font-normal">
                        {page * limit - limit + index + 1}
                      </TableCell>
                      <TableCell className="font-medium">
                        {keyString(lead.Name)}
                      </TableCell>
                      <TableCell className="font-medium">
                        {lead.Email}
                      </TableCell>
                      <TableCell>
                        {lead["Phone Code"] || "N/A"}
                      </TableCell>
                      <TableCell>
                        {lead["Phone Number"] || "N/A"}
                      </TableCell>
                      <TableCell>{lead.Gender || "N/A"}</TableCell>
                      <TableCell>{lead["Age Group"] || "N/A"}</TableCell>
                      <TableCell>{lead["User Type"] || "N/A"}</TableCell>
                      <TableCell>
                        {lead["Clinical Conditions"] || "N/A"}
                      </TableCell>
                      
                      <TableCell className="text-sm">
                        {lead["Region"]}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(lead["Sales Status"])}>
                          {lead["Sales Status"]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(lead.Stage)}>
                          {lead.Stage}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="h-24 text-center text-muted-foreground"
                    >
                      No leads found matching the selected filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
