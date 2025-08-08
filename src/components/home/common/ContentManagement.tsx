import { CardSection } from "./contentCard";
import { selectPeriod } from "@/features/period/periodSlice";
import {
  useGetContentVisitsQuery,
  useGetGuideAndBookInteractionsQuery,
} from "@/service/dashboard/api";
import {
  Award,
  Book,
  BookOpen,
  ClipboardList,
  CreditCard,
  UsersRound,
  Utensils,
  Video,
} from "lucide-react";
import { useSelector } from "react-redux";
import type { LucideIcon } from "lucide-react";

type EngagementData = {
  [key: string]: string;
};

export type ContentItem = {
  label: string;
  icon: LucideIcon;
  color: string;
  key: keyof EngagementData;
};

export default function ContentManagement() {
  const filter = useSelector(selectPeriod);

  const {
    data: contentVisitsData = {} as { data: EngagementData }
  } = useGetContentVisitsQuery({ filter }) as {
    data: { data: EngagementData };
  };

  const {
    data: guideData = {} as { data: EngagementData },
    isLoading: guideLoading,
  } = useGetGuideAndBookInteractionsQuery({ filter });

  const contentItems: ContentItem[] = [
    {
      label: "Tips Visit",
      icon: ClipboardList,
      color: "text-blue-500",
      key: "tip_visita",
    },
    {
      label: "Video Visits",
      icon: Video,
      color: "text-purple-500",
      key: "video_visit",
    },
    {
      label: "Recipe Visits",
      icon: BookOpen,
      color: "text-orange-500",
      key: "recipe_visit",
    },
    {
      label: "Success Stories Visits",
      icon: Award,
      color: "text-yellow-500",
      key: "success_story",
    },
    {
      label: "Wallet Visits",
      icon: CreditCard,
      color: "text-green-500",
      key: "wallet_visit",
    },
  ];

  const guideItems: ContentItem[] = [
    {
      label: "Alcohol Guide Filled",
      icon: Book,
      color: "text-red-500",
      key: "alcohol_guide_filled",
    },
    {
      label: "Restaurant Guide Filled",
      icon: Utensils,
      color: "text-amber-800",
      key: "restaurant_guide_filled",
    },
    {
      label: "Recipe Book Created",
      icon: BookOpen,
      color: "text-teal-500",
      key: "recipe_book_created",
    },
    {
      label: "Peer Group Visit",
      icon: UsersRound,
      color: "text-indigo-500",
      key: "peer_group_visit",
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold my-4">Content Engagement</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(
          <CardSection
            title="Content Visits"
            description="User engagement with various content types"
            data={contentVisitsData.data}
            items={contentItems}
          />
        )}
        {!guideLoading && (
          <CardSection
            title="Guide & Book Interactions"
            description="User interactions with guides and recipe books"
            data={guideData.data}
            items={guideItems}
          />
        )}
      </div>
    </div>
  );
}



// import { CardSection } from "./contentCard";
// import { selectPeriod } from "@/features/period/periodSlice";
// import {
//   useGetContentVisitsQuery,
//   useGetGuideAndBookInteractionsQuery,
// } from "@/service/dashboard/api";
// import {
//   Award,
//   Book,
//   BookOpen,
//   ClipboardList,
//   CreditCard,
//   UsersRound,
//   Utensils,
//   Video,
// } from "lucide-react";
// import { useSelector } from "react-redux";

// export default function ContentManagement() {
//   const filter = useSelector(selectPeriod);

//   const { data: contentVisitsData = {}, isLoading: contentVisitingLoading } =
//     useGetContentVisitsQuery({ filter }, { refetchOnMountOrArgChange: true });
//   const { data: guideData = {}, isLoading: guideLoading } =
//     useGetGuideAndBookInteractionsQuery({ filter });

//   const contentItems = [
//     {
//       label: "Tips Visit",
//       icon: ClipboardList,
//       color: "text-blue-500",
//       key: "tips_visit",
//     },
//     {
//       label: "Video Visits",
//       icon: Video,
//       color: "text-purple-500",
//       key: "video_visit",
//     },
//     {
//       label: "Recipe Visits",
//       icon: BookOpen,
//       color: "text-orange-500",
//       key: "recipe_visit",
//     },
//     {
//       label: "Success Stories Visits",
//       icon: Award,
//       color: "text-yellow-500",
//       key: "success_story",
//     },
//     {
//       label: "Wallet Visits",
//       icon: CreditCard,
//       color: "text-green-500",
//       key: "wallet_visit",
//     },
//   ];

//   const guideItems = [
//     {
//       label: "Alcohol Guide Filled",
//       icon: Book,
//       color: "text-red-500",
//       key: "alcohol_guide_filled",
//     },
//     {
//       label: "Restaurant Guide Filled",
//       icon: Utensils,
//       color: "text-amber-800",
//       key: "restaurant_guide_filled",
//     },
//     {
//       label: "Recipe Book Created",
//       icon: BookOpen,
//       color: "text-teal-500",
//       key: "recipe_book_created",
//     },
//     {
//       label: "Peer Group Visit",
//       icon: UsersRound,
//       color: "text-indigo-500",
//       key: "peer_group_visit",
//     },
//   ];

//   return (
//     <div>
//       <h2 className="text-2xl font-bold my-4">Content Engagement</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {!contentVisitingLoading && (
//           <CardSection
//             title="Content Visits"
//             description="User engagement with various content types"
//             data={contentVisitsData?.data}
//             items={contentItems}
//           />
//         )}
//         {!guideLoading && (
//           <CardSection
//             title="Guide & Book Interactions"
//             description="User interactions with guides and recipe books"
//             data={guideData?.data}
//             items={guideItems}
//           />
//         )}
//       </div>
//     </div>
//   );
// }
