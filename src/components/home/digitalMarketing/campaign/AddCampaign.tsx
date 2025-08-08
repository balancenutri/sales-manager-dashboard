import { useForm, Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker"; // Import the DatePicker
import dayjs from "dayjs"; // Import dayjs for validation
import { MultiSelect } from "@/components/ui/multi-select";
import {
  useGetAllHealthIssueQuery,
  useGetAllProgramNameQuery,
} from "@/service/common/api";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import type { AddCampaignBody } from "@/lib/types";
import { useAddNewCampaignMutation } from "@/service/dashboard/api";

dayjs.extend(isSameOrAfter);

type FormValues = {
  name: string;
  type: string;
  start_date: string; // ISO yyyy-MM-dd
  end_date: string; // ISO yyyy-MM-dd
  ad_spend: number; // Use '' for empty number input
  gender: string[];
  health_conditions: string[];
  age_group: string[];
  program_name: number[];
};

export default function AddCampaignForm() {
  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      name: "", // No default value
      type: "", // No default value
      start_date: "", // No default value
      end_date: "", // No default value
      ad_spend: 0, // No default value
      gender: [],
      health_conditions: [],
      age_group: [],
      program_name: [],
    },
  });
  const { data: healthData } = useGetAllHealthIssueQuery();
  const { data: programData } = useGetAllProgramNameQuery({
    user_type: "Lead",
  });

  const [addNewCampaign] = useAddNewCampaignMutation();

  const onSubmit = async (data: FormValues) => {
    // extra validation: end_date >= start_date
    const startDay = dayjs(data.start_date);
    const endDay = dayjs(data.end_date);

    if (endDay.isBefore(startDay)) {
      setError("end_date", {
        type: "manual",
        message: "End date must be on or after start date.",
      });
      return;
    }
    // convert or format if necessary, then send to API
    console.log("Ad campaign payload:", data);

    const body: AddCampaignBody = {
      name: data.name,
      type: data.type,
      start_date: data.start_date,
      end_date: data.end_date,
      ad_spend: data.ad_spend,
      target_users: {
        gender: data.gender,
        health_conditions: data.health_conditions,
        age_group: data.age_group,
        program_name: data.program_name,
      },
    };

    const response = await addNewCampaign(body);
    console.log({ response });
    // example: show success + reset or keep values
    // reset(); // Consider if you want to reset after successful submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4 max-h-[80vh] overflow-y-scroll ">
        {/* Type */}
        <div>
          <Label className="mb-2">Name</Label>
          <Input
            placeholder="Name"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Name must be greater then 3 character",
              },
            })}
          />
          {errors.ad_spend && (
            <p className="mt-1 text-xs text-red-600">
              {errors.ad_spend.message}
            </p>
          )}
        </div>

        <div>
          <Label className="mb-2">Type</Label>
          <Controller
            control={control}
            name="type"
            rules={{ required: "Campaign type is required" }}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Google Ads">Google Ads</SelectItem>
                  <SelectItem value="Facebook Ads">Facebook Ads</SelectItem>
                  <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                  <SelectItem value="Organic">Organic</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.type && (
            <p className="mt-1 text-xs text-red-600">{errors.type.message}</p>
          )}
        </div>
        <Controller
          control={control}
          name="start_date"
          rules={{ required: "Start date is required" }}
          render={({ field }) => (
            <DatePicker
              label="Start Date"
              value={field.value}
              onChange={field.onChange}
              errorMessage={errors.start_date?.message}
              // Example: Disable dates before 1900-01-01
              disabled={(date) => dayjs(date).isBefore(dayjs("1900-01-01"))}
            />
          )}
        />
        {/* End Date */}
        <Controller
          control={control}
          name="end_date"
          rules={{
            required: "End date is required",
            validate: (value) => {
              const { start_date } = getValues();
              if (!start_date) return true; // let required handle missing start

              const startDay = dayjs(start_date);
              const endDay = dayjs(value);

              return (
                endDay.isSameOrAfter(startDay) ||
                "End date must be on or after start date."
              );
            },
          }}
          render={({ field }) => (
            <DatePicker
              label="End Date"
              value={field.value}
              onChange={field.onChange}
              errorMessage={errors.end_date?.message}
              // Example: Disable dates before 1900-01-01
              disabled={(date) => dayjs(date).isBefore(dayjs("1900-01-01"))}
            />
          )}
        />
        {/* Ad Spend */}
        <div>
          <Label className="mb-2">Ad Spend (₹)</Label>
          <Input
            inputMode="numeric"
            type="number"
            placeholder="Ad Spend"
            {...register("ad_spend", {
              required: "Ad spend is required",
              valueAsNumber: true,
              min: { value: 0, message: "Ad spend must be >= 0" },
            })}
          />
          {errors.ad_spend && (
            <p className="mt-1 text-xs text-red-600">
              {errors.ad_spend.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Program Name
          </label>
          <Controller
            name="program_name"
            control={control}
            render={({ field }) => (
              <MultiSelect
                options={programData?.[0]?.data || []}
                nameKey="program_name"
                valueKey="program_id"
                selected={field.value}
                onChange={field.onChange}
                placeholder="Select Programs"
              />
            )}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Gender</label>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <MultiSelect
                options={[
                  { name: "Male", id: "1" },
                  { name: "Female", id: "2" },
                ]}
                selected={field.value}
                onChange={field.onChange}
                placeholder="Select Gender"
              />
            )}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Clinical Condition
          </label>
          <Controller
            name="health_conditions"
            control={control}
            render={({ field }) => (
              <MultiSelect
                options={healthData?.data || []}
                nameKey="name"
                valueKey="name"
                selected={field.value}
                onChange={field.onChange}
                placeholder="Select Clinical Condition"
              />
            )}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Age Group</label>
          <Controller
            name="age_group"
            control={control}
            render={({ field }) => (
              <MultiSelect
                options={["18-25", "25-35", "35-45", "45-55", "55-65", "65+"]}
                selected={field.value}
                onChange={field.onChange}
                placeholder="Select Age Group"
              />
            )}
          />
        </div>
        {/* Actions */}
        <div className="flex gap-2 justify-end pt-2">
          <Button
            variant="outline"
            type="button"
            onClick={() =>
              reset({
                type: "",
                start_date: "",
                end_date: "",
                ad_spend: 0,
              })
            }
          >
            Reset
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Campaign"}
          </Button>
        </div>
      </div>
    </form>
  );
}
