import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function AppActivityTooltip({
  withApp,
  withActivity,
  withoutActivity,
  type,
}: {
  withApp: number;
  withActivity: number;
  withoutActivity: number;
  type: "activity" | "not_updated"
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="font-semibold text-red-500 cursor-pointer hover:text-red-700 transition-colors duration-200 px-2 py-1 rounded-md hover:bg-red-50">
            {withApp}
          </span>
        </TooltipTrigger>
        {withApp !== 0 && (
          <TooltipContent className="p-0 bg-white border border-gray-200 shadow-lg rounded-lg max-w-xs z-50">
            <div className="p-4 space-y-4">
              <div className="space-y-2">
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-2 bg-green-50 rounded-md">
                    <p className="text-xs text-gray-600 font-medium">
                      {type == "activity" ? "With Activity" : "New App"}
                    </p>
                    <p className="text-sm font-bold text-green-700">
                      {withActivity}
                    </p>
                  </div>
                  <div className="text-center p-2 bg-green-50 rounded-md">
                    <p className="text-xs text-gray-600 font-medium">
                      {type == "activity" ? "With Inactivity" : "Old App"}
                    </p>
                    <p className="text-sm font-bold text-green-700">
                      {withoutActivity}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}
