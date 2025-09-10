// import { useForm, Controller } from "react-hook-form";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useUpdateSocialMediaPerformanceMutation } from "@/service/dashboard/api";

// type FormValues = {
//   total_subscriber: number;
//   subscriber_gain: number;
//   subscriber_loss: number;
//   total_views: number;
//   unique_engagement: number;
//   like: number;
//   comment: number;
//   share: number;
// };

// export default function YoutubeForm({
//   accounts,
//   mediaData,
//   closeModal,
// }: {
//   mediaData: FormValues;
//   closeModal: () => void;
//   accounts: string;
// }) {
//   const {
//     handleSubmit,
//     control,
//     formState: { errors, isSubmitting },
//   } = useForm<FormValues>({
//     defaultValues: mediaData,
//   });

//   const [updateSocialMedia] = useUpdateSocialMediaPerformanceMutation();

//   const onSubmit = async (data: FormValues) => {
//     const body = {
//       data: {
//         total_subscriber: data.total_subscriber,
//         subscriber_gain: data.subscriber_gain,
//         subscriber_loss: data.subscriber_loss,
//         unique_engagement: data.unique_engagement,
//         impressions: data.like + data.comment + data.share,
//         engagement_rate: `${(
//           (data.unique_engagement * 100) /
//           (data.total_views || 1)
//         ).toFixed(2)}%`,
//         like: data.like,
//         comment: data.comment,
//         share: data.share,
//       },
//       type: "youtube",
//       account: accounts ?? undefined,
//     };

//     const res = await updateSocialMedia(body);
//     console.log(res.data);
//     closeModal();
//   };

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="space-y-4 max-h-[80vh] overflow-scroll p-3"
//     >
//       {/* Total Followers */}
//       <div>
//         <Label htmlFor="total_subscriber" className="mb-2">
//           Total Subscriber
//         </Label>
//         <Controller
//           control={control}
//           name="total_subscriber"
//           render={({ field }) => (
//             <Input
//               id="total_subscriber"
//               type="number"
//               placeholder="Enter total followers"
//               {...field}
//               min={0}
//               onChange={(e) => field.onChange(Number(e.target.value))}
//             />
//           )}
//         />
//         {errors.total_subscriber && (
//           <p className="mt-1 text-xs text-red-600">
//             {errors.total_subscriber.message}
//           </p>
//         )}
//       </div>

//       {/* Total Visitors */}
//       <div>
//         <Label htmlFor="subscriber_gain" className="mb-2">
//           Total Visitors
//         </Label>
//         <Controller
//           control={control}
//           name="subscriber_gain"
//           render={({ field }) => (
//             <Input
//               id="subscriber_gain"
//               min={0}
//               type="number"
//               placeholder="Enter total visitors"
//               {...field}
//               onChange={(e) => field.onChange(Number(e.target.value))}
//             />
//           )}
//         />
//         {errors.subscriber_gain && (
//           <p className="mt-1 text-xs text-red-600">
//             {errors.subscriber_gain.message}
//           </p>
//         )}
//       </div>
//       {/* Total Visitors */}
//       <div>
//         <Label htmlFor="subscriber_loss" className="mb-2">
//           Total Visitors
//         </Label>
//         <Controller
//           control={control}
//           name="subscriber_loss"
//           render={({ field }) => (
//             <Input
//               id="subscriber_loss"
//               min={0}
//               type="number"
//               placeholder="Enter total visitors"
//               {...field}
//               onChange={(e) => field.onChange(Number(e.target.value))}
//             />
//           )}
//         />
//         {errors.subscriber_loss && (
//           <p className="mt-1 text-xs text-red-600">
//             {errors.subscriber_loss.message}
//           </p>
//         )}
//       </div>
//       <div>
//         <Label htmlFor="total_views" className="mb-2">
//           Total Views
//         </Label>
//         <Controller
//           control={control}
//           name="total_views"
//           render={({ field }) => (
//             <Input
//               id="total_views"
//               min={0}
//               type="number"
//               placeholder="Enter total visitors"
//               {...field}
//               onChange={(e) => field.onChange(Number(e.target.value))}
//             />
//           )}
//         />
//         {errors.total_views && (
//           <p className="mt-1 text-xs text-red-600">
//             {errors.total_views.message}
//           </p>
//         )}
//       </div>

