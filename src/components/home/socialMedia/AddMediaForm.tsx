// // import { useForm, Controller } from "react-hook-form";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { Label } from "@/components/ui/label";
// // import { useUpdateSocialMediaPerformanceMutation } from "@/service/dashboard/api";
// // import type { SocialMediaType, UpdateSocialMediaBody } from "@/lib/types";

// // type FormValues = {
// //   total_followers: number;
// //   total_visitors: number;
// //   unique_engagement: number;
// //   total_reach: number;
// //   like: number;
// //   comment: number;
// //   share: number;
// // };

// // export default function AddMediaForm({
// //   type,
// //   accounts,
// //   mediaData,
// //   closeModal,
// // }: {
// //   type: SocialMediaType;
// //   accounts: string;
// //   mediaData: FormValues;

// //   closeModal: () => void;
// // }) {
// //   const {
// //     handleSubmit,
// //     control,
// //     formState: { errors, isSubmitting },
// //   } = useForm<FormValues>({
// //     defaultValues: mediaData,
// //   });

// //   const [updateSocialMedia] = useUpdateSocialMediaPerformanceMutation();

// //   const onSubmit = async (data: FormValues) => {
// //     const body: UpdateSocialMediaBody = {
// //       data: {
// //         total_followers: data.total_followers,
// //         total_visitors: data.total_visitors,
// //         unique_engagement: data.unique_engagement,
// //         total_reach: data.total_reach,
// //         impressions: data.like + data.comment + data.share,
// //         engagement_rate: `${(
// //           (data.unique_engagement * 100) /
// //           (data.total_visitors || 1)
// //         ).toFixed(2)}%`,
// //         like: data.like,
// //         comment: data.comment,
// //         share: data.share,
// //       },
// //       type: type ?? undefined,
// //       account: accounts ?? undefined,
// //     };

// //     const res = await updateSocialMedia(body);
// //     console.log(res.data);
// //     closeModal();
// //   };

// //   return (
// //     <form
// //       onSubmit={handleSubmit(onSubmit)}
// //       className="space-y-4 max-h-[80vh] overflow-scroll p-3"
// //     >
// //       {/* Total Followers */}
// //       <div>
// //         <Label htmlFor="total_followers" className="mb-2">
// //           Total {mediaData?.total_reach ? "Followers" : "Subscriber"}
// //         </Label>
// //         <Controller
// //           control={control}
// //           name="total_followers"
// //           render={({ field }) => (
// //             <Input
// //               id="total_followers"
// //               type="number"
// //               placeholder="Enter total followers"
// //               {...field}
// //               min={0}
// //               onChange={(e) => field.onChange(Number(e.target.value))}
// //             />
// //           )}
// //         />
// //         {errors.total_followers && (
// //           <p className="mt-1 text-xs text-red-600">
// //             {errors.total_followers.message}
// //           </p>
// //         )}
// //       </div>

// //       {/* Total Visitors */}
// //       <div>
// //         <Label htmlFor="total_visitors" className="mb-2">
// //           Total Visitors
// //         </Label>
// //         <Controller
// //           control={control}
// //           name="total_visitors"
// //           render={({ field }) => (
// //             <Input
// //               id="total_visitors"
// //               min={0}
// //               type="number"
// //               placeholder="Enter total visitors"
// //               {...field}
// //               onChange={(e) => field.onChange(Number(e.target.value))}
// //             />
// //           )}
// //         />
// //         {errors.total_visitors && (
// //           <p className="mt-1 text-xs text-red-600">
// //             {errors.total_visitors.message}
// //           </p>
// //         )}
// //       </div>

// //       {/* Unique Engagement */}
// //       <div>
// //         <Label htmlFor="unique_engagement" className="mb-2">
// //           Unique Engagement
// //         </Label>
// //         <Controller
// //           control={control}
// //           name="unique_engagement"
// //           render={({ field }) => (
// //             <Input
// //               id="unique_engagement"
// //               type="number"
// //               min={0}
// //               placeholder="Enter unique engagement"
// //               {...field}
// //               onChange={(e) => field.onChange(Number(e.target.value))}
// //             />
// //           )}
// //         />
// //         {errors.unique_engagement && (
// //           <p className="mt-1 text-xs text-red-600">
// //             {errors.unique_engagement.message}
// //           </p>
// //         )}
// //       </div>

