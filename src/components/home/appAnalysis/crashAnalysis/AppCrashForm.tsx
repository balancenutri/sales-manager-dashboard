import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { useUpdateAppPerformanceMutation } from "@/service/dashboard/api"; // <-- you can replace with your API hook
// import type { UpdateAppPerformanceBody } from "@/lib/types"; // <-- optional type if you have it

type FormValues = {
  crash_free_users: number;
  crash_free_sessions: number;
  yesterday: number;
  last_7_days: number;
  mtd: number;
};

export default function AppCrashForm({
  closeModal,
}: {
  closeModal: () => void;
}) {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    // defaultValues: appData,
  });

  //   const [updateAppPerformance] = useUpdateAppPerformanceMutation();

  const onSubmit = async (data: FormValues) => {
    // const body: UpdateAppPerformanceBody = {
    //   platform: platform ?? undefined,
    //   app: appName ?? undefined,
    //   data: {
    //     crash_free_users: data.crash_free_users,
    //     crash_free_sessions: data.crash_free_sessions,
    //     yesterday: data.yesterday,
    //     last_7_days: data.last_7_days,
    //     mtd: data.mtd,
    //   },
    // };

    // const res = await updateAppPerformance(body);
    // console.log("Updated App Performance:", res.data);
    console.log({ data });
    closeModal();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-h-[80vh] overflow-scroll p-2"
    >
      {/* Crash Free Users */}
      <div>
        <Label htmlFor="crash_free_users" className="mb-2">
          Crash Free Users (%)
        </Label>
        <Controller
          control={control}
          name="crash_free_users"
          rules={{ required: "Crash free users is required" }}
          render={({ field }) => (
            <Input
              id="crash_free_users"
              type="number"
              placeholder="Enter crash free users percentage"
              min={0}
              max={100}
              {...field}
              value={field.value || ""}
              onChange={(e) => {
                const value =
                  e.target.value === "" ? "" : Number(e.target.value);
                field.onChange(value);
              }}
            />
          )}
        />
        {errors.crash_free_users && (
          <p className="mt-1 text-xs text-red-600">
            {errors.crash_free_users.message}
          </p>
        )}
      </div>

      {/* Crash Free Sessions */}
      <div>
        <Label htmlFor="crash_free_sessions" className="mb-2">
          Crash Free Sessions (%)
        </Label>
        <Controller
          control={control}
          name="crash_free_sessions"
          rules={{ required: "Crash free sessions is required" }}
          render={({ field }) => (
            <Input
              id="crash_free_sessions"
              type="number"
              placeholder="Enter crash free sessions percentage"
              min={0}
              max={100}
              {...field}
              value={field.value || ""}
              onChange={(e) => {
                const value =
                  e.target.value === "" ? "" : Number(e.target.value);
                field.onChange(value);
              }}
            />
          )}
        />
        {errors.crash_free_sessions && (
          <p className="mt-1 text-xs text-red-600">
            {errors.crash_free_sessions.message}
          </p>
        )}
      </div>

      {/* Yesterday */}
      <div>
        <Label htmlFor="yesterday" className="mb-2">
          Yesterday
        </Label>
        <Controller
          control={control}
          name="yesterday"
          rules={{ required: "Yesterday field is required" }}
          render={({ field }) => (
            <Input
              id="yesterday"
              type="number"
              placeholder="Enter yesterday value"
              min={0}
              {...field}
              value={field.value || ""}
              onChange={(e) => {
                const value =
                  e.target.value === "" ? "" : Number(e.target.value);
                field.onChange(value);
              }}
            />
          )}
        />
        {errors.yesterday && (
          <p className="mt-1 text-xs text-red-600">
            {errors.yesterday.message}
          </p>
        )}
      </div>

      {/* Last 7 Days */}
      <div>
        <Label htmlFor="last_7_days" className="mb-2">
          Last 7 Days
        </Label>
        <Controller
          control={control}
          name="last_7_days"
          rules={{ required: "Last 7 days field is required" }}
          render={({ field }) => (
            <Input
              id="last_7_days"
              type="number"
              placeholder="Enter last 7 days value"
              min={0}
              {...field}
              value={field.value || ""}
              onChange={(e) => {
                const value =
                  e.target.value === "" ? "" : Number(e.target.value);
                field.onChange(value);
              }}
            />
          )}
        />
        {errors.last_7_days && (
          <p className="mt-1 text-xs text-red-600">
            {errors.last_7_days.message}
          </p>
        )}
      </div>

      {/* MTD */}
      <div>
        <Label htmlFor="mtd" className="mb-2">
          MTD
        </Label>
        <Controller
          control={control}
          name="mtd"
          rules={{ required: "MTD is required" }}
          render={({ field }) => (
            <Input
              id="mtd"
              type="number"
              placeholder="Enter MTD value"
              min={0}
              {...field}
              value={field.value || ""}
              onChange={(e) => {
                const value =
                  e.target.value === "" ? "" : Number(e.target.value);
                field.onChange(value);
              }}
            />
          )}
        />
        {errors.mtd && (
          <p className="mt-1 text-xs text-red-600">{errors.mtd.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}
