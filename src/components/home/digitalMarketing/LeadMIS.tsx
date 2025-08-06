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
import { Download, Send } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";

export default function LeadMIS() {
  const [selectedWatiTemplate, setSelectedWatiTemplate] = useState<string>();

  const { control, watch, reset } = useForm({
    defaultValues: {
      gender: "all",
      ageGroup: "all",
      clinicalCondition: "all",
      region: "all",
      country: "all",
      state: "all",
      city: "all",
      salesStatus: "all",
      stage: "all",
    },
  });

  const filters = watch();

  const filteredLeads = useMemo(() => {
    return mockData.leads.filter((lead) => {
      if (filters.gender !== "all" && lead.gender !== filters.gender)
        return false;
      if (filters.ageGroup !== "all" && lead.ageGroup !== filters.ageGroup)
        return false;
      if (
        filters.clinicalCondition !== "all" &&
        !lead.clinicalCondition.includes(filters.clinicalCondition)
      )
        return false;
      if (filters.region !== "all" && lead.region !== filters.region)
        return false;
      if (filters.country !== "all" && lead.country !== filters.country)
        return false;
      if (filters.state !== "all" && lead.state !== filters.state) return false;
      if (filters.city !== "all" && lead.city !== filters.city) return false;
      if (
        filters.salesStatus !== "all" &&
        lead.salesStatus !== filters.salesStatus
      )
        return false;
      if (filters.stage !== "all" && lead.stage !== filters.stage) return false;
      return true;
    });
  }, [filters]);

  const options = {
    gender: useMemo(
      () => Array.from(new Set(mockData.leads.map((l) => l.gender))),
      []
    ),
    ageGroup: useMemo(
      () => Array.from(new Set(mockData.leads.map((l) => l.ageGroup))),
      []
    ),
    clinicalCondition: useMemo(
      () =>
        Array.from(new Set(mockData.leads.flatMap((l) => l.clinicalCondition))),
      []
    ),
    region: useMemo(
      () => Array.from(new Set(mockData.leads.map((l) => l.region))),
      []
    ),
    country: useMemo(
      () => Array.from(new Set(mockData.leads.map((l) => l.country))),
      []
    ),
    state: useMemo(
      () => Array.from(new Set(mockData.leads.map((l) => l.state))),
      []
    ),
    city: useMemo(
      () => Array.from(new Set(mockData.leads.map((l) => l.city))),
      []
    ),
    salesStatus: useMemo(
      () => Array.from(new Set(mockData.leads.map((l) => l.salesStatus))),
      []
    ),
    stage: useMemo(
      () => Array.from(new Set(mockData.leads.map((l) => l.stage))),
      []
    ),
  };

  const handleExportLeads = () => {
    console.log("Exporting", filteredLeads.length);
  };

  const handleWatiBroadcast = () => {
    if (!selectedWatiTemplate) return;
    console.log(
      "WATI Broadcast for",
      selectedWatiTemplate,
      filteredLeads.length
    );
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

  return (
    <div className="space-y-6 mt-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Lead MIS for Retargeting</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={handleExportLeads}>
            <Download className="mr-2 h-4 w-4" /> Export Filtered Leads (
            {filteredLeads.length})
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
            <Send className="mr-2 h-4 w-4" /> Run WATI Broadcast
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filter Leads</CardTitle>
          <CardDescription>
            Apply filters to segment leads for retargeting
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Object.entries(options).map(([name, values]) => (
            <Controller
              key={name}
              name={name as keyof typeof filters}
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full min-h-10 font-normal">
                    <SelectValue placeholder={name} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    {values.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          ))}
          <Button variant="outline" onClick={() => reset()}>
            Clear Filters
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Filtered Leads ({filteredLeads.length})</CardTitle>
          <CardDescription>
            List of leads matching the applied filters
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Age Group</TableHead>
                <TableHead>Clinical Condition</TableHead>
                <TableHead>Region</TableHead>
                <TableHead>Sales Status</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead>Previous Campaigns</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.length > 0 ? (
                filteredLeads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell className="font-medium">{lead.name}</TableCell>
                    <TableCell>{lead.gender}</TableCell>
                    <TableCell>{lead.ageGroup}</TableCell>
                    <TableCell>{lead.clinicalCondition.join(", ")}</TableCell>
                    <TableCell>{`${lead.city}, ${lead.state}, ${lead.country}`}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(lead.salesStatus)}>
                        {lead.salesStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>{lead.stage}</TableCell>
                    <TableCell>
                      {lead.previousCampaigns.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {lead.previousCampaigns.map((campaign, index) => (
                            <Badge key={index} variant="secondary">
                              {campaign}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">None</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="h-24 text-center text-muted-foreground"
                  >
                    No leads found matching the filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { mockData } from "@/lib/data";
// import { Download, Send } from "lucide-react";
// import { useMemo, useState } from "react";

// export default function LeadMIS() {
//   const [selectedWatiTemplate, setSelectedWatiTemplate] = useState<
//     string | undefined
//   >(undefined);

//     const [genderFilter, setGenderFilter] = useState<string | null>(null);
//     const [ageGroupFilter, setAgeGroupFilter] = useState<string | null>(null);
//     const [clinicalConditionFilter, setClinicalConditionFilter] = useState<
//       string | null
//     >(null);
//     const [regionFilter, setRegionFilter] = useState<string | null>(null);
//     const [countryFilter, setCountryFilter] = useState<string | null>(null);
//     const [stateFilter, setStateFilter] = useState<string | null>(null);
//     const [cityFilter, setCityFilter] = useState<string | null>(null);
//     const [salesStatusFilter, setSalesStatusFilter] = useState<string | null>(
//       null
//     );
//     const [stageFilter, setStageFilter] = useState<string | null>(null);

//   const filteredLeads = useMemo(() => {
//     return mockData.leads.filter((lead) => {
//       if (
//         genderFilter &&
//         genderFilter !== "all" &&
//         lead.gender !== genderFilter
//       )
//         return false;
//       if (
//         ageGroupFilter &&
//         ageGroupFilter !== "all" &&
//         lead.ageGroup !== ageGroupFilter
//       )
//         return false;
//       // For clinical condition, check if the selected filter is present in the lead's conditions
//       if (
//         clinicalConditionFilter &&
//         clinicalConditionFilter !== "all" &&
//         !lead.clinicalCondition.includes(clinicalConditionFilter)
//       )
//         return false;
//       if (
//         regionFilter &&
//         regionFilter !== "all" &&
//         lead.region !== regionFilter
//       )
//         return false;
//       if (
//         countryFilter &&
//         countryFilter !== "all" &&
//         lead.country !== countryFilter
//       )
//         return false;
//       if (stateFilter && stateFilter !== "all" && lead.state !== stateFilter)
//         return false;
//       if (cityFilter && cityFilter !== "all" && lead.city !== cityFilter)
//         return false;
//       if (
//         salesStatusFilter &&
//         salesStatusFilter !== "all" &&
//         lead.salesStatus !== salesStatusFilter
//       )
//         return false;
//       if (stageFilter && stageFilter !== "all" && lead.stage !== stageFilter)
//         return false;
//       return true;
//     });
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
//   ]);

//     const uniqueGenders = useMemo(
//       () => Array.from(new Set(mockData.leads.map((l) => l.gender))),
//       []
//     );
//     const uniqueAgeGroups = useMemo(
//       () => Array.from(new Set(mockData.leads.map((l) => l.ageGroup))),
//       []
//     );
//     const uniqueClinicalConditions = useMemo(
//       () =>
//         Array.from(new Set(mockData.leads.flatMap((l) => l.clinicalCondition))),
//       []
//     );
//     const uniqueRegions = useMemo(
//       () => Array.from(new Set(mockData.leads.map((l) => l.region))),
//       []
//     );
//     const uniqueCountries = useMemo(
//       () => Array.from(new Set(mockData.leads.map((l) => l.country))),
//       []
//     );
//     const uniqueStates = useMemo(
//       () => Array.from(new Set(mockData.leads.map((l) => l.state))),
//       []
//     );
//     const uniqueCities = useMemo(
//       () => Array.from(new Set(mockData.leads.map((l) => l.city))),
//       []
//     );
//     const uniqueSalesStatuses = useMemo(
//       () => Array.from(new Set(mockData.leads.map((l) => l.salesStatus))),
//       []
//     );
//     const uniqueStages = useMemo(
//       () => Array.from(new Set(mockData.leads.map((l) => l.stage))),
//       []
//     );

//   const handleExportLeads = () => {
//     // In a real application, you would generate and download a CSV/Excel file
//     // toast({
//     //   title: "Export Initiated",
//     //   description: `Exporting ${filteredLeads.length} leads... (This is a placeholder action)`,
//     // })
//   };

//   const handleWatiBroadcast = () => {
//     if (!selectedWatiTemplate) {
//       // toast({
//       //   title: "Broadcast Failed",
//       //   description: "Please select a WATI template.",
//       //   variant: "destructive",
//       // })
//       return;
//     }
//     // In a real application, you would send the filtered leads to WATI API
//     // toast({
//     //   title: "WATI Broadcast Sent",
//     //   description: `Broadcast with template "${selectedWatiTemplate}" sent to ${filteredLeads.length} leads. (This is a placeholder action)`,
//     // })
//   };

//     const getStatusColor = (status: string) => {
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

//   return (
//     <div>
//       <div className="space-y-6 mt-8">
//         <div className="flex items-center justify-between">
//           <h2 className="text-2xl font-bold">Lead MIS for Retargeting</h2>
//           <div className="flex items-center space-x-2">
//             <Button variant="outline" onClick={handleExportLeads}>
//               <Download className="mr-2 h-4 w-4" />
//               Export Filtered Leads ({filteredLeads.length})
//             </Button>
//             <Select
//               value={selectedWatiTemplate}
//               onValueChange={setSelectedWatiTemplate}
//             >
//               <SelectTrigger className="w-[200px]">
//                 <SelectValue placeholder="Select WATI Template" />
//               </SelectTrigger>
//               <SelectContent>
//                 {mockData.watiTemplates.map((template) => (
//                   <SelectItem key={template.id} value={template.name}>
//                     {template.name}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//             <Button
//               onClick={handleWatiBroadcast}
//               disabled={!selectedWatiTemplate}
//             >
//               <Send className="mr-2 h-4 w-4" />
//               Run WATI Broadcast
//             </Button>
//           </div>
//         </div>

//         {/* Filters */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Filter Leads</CardTitle>
//             <CardDescription>
//               Apply filters to segment leads for retargeting
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//             <Select
//               value={genderFilter || "all"}
//               onValueChange={(value) =>
//                 setGenderFilter(value === "all" ? null : value)
//               }

//             >
//               <SelectTrigger className="w-full min-h-10 font-normal">
//                 <SelectValue placeholder="Gender" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Genders</SelectItem>
//                 {uniqueGenders.map((gender) => (
//                   <SelectItem key={gender} value={gender}>
//                     {gender}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>

//             <Select
//               value={ageGroupFilter || "all"}
//               onValueChange={(value) =>
//                 setAgeGroupFilter(value === "all" ? null : value)
//               }
//             >
//               <SelectTrigger className="w-full min-h-10 font-normal">
//                 <SelectValue placeholder="Age Group" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Age Groups</SelectItem>
//                 {uniqueAgeGroups.map((group) => (
//                   <SelectItem key={group} value={group}>
//                     {group}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>

//             <Select
//               value={clinicalConditionFilter || "all"}
//               onValueChange={(value) =>
//                 setClinicalConditionFilter(value === "all" ? null : value)
//               }
//             >
//               <SelectTrigger className="w-full min-h-10 font-normal">
//                 <SelectValue placeholder="Clinical Condition" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Conditions</SelectItem>
//                 {uniqueClinicalConditions.map((condition) => (
//                   <SelectItem key={condition} value={condition}>
//                     {condition}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>

//             <Select
//               value={regionFilter || "all"}
//               onValueChange={(value) =>
//                 setRegionFilter(value === "all" ? null : value)
//               }
//             >
//               <SelectTrigger className="w-full min-h-10 font-normal">
//                 <SelectValue placeholder="Region" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Regions</SelectItem>
//                 {uniqueRegions.map((region) => (
//                   <SelectItem key={region} value={region}>
//                     {region}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>

//             <Select
//               value={countryFilter || "all"}
//               onValueChange={(value) =>
//                 setCountryFilter(value === "all" ? null : value)
//               }
//             >
//               <SelectTrigger className="w-full min-h-10 font-normal">
//                 <SelectValue placeholder="Country" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Countries</SelectItem>
//                 {uniqueCountries.map((country) => (
//                   <SelectItem key={country} value={country}>
//                     {country}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>

//             <Select
//               value={stateFilter || "all"}
//               onValueChange={(value) =>
//                 setStateFilter(value === "all" ? null : value)
//               }
//             >
//               <SelectTrigger className="w-full min-h-10 font-normal">
//                 <SelectValue placeholder="State" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All States</SelectItem>
//                 {uniqueStates.map((state) => (
//                   <SelectItem key={state} value={state}>
//                     {state}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>

//             <Select
//               value={cityFilter || "all"}
//               onValueChange={(value) =>
//                 setCityFilter(value === "all" ? null : value)
//               }
//             >
//               <SelectTrigger className="w-full min-h-10 font-normal">
//                 <SelectValue placeholder="City" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Cities</SelectItem>
//                 {uniqueCities.map((city) => (
//                   <SelectItem key={city} value={city}>
//                     {city}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>

//             <Select
//               value={salesStatusFilter || "all"}
//               onValueChange={(value) =>
//                 setSalesStatusFilter(value === "all" ? null : value)
//               }
//             >
//               <SelectTrigger className="w-full min-h-10 font-normal">
//                 <SelectValue placeholder="Sales Status" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Statuses</SelectItem>
//                 {uniqueSalesStatuses.map((status) => (
//                   <SelectItem key={status} value={status}>
//                     {status}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>

//             <Select
//               value={stageFilter || "all"}
//               onValueChange={(value) =>
//                 setStageFilter(value === "all" ? null : value)
//               }
//             >
//               <SelectTrigger className="w-full min-h-10 font-normal">
//                 <SelectValue placeholder="Stage" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Stages</SelectItem>
//                 {uniqueStages.map((stage) => (
//                   <SelectItem key={stage} value={stage}>
//                     {stage}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>

//             <Button
//               variant="outline"
//               onClick={() => {
//                 setGenderFilter(null);
//                 setAgeGroupFilter(null);
//                 setClinicalConditionFilter(null);
//                 setRegionFilter(null);
//                 setCountryFilter(null);
//                 setStateFilter(null);
//                 setCityFilter(null);
//                 setSalesStatusFilter(null);
//                 setStageFilter(null);
//               }}
//             >
//               Clear Filters
//             </Button>
//           </CardContent>
//         </Card>

//         {/* Filtered Leads Table */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Filtered Leads ({filteredLeads.length})</CardTitle>
//             <CardDescription>
//               List of leads matching the applied filters
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Name</TableHead>
//                   <TableHead>Gender</TableHead>
//                   <TableHead>Age Group</TableHead>
//                   <TableHead>Clinical Condition</TableHead>
//                   <TableHead>Region</TableHead>
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
//                       <TableCell>{lead.clinicalCondition.join(", ")}</TableCell>
//                       <TableCell>{`${lead.city}, ${lead.state}, ${lead.country}`}</TableCell>
//                       <TableCell>
//                         <Badge className={getStatusColor(lead.salesStatus)}>
//                           {lead.salesStatus}
//                         </Badge>
//                       </TableCell>
//                       <TableCell>{lead.stage}</TableCell>
//                       <TableCell>
//                         {lead.previousCampaigns.length > 0 ? (
//                           <div className="flex flex-wrap gap-1">
//                             {lead.previousCampaigns.map((campaign, index) => (
//                               <Badge key={index} variant="secondary">
//                                 {campaign}
//                               </Badge>
//                             ))}
//                           </div>
//                         ) : (
//                           <span className="text-muted-foreground">None</span>
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
//                       No leads found matching the filters.
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }
