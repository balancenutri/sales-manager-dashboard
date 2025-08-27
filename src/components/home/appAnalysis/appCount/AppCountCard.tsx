import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
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
                  <div className="font-semibold text-lg">{value}</div>
                </div>
              );
            })}
      </CardContent>
    </Card>
  );
}
