import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdateSocialMediaPerformanceMutation } from "@/service/dashboard/api";

type FormValues = {
  total_followers: number;
  total_visitors: number;
  unique_engagement: number;
  total_reach?: number;
  impressions: number;
};

export default function AddMediaForm({
  type,
  mediaData,
  closeModal
}: {
  type: "Youtube" | "Instagram" | "Facebook" | null;
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
    const body = {
      data: {
        ...data,
        engagement_rate: `${(
          (data.unique_engagement * 100) /
          data.total_visitors
        ).toFixed(2)}%`,
      },
      type: type ?? undefined,
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
          Total Followers
        </Label>
        <Controller
          control={control}
          name="total_followers"
          render={({ field }) => (
            <Input
              id="total_followers"
              type="number"
              placeholder="Enter total followers"
              {...field}
              min={0}
              onChange={(e) => field.onChange(Number(e.target.value))}
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
          render={({ field }) => (
            <Input
              id="total_visitors"
              min={0}
              type="number"
              placeholder="Enter total visitors"
              {...field}
              onChange={(e) => field.onChange(Number(e.target.value))}
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

      {/* Total Reach */}
      {mediaData?.total_reach && <div>
        <Label htmlFor="total_reach" className="mb-2">
          Total Reach
        </Label>
        <Controller
          control={control}
          name="total_reach"
          render={({ field }) => (
            <Input
              id="total_reach"
              type="number"
              placeholder="Enter total reach"
              min={0}
              {...field}
              onChange={(e) => field.onChange(Number(e.target.value))}
            />
          )}
        />
        {errors.total_reach && (
          <p className="mt-1 text-xs text-red-600">
            {errors.total_reach.message}
          </p>
        )}
      </div>}

      {/* Impressions */}
      <div>
        <Label htmlFor="impressions" className="mb-2">
          Impressions
        </Label>
        <Controller
          control={control}
          name="impressions"
          render={({ field }) => (
            <Input
              id="impressions"
              type="number"
              placeholder="Enter impressions"
              min={0}
              {...field}
              onChange={(e) => field.onChange(Number(e.target.value))}
            />
          )}
        />
        {errors.impressions && (
          <p className="mt-1 text-xs text-red-600">
            {errors.impressions.message}
          </p>
        )}
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}
