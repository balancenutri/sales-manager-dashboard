import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { SocailMediaType } from "@/lib/types";
import { keyString } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

type MediaCardTypes = {
  icon: LucideIcon;
  title: string;
  desc: string;
  data: SocailMediaType;
};

export default function MediaCard({ data }: { data: MediaCardTypes }) {
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
        {Object.entries(data?.data).map(([key, value]) => (
          <div className="flex items-center justify-between border-b pb-2">
            <span className="font-medium">{keyString(key)}</span>
            <span className="font-semibold text-lg">{value}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