//       {/* Unique Engagement */}
//       <div>
//         <Label htmlFor="unique_engagement" className="mb-2">
//           Unique Engagement
//         </Label>
//         <Controller
//           control={control}
//           name="unique_engagement"
//           render={({ field }) => (
//             <Input
//               id="unique_engagement"
//               type="number"
//               min={0}
//               placeholder="Enter unique engagement"
//               {...field}
//               onChange={(e) => field.onChange(Number(e.target.value))}
//             />
//           )}
//         />
//         {errors.unique_engagement && (
//           <p className="mt-1 text-xs text-red-600">
//             {errors.unique_engagement.message}
//           </p>
//         )}
//       </div>

//       <div>
//         <Label htmlFor="like" className="mb-2">
//           Like
//         </Label>
//         <Controller
//           control={control}
//           name="like"
//           render={({ field }) => (
//             <Input
//               id="like"
//               type="number"
//               placeholder="Enter like"
//               min={0}
//               {...field}
//               onChange={(e) => field.onChange(Number(e.target.value))}
//             />
//           )}
//         />
//         {errors.like && (
//           <p className="mt-1 text-xs text-red-600">{errors.like.message}</p>
//         )}
//       </div>
//       <div>
//         <Label htmlFor="comment" className="mb-2">
//           Comment
//         </Label>
//         <Controller
//           control={control}
//           name="comment"
//           render={({ field }) => (
//             <Input
//               id="comment"
//               type="number"
//               placeholder="Enter comment"
//               min={0}
//               {...field}
//               onChange={(e) => field.onChange(Number(e.target.value))}
//             />
//           )}
//         />
//         {errors.comment && (
//           <p className="mt-1 text-xs text-red-600">{errors.comment.message}</p>
//         )}
//       </div>
//       <div>
//         <Label htmlFor="share" className="mb-2">
//           Share
//         </Label>
//         <Controller
//           control={control}
//           name="share"
//           render={({ field }) => (
//             <Input
//               id="share"
//               type="number"
//               placeholder="Enter share"
//               min={0}
//               {...field}
//               onChange={(e) => field.onChange(Number(e.target.value))}
//             />
//           )}
//         />
//         {errors.share && (
//           <p className="mt-1 text-xs text-red-600">{errors.share.message}</p>
//         )}
//       </div>
//       <Button type="submit" className="w-full" disabled={isSubmitting}>
//         {isSubmitting ? "Submitting..." : "Submit"}
//       </Button>
//     </form>
//   );
// }

// import { useForm, Controller } from "react-hook-form";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useUpdateSocialMediaPerformanceMutation } from "@/service/dashboard/api";

// type FormValues = {
//   total_subscriber: string;
//   subscriber_gain: string;
//   subscriber_loss: string;
//   total_views: string;
//   unique_engagement: string;
//   like: string;
//   comment: string;
//   share: string;
// };

// export default function YoutubeForm({
//   accounts,
//   mediaData,
//   closeModal,
// }: {
//   mediaData: Omit<FormValues, never>; // now all are strings
//   closeModal: () => void;
//   accounts: string;
// }) {
//   const {
//     handleSubmit,
//     control,
//     formState: { errors, isSubmitting },
//   } = useForm<FormValues>({
//     defaultValues: Object.fromEntries(
//       Object.entries(mediaData).map(([key, val]) => [key, String(val ?? "")])
//     ) as FormValues,
//   });

//   const [updateSocialMedia] = useUpdateSocialMediaPerformanceMutation();

//   const onSubmit = async (data: FormValues) => {
//     // Convert to numbers here
//     const parsed = {
//       total_subscriber: Number(data.total_subscriber) || 0,
//       subscriber_gain: Number(data.subscriber_gain) || 0,
//       subscriber_loss: Number(data.subscriber_loss) || 0,
//       total_views: Number(data.total_views) || 0,
//       unique_engagement: Number(data.unique_engagement) || 0,
//       like: Number(data.like) || 0,
//       comment: Number(data.comment) || 0,
//       share: Number(data.share) || 0,
//     };

//     const body = {
//       data: {
//         ...parsed,
//         impressions: parsed.like + parsed.comment + parsed.share,
//         engagement_rate: `${(
//           (parsed.unique_engagement * 100) /
//           (parsed.total_views || 1)
//         ).toFixed(2)}%`,
//       },
//       type: "youtube",
//       account: accounts ?? undefined,
//     };

