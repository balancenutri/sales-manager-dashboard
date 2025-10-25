import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
// import type { LucideIcon } from "lucide-react";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import type { ContentVisit } from "@/lib/types";
import { CardTooltip } from "./CardTooltip";
import { keyString } from "@/lib/utils";
import {
  ClipboardList,
  Video,
  BookOpen,
  Award,
  CreditCard,
  Book,
  Utensils,
  Users,
  FileText,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";

interface CardSectionProps {
  title: string;
  description: string;
  data: ContentVisit;
}

export const CardSection: React.FC<CardSectionProps> = ({
  title,
  description,
  data,
}) => {
  const allIcons: {
    [key: string]: {
      icon: LucideIcon;
      color: string;
    };
  } = {
    tip_visit: { icon: ClipboardList, color: "text-blue-500" },
    video_visit: { icon: Video, color: "text-purple-500" },
    recipe_visit: { icon: BookOpen, color: "text-orange-500" },
    success_story: { icon: Award, color: "text-yellow-500" },
    wallet_visit: { icon: CreditCard, color: "text-green-500" },

    // Guide Items
    alcohol_guide_filled: { icon: Book, color: "text-red-500" },
    restaurant_guide_filled: { icon: Utensils, color: "text-amber-800" },
    recipe_book_created: { icon: BookOpen, color: "text-teal-500" },
    peer_group_visit: { icon: Users, color: "text-indigo-500" },
    quick_filler_filled: { icon: FileText, color: "text-indigo-500" },
    app_feedback_filled: { icon: MessageCircle, color: "text-indigo-500" },
  };

  const skeletonArray = Array(4).fill(null);
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {!data
          ? skeletonArray.map((_, index: number) => (
              <div
                key={index}
                className="flex items-center justify-between border-b pb-2"
              >
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-20" />
              </div>
            ))
          : Object.entries(data).map(([key, value]) => {
              const Icon = allIcons[key]?.icon || FileText;
              return (
                <div
                  key={key}
                  className="flex items-center justify-between border-b last:border-none pb-2 last:pb-0"
                >
                  <div className="flex items-center space-x-2">
                    <Icon className={`h-4 w-4 ${"text-orange-500"}`} />
                    <span className="font-medium">{keyString(key)}</span>
                  </div>
                  {value ? (
                    <CardTooltip itemData={value} />
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