// //       <div>
// //         <Label htmlFor="total_reach" className="mb-2">
// //           Total Reach
// //         </Label>
// //         <Controller
// //           control={control}
// //           name="total_reach"
// //           render={({ field }) => (
// //             <Input
// //               id="total_reach"
// //               type="number"
// //               placeholder="Enter total reach"
// //               min={0}
// //               {...field}
// //               onChange={(e) => field.onChange(Number(e.target.value))}
// //             />
// //           )}
// //         />
// //         {errors.total_reach && (
// //           <p className="mt-1 text-xs text-red-600">
// //             {errors.total_reach.message}
// //           </p>
// //         )}
// //       </div>

// //       {/* Impressions */}
// //       <div>
// //         <Label htmlFor="like" className="mb-2">
// //           Like
// //         </Label>
// //         <Controller
// //           control={control}
// //           name="like"
// //           render={({ field }) => (
// //             <Input
// //               id="like"
// //               type="number"
// //               placeholder="Enter like"
// //               min={0}
// //               {...field}
// //               onChange={(e) => field.onChange(Number(e.target.value))}
// //             />
// //           )}
// //         />
// //         {errors.like && (
// //           <p className="mt-1 text-xs text-red-600">{errors.like.message}</p>
// //         )}
// //       </div>
// //       <div>
// //         <Label htmlFor="comment" className="mb-2">
// //           Comment
// //         </Label>
// //         <Controller
// //           control={control}
// //           name="comment"
// //           render={({ field }) => (
// //             <Input
// //               id="comment"
// //               type="number"
// //               placeholder="Enter comment"
// //               min={0}
// //               {...field}
// //               onChange={(e) => field.onChange(Number(e.target.value))}
// //             />
// //           )}
// //         />
// //         {errors.comment && (
// //           <p className="mt-1 text-xs text-red-600">{errors.comment.message}</p>
// //         )}
// //       </div>
// //       <div>
// //         <Label htmlFor="share" className="mb-2">
// //           Share
// //         </Label>
// //         <Controller
// //           control={control}
// //           name="share"
// //           render={({ field }) => (
// //             <Input
// //               id="share"
// //               type="number"
// //               placeholder="Enter share"
// //               min={0}
// //               {...field}
// //               onChange={(e) => field.onChange(Number(e.target.value))}
// //             />
// //           )}
// //         />
// //         {errors.share && (
// //           <p className="mt-1 text-xs text-red-600">{errors.share.message}</p>
// //         )}
// //       </div>

// //       <Button type="submit" className="w-full" disabled={isSubmitting}>
// //         {isSubmitting ? "Submitting..." : "Submit"}
// //       </Button>
// //     </form>
// //   );
// // }

// import { useForm, Controller } from "react-hook-form";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useUpdateSocialMediaPerformanceMutation } from "@/service/dashboard/api";
// import type { SocialMediaType, UpdateSocialMediaBody } from "@/lib/types";

// type FormValues = {
//   total_followers?: number;
//   total_visitors?: number;
//   unique_engagement?: number;
//   total_reach?: number;
//   like?: number;
//   comment?: number;
//   share?: number;
// };

// export default function AddMediaForm({
//   type,
//   accounts,
//   mediaData,
//   closeModal,
// }: {
//   type: SocialMediaType;
//   accounts: string;
//   mediaData: FormValues;
//   closeModal: () => void;
// }) {
//   const {
//     handleSubmit,
//     control,
//     formState: { errors, isSubmitting },
//   } = useForm<FormValues>({
//     defaultValues: Object.fromEntries(
//       Object.entries(mediaData).map(([key, val]) => [
//         key,
//         val !== undefined && val !== null ? String(val) : "",
//       ])
//     ) as FormValues,
//   });

//   const [updateSocialMedia] = useUpdateSocialMediaPerformanceMutation();

//   const onSubmit = async (data: FormValues) => {
//     const body: UpdateSocialMediaBody = {
//       data: {
//         total_followers: Number(data.total_followers) || 0,
//         total_visitors: Number(data.total_visitors) || 0,
//         unique_engagement: Number(data.unique_engagement) || 0,
//         total_reach: Number(data.total_reach) || 0,
//         impressions:
//           (Number(data.like) || 0) +
//           (Number(data.comment) || 0) +
//           (Number(data.share) || 0),
//         engagement_rate: `${(
//           ((Number(data.unique_engagement) || 0) * 100) /
//           (Number(data.total_visitors) || 0 || 1)
//         ).toFixed(2)}%`,
//         like: Number(data.like) || 0,
//         comment: Number(data.comment) || 0,
//         share: Number(data.share) || 0,
//       },
//       type: type ?? undefined,
//       account: accounts ?? undefined,
//     };

