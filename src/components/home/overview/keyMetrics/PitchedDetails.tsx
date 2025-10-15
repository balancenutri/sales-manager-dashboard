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
  // Users,
  DollarSign,
  // TrendingUp,
  Calendar,
  User,
  Package,
} from "lucide-react";

import CustomDatePicker from "@/components/ui/custom-date-picker";
import dayjs from "dayjs";
import quarterOfYear from "dayjs/plugin/quarterOfYear";
dayjs.extend(quarterOfYear);
import { useState } from "react";
import { useGetPitchedHistoryQuery } from "@/service/dashboard/api";
import { Skeleton } from "@/components/ui/skeleton";
import SkeletonTable from "@/components/common/SkeletonTable";
import { keyString } from "@/lib/utils";

export default function PitchedHistory({
  filter,
  type,
}: {
  filter: "rate_shared" | "link_shared" | "to_pay" | "pay_later";
  type: "" | "prev" | "quarter" | "mtd"; 
}) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const { data, isFetching } = useGetPitchedHistoryQuery({
    ...(selectedDate
      ? {
          start_date: dayjs(selectedDate).startOf("month").format("YYYY-MM-DD"),
          end_date: dayjs(selectedDate).endOf("month").format("YYYY-MM-DD"),
          filter,
        }
      : {
          filter,
          ...(type === "prev"
            ? {
                start_date: dayjs()
                  .subtract(1, "month")
                  .startOf("month")
                  .format("YYYY-MM-DD"),
                end_date: dayjs()
                  .subtract(1, "month")
                  .endOf("month")
                  .format("YYYY-MM-DD"),
              }
            : type === "quarter"
            ? {
                start_date: dayjs().startOf("quarter").format("YYYY-MM-DD"),
                end_date: dayjs().format("YYYY-MM-DD"),
              }
            : type === "mtd"
            ? {
                start_date: dayjs().startOf("month").format("YYYY-MM-DD"),
                end_date: dayjs().format("YYYY-MM-DD"),
              }
            : {}),
        }),
  });
  // console.log({ data, isFetching });

  const getStatusColor = (status: number) => {
    switch (status) {
      case 1:
        return "bg-green-100 text-green-800 border-green-200";
      case 0:
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getProgramTypeColor = (type: string) => {
    switch (type) {
      case "Special Stack":
        return "bg-purple-100 text-purple-800";
      case "Basic Stack":
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

  return (
    <div className="space-y-6 p-6 bg-gray-50 h-[80vh] overflow-scroll">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{keyString(filter)}</h1>
          <p className="text-gray-600 mt-1">
            Track all program pitches and their outcomes
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-3">
            {/* Sales Person Filter */}
            {/* <Select value="all">
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
            </Select> */}

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

      {/* Summary Cards */}
      {data?.data && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Total Suggested Users */}
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-500 rounded-2xl shadow-lg">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                <div>
                  {isFetching ? (
                    <Skeleton className="h-8 w-24 bg-blue-300" />
                  ) : (
                    <p className="text-3xl font-bold text-blue-700">
                      {formatCurrency(data?.data.total_amount)}
                    </p>
                  )}
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
                  {isFetching ? (
                    <Skeleton className="h-8 w-24 bg-green-300" />
                  ) : (
                    <p className="text-3xl font-bold text-green-700">
                      {formatCurrency(data?.data.basic_stack)}
                    </p>
                  )}
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
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                <div>
                  {isFetching ? (
                    <Skeleton className="h-8 w-24 bg-purple-300" />
                  ) : (
                    <p className="text-3xl font-bold text-purple-700">
                      {formatCurrency(data?.data.special_stack)}
                    </p>
                  )}
                  <p className="text-sm font-medium text-purple-600">
                    Special Stack
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Pitched Details Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Package className="h-5 w-5" />
              <span>Pitched Details</span>
            </CardTitle>
            <Badge variant="outline" className="px-3 py-1">
              {data?.data.users.length} records
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {/* Table Scroll Wrapper */}
          <div className="max-h-[500px] overflow-y-auto">
            <div className="w-full overflow-x-auto">
              <Table className="min-w-full">
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
                  {!isFetching ? (
                    data?.data.users.map((record) => (
                      <TableRow
                        key={record.user_id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                              <User className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <p
                                className="font-semibold text-gray-900 cursor-pointer"
                                onClick={() =>
                                  window.open(
                                    `https://mentor.balancenutrition.in/profile/${record.user_id}`,
                                    "_blank"
                                  )
                                }
                              >
                                {record.name}
                              </p>
                              <p className="font-semibold text-gray-900">
                                {record.email_id}
                              </p>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className="space-y-2">
                            <div>
                              <p className="font-semibold text-gray-900">
                                {record.program_name}
                              </p>
                              <p className="text-sm text-gray-600">
                                {record.program_duration}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-semibold text-green-600">
                                MRP: {formatCurrency(record.mrp)}
                              </span>
                              <span className="text-sm font-semibold text-green-600">
                                Sugg. Amt.:{formatCurrency(Number(record.suggested_amount))}
                              </span>
                            </div>
                              <Badge
                                variant="outline"
                                className={getProgramTypeColor(
                                  record.program_category
                                )}
                              >
                                {record.program_category}
                              </Badge>
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className="space-y-1">
                            <p className="font-semibold text-gray-900">
                              {record.suggested_by}
                            </p>
                            <p className="text-sm text-gray-600">
                              {record.designation?.split("(")[0]}
                            </p>
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span className="text-sm font-medium">
                              {formatDate(record.added_date)}
                            </span>
                          </div>
                        </TableCell>

                        <TableCell>
                          <Badge
                            variant="outline"
                            className={getStatusColor(record.payment_status)}
                          >
                            {record.payment_status === 0 ? "Pending" : "Done"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <SkeletonTable row={8} col={5} />
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* No data fallback */}
          {data?.data.users?.length === 0 && !isFetching && (
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
