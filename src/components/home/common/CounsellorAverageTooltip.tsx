import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { AssignedLeadPerformanceAll } from "@/lib/types";

interface ImprovedTooltipProps {
  performanceData: AssignedLeadPerformanceAll;
  benchmarkData: {
    "l:c": number;
    "c:s": number;
    "l:s": number;
  };
  averageData: {
    "l:c": number;
    "c:s": number;
    "l:s": number;
  };
}

export function CounsellorAverageTooltip({
  benchmarkData,
  averageData,
  performanceData,
}: ImprovedTooltipProps) {
  const performanceLabel = (
    data: string,
    benchmark: number,
    avg: number
  ): string => {
    let value = Number(data);
    let average = Number(avg);
    if (value > benchmark) return "Excellent";
    if (value >= benchmark - 5) return "Good";
    if (value < benchmark - 5 && value >= average) return "Fair";
    if (value < average) return "Risk";
    return "Unknown";
  };
  const performanceColor = (
    data: string,
    benchmark: number,
    avg: number
  ): string => {
    let value = Number(data);
    let average = Number(avg);
    if (value > benchmark) return "text-green-700";
    if (value >= benchmark - 5) return "text-green-400";
    if (value < benchmark - 5 && value >= average) return "text-yellow-700";
    if (value < average) return "text-red-400";
    return "text-red-600";
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="mt-3 p-3 rounded-lg bg-gray-50 border text-sm">
            <div className="grid grid-cols-3 text-center">
              <div>
                <p className="text-muted-foreground text-xs">L : C</p>
                <p
                  className={`${performanceColor(
                    performanceData["l:c"],
                    benchmarkData["l:c"],
                    averageData["l:c"]
                  )} font-semibold`}
                >
                  {performanceData["l:c"]}%{" "}
                </p>
                <p className="text-xs">
                  ({performanceLabel(
                    performanceData["l:c"],
                    benchmarkData["l:c"],
                    averageData["l:c"]
                  )})
                </p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">C : S</p>
                <p
                  className={`${performanceColor(
                    performanceData["c:s"],
                    benchmarkData["c:s"],
                    averageData["c:s"]
                  )} font-semibold`}
                >
                  {performanceData["c:s"]}%{" "}
                </p>
                <p className="text-xs">
                  ({performanceLabel(
                    performanceData["c:s"],
                    benchmarkData["c:s"],
                    averageData["c:s"]
                  )})
                </p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">L : S</p>
                <p
                  className={`${performanceColor(
                    performanceData["l:s"],
                    benchmarkData["l:s"],
                    averageData["l:s"]
                  )} font-semibold`}
                >
                  {performanceData["l:s"]}%{" "}
                </p>
                <p className="text-xs">
                  ({performanceLabel(
                    performanceData["l:s"],
                    benchmarkData["l:s"],
                    averageData["l:s"]
                  )})
                </p>
              </div>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent className="p-0 bg-white border border-gray-200 shadow-lg rounded-lg max-w-xs">
          <div className="p-4 space-y-4">
            {/* Today Section */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <h4 className="font-semibold text-gray-900 text-sm">Average</h4>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-2 bg-green-50 rounded-md">
                  <p className="text-xs text-gray-600 font-medium">L:C</p>
                  <p className="text-sm font-semibold text-green-500">
                    {averageData["l:c"]}
                  </p>
                </div>
                <div className="text-center p-2 bg-blue-50 rounded-md">
                  <p className="text-xs text-gray-600 font-medium">C:S</p>
                  <p className="text-sm font-semibold text-blue-500">
                    {averageData["c:s"]}
                  </p>
                </div>
                <div className="text-center p-2 bg-purple-50 rounded-md">
                  <p className="text-xs text-gray-600 font-medium">L:S</p>
                  <p className="text-sm font-semibold text-purple-500">
                    {averageData["l:s"]}
                  </p>
                </div>
              </div>
            </div>

            {/* This Month Section */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <h4 className="font-semibold text-gray-900 text-sm">
                  Benchmark
                </h4>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-2 bg-green-50 rounded-md">
                  <p className="text-xs text-gray-600 font-medium">L:C</p>
                  <p className="text-sm font-semibold text-green-500">
                    {benchmarkData["l:c"]}
                  </p>
                </div>
                <div className="text-center p-2 bg-blue-50 rounded-md">
                  <p className="text-xs text-gray-600 font-medium">C:S</p>
                  <p className="text-sm font-semibold text-blue-500">
                    {benchmarkData["c:s"]}
                  </p>
                </div>
                <div className="text-center p-2 bg-purple-50 rounded-md">
                  <p className="text-xs text-gray-600 font-medium">L:S</p>
                  <p className="text-sm font-semibold text-purple-500">
                    {benchmarkData["l:s"]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
