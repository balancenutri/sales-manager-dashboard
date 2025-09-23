import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { keyString } from "@/lib/utils";

export default function BenchmarkCard({
  title,
  data,
}: {
  title: string;
  data: {
    avg: number;
    benchmark: number;
    current: number;
  };
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {Object.entries(data).map(([key, value]) => {
          return (
            <div
              className="flex items-center justify-between border-b mb-2"
              key={key}
            >
              <span className="font-medium">{keyString(key)}</span>
              <div className="font-semibold text-lg">{value}</div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