//     const res = await updateSocialMedia(body);
//     console.log(res.data);
//     closeModal();
//   };

//   const renderNumberInput = (
//     field: any,
//     id: string,
//     placeholder: string,
//     error?: string
//   ) => (
//     <>
//       <Input
//         id={id}
//         type="number"
//         min={0}
//         placeholder={placeholder}
//         value={field.value ?? ""}
//         onChange={(e) => field.onChange(e.target.value)}
//       />
//       {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
//     </>
//   );

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="space-y-4 max-h-[80vh] overflow-scroll p-3"
//     >
//       {[
//         { name: "total_followers", label: "Total Followers" },
//         { name: "total_visitors", label: "Total Visitors" },
//         { name: "unique_engagement", label: "Unique Engagement" },
//         { name: "total_reach", label: "Total Reach" },
//         { name: "like", label: "Like" },
//         { name: "comment", label: "Comment" },
//         { name: "share", label: "Share" },
//       ].map(({ name, label }) => (
//         <div key={name}>
//           <Label htmlFor={name} className="mb-2">
//             {label}
//           </Label>
//           <Controller
//             control={control}
//             name={name as keyof FormValues}
//             rules={{
//               min: {
//                 value: 0,
//                 message: "Value must be greater than or equal to 0",
//               },
//               validate: (val) => (!val || Number(val) < 0)  && "Must be a number",
//             }}
//             render={({ field }) =>
//               renderNumberInput(
//                 field,
//                 name,
//                 `Enter ${label.toLowerCase()}`,
//                 errors[name as keyof FormValues]?.message as string
//               )
//             }
//           />
//         </div>
//       ))}

//       <Button type="submit" className="w-full" disabled={isSubmitting}>
//         {isSubmitting ? "Submitting..." : "Submit"}
//       </Button>
//     </form>
//   );
// }

import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdateSocialMediaPerformanceMutation } from "@/service/dashboard/api";
import type { SocialMediaType, UpdateSocialMediaBody } from "@/lib/types";

type FormValues = {
  total_followers: number;
  total_visitors: number;
  unique_engagement: number;
  total_reach: number;
  like: number;
  comment: number;
  share: number;
};

