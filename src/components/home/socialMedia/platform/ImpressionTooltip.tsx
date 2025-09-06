import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { SocailMediaType } from "@/lib/types";

export default function ImpressionTooltip({ data }: { data: SocailMediaType }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="font-semibold text-red-500 cursor-pointer hover:text-red-700 transition-colors duration-200 px-2 py-1 rounded-md hover:bg-red-50">
            {data.impressions}
          </span>
        </TooltipTrigger>
        <TooltipContent className="p-0 bg-white border border-gray-200 shadow-lg rounded-lg max-w-xs">
          <div className="p-4 space-y-4">
            {/* Today Section */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <h4 className="font-semibold text-center text-gray-900 text-sm">
                  Impressions
                </h4>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-2 bg-green-50 rounded-md">
                  <p className="text-xs text-gray-600 font-medium">Likes</p>
                  <p className="text-sm font-bold text-green-700">
                    {data.like}
                  </p>
                </div>
                <div className="text-center p-2 bg-blue-50 rounded-md">
                  <p className="text-xs text-gray-600 font-medium">Comment</p>
                  <p className="text-sm font-bold text-blue-700">
                    {data.comment}
                  </p>
                </div>
                <div className="text-center p-2 bg-purple-50 rounded-md">
                  <p className="text-xs text-gray-600 font-medium">Share</p>
                  <p className="text-sm font-bold text-purple-700">
                    {data.share}
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
