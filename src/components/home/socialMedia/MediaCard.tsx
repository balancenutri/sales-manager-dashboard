// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Skeleton } from "@/components/ui/skeleton";
// import type { SocailMediaType } from "@/lib/types";
// import { keyString } from "@/lib/utils";
// import type { LucideIcon } from "lucide-react";
// import { useState, type JSX } from "react";
// import AddMediaForm from "./AddMediaForm";

// type MediaCardTypes = {
//   icon: LucideIcon;
//   title: string;
//   desc: string;
//   isUpdate: boolean;
//   data: SocailMediaType | undefined;
// };

// type DialogType = "Youtube" | "Instagram" | "Facebook" | null;

// export default function MediaCard({ data }: { data: MediaCardTypes }) {
//   const [type, setType] = useState<DialogType>(null);
//   const [openDialog, setOpenDialog] = useState<boolean>(false);
//   const renderSkeleton = (): JSX.Element[] =>
//     Array(4)
//       .fill(null)
//       .map((_, index: number) => (
//         <div
//           key={index}
//           className="flex items-center justify-between border-b pb-2"
//         >
//           <Skeleton className="h-5 w-40" />
//           <Skeleton className="h-5 w-20" />
//         </div>
//       ));
//   const Icon: LucideIcon = data.icon;

//   const handleDialogOpen = () => {
//     setType(data.title as DialogType);
//     setOpenDialog(true);
//   };
//   return (
//     <Card>
//       <CardHeader>
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <Icon />
//             <CardTitle>{data.title}</CardTitle>
//           </div>
//           {data.isUpdate && (
//             <Button variant="outline" onClick={handleDialogOpen}>
//               Update
//             </Button>
//           )}
//         </div>
//         <CardDescription>{data.desc}</CardDescription>
//       </CardHeader>
//       <CardContent className="space-y-3">
//         {data.data
//           ? Object.entries(data.data).map(([key, value]) => (
//               <div
//                 className="flex items-center justify-between border-b pb-2"
//                 key={key}
//               >
//                 <span className="font-medium">
//                   {data.title === "youtube"
//                     ? key === "total_reach"
//                       ? ""
//                       : key === "total_followers"
//                       ? "Total Subscriber"
//                       : keyString(key)
//                     : keyString(key)}
//                 </span>
//                 <span className="font-semibold text-lg">{value}</span>
//               </div>
//             ))
//           : renderSkeleton()}
//       </CardContent>
//       <Dialog open={openDialog} onOpenChange={setOpenDialog}>
//         <DialogContent
//           onInteractOutside={(e: React.MouseEvent | Event) =>
//             e.preventDefault()
//           }
//         >
//           <DialogHeader>
//             <DialogTitle>{keyString(type || "")}</DialogTitle>
//             <AddMediaForm
//               type={type}
//               mediaData={{
//                 impressions: data.data?.impressions || 0,
//                 total_followers: data.data?.total_followers || 0,
//                 total_reach: data.data?.total_reach || 0,
//                 total_visitors: data.data?.total_visitors || 0,
//                 unique_engagement: data.data?.unique_engagement || 0,
//               }}
//               closeModal={() => setOpenDialog(false)}
//             />
//           </DialogHeader>
//         </DialogContent>
//       </Dialog>
//     </Card>
//   );
// }

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import type { SocailMediaType } from "@/lib/types";
import { keyString } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { useState, type JSX } from "react";
import AddMediaForm from "./AddMediaForm";

type MediaCardTypes = {
  icon: LucideIcon;
  title: string;
  desc: string;
  isUpdate: boolean;
  data: SocailMediaType | undefined;
};

type DialogType = "Youtube" | "Instagram" | "Facebook" | null;

export default function MediaCard({ data }: { data: MediaCardTypes }) {
  const [type, setType] = useState<DialogType>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

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

  const handleDialogOpen = () => {
    setType(data.title as DialogType);
    setOpenDialog(true);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon />
            <CardTitle>{data.title}</CardTitle>
          </div>
          {data.isUpdate && (
            <Button variant="outline" onClick={handleDialogOpen}>
              Update
            </Button>
          )}
        </div>
        <CardDescription>{data.desc}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {data.data
          ? Object.entries(data.data).map(([key, value]) => {
              // Skip rendering total_reach for YouTube
              if (data.title === "Youtube" && key === "total_reach") {
                return null;
              }
              // Determine display value for the key
              const displayValue =
                data.title === "Youtube" && key === "total_followers"
                  ? "Total Subscriber"
                  : keyString(key);
              return (
                <div
                  className="flex items-center justify-between border-b pb-2"
                  key={key}
                >
                  <span className="font-medium">{displayValue}</span>
                  <span className="font-semibold text-lg">{value}</span>
                </div>
              );
            })
          : renderSkeleton()}
      </CardContent>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent
          onInteractOutside={(e: React.MouseEvent | Event) =>
            e.preventDefault()
          }
        >
          <DialogHeader>
            <DialogTitle>{keyString(type || "")}</DialogTitle>
            <AddMediaForm
              type={type}
              mediaData={{
                impressions: data.data?.impressions || 0,
                total_followers: data.data?.total_followers || 0,
                ...(data?.title !== "Youtube" && {
                  total_reach: data.data?.total_reach || 0,
                }),
                total_visitors: data.data?.total_visitors || 0,
                unique_engagement: data.data?.unique_engagement || 0,
              }}
              closeModal={() => setOpenDialog(false)}
            />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
