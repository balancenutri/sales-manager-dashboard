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
import { User, Package } from "lucide-react";

import { useGetPageVisitsDataQuery } from "@/service/dashboard/api";

import SkeletonTable from "@/components/common/SkeletonTable";

export default function PageVisitModal({ id }: { id: number | null }) {
  const { data, isFetching } = useGetPageVisitsDataQuery({
    id,
  });

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

  return (
    <div className="space-y-6 p-6 bg-gray-50 h-[80vh] overflow-scroll">
      {/* Header */}

      {/* Pitched Details Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Package className="h-5 w-5" />
              <span>Page Visits</span>
            </CardTitle>
            <Badge variant="outline" className="px-3 py-1">
              {data?.data.length} records
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
                    <TableHead className="font-semibold">
                      Page Details
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {!isFetching ? (
                    data?.data.map((record) => (
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
                              <Badge
                                variant="outline"
                                className={getProgramTypeColor(
                                  record.program_category
                                )}
                              >
                                {record.program_category}
                              </Badge>
                              <span className="text-sm font-semibold text-green-600">
                                {formatCurrency(record?.mrp || 0)}
                              </span>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className="space-y-1">
                            <p className="font-semibold text-gray-900">
                              {record.program_name}
                            </p>
                          </div>
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
          {data?.data?.length === 0 && !isFetching && (
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