//     const res = await updateSocialMedia(body);
//     console.log(res.data);
//     closeModal();
//   };

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="space-y-4 max-h-[80vh] overflow-scroll p-3"
//     >
//       {[
//         { name: "total_subscriber", label: "Total Subscriber" },
//         { name: "subscriber_gain", label: "Subscriber Gain" },
//         { name: "subscriber_loss", label: "Subscriber Loss" },
//         { name: "total_views", label: "Total Views" },
//         { name: "unique_engagement", label: "Unique Engagement" },
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
//             render={({ field }) => (
//               <Input
//                 id={name}
//                 type="number"
//                 placeholder={`Enter ${label.toLowerCase()}`}
//                 {...field}
//               />
//             )}
//           />
//           {errors[name as keyof FormValues] && (
//             <p className="mt-1 text-xs text-red-600">
//               {errors[name as keyof FormValues]?.message as string}
//             </p>
//           )}
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

type FormValues = {
  total_subscriber: number;
  subscriber_gain: number;
  subscriber_loss: number;
  total_views: number;
  unique_engagement: number;
  like: number;
  comment: number;
  share: number;
};

export default function YoutubeForm({
  accounts,
  mediaData,
  closeModal,
}: {
  mediaData: FormValues;
  closeModal: () => void;
  accounts: string;
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
    const body = {
      data: {
        total_subscriber: data.total_subscriber,
        subscriber_gain: data.subscriber_gain,
        subscriber_loss: data.subscriber_loss,
        unique_engagement: data.unique_engagement,
        impressions: data.like + data.comment + data.share,
        engagement_rate: `${(
          (data.unique_engagement * 100) /
          (data.total_views || 1)
        ).toFixed(2)}%`,
        like: data.like,
        comment: data.comment,
        share: data.share,
      },
      type: "youtube",
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
      {/* Total Subscriber */}
      <div>
        <Label htmlFor="total_subscriber" className="mb-2">
          Total Subscriber
        </Label>
        <Controller
          control={control}
          name="total_subscriber"
          rules={{ required: "Total subscriber is required" }} // Add required validation
          render={({ field }) => (
            <Input
              id="total_subscriber"
              type="number"
              placeholder="Enter total subscriber"
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
        {errors.total_subscriber && (
          <p className="mt-1 text-xs text-red-600">
            {errors.total_subscriber.message}
          </p>
        )}
      </div>

      {/* Subscriber Gain */}
      <div>
        <Label htmlFor="subscriber_gain" className="mb-2">
          Subscriber Gain
        </Label>
        <Controller
          control={control}
          name="subscriber_gain"
          rules={{ required: "Subscriber gain is required" }} // Add required validation
          render={({ field }) => (
            <Input
              id="subscriber_gain"
              type="number"
              placeholder="Enter subscriber gain"
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
        {errors.subscriber_gain && (
          <p className="mt-1 text-xs text-red-600">
            {errors.subscriber_gain.message}
          </p>
        )}
      </div>

      {/* Subscriber Loss */}
      <div>
        <Label htmlFor="subscriber_loss" className="mb-2">
          Subscriber Loss
        </Label>
        <Controller
          control={control}
          name="subscriber_loss"
          rules={{ required: "Subscriber loss is required" }} // Add required validation
          render={({ field }) => (
            <Input
              id="subscriber_loss"
              type="number"
              placeholder="Enter subscriber loss"
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
        {errors.subscriber_loss && (
          <p className="mt-1 text-xs text-red-600">
            {errors.subscriber_loss.message}
          </p>
        )}
      </div>

      {/* Total Views */}
      <div>
        <Label htmlFor="total_views" className="mb-2">
          Total Views
        </Label>
        <Controller
          control={control}
          name="total_views"
          rules={{ required: "Total views is required" }} // Add required validation
          render={({ field }) => (
            <Input
              id="total_views"
              type="number"
              placeholder="Enter total views"
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
        {errors.total_views && (
          <p className="mt-1 text-xs text-red-600">
            {errors.total_views.message}
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
              placeholder="Enter unique engagement"
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
        {errors.unique_engagement && (
          <p className="mt-1 text-xs text-red-600">
            {errors.unique_engagement.message}
          </p>
        )}
      </div>

      {/* Like */}
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