export default function AddMediaForm({
  type,
  accounts,
  mediaData,
  closeModal,
}: {
  type: SocialMediaType;
  accounts: string;
  mediaData: FormValues;

  closeModal: () => void;
}) {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: mediaData,
  });

  const [updateSocialMedia] = useUpdateSocialMediaPerformanceMutation();

  const onSubmit = async (data: FormValues) => {
    const body: UpdateSocialMediaBody = {
      data: {
        total_followers: data.total_followers,
        total_visitors: data.total_visitors,
        unique_engagement: data.unique_engagement,
        total_reach: data.total_reach,
        impressions: data.like + data.comment + data.share,
        engagement_rate: `${(
          (data.unique_engagement * 100) /
          (data.total_visitors || 1)
        ).toFixed(2)}%`,
        like: data.like,
        comment: data.comment,
        share: data.share,
      },
      type: type ?? undefined,
      account: accounts ?? undefined,
    };

    const res = await updateSocialMedia(body);
    console.log(res.data);
    closeModal();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-h-[80vh] overflow-scroll p-3"
    >
      {/* Total Followers */}
      <div>
        <Label htmlFor="total_followers" className="mb-2">
          Total {mediaData?.total_reach ? "Followers" : "Subscriber"}
        </Label>
        <Controller
          control={control}
          name="total_followers"
          rules={{ required: "Total followers is required" }} // Add required validation
          render={({ field }) => (
            <Input
              id="total_followers"
              type="number"
              placeholder="Enter total followers"
              {...field}
              value={field.value || ""} // Handle empty input
              min={0}
              onChange={(e) => {
                const value =
                  e.target.value === "" ? "" : Number(e.target.value);
                field.onChange(value);
              }}
            />
          )}
        />
        {errors.total_followers && (
          <p className="mt-1 text-xs text-red-600">
            {errors.total_followers.message}
          </p>
        )}
      </div>

      {/* Total Visitors */}
      <div>
        <Label htmlFor="total_visitors" className="mb-2">
          Total Visitors
        </Label>
        <Controller
          control={control}
          name="total_visitors"
          rules={{ required: "Total visitors is required" }} // Add required validation
          render={({ field }) => (
            <Input
              id="total_visitors"
              type="number"
              placeholder="Enter total visitors"
              min={0}
              {...field}
              value={field.value || ""} // Handle empty input
              onChange={(e) => {
                const value =
                  e.target.value === "" ? "" : Number(e.target.value);
                field.onChange(value);
              }}
            />
          )}
        />
        {errors.total_visitors && (
          <p className="mt-1 text-xs text-red-600">
            {errors.total_visitors.message}
          </p>
        )}
      </div>

      {/* Unique Engagement */}
      <div>
        <Label htmlFor="unique_engagement" className="mb-2">
          Unique Engagement
        </Label>
        <Controller
          control={control}
          name="unique_engagement"
          rules={{ required: "Unique engagement is required" }} // Add required validation
          render={({ field }) => (
            <Input
              id="unique_engagement"
              type="number"
              min={0}
              placeholder="Enter unique engagement"
              {...field}
              value={field.value || ""} // Handle empty input
              onChange={(e) => {
                const value =
                  e.target.value === "" ? "" : Number(e.target.value);
                field.onChange(value);
              }}
            />
          )}
        />
        {errors.unique_engagement && (
          <p className="mt-1 text-xs text-red-600">
            {errors.unique_engagement.message}
          </p>
        )}
      </div>

      {/* Total Reach */}
      <div>
        <Label htmlFor="total_reach" className="mb-2">
          Total Reach
        </Label>
        <Controller
          control={control}
          name="total_reach"
          rules={{ required: "Total reach is required" }} // Add required validation
          render={({ field }) => (
            <Input
              id="total_reach"
              type="number"
              placeholder="Enter total reach"
              min={0}
              {...field}
              value={field.value || ""} // Handle empty input
              onChange={(e) => {
                const value =
                  e.target.value === "" ? "" : Number(e.target.value);
                field.onChange(value);
              }}
            />
          )}
        />
        {errors.total_reach && (
          <p className="mt-1 text-xs text-red-600">
            {errors.total_reach.message}
          </p>
        )}
      </div>

      {/* Impressions (Like) */}
      <div>
        <Label htmlFor="like" className="mb-2">
          Like
        </Label>
        <Controller
          control={control}
          name="like"
          rules={{ required: "Like is required" }} // Add required validation
          render={({ field }) => (
            <Input
              id="like"
              type="number"
              placeholder="Enter like"
              min={0}
              {...field}
              value={field.value || ""} // Handle empty input
              onChange={(e) => {
                const value =
                  e.target.value === "" ? "" : Number(e.target.value);
                field.onChange(value);
              }}
            />
          )}
        />
        {errors.like && (
          <p className="mt-1 text-xs text-red-600">{errors.like.message}</p>
        )}
      </div>

      {/* Comment */}
      <div>
        <Label htmlFor="comment" className="mb-2">
          Comment
        </Label>
        <Controller
          control={control}
          name="comment"
          rules={{ required: "Comment is required" }} // Add required validation
          render={({ field }) => (
            <Input
              id="comment"
              type="number"
              placeholder="Enter comment"
              min={0}
              {...field}
              value={field.value || ""} // Handle empty input
              onChange={(e) => {
                const value =
                  e.target.value === "" ? "" : Number(e.target.value);
                field.onChange(value);
              }}
            />
          )}
        />
        {errors.comment && (
          <p className="mt-1 text-xs text-red-600">{errors.comment.message}</p>
        )}
      </div>

      {/* Share */}
      <div>
        <Label htmlFor="share" className="mb-2">
          Share
        </Label>
        <Controller
          control={control}
          name="share"
          rules={{ required: "Share is required" }} // Add required validation
          render={({ field }) => (
            <Input
              id="share"
              type="number"
              placeholder="Enter share"
              min={0}
              {...field}
              value={field.value || ""} // Handle empty input
              onChange={(e) => {
                const value =
                  e.target.value === "" ? "" : Number(e.target.value);
                field.onChange(value);
              }}
            />
          )}
        />
        {errors.share && (
          <p className="mt-1 text-xs text-red-600">{errors.share.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}
