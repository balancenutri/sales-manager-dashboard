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
import { DatePicker } from "@/components/ui/date-picker";
import dayjs from "dayjs";
import { MultiSelect } from "@/components/ui/multi-select";
import {
  useGetAllHealthIssueQuery,
  useGetAllProgramNameQuery,
  useGetAllSourceQuery,
} from "@/service/common/api";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import customParseFormat from "dayjs/plugin/customParseFormat";
import type { AddCampaignBody } from "@/lib/types";
import {
  useAddNewCampaignMutation,
  useUpdateCampaignMutation,
} from "@/service/dashboard/api";
import { keyString } from "@/lib/utils";
import { useMemo } from "react";

dayjs.extend(isSameOrAfter);
dayjs.extend(customParseFormat);

// Custom NumberInput component to handle number inputs with no wheel scrolling
const NumberInput = ({
  step,
  ...props
}: React.ComponentProps<typeof Input> & { step?: string }) => (
  <Input
    type="number"
    step={step}
    onWheel={(e) => e.currentTarget.blur()}
    min={0}
    {...props}
  />
);

type FormValues = {
  name: string;
  added_by: string;
  type: string;
  status: string;
  start_date: string;
  end_date: string;
  ad_spend?: number;
  impressions?: number;
  reach?: number;
  clicks?: number;
  ctr?: number;
  frequency?: number;
  conversions?: number;
  gender: string[];
  health_conditions: string[];
  age_group: string[];
  program_name: string[];
};

