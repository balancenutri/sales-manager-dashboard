import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { SocailMediaType } from "@/lib/types";
import { keyString } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import type { JSX } from "react";

type MediaCardTypes = {
  icon: LucideIcon;
  title: string;
  desc: string;
  data: SocailMediaType | undefined;
};

export default function MediaCard({ data }: { data: MediaCardTypes }) {
  const renderSkeleton = (): JSX.Element[] =>
    Array(4)
      .fill(null)
      .map((_, index: number) => (
        <div
          key={index}
          className="flex items-center justify-between border-b pb-2"
        >
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-5 w-20" />
        </div>
      ));
  const Icon: LucideIcon = data.icon;
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Icon />
          <CardTitle>{data.title}</CardTitle>
        </div>
        <CardDescription>{data.desc}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {data.data
          ? Object.entries(data.data).map(([key, value]) => (
              <div
                className="flex items-center justify-between border-b pb-2"
                key={key}
              >
                <span className="font-medium">{keyString(key)}</span>
                <span className="font-semibold text-lg">{value}</span>
              </div>
            ))
          : renderSkeleton()}
      </CardContent>
    </Card>
  );
}
