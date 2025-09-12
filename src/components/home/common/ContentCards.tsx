import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
// import type { LucideIcon } from "lucide-react";
import React from "react";
import type { ContentItem } from "./ContentManagement";
import { Skeleton } from "@/components/ui/skeleton";
import type { ContentVisit } from "@/lib/types";
import { CardTooltip } from "./CardTooltip";

interface CardSectionProps {
  title: string;
  description: string;
  data: ContentVisit;
  items: ContentItem[];
}

export const CardSection: React.FC<CardSectionProps> = ({
  title,
  description,
  data,
  items,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {items.map((item) => {
          return (
            <div
              key={item.key}
              className="flex items-center justify-between border-b last:border-none pb-2 last:pb-0"
            >
              <div className="flex items-center space-x-2">
                <item.icon className={`h-4 w-4 ${item.color}`} />
                <span className="font-medium">{item.label}</span>
              </div>
              {data?.[item.key] ? (
                <CardTooltip itemData={data[item.key]} />
              ) : (
                <Skeleton className="h-4 w-24" />
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
