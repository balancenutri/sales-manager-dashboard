import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type DataItem = {
  day: number;
  mtd: number;
};

type OverviewCardProps = {
  title: string;
  data: Record<string, DataItem>;
};

export default function OverviewCard({ title, data }: OverviewCardProps) {
  return (
    <Card className="relative pt-8 mt-4">
      <CardHeader className="pb-2 absolute -top-5 left-0 right-0 flex justify-center">
        <CardTitle className="text-base font-medium">
          <span className="block text-nowrap px-3 py-2 rounded-md bg-orange-100 text-orange-800">
            {title}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {Object.entries(data).map(([key, value]) => (
          <div
            key={key}
            className="flex items-center justify-between border-b pb-2 last:border-b-0 last:pb-0"
          >
            <span className="text-sm text-medium capitalize">
              {key
                .replace(/([A-Z])/g, " $1")
                .replace(/OD/g, "OD")
                .trim()}
            </span>
            <span className="font-semibold text-base">
              {value.day} | {value.mtd}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
