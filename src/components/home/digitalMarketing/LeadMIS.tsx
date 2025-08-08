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
import { mockData } from "@/lib/data";
import { MultiSelect } from "@/components/ui/multi-select";
import {
  Download,
  Send,
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
  useLazyGetLeadMisDataQuery,
} from "@/service/dashboard/api";
import { keyString } from "@/lib/utils";

export default function LeadMIS() {
  const [selectedWatiTemplate, setSelectedWatiTemplate] = useState<string>();
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
    },
  });

  const filters = watch();

  // API calls with dependencies

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

  const handleWatiBroadcast = () => {
    if (!selectedWatiTemplate) return;
    console.log("Filter values:", filters);
  };

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
    { name: "To Engage", id: 0 },
    { name: "First Pitched", id: 1 },
    { name: "Connected", id: 6 },
    { name: "Consultation Booked", id: 7 },
  ];

  const { data, isLoading } = useGetLeadUserMisDataQuery({
    age_groups: filters.ageGroup,
    countries: filters.country,
    states: filters.state,
    cities: filters.city,
    genders: filters.gender,
    health_conditions: filters.clinicalCondition,
    regions: filters.region,
    stages: filters.stage,
    statuses: filters.salesStatus,
    page,
    limit,
  });

  const [triggerExport, { isFetching: exportLoading }] =
    useLazyGetLeadMisDataQuery();
  // const handleExportLeads = () => {
  //   getLeadMisData({
  //   age_groups: filters.ageGroup,
  //   countries: filters.country,
  //   states: filters.state,
  //   cities: filters.city,
  //   genders: filters.gender,
  //   health_conditions: filters.clinicalCondition,
  //   regions: filters.region,
  //   stages: filters.stage,
  //   statuses: filters.salesStatus,
  //   page,
  //   limit,
  //   is_export: true
  // }).then((response: any) => {
  //   console.log(response, 345678);
  //   const url = window.URL.createObjectURL(new Blob([response.data]));
  //   const link = document.createElement('a');
  //   link.href = url;
  //   link.setAttribute('download', 'lead_mis.xlsx');
  //   document.body.appendChild(link);
  //   link.click();
  //   link.remove();
  // })
  // };

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
        page,
        limit,
        is_export: true,
      };
      console.log("Request body:", body);

      const response = await triggerExport(body).unwrap();
      console.log(
        "Response type:",
        response.type,
        "Response size:",
        response.size
      );

      if (!(response instanceof Blob) || response.size === 0) {
        throw new Error("Invalid response: Not a valid Blob or empty response");
      }

      const url = window.URL.createObjectURL(response);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "lead_mis.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url); // Clean up memory
    } catch (err: any) {
      console.error("Export failed:", err);
      alert(
        `Failed to download the file: ${
          err.message || "Unknown error"
        }. Please check the console for details or contact support.`
      );
    }
  };

  console.log({ data, isLoading });

  return (
    <div className="space-y-6 mt-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Lead MIS for Retargeting</h2>
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
          <Select
            value={selectedWatiTemplate}
            onValueChange={setSelectedWatiTemplate}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select WATI Template" />
            </SelectTrigger>
            <SelectContent>
              {mockData.watiTemplates.map((template) => (
                <SelectItem key={template.id} value={template.name}>
                  {template.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            onClick={handleWatiBroadcast}
            disabled={!selectedWatiTemplate}
          >
            <Send className="mr-2 h-4 w-4" />
            Broadcast ({limit})
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter Leads
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
            <Button variant="outline" onClick={() => reset()}>
              Clear All Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Filtered Leads ({limit})</CardTitle>
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
                  <TableHead>Gender</TableHead>
                  <TableHead>Age Group</TableHead>
                  <TableHead>Clinical Condition</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Sales Status</TableHead>
                  <TableHead>Stage</TableHead>
                  <TableHead>Previous Campaigns</TableHead>
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
                      <TableCell>{lead.Gender || "N/A"}</TableCell>
                      <TableCell>{lead["Age Group"] || "N/A"}</TableCell>
                      <TableCell>
                        {/* <div className="flex flex-wrap gap-1">
                          {lead.clinicalCondition.map((condition, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              {condition}
                            </Badge>
                          ))}
                        </div> */}
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
                      <TableCell>
                        {/* {lead.previousCampaigns.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {lead.previousCampaigns.map((campaign, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="text-xs"
                              >
                                {campaign}
                              </Badge>
                            ))}
                          </div>
                        ) : (
                        )} */}
                        <span className="text-muted-foreground text-sm">
                          None
                        </span>
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

// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { mockData } from "@/lib/data";
// import { MultiSelect } from "@/components/ui/multi-select";
// import { Download, Send, Filter } from "lucide-react";
// import { useMemo, useState } from "react";
// import { useForm, Controller } from "react-hook-form";
// import {
//   useGetCitiesQuery,
//   useGetCountriesQuery,
//   useGetStatesQuery,
// } from "@/service/common/api";

// export default function LeadMIS() {
//   const [selectedWatiTemplate, setSelectedWatiTemplate] = useState<string>();

//   const { control, watch, reset } = useForm({
//     defaultValues: {
//       gender: [] as string[],
//       ageGroup: [] as string[],
//       clinicalCondition: [] as string[],
//       region: [] as string[],
//       country: [] as number[],
//       state: [] as number[],
//       city: [] as number[],
//       salesStatus: [] as string[],
//       stage: [] as string[],
//     },
//   });

//   const filters = watch();

//   // API calls with dependencies
//   const { data: countryData } = useGetCountriesQuery();
//   const { data: stateData } = useGetStatesQuery(filters.country, {
//     skip: filters.country.length === 0,
//   });
//   const { data: cityData } = useGetCitiesQuery(filters.state, {
//     skip: filters.state.length === 0,
//   });

//   const getCountryNames = (countryIds: number[]) => {
//     if (!countryData) return [];
//     return countryIds
//       .map((id) => {
//         const country = countryData.data.find((c: any) => c.id === id);
//         return country ? country.country_name : "";
//       })
//       .filter(Boolean);
//   };

//   const getStateNames = (stateIds: number[]) => {
//     if (!stateData) return [];
//     return stateIds
//       .map((id) => {
//         const state = stateData.data.find((s: any) => s.id === id);
//         return state ? state.state_name : "";
//       })
//       .filter(Boolean);
//   };

//   const getCityNames = (cityIds: number[]) => {
//     if (!cityData) return [];
//     return cityIds
//       .map((id) => {
//         const city = cityData.data.find((c: any) => c.id === id);
//         return city ? city.city_name : "";
//       })
//       .filter(Boolean);
//   };

//   const filteredLeads = useMemo(() => {
//     return mockData.leads.filter((lead) => {
//       if (filters.gender.length > 0 && !filters.gender.includes(lead.gender))
//         return false;
//       if (
//         filters.ageGroup.length > 0 &&
//         !filters.ageGroup.includes(lead.ageGroup)
//       )
//         return false;
//       if (
//         filters.clinicalCondition.length > 0 &&
//         !filters.clinicalCondition.some((condition) =>
//           lead.clinicalCondition.includes(condition)
//         )
//       )
//         return false;
//       if (filters.region.length > 0 && !filters.region.includes(lead.region))
//         return false;

//       // For API-based filters, compare with names
//       const selectedCountryNames = getCountryNames(filters.country);
//       if (
//         selectedCountryNames.length > 0 &&
//         !selectedCountryNames.includes(lead.country)
//       )
//         return false;

//       const selectedStateNames = getStateNames(filters.state);
//       if (
//         selectedStateNames.length > 0 &&
//         !selectedStateNames.includes(lead.state)
//       )
//         return false;

//       const selectedCityNames = getCityNames(filters.city);
//       if (
//         selectedCityNames.length > 0 &&
//         !selectedCityNames.includes(lead.city)
//       )
//         return false;

//       if (
//         filters.salesStatus.length > 0 &&
//         !filters.salesStatus.includes(lead.salesStatus)
//       )
//         return false;
//       if (filters.stage.length > 0 && !filters.stage.includes(lead.stage))
//         return false;
//       return true;
//     });
//   }, [filters, countryData, stateData, cityData]);

//   // All filter options - mix of strings and objects
//   const filterOptions = {
//     gender: ["Male", "Female", "Other"],
//     ageGroup: ["18-25", "25-35", "35-45", "45-55", "55-65", "65+"],
//     clinicalCondition: [
//       "Diabetes",
//       "Hypertension",
//       "Heart Disease",
//       "Arthritis",
//       "Asthma",
//       "Cholesterol",
//       "Obesity",
//       "Depression",
//       "Anxiety",
//       "Migraine",
//     ],
//     region: [
//       "North America",
//       "South America",
//       "Europe",
//       "Asia",
//       "Africa",
//       "Australia",
//       "Middle East",
//     ],
//     country: countryData?.data || [],
//     state: stateData || [],
//     city: cityData || [],
//     salesStatus: [
//       "new",
//       "contacted",
//       "qualified",
//       "proposal",
//       "negotiation",
//       "closed-won",
//       "closed-lost",
//       "active",
//       "inactive",
//       "follow-up",
//     ],
//     stage: [
//       "COLD",
//       "WARM",
//       "HOT",
//       "QUALIFIED",
//       "PROPOSAL",
//       "NEGOTIATION",
//       "CLOSED",
//     ],
//   };

//   const handleExportLeads = () => {
//     console.log("Exporting", filteredLeads.length, "leads");
//     console.log("Applied filters:", {
//       ...filters,
//       countryNames: getCountryNames(filters.country),
//       stateNames: getStateNames(filters.state),
//       cityNames: getCityNames(filters.city),
//     });
//   };

//   const handleWatiBroadcast = () => {
//     if (!selectedWatiTemplate) return;
//     console.log(
//       "WATI Broadcast for",
//       selectedWatiTemplate,
//       "to",
//       filteredLeads.length,
//       "leads"
//     );
//     console.log(
//       "Filter values (IDs for API data, strings for manual):",
//       filters
//     );
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "active":
//         return "bg-green-100 text-green-800";
//       case "inactive":
//         return "bg-red-100 text-red-800";
//       case "new":
//         return "bg-blue-100 text-blue-800";
//       case "contacted":
//         return "bg-yellow-100 text-yellow-800";
//       case "follow-up":
//         return "bg-purple-100 text-purple-800";
//       case "HOT":
//         return "bg-red-100 text-red-800";
//       case "WARM":
//         return "bg-orange-100 text-orange-800";
//       case "COLD":
//         return "bg-blue-100 text-blue-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   const getActiveFiltersCount = () => {
//     return Object.values(filters).reduce((count, filterArray) => {
//       return count + filterArray.length;
//     }, 0);
//   };

//   const filterLabels = {
//     gender: "Gender",
//     ageGroup: "Age Group",
//     clinicalCondition: "Clinical Condition",
//     region: "Region",
//     country: "Country",
//     state: "State",
//     city: "City",
//     salesStatus: "Sales Status",
//     stage: "Stage",
//   };

//   // Handle country change - reset state and city when country changes
//   const handleCountryChange = (selectedCountryIds: (string | number)[]) => {
//     reset({
//       ...filters,
//       country: selectedCountryIds as number[],
//       state: [],
//       city: [],
//     });
//   };

//   // Handle state change - reset city when state changes
//   const handleStateChange = (selectedStateIds: (string | number)[]) => {
//     reset({
//       ...filters,
//       state: selectedStateIds as number[],
//       city: [],
//     });
//   };

//   return (
//     <div className="space-y-6 mt-8">
//       <div className="flex items-center justify-between">
//         <div>
//           <h2 className="text-2xl font-bold">Lead MIS for Retargeting</h2>
//           <p className="text-muted-foreground">
//             {getActiveFiltersCount() > 0 && (
//               <span className="inline-flex items-center gap-1">
//                 <Filter className="h-4 w-4" />
//                 {getActiveFiltersCount()} filters applied
//               </span>
//             )}
//           </p>
//         </div>
//         <div className="flex items-center space-x-2">
//           <Button variant="outline" onClick={handleExportLeads}>
//             <Download className="mr-2 h-4 w-4" />
//             Export ({filteredLeads.length})
//           </Button>
//           <Select
//             value={selectedWatiTemplate}
//             onValueChange={setSelectedWatiTemplate}
//           >
//             <SelectTrigger className="w-[200px]">
//               <SelectValue placeholder="Select WATI Template" />
//             </SelectTrigger>
//             <SelectContent>
//               {mockData.watiTemplates.map((template) => (
//                 <SelectItem key={template.id} value={template.name}>
//                   {template.name}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//           <Button
//             onClick={handleWatiBroadcast}
//             disabled={!selectedWatiTemplate || filteredLeads.length === 0}
//           >
//             <Send className="mr-2 h-4 w-4" />
//             Broadcast ({filteredLeads.length})
//           </Button>
//         </div>
//       </div>

//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <Filter className="h-5 w-5" />
//             Filter Leads
//           </CardTitle>
//           <CardDescription>
//             Apply multiple filters to segment leads for retargeting campaigns
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//             {Object.entries(filterOptions).map(([name, options]) => {
//               return (
//                 <div key={name} className="space-y-2">
//                   <label className="text-sm font-medium text-gray-700">
//                     {filterLabels[name as keyof typeof filterLabels]}
//                   </label>
//                   <Controller
//                     name={name as keyof typeof filters}
//                     control={control}
//                     render={({ field }) => (
//                       <MultiSelect
//                         options={options}
//                         nameKey=""

//                         selected={field.value}
//                         onChange={
//                           name === "country"
//                             ? handleCountryChange
//                             : name === "state"
//                             ? handleStateChange
//                             : field.onChange
//                         }
//                         // placeholder={placeholder}
//                       />
//                     )}
//                   />
//                 </div>
//               );
//             })}
//           </div>

//           <div className="flex justify-between items-center pt-4 border-t">
//             <div className="text-sm text-muted-foreground">
//               {getActiveFiltersCount() > 0
//                 ? `${getActiveFiltersCount()} filters applied • ${
//                     filteredLeads.length
//                   } leads match`
//                 : `Showing all ${mockData.leads.length} leads`}
//             </div>
//             <Button variant="outline" onClick={() => reset()}>
//               Clear All Filters
//             </Button>
//           </div>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader>
//           <CardTitle>Filtered Leads ({filteredLeads.length})</CardTitle>
//           <CardDescription>
//             List of leads matching the applied filters
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="rounded-md border">
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Name</TableHead>
//                   <TableHead>Gender</TableHead>
//                   <TableHead>Age Group</TableHead>
//                   <TableHead>Clinical Condition</TableHead>
//                   <TableHead>Location</TableHead>
//                   <TableHead>Sales Status</TableHead>
//                   <TableHead>Stage</TableHead>
//                   <TableHead>Previous Campaigns</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {filteredLeads.length > 0 ? (
//                   filteredLeads.map((lead) => (
//                     <TableRow key={lead.id}>
//                       <TableCell className="font-medium">{lead.name}</TableCell>
//                       <TableCell>{lead.gender}</TableCell>
//                       <TableCell>{lead.ageGroup}</TableCell>
//                       <TableCell>
//                         <div className="flex flex-wrap gap-1">
//                           {lead.clinicalCondition.map((condition, index) => (
//                             <Badge
//                               key={index}
//                               variant="outline"
//                               className="text-xs"
//                             >
//                               {condition}
//                             </Badge>
//                           ))}
//                         </div>
//                       </TableCell>
//                       <TableCell className="text-sm">
//                         {`${lead.city}, ${lead.state}, ${lead.country}`}
//                       </TableCell>
//                       <TableCell>
//                         <Badge className={getStatusColor(lead.salesStatus)}>
//                           {lead.salesStatus}
//                         </Badge>
//                       </TableCell>
//                       <TableCell>
//                         <Badge className={getStatusColor(lead.stage)}>
//                           {lead.stage}
//                         </Badge>
//                       </TableCell>
//                       <TableCell>
//                         {lead.previousCampaigns.length > 0 ? (
//                           <div className="flex flex-wrap gap-1">
//                             {lead.previousCampaigns.map((campaign, index) => (
//                               <Badge
//                                 key={index}
//                                 variant="secondary"
//                                 className="text-xs"
//                               >
//                                 {campaign}
//                               </Badge>
//                             ))}
//                           </div>
//                         ) : (
//                           <span className="text-muted-foreground text-sm">
//                             None
//                           </span>
//                         )}
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow>
//                     <TableCell
//                       colSpan={8}
//                       className="h-24 text-center text-muted-foreground"
//                     >
//                       No leads found matching the selected filters.
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// // import { Badge } from "@/components/ui/badge";
// // import { Button } from "@/components/ui/button";
// // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// // import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// // import { mockData } from "@/lib/data";
// // import { Download, Send } from "lucide-react";
// // import { useMemo, useState } from "react";

// // export default function LeadMIS() {
// //   const [selectedWatiTemplate, setSelectedWatiTemplate] = useState<
// //     string | undefined
// //   >(undefined);

// //     const [genderFilter, setGenderFilter] = useState<string | null>(null);
// //     const [ageGroupFilter, setAgeGroupFilter] = useState<string | null>(null);
// //     const [clinicalConditionFilter, setClinicalConditionFilter] = useState<
// //       string | null
// //     >(null);
// //     const [regionFilter, setRegionFilter] = useState<string | null>(null);
// //     const [countryFilter, setCountryFilter] = useState<string | null>(null);
// //     const [stateFilter, setStateFilter] = useState<string | null>(null);
// //     const [cityFilter, setCityFilter] = useState<string | null>(null);
// //     const [salesStatusFilter, setSalesStatusFilter] = useState<string | null>(
// //       null
// //     );
// //     const [stageFilter, setStageFilter] = useState<string | null>(null);

// //   const filteredLeads = useMemo(() => {
// //     return mockData.leads.filter((lead) => {
// //       if (
// //         genderFilter &&
// //         genderFilter !== "all" &&
// //         lead.gender !== genderFilter
// //       )
// //         return false;
// //       if (
// //         ageGroupFilter &&
// //         ageGroupFilter !== "all" &&
// //         lead.ageGroup !== ageGroupFilter
// //       )
// //         return false;
// //       // For clinical condition, check if the selected filter is present in the lead's conditions
// //       if (
// //         clinicalConditionFilter &&
// //         clinicalConditionFilter !== "all" &&
// //         !lead.clinicalCondition.includes(clinicalConditionFilter)
// //       )
// //         return false;
// //       if (
// //         regionFilter &&
// //         regionFilter !== "all" &&
// //         lead.region !== regionFilter
// //       )
// //         return false;
// //       if (
// //         countryFilter &&
// //         countryFilter !== "all" &&
// //         lead.country !== countryFilter
// //       )
// //         return false;
// //       if (stateFilter && stateFilter !== "all" && lead.state !== stateFilter)
// //         return false;
// //       if (cityFilter && cityFilter !== "all" && lead.city !== cityFilter)
// //         return false;
// //       if (
// //         salesStatusFilter &&
// //         salesStatusFilter !== "all" &&
// //         lead.salesStatus !== salesStatusFilter
// //       )
// //         return false;
// //       if (stageFilter && stageFilter !== "all" && lead.stage !== stageFilter)
// //         return false;
// //       return true;
// //     });
// //   }, [
// //     genderFilter,
// //     ageGroupFilter,
// //     clinicalConditionFilter,
// //     regionFilter,
// //     countryFilter,
// //     stateFilter,
// //     cityFilter,
// //     salesStatusFilter,
// //     stageFilter,
// //   ]);

// //     const uniqueGenders = useMemo(
// //       () => Array.from(new Set(mockData.leads.map((l) => l.gender))),
// //       []
// //     );
// //     const uniqueAgeGroups = useMemo(
// //       () => Array.from(new Set(mockData.leads.map((l) => l.ageGroup))),
// //       []
// //     );
// //     const uniqueClinicalConditions = useMemo(
// //       () =>
// //         Array.from(new Set(mockData.leads.flatMap((l) => l.clinicalCondition))),
// //       []
// //     );
// //     const uniqueRegions = useMemo(
// //       () => Array.from(new Set(mockData.leads.map((l) => l.region))),
// //       []
// //     );
// //     const uniqueCountries = useMemo(
// //       () => Array.from(new Set(mockData.leads.map((l) => l.country))),
// //       []
// //     );
// //     const uniqueStates = useMemo(
// //       () => Array.from(new Set(mockData.leads.map((l) => l.state))),
// //       []
// //     );
// //     const uniqueCities = useMemo(
// //       () => Array.from(new Set(mockData.leads.map((l) => l.city))),
// //       []
// //     );
// //     const uniqueSalesStatuses = useMemo(
// //       () => Array.from(new Set(mockData.leads.map((l) => l.salesStatus))),
// //       []
// //     );
// //     const uniqueStages = useMemo(
// //       () => Array.from(new Set(mockData.leads.map((l) => l.stage))),
// //       []
// //     );

// //   const handleExportLeads = () => {
// //     // In a real application, you would generate and download a CSV/Excel file
// //     // toast({
// //     //   title: "Export Initiated",
// //     //   description: `Exporting ${filteredLeads.length} leads... (This is a placeholder action)`,
// //     // })
// //   };

// //   const handleWatiBroadcast = () => {
// //     if (!selectedWatiTemplate) {
// //       // toast({
// //       //   title: "Broadcast Failed",
// //       //   description: "Please select a WATI template.",
// //       //   variant: "destructive",
// //       // })
// //       return;
// //     }
// //     // In a real application, you would send the filtered leads to WATI API
// //     // toast({
// //     //   title: "WATI Broadcast Sent",
// //     //   description: `Broadcast with template "${selectedWatiTemplate}" sent to ${filteredLeads.length} leads. (This is a placeholder action)`,
// //     // })
// //   };

// //     const getStatusColor = (status: string) => {
// //     switch (status) {
// //       case "active":
// //         return "bg-green-100 text-green-800";
// //       case "inactive":
// //         return "bg-red-100 text-red-800";
// //       case "new":
// //         return "bg-blue-100 text-blue-800";
// //       case "contacted":
// //         return "bg-yellow-100 text-yellow-800";
// //       case "follow-up":
// //         return "bg-purple-100 text-purple-800";
// //       case "HOT":
// //         return "bg-red-100 text-red-800";
// //       case "WARM":
// //         return "bg-orange-100 text-orange-800";
// //       case "COLD":
// //         return "bg-blue-100 text-blue-800";
// //       default:
// //         return "bg-gray-100 text-gray-800";
// //     }
// //   };

// //   return (
// //     <div>
// //       <div className="space-y-6 mt-8">
// //         <div className="flex items-center justify-between">
// //           <h2 className="text-2xl font-bold">Lead MIS for Retargeting</h2>
// //           <div className="flex items-center space-x-2">
// //             <Button variant="outline" onClick={handleExportLeads}>
// //               <Download className="mr-2 h-4 w-4" />
// //               Export Filtered Leads ({filteredLeads.length})
// //             </Button>
// //             <Select
// //               value={selectedWatiTemplate}
// //               onValueChange={setSelectedWatiTemplate}
// //             >
// //               <SelectTrigger className="w-[200px]">
// //                 <SelectValue placeholder="Select WATI Template" />
// //               </SelectTrigger>
// //               <SelectContent>
// //                 {mockData.watiTemplates.map((template) => (
// //                   <SelectItem key={template.id} value={template.name}>
// //                     {template.name}
// //                   </SelectItem>
// //                 ))}
// //               </SelectContent>
// //             </Select>
// //             <Button
// //               onClick={handleWatiBroadcast}
// //               disabled={!selectedWatiTemplate}
// //             >
// //               <Send className="mr-2 h-4 w-4" />
// //               Run WATI Broadcast
// //             </Button>
// //           </div>
// //         </div>

// //         {/* Filters */}
// //         <Card>
// //           <CardHeader>
// //             <CardTitle>Filter Leads</CardTitle>
// //             <CardDescription>
// //               Apply filters to segment leads for retargeting
// //             </CardDescription>
// //           </CardHeader>
// //           <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
// //             <Select
// //               value={genderFilter || "all"}
// //               onValueChange={(value) =>
// //                 setGenderFilter(value === "all" ? null : value)
// //               }

// //             >
// //               <SelectTrigger className="w-full min-h-10 font-normal">
// //                 <SelectValue placeholder="Gender" />
// //               </SelectTrigger>
// //               <SelectContent>
// //                 <SelectItem value="all">All Genders</SelectItem>
// //                 {uniqueGenders.map((gender) => (
// //                   <SelectItem key={gender} value={gender}>
// //                     {gender}
// //                   </SelectItem>
// //                 ))}
// //               </SelectContent>
// //             </Select>

// //             <Select
// //               value={ageGroupFilter || "all"}
// //               onValueChange={(value) =>
// //                 setAgeGroupFilter(value === "all" ? null : value)
// //               }
// //             >
// //               <SelectTrigger className="w-full min-h-10 font-normal">
// //                 <SelectValue placeholder="Age Group" />
// //               </SelectTrigger>
// //               <SelectContent>
// //                 <SelectItem value="all">All Age Groups</SelectItem>
// //                 {uniqueAgeGroups.map((group) => (
// //                   <SelectItem key={group} value={group}>
// //                     {group}
// //                   </SelectItem>
// //                 ))}
// //               </SelectContent>
// //             </Select>

// //             <Select
// //               value={clinicalConditionFilter || "all"}
// //               onValueChange={(value) =>
// //                 setClinicalConditionFilter(value === "all" ? null : value)
// //               }
// //             >
// //               <SelectTrigger className="w-full min-h-10 font-normal">
// //                 <SelectValue placeholder="Clinical Condition" />
// //               </SelectTrigger>
// //               <SelectContent>
// //                 <SelectItem value="all">All Conditions</SelectItem>
// //                 {uniqueClinicalConditions.map((condition) => (
// //                   <SelectItem key={condition} value={condition}>
// //                     {condition}
// //                   </SelectItem>
// //                 ))}
// //               </SelectContent>
// //             </Select>

// //             <Select
// //               value={regionFilter || "all"}
// //               onValueChange={(value) =>
// //                 setRegionFilter(value === "all" ? null : value)
// //               }
// //             >
// //               <SelectTrigger className="w-full min-h-10 font-normal">
// //                 <SelectValue placeholder="Region" />
// //               </SelectTrigger>
// //               <SelectContent>
// //                 <SelectItem value="all">All Regions</SelectItem>
// //                 {uniqueRegions.map((region) => (
// //                   <SelectItem key={region} value={region}>
// //                     {region}
// //                   </SelectItem>
// //                 ))}
// //               </SelectContent>
// //             </Select>

// //             <Select
// //               value={countryFilter || "all"}
// //               onValueChange={(value) =>
// //                 setCountryFilter(value === "all" ? null : value)
// //               }
// //             >
// //               <SelectTrigger className="w-full min-h-10 font-normal">
// //                 <SelectValue placeholder="Country" />
// //               </SelectTrigger>
// //               <SelectContent>
// //                 <SelectItem value="all">All Countries</SelectItem>
// //                 {uniqueCountries.map((country) => (
// //                   <SelectItem key={country} value={country}>
// //                     {country}
// //                   </SelectItem>
// //                 ))}
// //               </SelectContent>
// //             </Select>

// //             <Select
// //               value={stateFilter || "all"}
// //               onValueChange={(value) =>
// //                 setStateFilter(value === "all" ? null : value)
// //               }
// //             >
// //               <SelectTrigger className="w-full min-h-10 font-normal">
// //                 <SelectValue placeholder="State" />
// //               </SelectTrigger>
// //               <SelectContent>
// //                 <SelectItem value="all">All States</SelectItem>
// //                 {uniqueStates.map((state) => (
// //                   <SelectItem key={state} value={state}>
// //                     {state}
// //                   </SelectItem>
// //                 ))}
// //               </SelectContent>
// //             </Select>

// //             <Select
// //               value={cityFilter || "all"}
// //               onValueChange={(value) =>
// //                 setCityFilter(value === "all" ? null : value)
// //               }
// //             >
// //               <SelectTrigger className="w-full min-h-10 font-normal">
// //                 <SelectValue placeholder="City" />
// //               </SelectTrigger>
// //               <SelectContent>
// //                 <SelectItem value="all">All Cities</SelectItem>
// //                 {uniqueCities.map((city) => (
// //                   <SelectItem key={city} value={city}>
// //                     {city}
// //                   </SelectItem>
// //                 ))}
// //               </SelectContent>
// //             </Select>

// //             <Select
// //               value={salesStatusFilter || "all"}
// //               onValueChange={(value) =>
// //                 setSalesStatusFilter(value === "all" ? null : value)
// //               }
// //             >
// //               <SelectTrigger className="w-full min-h-10 font-normal">
// //                 <SelectValue placeholder="Sales Status" />
// //               </SelectTrigger>
// //               <SelectContent>
// //                 <SelectItem value="all">All Statuses</SelectItem>
// //                 {uniqueSalesStatuses.map((status) => (
// //                   <SelectItem key={status} value={status}>
// //                     {status}
// //                   </SelectItem>
// //                 ))}
// //               </SelectContent>
// //             </Select>

// //             <Select
// //               value={stageFilter || "all"}
// //               onValueChange={(value) =>
// //                 setStageFilter(value === "all" ? null : value)
// //               }
// //             >
// //               <SelectTrigger className="w-full min-h-10 font-normal">
// //                 <SelectValue placeholder="Stage" />
// //               </SelectTrigger>
// //               <SelectContent>
// //                 <SelectItem value="all">All Stages</SelectItem>
// //                 {uniqueStages.map((stage) => (
// //                   <SelectItem key={stage} value={stage}>
// //                     {stage}
// //                   </SelectItem>
// //                 ))}
// //               </SelectContent>
// //             </Select>

// //             <Button
// //               variant="outline"
// //               onClick={() => {
// //                 setGenderFilter(null);
// //                 setAgeGroupFilter(null);
// //                 setClinicalConditionFilter(null);
// //                 setRegionFilter(null);
// //                 setCountryFilter(null);
// //                 setStateFilter(null);
// //                 setCityFilter(null);
// //                 setSalesStatusFilter(null);
// //                 setStageFilter(null);
// //               }}
// //             >
// //               Clear Filters
// //             </Button>
// //           </CardContent>
// //         </Card>

// //         {/* Filtered Leads Table */}
// //         <Card>
// //           <CardHeader>
// //             <CardTitle>Filtered Leads ({filteredLeads.length})</CardTitle>
// //             <CardDescription>
// //               List of leads matching the applied filters
// //             </CardDescription>
// //           </CardHeader>
// //           <CardContent>
// //             <Table>
// //               <TableHeader>
// //                 <TableRow>
// //                   <TableHead>Name</TableHead>
// //                   <TableHead>Gender</TableHead>
// //                   <TableHead>Age Group</TableHead>
// //                   <TableHead>Clinical Condition</TableHead>
// //                   <TableHead>Region</TableHead>
// //                   <TableHead>Sales Status</TableHead>
// //                   <TableHead>Stage</TableHead>
// //                   <TableHead>Previous Campaigns</TableHead>
// //                 </TableRow>
// //               </TableHeader>
// //               <TableBody>
// //                 {filteredLeads.length > 0 ? (
// //                   filteredLeads.map((lead) => (
// //                     <TableRow key={lead.id}>
// //                       <TableCell className="font-medium">{lead.name}</TableCell>
// //                       <TableCell>{lead.gender}</TableCell>
// //                       <TableCell>{lead.ageGroup}</TableCell>
// //                       <TableCell>{lead.clinicalCondition.join(", ")}</TableCell>
// //                       <TableCell>{`${lead.city}, ${lead.state}, ${lead.country}`}</TableCell>
// //                       <TableCell>
// //                         <Badge className={getStatusColor(lead.salesStatus)}>
// //                           {lead.salesStatus}
// //                         </Badge>
// //                       </TableCell>
// //                       <TableCell>{lead.stage}</TableCell>
// //                       <TableCell>
// //                         {lead.previousCampaigns.length > 0 ? (
// //                           <div className="flex flex-wrap gap-1">
// //                             {lead.previousCampaigns.map((campaign, index) => (
// //                               <Badge key={index} variant="secondary">
// //                                 {campaign}
// //                               </Badge>
// //                             ))}
// //                           </div>
// //                         ) : (
// //                           <span className="text-muted-foreground">None</span>
// //                         )}
// //                       </TableCell>
// //                     </TableRow>
// //                   ))
// //                 ) : (
// //                   <TableRow>
// //                     <TableCell
// //                       colSpan={8}
// //                       className="h-24 text-center text-muted-foreground"
// //                     >
// //                       No leads found matching the filters.
// //                     </TableCell>
// //                   </TableRow>
// //                 )}
// //               </TableBody>
// //             </Table>
// //           </CardContent>
// //         </Card>
// //       </div>
// //     </div>
// //   );
// // }
