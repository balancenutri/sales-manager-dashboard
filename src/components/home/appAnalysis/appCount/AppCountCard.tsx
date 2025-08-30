import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { keyString } from "@/lib/utils";

type AppCountType = {
  [key: string]: number;
};

export default function AppCountCard({
  data,
  title,
}: {
  data: AppCountType;
  title: string;
}) {
  const CustomTooltip = (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="font-semibold text-red-500 cursor-pointer hover:text-red-700 transition-colors duration-200 px-2 py-1 rounded-md hover:bg-red-50">
            15
          </span>
        </TooltipTrigger>
        <TooltipContent className="p-0 bg-white border border-gray-200 shadow-lg rounded-lg max-w-xs">
          <div className="p-4 space-y-4">
            {/* Today Section */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <h4 className="font-semibold text-gray-900 text-sm">Android</h4>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-2 bg-green-50 rounded-md">
                  <p className="text-xs text-gray-600 font-medium">5.0.55</p>
                  <p className="text-sm font-bold text-green-700">
                    10
                  </p>
                </div>
                <div className="text-center p-2 bg-blue-50 rounded-md">
                  <p className="text-xs text-gray-600 font-medium">5.0.54</p>
                  <p className="text-sm font-bold text-blue-700">
                    12
                  </p>
                </div>
                <div className="text-center p-2 bg-purple-50 rounded-md">
                  <p className="text-xs text-gray-600 font-medium">5.0.53</p>
                  <p className="text-sm font-bold text-purple-700">
                    15
                  </p>
                </div>
              </div>
            </div>

            {/* This Month Section */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <h4 className="font-semibold text-gray-900 text-sm">
                  IOS
                </h4>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-2 bg-green-50 rounded-md">
                  <p className="text-xs text-gray-600 font-medium">1.1.11</p>
                  <p className="text-sm font-bold text-green-700">
                    10
                  </p>
                </div>
                <div className="text-center p-2 bg-blue-50 rounded-md">
                  <p className="text-xs text-gray-600 font-medium">1.1.10</p>
                  <p className="text-sm font-bold text-blue-700">
                    23
                  </p>
                </div>
                <div className="text-center p-2 bg-purple-50 rounded-md">
                  <p className="text-xs text-gray-600 font-medium">1.1.09</p>
                  <p className="text-sm font-bold text-purple-700">
                    56
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
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {Object.entries(data).length < 1
          ? Array(3)
              .fill(null)
              .map((_, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b pb-2"
                >
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-5 w-20" />
                </div>
              ))
          : Object.entries(data).map(([key, value]) => {
              return (
                <div
                  className="flex items-center justify-between border-b pb-2"
                  key={key}
                >
                  <div className="flex items-center space-x-3">
                    {/* <Icon className="h-4 w-4 text-orange-500" /> */}
                    <span className="font-medium">{keyString(key)}</span>
                  </div>
                  <div className="font-semibold text-lg">
                    {key !== "not_updated" ? value : CustomTooltip}
                  </div>
                </div>
              );
            })}
      </CardContent>
    </Card>
  );
}
