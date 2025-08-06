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

interface CardSectionProps {
  title: string;
  description: string;
  data: Record<string, string>;
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
          const value = data[item.key] || "0 | 0";
          return (
            <div
              key={item.key}
              className="flex items-center justify-between border-b last:border-none pb-2 last:pb-0"
            >
              <div className="flex items-center space-x-2">
                <item.icon className={`h-4 w-4 ${item.color}`} />
                <span className="font-medium">{item.label}</span>
              </div>
              <span className="font-semibold text-red-500">{value}</span>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
