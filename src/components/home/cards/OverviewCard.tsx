import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { keyString } from "@/lib/utils";

type OverviewCardProps = {
  title?: string;
  data: { [key: string]: number } | undefined;
  fetching: boolean;
  // selected: "lead" | "oc";
  // setSelected: React.Dispatch<React.SetStateAction<"lead" | "oc">>;
};

export default function OverviewCard({
  title,
  data,
  fetching,
}: // selected,
// setSelected,
OverviewCardProps) {
  return (
    <Card className="relative mt-4">
      <CardHeader className="flex justify-between">
        <CardTitle className="text-base font-medium flex justify-between items-center w-full">
          {title && (
            <span className="block text-nowrap px-3 py-2 rounded-md bg-orange-100 text-orange-800">
              {title}
            </span>
          )}
          {/* <Tabs defaultValue={selected} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger
                className="cursor-pointer"
                value={"lead"}
                onClick={() => setSelected("lead")}
              >
                Lead
              </TabsTrigger>
              <TabsTrigger
                className="cursor-pointer"
                value="oc"
                onClick={() => setSelected("oc")}
              >
                OC
              </TabsTrigger>
            </TabsList>
          </Tabs> */}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {data && !fetching
          ? Object.entries(data).map(([key, value]) => (
              <div
                key={key}
                className="flex items-center justify-between border-b pb-2 last:border-b-0 last:pb-0"
              >
                <span className="text-sm text-medium capitalize">
                  {keyString(key)}
                </span>
                <span className="font-semibold text-base">{value}</span>
              </div>
            ))
          : Array(8)
              .fill(null)
              .map((_, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b pb-2"
                >
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-5 w-20" />
                </div>
              ))}
      </CardContent>
    </Card>
  );
}
