import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { NotUpdatedVersions } from "@/lib/types";

export default function PreviousVersionTooltip({
  versions,
}: {
  versions: NotUpdatedVersions;
}) {
  const totalCount =
    versions.android.reduce((sum, v) => sum + v.count, 0) +
    versions.ios.reduce((sum, v) => sum + v.count, 0);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="font-semibold text-red-500 cursor-pointer hover:text-red-700 transition-colors duration-200 px-2 py-1 rounded-md hover:bg-red-50">
            {totalCount}
          </span>
        </TooltipTrigger>
        <TooltipContent className="p-0 bg-white border border-gray-200 shadow-lg rounded-lg max-w-xs z-50">
          <div className="p-4 space-y-4">
            {/* Android Section */}
            {versions.android.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <h4 className="font-semibold text-gray-900 text-sm">
                    Android
                  </h4>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {versions.android.map((v) => (
                    <div
                      key={v.version}
                      className="text-center p-2 bg-green-50 rounded-md"
                    >
                      <p className="text-xs text-gray-600 font-medium">
                        {v.version}
                      </p>
                      <p className="text-sm font-bold text-green-700">
                        {v.count}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* iOS Section */}
            {versions.ios.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <h4 className="font-semibold text-gray-900 text-sm">iOS</h4>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {versions.ios.map((v) => (
                    <div
                      key={v.version}
                      className="text-center p-2 bg-blue-50 rounded-md"
                    >
                      <p className="text-xs text-gray-600 font-medium">
                        {v.version}
                      </p>
                      <p className="text-sm font-bold text-blue-700">
                        {v.count}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
