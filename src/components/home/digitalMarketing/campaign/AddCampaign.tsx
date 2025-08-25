// import { useForm, Controller } from "react-hook-form";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";
// import { DatePicker } from "@/components/ui/date-picker";
// import dayjs from "dayjs";
// import { MultiSelect } from "@/components/ui/multi-select";
// import {
//   useGetAllHealthIssueQuery,
//   useGetAllProgramNameQuery,
//   useGetAllSourceQuery,
// } from "@/service/common/api";
// import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
// import type { AddCampaignBody } from "@/lib/types";
// import { useAddNewCampaignMutation } from "@/service/dashboard/api";
// import { keyString } from "@/lib/utils";

// dayjs.extend(isSameOrAfter);

// type FormValues = {
//   name: string;
//   type: string;
//   status: string;
//   start_date: string; // ISO yyyy-MM-dd
//   end_date: string; // ISO yyyy-MM-dd
//   ad_spend: number; // Use '' for empty number input
//   gender: string[];
//   health_conditions: string[];
//   age_group: string[];
//   program_name: number[];
// };

// export default function AddCampaignForm({
//   modalControl,
// }: {
//   modalControl: () => void;
// }) {
//   const {
//     register,
//     handleSubmit,
//     control,
//     formState: { errors, isSubmitting },
//     setError,
//     reset,
//   } = useForm<FormValues>({
//     defaultValues: {
//       name: "",
//       type: "",
//       status: "",
//       start_date: "",
//       end_date: "",
//       ad_spend: 0,
//       gender: [],
//       health_conditions: [],
//       age_group: [],
//       program_name: [],
//     },
//   });
//   const { data: healthData } = useGetAllHealthIssueQuery();
//   const { data: programData } = useGetAllProgramNameQuery({
//     user_type: "Lead",
//   });

//   const { data: allSources } = useGetAllSourceQuery({
//     source_id: 6,
//   });

//   const [addNewCampaign] = useAddNewCampaignMutation();

//   const onSubmit = async (data: FormValues) => {
//     const startDay = dayjs(data.start_date);
//     const endDay = dayjs(data.end_date);

//     if (endDay.isBefore(startDay)) {
//       setError("end_date", {
//         type: "manual",
//         message: "End date must be on or after start date.",
//       });
//       return;
//     }
//     console.log("Ad campaign payload:", data);

//     const body: AddCampaignBody = {
//       name: data.name,
//       status: data.status,
//       type: data.type,
//       start_date: data.start_date,
//       end_date: data.end_date,
//       ad_spend: data.ad_spend,
//       target_users: {
//         gender: data.gender,
//         health_conditions: data.health_conditions,
//         age_group: data.age_group,
//         program_name: data.program_name,
//       },
//     };

//     const response = await addNewCampaign(body);
//     console.log({ response });
//     modalControl();
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <div className="space-y-4 max-h-[80vh] overflow-y-scroll px-2">
//         {/* Type */}
//         <div>
//           <Label className="mb-2">Name</Label>
//           <Controller
//             control={control}
//             name="name"
//             rules={{
//               required: "Name is required",
//               minLength: {
//                 value: 3,
//                 message: "Name must be greater than 3 characters",
//               },
//             }}
//             render={({ field }) => (
//               <Input
//                 placeholder="Name"
//                 value={field.value}
//                 onChange={field.onChange}
//                 onBlur={field.onBlur}
//               />
//             )}
//           />
//           {errors.name && (
//             <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
//           )}
//         </div>

