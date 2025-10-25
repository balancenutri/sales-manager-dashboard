import { selectPeriod } from "@/features/period/periodSlice";
import {
  useGetContentVisitsQuery,
  useGetGuideAndBookInteractionsQuery,
} from "@/service/dashboard/api";
import { useSelector } from "react-redux";
import type { LucideIcon } from "lucide-react";
import type { ContentVisit } from "@/lib/types";
import { CardSection } from "./ContentCards";

export type ContentItem = {
  label: string;
  icon: LucideIcon;
  color: string;
  key: keyof ContentVisit;
};

export default function ContentManagement({
  type,
}: {
  type: "content" | "guide";
}) {
  const filter = useSelector(selectPeriod);

  const { data: contentVisitsData } = useGetContentVisitsQuery({ filter });
  const { data: guideData } = useGetGuideAndBookInteractionsQuery({ filter });
  
  return (
    <div>
      {type === "content" && (
        <CardSection
          title="Content Visits"
          description="User engagement with various content types"
          data={contentVisitsData?.data}
        />
      )}
      {type === "guide" && (
        <CardSection
          title="Guide & Book Interactions"
          description="User interactions with guides and recipe books"
          data={guideData?.data}
        />
      )}
    </div>
  );
}
