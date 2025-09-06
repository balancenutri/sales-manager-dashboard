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
  type,
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
      {/* Total Followers */}
      <div>
        <Label htmlFor="total_subscriber" className="mb-2">
          Total Subscriber
        </Label>
        <Controller
          control={control}
          name="total_subscriber"
          render={({ field }) => (
            <Input
              id="total_subscriber"
              type="number"
              placeholder="Enter total followers"
              {...field}
              min={0}
              onChange={(e) => field.onChange(Number(e.target.value))}
            />
          )}
        />
        {errors.total_subscriber && (
          <p className="mt-1 text-xs text-red-600">
            {errors.total_subscriber.message}
          </p>
        )}
      </div>

      {/* Total Visitors */}
      <div>
        <Label htmlFor="subscriber_gain" className="mb-2">
          Total Visitors
        </Label>
        <Controller
          control={control}
          name="subscriber_gain"
          render={({ field }) => (
            <Input
              id="subscriber_gain"
              min={0}
              type="number"
              placeholder="Enter total visitors"
              {...field}
              onChange={(e) => field.onChange(Number(e.target.value))}
            />
          )}
        />
        {errors.subscriber_gain && (
          <p className="mt-1 text-xs text-red-600">
            {errors.subscriber_gain.message}
          </p>
        )}
      </div>
      {/* Total Visitors */}
      <div>
        <Label htmlFor="subscriber_loss" className="mb-2">
          Total Visitors
        </Label>
        <Controller
          control={control}
          name="subscriber_loss"
          render={({ field }) => (
            <Input
              id="subscriber_loss"
              min={0}
              type="number"
              placeholder="Enter total visitors"
              {...field}
              onChange={(e) => field.onChange(Number(e.target.value))}
            />
          )}
        />
        {errors.subscriber_loss && (
          <p className="mt-1 text-xs text-red-600">
            {errors.subscriber_loss.message}
          </p>
        )}
      </div>
      <div>
        <Label htmlFor="total_views" className="mb-2">
          Total Views
        </Label>
        <Controller
          control={control}
          name="total_views"
          render={({ field }) => (
            <Input
              id="total_views"
              min={0}
              type="number"
              placeholder="Enter total visitors"
              {...field}
              onChange={(e) => field.onChange(Number(e.target.value))}
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
          render={({ field }) => (
            <Input
              id="unique_engagement"
              type="number"
              min={0}
              placeholder="Enter unique engagement"
              {...field}
              onChange={(e) => field.onChange(Number(e.target.value))}
            />
          )}
        />
        {errors.unique_engagement && (
          <p className="mt-1 text-xs text-red-600">
            {errors.unique_engagement.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="like" className="mb-2">
          Like
        </Label>
        <Controller
          control={control}
          name="like"
          render={({ field }) => (
            <Input
              id="like"
              type="number"
              placeholder="Enter like"
              min={0}
              {...field}
              onChange={(e) => field.onChange(Number(e.target.value))}
            />
          )}
        />
        {errors.like && (
          <p className="mt-1 text-xs text-red-600">{errors.like.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="comment" className="mb-2">
          Comment
        </Label>
        <Controller
          control={control}
          name="comment"
          render={({ field }) => (
            <Input
              id="comment"
              type="number"
              placeholder="Enter comment"
              min={0}
              {...field}
              onChange={(e) => field.onChange(Number(e.target.value))}
            />
          )}
        />
        {errors.comment && (
          <p className="mt-1 text-xs text-red-600">{errors.comment.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="share" className="mb-2">
          Share
        </Label>
        <Controller
          control={control}
          name="share"
          render={({ field }) => (
            <Input
              id="share"
              type="number"
              placeholder="Enter share"
              min={0}
              {...field}
              onChange={(e) => field.onChange(Number(e.target.value))}
            />
          )}
        />
        {errors.share && (
          <p className="mt-1 text-xs text-red-600">{errors.share.message}</p>
        )}
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}