//         <div>
//           <Label className="mb-2">Status</Label>
//           <Controller
//             control={control}
//             name="status"
//             rules={{ required: "Campaign status is required" }}
//             render={({ field }) => (
//               <Select value={field.value} onValueChange={field.onChange}>
//                 <SelectTrigger className="w-full">
//                   <SelectValue placeholder="Select Type" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="active">Active</SelectItem>
//                   <SelectItem value="inactive">Inactive</SelectItem>
//                 </SelectContent>
//               </Select>
//             )}
//           />
//           {errors.type && (
//             <p className="mt-1 text-xs text-red-600">{errors.type.message}</p>
//           )}
//         </div>
//         <div>
//           <Label className="mb-2">Type</Label>
//           <Controller
//             control={control}
//             name="type"
//             rules={{ required: "Campaign type is required" }}
//             render={({ field }) => (
//               <Select value={field.value} onValueChange={field.onChange}>
//                 <SelectTrigger className="w-full">
//                   <SelectValue placeholder="Select Type" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {allSources?.data?.map((item) => (
//                     <SelectItem
//                       key={item.source_id}
//                       value={String(item.source_id)}
//                     >
//                       {keyString(item.source_name)}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             )}
//           />
//           {errors.type && (
//             <p className="mt-1 text-xs text-red-600">{errors.type.message}</p>
//           )}
//         </div>
//         <Controller
//           control={control}
//           name="start_date"
//           rules={{ required: "Start date is required" }}
//           render={({ field }) => (
//             <DatePicker
//               label="Start Date"
//               value={field.value}
//               onChange={field.onChange}
//               errorMessage={errors.start_date?.message}
//               // minDate={dayjs().subtract(1, "day").toDate()}
//             />
//           )}
//         />
//         {/* End Date */}
//         <Controller
//           control={control}
//           name="end_date"
//           render={({ field }) => (
//             <DatePicker
//               label="End Date"
//               value={field.value}
//               onChange={field.onChange}
//               errorMessage={errors.end_date?.message}
//             />
//           )}
//         />
//         {/* Ad Spend */}
//         <div>
//           <Label className="mb-2">Ad Spend (₹)</Label>
//           <Input
//             inputMode="numeric"
//             type="number"
//             placeholder="Ad Spend"
//             {...register("ad_spend", {
//               required: "Ad spend is required",
//               valueAsNumber: true,
//               min: { value: 0, message: "Ad spend must be >= 0" },
//             })}
//           />
//           {errors.ad_spend && (
//             <p className="mt-1 text-xs text-red-600">
//               {errors.ad_spend.message}
//             </p>
//           )}
//         </div>
//         <div className="space-y-2">
//           <label className="text-sm font-medium text-gray-700">
//             Program Name
//           </label>
//           <Controller
//             name="program_name"
//             control={control}
//             render={({ field }) => (
//               <MultiSelect
//                 options={programData?.[0]?.data || []}
//                 nameKey="program_name"
//                 valueKey="program_id"
//                 selected={field.value}
//                 onChange={field.onChange}
//                 placeholder="Select Programs"
//               />
//             )}
//           />
//         </div>
//         <div className="space-y-2">
//           <label className="text-sm font-medium text-gray-700">Gender</label>
//           <Controller
//             name="gender"
//             control={control}
//             render={({ field }) => (
//               <MultiSelect
//                 options={[
//                   { name: "Male", id: "1" },
//                   { name: "Female", id: "2" },
//                 ]}
//                 selected={field.value}
//                 onChange={field.onChange}
//                 placeholder="Select Gender"
//               />
//             )}
//           />
//         </div>
//         <div className="space-y-2">
//           <label className="text-sm font-medium text-gray-700">
//             Clinical Condition
//           </label>
//           <Controller
//             name="health_conditions"
//             control={control}
//             render={({ field }) => (
//               <MultiSelect
//                 options={healthData?.data || []}
//                 nameKey="name"
//                 valueKey="name"
//                 selected={field.value}
//                 onChange={field.onChange}
//                 placeholder="Select Clinical Condition"
//               />
//             )}
//           />
//         </div>

//         <div className="space-y-2">
//           <label className="text-sm font-medium text-gray-700">Age Group</label>
//           <Controller
//             name="age_group"
//             control={control}
//             render={({ field }) => (
//               <MultiSelect
//                 options={["18-25", "25-35", "35-45", "45-55", "55-65", "65+"]}
//                 selected={field.value}
//                 onChange={field.onChange}
//                 placeholder="Select Age Group"
//               />
//             )}
//           />
//         </div>
//         {/* Actions */}
//         <div className="flex gap-2 justify-end pt-2">
//           <Button
//             variant="outline"
//             type="button"
//             onClick={() =>
//               reset({
//                 type: "",
//                 start_date: "",
//                 end_date: "",
//                 ad_spend: 0,
//               })
//             }
//           >
//             Reset
//           </Button>
//           <Button type="submit" disabled={isSubmitting}>
//             {isSubmitting ? "Saving..." : "Save Campaign"}
//           </Button>
//         </div>
//       </div>
//     </form>
//   );
// }

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
import type { AddCampaignBody } from "@/lib/types";
import { useAddNewCampaignMutation } from "@/service/dashboard/api";
import { keyString } from "@/lib/utils";

dayjs.extend(isSameOrAfter);

// Custom NumberInput component to handle number inputs with no wheel scrolling
const NumberInput = ({
  step,
  ...props
}: React.ComponentProps<typeof Input> & { step?: string }) => (
  <Input
    type="number"
    step={step}
    onWheel={(e) => e.currentTarget.blur()}
    {...props}
  />
);

