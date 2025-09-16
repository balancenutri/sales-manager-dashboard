import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Users,
  DollarSign,
  TrendingUp,
  Calendar,
  User,
  Package,
} from "lucide-react";

interface PitchedRecord {
  id: string;
  name: string;
  programDetails: {
    name: string;
    type: string;
    duration: string;
    amount: number;
  };
  pitchedBy: {
    name: string;
    role: string;
  };
  date: string;
  status: "pending" | "accepted" | "rejected" | "follow-up";
}

export default function PitchedHistory() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [dateFilter, setDateFilter] = useState("all");

  // Mock data - replace with actual API data
  const summaryData = {
    totalSuggestedUsers: 4432455,
    totalSuggestedAmount: 561954,
    averagePerUser: 12488,
    totalPitched: 38,
    conversionRate: 24.5,
    pendingFollowUp: 12,
  };

  const pitchedRecords: PitchedRecord[] = [
    {
      id: "1",
      name: "Rajesh Kumar",
      programDetails: {
        name: "Premium Health Stack",
        type: "Comprehensive",
        duration: "6 months",
        amount: 25000,
      },
      pitchedBy: {
        name: "Kundan Chaudhary",
        role: "Senior Counsellor",
      },
      date: "2024-01-15",
      status: "accepted",
    },
    {
      id: "2",
      name: "Priya Sharma",
      programDetails: {
        name: "Basic Wellness Plan",
        type: "Standard",
        duration: "3 months",
        amount: 12000,
      },
      pitchedBy: {
        name: "Anita Singh",
        role: "Counsellor",
      },
      date: "2024-01-14",
      status: "pending",
    },
    {
      id: "3",
      name: "Amit Patel",
      programDetails: {
        name: "Advanced Nutrition Program",
        type: "Specialized",
        duration: "4 months",
        amount: 18500,
      },
      pitchedBy: {
        name: "Kundan Chaudhary",
        role: "Senior Counsellor",
      },
      date: "2024-01-13",
      status: "follow-up",
    },
    {
      id: "4",
      name: "Sneha Gupta",
      programDetails: {
        name: "Weight Management Stack",
        type: "Comprehensive",
        duration: "8 months",
        amount: 32000,
      },
      pitchedBy: {
        name: "Rahul Verma",
        role: "Lead Counsellor",
      },
      date: "2024-01-12",
      status: "rejected",
    },
    {
      id: "5",
      name: "Vikash Singh",
      programDetails: {
        name: "Diabetes Care Program",
        type: "Medical",
        duration: "12 months",
        amount: 45000,
      },
      pitchedBy: {
        name: "Dr. Meera Joshi",
        role: "Medical Counsellor",
      },
      date: "2024-01-11",
      status: "accepted",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      case "follow-up":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getProgramTypeColor = (type: string) => {
    switch (type) {
      case "Comprehensive":
        return "bg-purple-100 text-purple-800";
      case "Standard":
        return "bg-blue-100 text-blue-800";
      case "Specialized":
        return "bg-orange-100 text-orange-800";
      case "Medical":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const filteredRecords = pitchedRecords

//   const filteredRecords = pitchedRecords.filter((record) => {
//     const matchesSearch =
//       record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       record.programDetails.name
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase()) ||
//       record.pitchedBy.name.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchesStatus =
//       statusFilter === "all" || record.status === statusFilter;

//     return matchesSearch && matchesStatus;
//   });

  return (
    <div className="space-y-6 p-6 bg-gray-50 h-[80vh] overflow-scroll">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pitched History</h1>
          <p className="text-gray-600 mt-1">
            Track all program pitches and their outcomes
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-3">
            {/* Sales Person Filter */}
            <Select value="all">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sales Person" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Sales Person</SelectItem>
                <SelectItem value="krishna">Krishna</SelectItem>
                <SelectItem value="barkha">Barkha</SelectItem>
                <SelectItem value="manshi">Manshi</SelectItem>
                <SelectItem value="kajal">Kajal</SelectItem>
              </SelectContent>
            </Select>

            {/* Month Filter */}
            <Select>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="january">January</SelectItem>
                <SelectItem value="february">February</SelectItem>
                <SelectItem value="march">March</SelectItem>
                <SelectItem value="april">April</SelectItem>
                <SelectItem value="may">May</SelectItem>
                <SelectItem value="june">June</SelectItem>
                <SelectItem value="july">July</SelectItem>
                <SelectItem value="august">August</SelectItem>
                <SelectItem value="september">September</SelectItem>
                <SelectItem value="october">October</SelectItem>
                <SelectItem value="november">November</SelectItem>
                <SelectItem value="december">December</SelectItem>
              </SelectContent>
            </Select>

            {/* Year Filter */}
            <Select>
              <SelectTrigger className="w-28">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2025">2025</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Total Suggested Users */}
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-500 rounded-2xl shadow-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-3xl font-bold text-blue-700">
                  {formatCurrency(summaryData.totalSuggestedUsers)}
                </p>
                <p className="text-sm font-medium text-blue-600">
                  Total Suggested Amount
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Suggested Amount */}
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-500 rounded-2xl shadow-lg">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-3xl font-bold text-green-700">
                  {formatCurrency(summaryData.totalSuggestedAmount)}
                </p>
                <p className="text-sm font-medium text-green-600">
                  Basic Stack
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Average per User */}
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-500 rounded-2xl shadow-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-3xl font-bold text-purple-700">
                  {formatCurrency(summaryData.averagePerUser)}
                </p>
                <p className="text-sm font-medium text-purple-600">
                  Special Stack
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      {/* <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filters & Search</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name, program, or counsellor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="follow-up">Follow-up</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card> */}

      {/* Pitched Details Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Package className="h-5 w-5" />
              <span>Pitched Details</span>
            </CardTitle>
            <Badge variant="outline" className="px-3 py-1">
              {filteredRecords.length} records
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Name</TableHead>
                  <TableHead className="font-semibold">
                    Program Details
                  </TableHead>
                  <TableHead className="font-semibold">Pitched By</TableHead>
                  <TableHead className="font-semibold">Date</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecords.map((record) => (
                  <TableRow
                    key={record.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {record.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            ID: {record.id}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div>
                          <p className="font-semibold text-gray-900">
                            {record.programDetails.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            {record.programDetails.duration}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant="outline"
                            className={getProgramTypeColor(
                              record.programDetails.type
                            )}
                          >
                            {record.programDetails.type}
                          </Badge>
                          <span className="text-sm font-semibold text-green-600">
                            {formatCurrency(record.programDetails.amount)}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-semibold text-gray-900">
                          {record.pitchedBy.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {record.pitchedBy.role}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm font-medium">
                          {formatDate(record.date)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={getStatusColor(record.status)}
                      >
                        {record.status.charAt(0).toUpperCase() +
                          record.status.slice(1)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredRecords.length === 0 && (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No pitched records found</p>
              <p className="text-gray-400 text-sm">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