export default function AddCampaignForm({
  modalControl,
  data,
  campaignId,
}: {
  modalControl: () => void;
  data: FormValues | null;
  campaignId?: number | null;
}) {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      ...(data
        ? {
            ...data,
            type: data.type ? String(data.type) : "",
            status: data.status ? data.status.toLowerCase() : "",
            start_date: dayjs(data.start_date, "DD/MM/YYYY").format(
              "YYYY-MM-DD"
            ),
            end_date: dayjs(data.end_date, "DD/MM/YYYY").format("YYYY-MM-DD"),
          }
        : {}),
    },
  });

  const { data: healthData } = useGetAllHealthIssueQuery();
  const { data: programData } = useGetAllProgramNameQuery({
    user_type: "Lead",
  });
  const { data: allSources } = useGetAllSourceQuery({
    source_id: 6,
  });

  const stableAllSources = useMemo(() => allSources?.data, [allSources?.data]);
  const [addNewCampaign] = useAddNewCampaignMutation();
  const [updateCampaign] = useUpdateCampaignMutation();

  const onSubmit = async (formData: FormValues) => {
    const startDay = dayjs(formData.start_date);
    const endDay = dayjs(formData.end_date);

    if (endDay.isBefore(startDay)) {
      setError("end_date", {
        type: "manual",
        message: "End date must be on or after start date.",
      });
      return;
    }
    console.log("Ad campaign payload:", formData);

    const body: AddCampaignBody = {
      name: formData.name,
      status: formData.status,
      type: formData.type,
      start_date: formData.start_date,
      end_date: formData.end_date,
      ad_spend: formData.ad_spend ?? 0,
      target_users: {
        gender: formData.gender,
        health_conditions: formData.health_conditions,
        age_group: formData.age_group,
        program_name: formData.program_name,
      },
      digital_marketing: {
        impressions: formData.impressions ?? 0,
        reach: formData.reach ?? 0,
        clicks: formData.clicks ?? 0,
        ctr: formData.ctr ?? 0,
        conversions: formData.conversions ?? 0,
        frequency: formData.frequency ?? 0,
      },
      added_by: formData.added_by,
    };

    if (data) {
      const response = await updateCampaign({ ...body, id: campaignId || 0 });
      console.log({ response });
    } else {
      const response = await addNewCampaign(body);
      console.log({ response });
    }

    modalControl();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4 max-h-[80vh] overflow-y-scroll px-2">
        {/* Name */}
        <div>
          <Label htmlFor="name" className="mb-2">
            Name
          </Label>
          <Controller
            control={control}
            name="name"
            rules={{
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Name must be greater than 3 characters",
              },
            }}
            render={({ field }) => (
              <Input
                id="name"
                placeholder="Name"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
            )}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
          )}
        </div>

        {/* Status */}
        <div>
          <Label htmlFor="status" className="mb-2">
            Status
          </Label>
          <Controller
            control={control}
            name="status"
            rules={{ required: "Campaign status is required" }}
            render={({ field }) => {
              console.log("Status field", field);
              return (
                <Select
                  value={field.value || undefined}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              );
            }}
          />
          {errors.status && (
            <p className="mt-1 text-xs text-red-600">{errors.status.message}</p>
          )}
        </div>

        {/* Type */}
        <div>
          <Label htmlFor="type" className="mb-2">
            Type
          </Label>
          <Controller
            control={control}
            name="type"
            rules={{ required: "Campaign type is required" }}
            render={({ field }) => {
              console.log("Type field", field);
              return (
                <Select
                  value={field.value || undefined}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {stableAllSources?.map((item) => (
                      <SelectItem
                        key={item.source_id}
                        value={String(item.source_id)}
                      >
                        {keyString(item.source_name)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              );
            }}
          />
          {errors.type && (
            <p className="mt-1 text-xs text-red-600">{errors.type.message}</p>
          )}
        </div>

        {/* Start Date */}
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
            />
          )}
        />

        {/* End Date */}
        <Controller
          control={control}
          name="end_date"
          render={({ field }) => (
            <DatePicker
              label="End Date"
              value={field.value}
              onChange={field.onChange}
              errorMessage={errors.end_date?.message}
            />
          )}
        />

        {/* Number fields */}
        {[
          { name: "ad_spend", label: "Ad Spend (₹)", step: "0.01" },
          { name: "impressions", label: "Impressions" },
          { name: "frequency", label: "Frequency", step: "0.01" },
          { name: "reach", label: "Reach" },
          { name: "clicks", label: "Clicks" },
          { name: "ctr", label: "CTR (%)", step: "0.01" },
          { name: "conversions", label: "Conversions" },
        ].map(({ name, label, step }) => (
          <div key={name}>
            <Label htmlFor={name} className="mb-2">
              {label}
            </Label>
            <Controller
              control={control}
              name={name as keyof FormValues}
              render={({ field }) => (
                <NumberInput
                  id={name}
                  step={step}
                  placeholder={`Enter ${label}`}
                  value={field.value ?? ""}
                  onChange={(e) => {
                    const val = e.target.value;
                    field.onChange(val === "" ? undefined : Number(val));
                  }}
                />
              )}
            />
            {errors[name as keyof FormValues] && (
              <p className="mt-1 text-xs text-red-600">
                {errors[name as keyof FormValues]?.message as string}
              </p>
            )}
          </div>
        ))}

        {/* Program Name */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Program Name
          </Label>
          <Controller
            name="program_name"
            control={control}
            render={({ field }) => (
              <MultiSelect
                options={programData?.[0]?.data || []}
                nameKey="program_name"
                valueKey="program_name"
                selected={field.value}
                onChange={field.onChange}
                placeholder="Select Programs"
              />
            )}
          />
        </div>

        {/* Gender */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">Gender</Label>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <MultiSelect
                options={[
                  { name: "Male", id: "male" },
                  { name: "Female", id: "female" },
                ]}
                selected={field.value || []}
                onChange={field.onChange}
                placeholder="Select Gender"
              />
            )}
          />
        </div>

        {/* Clinical Condition */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Clinical Condition
          </Label>
          <Controller
            name="health_conditions"
            control={control}
            render={({ field }) => (
              <MultiSelect
                options={healthData?.data || []}
                nameKey="name"
                valueKey="name"
                selected={field.value || []}
                onChange={field.onChange}
                placeholder="Select Clinical Condition"
              />
            )}
          />
        </div>

        {/* Age Group */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">Age Group</Label>
          <Controller
            name="age_group"
            control={control}
            render={({ field }) => (
              <MultiSelect
                options={["18-25", "25-35", "35-45", "45-55", "55-65", "65+"]}
                selected={field.value || []}
                onChange={field.onChange}
                placeholder="Select Age Group"
              />
            )}
          />
        </div>

        {/* Added By */}
        <div>
          <Label htmlFor="added_by" className="mb-2">
            Added By
          </Label>
          <Controller
            control={control}
            name="added_by"
            rules={{
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Name must be greater than 3 characters",
              },
            }}
            render={({ field }) => (
              <Input
                id="added_by"
                placeholder="Added By"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
            )}
          />
          {errors.added_by && (
            <p className="mt-1 text-xs text-red-600">
              {errors.added_by.message}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 justify-end pt-2">
          {!data && (
            <Button
              variant="outline"
              type="button"
              onClick={() =>
                reset({
                  name: "",
                  added_by: "",
                  type: "",
                  status: "",
                  start_date: "",
                  end_date: "",
                  ad_spend: undefined,
                  impressions: undefined,
                  reach: undefined,
                  clicks: undefined,
                  ctr: undefined,
                  conversions: undefined,
                  frequency: undefined,
                  gender: [],
                  health_conditions: [],
                  age_group: [],
                  program_name: [],
                })
              }
            >
              Reset
            </Button>
          )}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Campaign"}
          </Button>
        </div>
      </div>
    </form>
  );
}