type FormValues = {
  name: string;
  type: string;
  status: string;
  start_date: string; // ISO yyyy-MM-dd
  end_date: string; // ISO yyyy-MM-dd
  ad_spend: number; // Use '' for empty number input
  impressions: number;
  reach: number;
  clicks: number;
  ctr: number;
  conversions: number;
  gender: string[];
  health_conditions: string[];
  age_group: string[];
  program_name: number[];
};

export default function AddCampaignForm({
  modalControl,
}: {
  modalControl: () => void;
}) {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
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
  const { data: allSources } = useGetAllSourceQuery({
    source_id: 6,
  });

  const [addNewCampaign] = useAddNewCampaignMutation();

  const onSubmit = async (data: FormValues) => {
    const startDay = dayjs(data.start_date);
    const endDay = dayjs(data.end_date);

    if (endDay.isBefore(startDay)) {
      setError("end_date", {
        type: "manual",
        message: "End date must be on or after start date.",
      });
      return;
    }
    console.log("Ad campaign payload:", data);

    const body: AddCampaignBody = {
      name: data.name,
      status: data.status,
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
      digital_marketing: {
        impressions: data.impressions,
        reach: data.reach,
        clicks: data.clicks,
        ctr: data.ctr,
        conversions: data.conversions,
      },
    };

    const response = await addNewCampaign(body);
    console.log({ response });
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
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            )}
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
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  {allSources?.data?.map((item) => (
                    <SelectItem
                      key={item.source_id}
                      value={String(item.source_id)}
                    >
                      {keyString(item.source_name)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
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

        {/* Ad Spend */}
        <div>
          <Label htmlFor="ad_spend" className="mb-2">
            Ad Spend (₹)
          </Label>
          <Controller
            control={control}
            name="ad_spend"
            rules={{
              required: "Ad spend is required",
              min: { value: 0, message: "Ad spend must be >= 0" },
            }}
            render={({ field }) => (
              <NumberInput
                id="ad_spend"
                step="0.01"
                placeholder="Enter ad spend"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            )}
          />
          {errors.ad_spend && (
            <p className="mt-1 text-xs text-red-600">
              {errors.ad_spend.message}
            </p>
          )}
        </div>

        {/* Impressions */}
        <div>
          <Label htmlFor="impressions" className="mb-2">
            Impressions
          </Label>
          <Controller
            control={control}
            name="impressions"
            render={({ field }) => (
              <NumberInput
                id="impressions"
                placeholder="Enter impressions"
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

        {/* Reach */}
        <div>
          <Label htmlFor="reach" className="mb-2">
            Reach
          </Label>
          <Controller
            control={control}
            name="reach"
            render={({ field }) => (
              <NumberInput
                id="reach"
                placeholder="Enter reach"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            )}
          />
          {errors.reach && (
            <p className="mt-1 text-xs text-red-600">{errors.reach.message}</p>
          )}
        </div>

        {/* Clicks */}
        <div>
          <Label htmlFor="clicks" className="mb-2">
            Clicks
          </Label>
          <Controller
            control={control}
            name="clicks"
            render={({ field }) => (
              <NumberInput
                id="clicks"
                placeholder="Enter clicks"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            )}
          />
          {errors.clicks && (
            <p className="mt-1 text-xs text-red-600">{errors.clicks.message}</p>
          )}
        </div>

        {/* CTR */}
        <div>
          <Label htmlFor="ctr" className="mb-2">
            CTR (%)
          </Label>
          <Controller
            control={control}
            name="ctr"
            render={({ field }) => (
              <NumberInput
                id="ctr"
                step="0.01"
                placeholder="Enter CTR (%)"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            )}
          />
          {errors.ctr && (
            <p className="mt-1 text-xs text-red-600">{errors.ctr.message}</p>
          )}
        </div>

        {/* Conversions */}
        <div>
          <Label htmlFor="conversions" className="mb-2">
            Conversions
          </Label>
          <Controller
            control={control}
            name="conversions"
            render={({ field }) => (
              <NumberInput
                id="conversions"
                placeholder="Enter conversions"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            )}
          />
          {errors.conversions && (
            <p className="mt-1 text-xs text-red-600">
              {errors.conversions.message}
            </p>
          )}
        </div>

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
                valueKey="program_id"
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
                selected={field.value}
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
                name: "",
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
                gender: [],
                health_conditions: [],
                age_group: [],
                program_name: [],
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
