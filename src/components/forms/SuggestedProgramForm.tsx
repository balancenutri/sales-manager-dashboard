import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { X, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  useGetAllProgramNameQuery,
  useGetAllProgramsQuery,
  useLazyGetMentorAvailableSlotsQuery,
  useLazyGetPaymentGroupDetailsQuery,
  useSuggestProgramMutation,
} from "@/service/common/api";
import { adminId, leadStatus } from "@/lib/data";

interface SuggestProgramFormProps {
  modalControl: () => void;
  data: any;
}

export default function SuggestProgramForm({
  modalControl,
  data,
}: SuggestProgramFormProps) {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const mentorId = adminId;

  const { data: allPrograms, isLoading } = useGetAllProgramNameQuery({
    user_type: data?.lead_details ? "Lead" : "Client",
  });
  const { data: allProgramSessions } = useGetAllProgramsQuery();
  const [getAvailableSlots, { data: availableSlots }] =
    useLazyGetMentorAvailableSlotsQuery();
  const [getPaymentMode, { data: paymentMode }] =
    useLazyGetPaymentGroupDetailsQuery();
  const [suggestNewProgram, { isLoading: loadingSuggest }] =
    useSuggestProgramMutation();

  const [sessions, setSessions] = useState<any[]>([]);

  const watchProgram = watch("program_id");
  const watchSession = watch("session_id");
  const watchPaymentLink = watch("payment_link");
  const watchPaymentMode = watch("payment_mode");

  useEffect(() => {
    if (watchProgram && allProgramSessions?.[0]?.data) {
      const filteredSessions = allProgramSessions[0].data.filter(
        (item: any) => item.meta_data.program_id === Number(watchProgram)
      );
      setSessions(filteredSessions);
    }
  }, [watchProgram, allProgramSessions]);

  useEffect(() => {
    if (watchSession && sessions.length > 0) {
      const foundSession = sessions.find(
        (item) => item.program_session_id === Number(watchSession)
      );
      if (foundSession) {
        setValue("program_mrp", foundSession.mrp);
      }
    }
  }, [watchSession, sessions, setValue]);

  const handlePaymentLink = (value: string) => {
    setValue("payment_mode", value);
    if (value === "UPI") {
      getPaymentMode("UPI Details");
    }
    if (value === "Bank Details") {
      getPaymentMode("Bank Details");
    }
  };

  const handleDateChange = async (
    date: Date | undefined,
    fieldName: string
  ) => {
    if (date) {
      const selectedDate = format(date, "yyyy-MM-dd");
      setValue(fieldName, selectedDate);
      if (fieldName === "date") {
        await getAvailableSlots({ id: mentorId, date: selectedDate });
      }
    }
  };

  const onSubmit = async (formData: any) => {
    const responseData = {
      program_session_id: Number(formData.session_id),
      suggested_amount: Number(formData.amount),
      mentor_note: formData.mentor_comment,
      program_id: formData.program_id,
      status: formData.lead_status,
      motivation_level:
        formData.motivation === "Low"
          ? "0"
          : formData.motivation === "Medium"
          ? "1"
          : "2",
      payment_mode_id: formData.payment_mode_id
        ? formData.payment_mode_id
        : watchPaymentMode === "Payment Link"
        ? 1
        : watchPaymentMode === "Cash Collection (withIn Mumbai only)"
        ? 4
        : null,
      payment_expiry: formData.payment_expiry,
      suggested_by: mentorId,
      follow_up_date: formData.date,
      type:
        formData.follow_up_using === "Call"
          ? "0"
          : formData.follow_up_using === "Whatsapp"
          ? "1"
          : "2",
      slot_id: formData.next_fu_time,
      user_id:
        data?.client_details?.client_id ||
        data?.user_details?.user_id ||
        data?.lead_details?.lead_id,
    };

    const result = await suggestNewProgram(responseData);
    if (result.data?.data.suggestedProgram?.success) {
      alert("Program Suggested successfully!");
      modalControl();
      reset();
    } else {
      alert("Failed to suggest program!");
    }
  };

  return (
    <div className="w-full max-h-[90vh] bg-background">
      <div className="p-4 border-b">
        <div className="flex items-center justify-center">
          <h2 className="text-lg font-semibold">Suggest Program</h2>
          {/* <Button
            variant="ghost"
            size="icon"
            onClick={modalControl}
            className="hover:text-destructive"
          >
            <X className="h-5 w-5" />
          </Button> */}
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-h-[calc(90vh-80px)] overflow-y-auto p-4 space-y-4"
      >
        {/* Select Status */}
        <div className="space-y-2">
          <Label htmlFor="lead_status">
            Select Status <span className="text-destructive">*</span>
          </Label>
          <Controller
            name="lead_status"
            control={control}
            rules={{ required: "Status is required" }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger
                  className={cn(
                    errors.lead_status && "border-destructive",
                    "w-full"
                  )}
                >
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  
                  {leadStatus.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.lead_status && (
            <span className="text-sm text-destructive">
              {errors.lead_status.message as string}
            </span>
          )}
        </div>

        {/* Motivation Level */}
        <div className="space-y-2">
          <Label>
            Motivation Level <span className="text-destructive">*</span>
          </Label>
          <Controller
            name="motivation"
            control={control}
            rules={{ required: "Motivation Level is required" }}
            render={({ field }) => (
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Low" id="low" />
                  <Label htmlFor="low" className="font-normal">
                    Low
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Medium" id="medium" />
                  <Label htmlFor="medium" className="font-normal">
                    Medium
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="High" id="high" />
                  <Label htmlFor="high" className="font-normal">
                    High
                  </Label>
                </div>
              </RadioGroup>
            )}
          />
          {errors.motivation && (
            <span className="text-sm text-destructive">
              {errors.motivation.message as string}
            </span>
          )}
        </div>

        {/* Suggested Program */}
        <div className="space-y-2">
          <Label htmlFor="program_id">
            Suggested Program <span className="text-destructive">*</span>
          </Label>
          <Controller
            name="program_id"
            control={control}
            rules={{ required: "Suggested Program is required" }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger
                  className={cn(
                    errors.program_id && "border-destructive",
                    "w-full"
                  )}
                >
                  <SelectValue placeholder="Select Program" />
                </SelectTrigger>
                <SelectContent>
                  {allPrograms?.[0]?.data?.map((program: any) => (
                    <SelectItem
                      key={program.program_id}
                      value={String(program.program_id)}
                    >
                      {program.program_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.program_id && (
            <span className="text-sm text-destructive">
              {errors.program_id.message as string}
            </span>
          )}
        </div>

        {/* Suggested Session Day */}
        <div className="space-y-2">
          <Label htmlFor="session_id">
            Suggested Session Day <span className="text-destructive">*</span>
          </Label>
          <Controller
            name="session_id"
            control={control}
            rules={{ required: "Suggested Session Day is required" }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger
                  className={cn(
                    errors.session_id && "border-destructive",
                    "w-full"
                  )}
                >
                  <SelectValue placeholder="Select Session" />
                </SelectTrigger>
                <SelectContent>
                  {sessions.map((session) => (
                    <SelectItem
                      key={session.program_session_id}
                      value={String(session.program_session_id)}
                    >
                      {session.program_duration}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.session_id && (
            <span className="text-sm text-destructive">
              {errors.session_id.message as string}
            </span>
          )}
        </div>

        {/* Program MRP */}
        <div className="space-y-2">
          <Label htmlFor="program_mrp">Program MRP</Label>
          <Controller
            name="program_mrp"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="number"
                placeholder="Program MRP"
                disabled
                className="bg-muted"
              />
            )}
          />
        </div>

        {/* Suggested Amount */}
        <div className="space-y-2">
          <Label htmlFor="amount">
            Suggested Amount <span className="text-destructive">*</span>
          </Label>
          <Controller
            name="amount"
            control={control}
            rules={{ required: "Suggested Amount is required" }}
            render={({ field }) => (
              <Input
                {...field}
                type="number"
                placeholder="Enter amount"
                className={cn(errors.amount && "border-destructive")}
                onWheel={(e) => e.currentTarget.blur()}
              />
            )}
          />
          {errors.amount && (
            <span className="text-sm text-destructive">
              {errors.amount.message as string}
            </span>
          )}
        </div>

        {/* Mentor Comment */}
        <div className="space-y-2">
          <Label htmlFor="mentor_comment">Mentor Comment</Label>
          <Controller
            name="mentor_comment"
            control={control}
            render={({ field }) => (
              <Textarea
                {...field}
                placeholder="Enter your comment"
                className="min-h-[80px]"
              />
            )}
          />
        </div>

        {/* Next FU Date */}
        <div className="space-y-2">
          <Label>
            Next FU Date <span className="text-destructive">*</span>
          </Label>
          <Controller
            name="date"
            control={control}
            rules={{ required: "Next FU Date is required" }}
            render={({ field }) => (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !field.value && "text-muted-foreground",
                      errors.date && "border-destructive"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.value ? format(field.value, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(date) => handleDateChange(date, "date")}
                    disabled={(date) => {
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      const maxDate = new Date();
                      maxDate.setDate(maxDate.getDate() + 9);
                      return date < today || date > maxDate;
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            )}
          />
          {errors.date && (
            <span className="text-sm text-destructive">
              {errors.date.message as string}
            </span>
          )}
        </div>

        {/* Select Next FU Time */}
        <div className="space-y-2">
          <Label htmlFor="next_fu_time">
            Select Next FU Time <span className="text-destructive">*</span>
          </Label>
          <Controller
            name="next_fu_time"
            control={control}
            rules={{ required: "Next FU Time is required" }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger
                  className={cn(
                    errors.next_fu_time && "border-destructive",
                    "w-full"
                  )}
                >
                  <SelectValue placeholder="Select Time" />
                </SelectTrigger>
                <SelectContent>
                  {availableSlots?.[0]?.data?.map((slot: any) => (
                    <SelectItem key={slot.id} value={String(slot.id)}>
                      {slot.appointment_slots}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.next_fu_time && (
            <span className="text-sm text-destructive">
              {errors.next_fu_time.message as string}
            </span>
          )}
        </div>

        {/* Follow Up Using */}
        <div className="space-y-2">
          <Label>Follow Up Using</Label>
          <Controller
            name="follow_up_using"
            control={control}
            render={({ field }) => (
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Whatsapp" id="whatsapp" />
                  <Label htmlFor="whatsapp" className="font-normal">
                    Whatsapp
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Call" id="call" />
                  <Label htmlFor="call" className="font-normal">
                    Call
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="App" id="app" />
                  <Label htmlFor="app" className="font-normal">
                    App
                  </Label>
                </div>
              </RadioGroup>
            )}
          />
        </div>

        {/* Share Payment Details */}
        <div className="space-y-2">
          <Label>
            Share Payment Details <span className="text-destructive">*</span>
          </Label>
          <Controller
            name="payment_link"
            control={control}
            rules={{ required: "Payment Details selection is required" }}
            render={({ field }) => (
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Yes" id="yes" />
                  <Label htmlFor="yes" className="font-normal">
                    Yes
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="No" id="no" />
                  <Label htmlFor="no" className="font-normal">
                    No
                  </Label>
                </div>
              </RadioGroup>
            )}
          />
          {errors.payment_link && (
            <span className="text-sm text-destructive">
              {errors.payment_link.message as string}
            </span>
          )}
        </div>

        {/* Conditional Payment Mode Selection */}
        {watchPaymentLink === "Yes" && (
          <div className="space-y-2">
            <Label htmlFor="payment_mode">Select Payment Mode</Label>
            <Controller
              name="payment_mode"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    handlePaymentLink(value);
                  }}
                  value={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Payment Mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Payment Link">Payment Link</SelectItem>
                    <SelectItem value="Bank Details">Bank Details</SelectItem>
                    <SelectItem value="UPI">UPI</SelectItem>
                    <SelectItem value="Cash Collection (withIn Mumbai only)">
                      Cash Collection (withIn Mumbai only)
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        )}

        {/* Payment Link Expiry Date */}
        {watchPaymentMode === "Payment Link" && watchPaymentLink === "Yes" && (
          <div className="space-y-2">
            <Label>Set Payment Link Expiry Date</Label>
            <Controller
              name="payment_expiry"
              control={control}
              render={({ field }) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? format(field.value, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(date) =>
                        handleDateChange(date, "payment_expiry")
                      }
                      disabled={(date) => {
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        return date < today;
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              )}
            />
          </div>
        )}

        {/* Bank Details */}
        {watchPaymentMode === "Bank Details" && watchPaymentLink === "Yes" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="payment_mode_id">Select Bank</Label>
              <Controller
                name="payment_mode_id"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Bank" />
                    </SelectTrigger>
                    <SelectContent>
                      {paymentMode?.[0]?.data?.map((mode: any) => (
                        <SelectItem
                          key={mode.payment_mode_id}
                          value={String(mode.payment_mode_id)}
                        >
                          {mode.payment_mode_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="space-y-2">
              <Label>Set Bank Transfer Due Date</Label>
              <Controller
                name="payment_expiry"
                control={control}
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value
                          ? format(field.value, "PPP")
                          : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) =>
                          handleDateChange(date, "payment_expiry")
                        }
                        disabled={(date) => {
                          const today = new Date();
                          today.setHours(0, 0, 0, 0);
                          return date < today;
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
            </div>
          </>
        )}

        {/* UPI Details */}
        {watchPaymentMode === "UPI" && watchPaymentLink === "Yes" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="payment_mode_id">Select UPI Type</Label>
              <Controller
                name="payment_mode_id"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select UPI Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {paymentMode?.[0]?.data?.map((mode: any) => (
                        <SelectItem
                          key={mode.payment_mode_id}
                          value={String(mode.payment_mode_id)}
                        >
                          {mode.payment_mode_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="space-y-2">
              <Label>Set UPI Payment Due Date</Label>
              <Controller
                name="payment_expiry"
                control={control}
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value
                          ? format(field.value, "PPP")
                          : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) =>
                          handleDateChange(date, "payment_expiry")
                        }
                        disabled={(date) => {
                          const today = new Date();
                          today.setHours(0, 0, 0, 0);
                          return date < today;
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
            </div>
          </>
        )}

        {/* Cash Collection Date */}
        {watchPaymentMode === "Cash Collection (withIn Mumbai only)" &&
          watchPaymentLink === "Yes" && (
            <div className="space-y-2">
              <Label>Set Cash Collection Date</Label>
              <Controller
                name="payment_expiry"
                control={control}
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value
                          ? format(field.value, "PPP")
                          : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) =>
                          handleDateChange(date, "payment_expiry")
                        }
                        disabled={(date) => {
                          const today = new Date();
                          today.setHours(0, 0, 0, 0);
                          return date < today;
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
            </div>
          )}

        {/* Submit Button */}
        <div className="flex justify-center pt-4">
          <Button
            type="submit"
            className="w-full sm:w-auto"
            disabled={loadingSuggest}
          >
            {loadingSuggest ? "Suggesting..." : "Suggest Program"}
          </Button>
        </div>
      </form>
    </div>
  );
}
