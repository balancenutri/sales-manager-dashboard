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
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import {
  useGetAllProgramNameQuery,
  useGetAllProgramsQuery,
  useLazyGetMentorAvailableSlotsQuery,
  useLazyGetPaymentGroupDetailsQuery,
  useUpdateSuggestProgramMutation,
} from "@/service/common/api";
import { adminId, leadStatus } from "@/lib/data";

interface EditSuggestProgramFormProps {
  modalControl: () => void;
  data: any;
}

export default function EditSuggestProgramForm({
  modalControl,
  data,
}: EditSuggestProgramFormProps) {
  const pitchedData = data?.pitched_details || data?.pitched_program_details;
  const suggestedData =
    data?.suggested_details || data?.suggested_program_details;

  console.log({ data });

  function capitalizeFirstLetter(str: string) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const defaultValue = {
    session_id: suggestedData?.suggested_program_session_id,
    program_id: suggestedData?.suggested_program_id,
    amount: suggestedData?.suggested_program_qtd,
    program_mrp: suggestedData?.suggested_program_mrp,
    mentor_comment: suggestedData?.suggested_mentor_note,
    lead_status: suggestedData?.suggested_sale_status,
    motivation:
      typeof suggestedData?.suggested_motivation_level === "string"
        ? capitalizeFirstLetter(suggestedData?.suggested_motivation_level)
        : suggestedData?.suggested_motivation_level === 0
        ? "Low"
        : suggestedData?.suggested_motivation_level === 1
        ? "Medium"
        : "High",
    payment_link: "No",
    payment_mode: "",
    payment_mode_id: "",
    date: "",
    next_fu_time: "",
    follow_up_using: "",
    payment_expiry: "",
  };

  const pitchedValue = {
    session_id: pitchedData?.pitched_program_session_id,
    program_id: pitchedData?.pitched_program_id,
    amount: pitchedData?.pitched_program_qtd,
    program_mrp: pitchedData?.pitched_program_mrp,
    mentor_comment: pitchedData?.pitched_mentor_note,
    lead_status: data?.source_and_status_details?.lead_status,
    motivation:
      typeof suggestedData?.suggested_motivation_level === "string"
        ? capitalizeFirstLetter(suggestedData?.suggested_motivation_level)
        : suggestedData?.suggested_motivation_level === 0
        ? "Low"
        : suggestedData?.suggested_motivation_level === 1
        ? "Medium"
        : "High",
    payment_link: "No",
    payment_mode: "",
    payment_mode_id: "",
    date: "",
    next_fu_time: "",
    follow_up_using: "",
    payment_expiry: "",
  };

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    // formState: { errors },
  } = useForm({
    defaultValues: suggestedData ? defaultValue : pitchedValue,
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
  const [updateSuggestProgram, { isLoading: loadingSuggest }] =
    useUpdateSuggestProgramMutation();

  const [sessions, setSessions] = useState<any[]>([]);

  const watchProgram = watch("program_id");
  const watchSession = watch("session_id");
  const watchPaymentLink = watch("payment_link");
  const watchPaymentMode = watch("payment_mode");

  useEffect(() => {
    if (allProgramSessions?.[0]?.data) {
      const filteredSessions = allProgramSessions[0].data.filter(
        (item: any) => item.meta_data.program_id === watchProgram
      );
      setSessions(filteredSessions);
    }
  }, [watchProgram, isLoading, allProgramSessions]);

  useEffect(() => {
    if (sessions && watchSession) {
      const foundSession = sessions.find(
        (item) => item.program_session_id === watchSession
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
    fieldName: "date" | "payment_expiry"
  ) => {
    if (date) {
      const selectedDate = format(date, "yyyy-MM-dd");
      setValue(fieldName, selectedDate);
      if (fieldName === "date") {
        await getAvailableSlots({ id: mentorId, date: selectedDate });
      }
    }
  };

  const handleProgramChange = (value: string) => {
    setValue("program_id", value);
    setValue("session_id", null);
    setValue("program_mrp", 0);
  };

  const onSubmit = async (formData: any) => {
    const responseData = {
      program_session_id: Number(formData.session_id),
      suggested_amount: Number(formData.amount),
      mentor_note: formData.mentor_comment,
      program_id: formData.program_id,
      motivation_level:
        formData.motivation === "Low"
          ? "0"
          : formData.motivation === "Medium"
          ? "1"
          : formData.motivation === "High"
          ? "2"
          : null,
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
          : formData.follow_up_using === "App"
          ? "2"
          : null,
      slot_id: formData.next_fu_time,
      user_id:
        data?.lead_details?.lead_id ||
        data?.client_details?.client_id ||
        data?.user_details?.client_id ||
        data?.user_details?.user_id,
    };

    const result = await updateSuggestProgram({
      id: suggestedData?.suggested_id || pitchedData?.pitched_id,
      body: responseData,
    });
    if (result.data?.status === "success") {
      alert("Program Updated successfully!");
      modalControl();
    } else {
      alert("Failed to update program!");
    }
  };

  return (
    <div className="w-full max-h-[90vh] bg-background">
      <div className="p-4">
        <div className="flex items-center justify-center">
          <h2 className="text-lg font-semibold">Update Suggested Program</h2>
          {/* <Button
            variant="ghost"
            size="icon"
            onClick={modalControl}
            className="hover:text-red-400"
          >
            <X className="h-5 w-5" />
          </Button> */}
        </div>
        {/* <hr className="mt-2" /> */}
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-h-[calc(90vh-80px)] space-y-4 overflow-y-auto p-4"
      >
        {!data.payment_link && (
          <>
            <div className="space-y-2">
              <Label>Select Status</Label>
              <Controller
                name="lead_status"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
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
            </div>

            {suggestedData && (
              <div className="space-y-2">
                <Label>Motivation Level</Label>
                <Controller
                  name="motivation"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex items-center space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Low" id="low" />
                        <Label htmlFor="low">Low</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Medium" id="medium" />
                        <Label htmlFor="medium">Medium</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="High" id="high" />
                        <Label htmlFor="high">High</Label>
                      </div>
                    </RadioGroup>
                  )}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label>Suggested Program</Label>
              <Controller
                name="program_id"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={handleProgramChange}
                    value={field.value?.toString()}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Suggested Program" />
                    </SelectTrigger>
                    <SelectContent>
                      {allPrograms?.[0]?.data?.map((program: any) => (
                        <SelectItem
                          key={program.program_id}
                          value={program.program_id.toString()}
                        >
                          {program.program_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="space-y-2">
              <Label>Suggested Session Day</Label>
              <Controller
                name="session_id"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value?.toString()}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Suggested Session Day" />
                    </SelectTrigger>
                    <SelectContent>
                      {sessions.map((session) => (
                        <SelectItem
                          key={session.program_session_id}
                          value={session.program_session_id.toString()}
                        >
                          {session.program_duration}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="space-y-2">
              <Label>Program MRP</Label>
              <Controller
                name="program_mrp"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    disabled
                    placeholder="Program MRP"
                  />
                )}
              />
            </div>

            <div className="space-y-2">
              <Label>Suggested Amount</Label>
              <Controller
                name="amount"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    placeholder="Suggested Amount"
                  />
                )}
              />
            </div>

            <div className="space-y-2">
              <Label>Mentor Comment</Label>
              <Controller
                name="mentor_comment"
                control={control}
                render={({ field }) => (
                  <Textarea {...field} placeholder="Mentor Comment" />
                )}
              />
            </div>

            <div className="space-y-2">
              <Label>Next FU Date</Label>
              <Controller
                name="date"
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
                        {field.value ? (
                          format(new Date(field.value), "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(date) => handleDateChange(date, "date")}
                        disabled={(date) =>
                          date < new Date() ||
                          date > new Date(Date.now() + 9 * 24 * 60 * 60 * 1000)
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
            </div>

            <div className="space-y-2">
              <Label>Select Next FU Time</Label>
              <Controller
                name="next_fu_time"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Next FU Time" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableSlots?.[0]?.data?.map((slot: any) => (
                        <SelectItem key={slot.id} value={slot.id.toString()}>
                          {slot.appointment_slots}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="space-y-2">
              <Label>Follow Up Using</Label>
              <Controller
                name="follow_up_using"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex items-center space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Whatsapp" id="whatsapp" />
                      <Label htmlFor="whatsapp">Whatsapp</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Call" id="call" />
                      <Label htmlFor="call">Call</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="App" id="app" />
                      <Label htmlFor="app">App</Label>
                    </div>
                  </RadioGroup>
                )}
              />
            </div>
          </>
        )}

        <div className="space-y-2">
          <Label>Share Payment Details</Label>
          <Controller
            name="payment_link"
            control={control}
            render={({ field }) => (
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="flex items-center space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Yes" id="yes" />
                  <Label htmlFor="yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="No" id="no" />
                  <Label htmlFor="no">No</Label>
                </div>
              </RadioGroup>
            )}
          />
        </div>

        {watchPaymentLink === "Yes" && (
          <div className="space-y-2">
            <Label>Select Payment Mode</Label>
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
                  <SelectTrigger className="w-full">
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

        {watchPaymentMode === "Bank Details" && watchPaymentLink === "Yes" && (
          <>
            <div className="space-y-2">
              <Label>Select Bank</Label>
              <Controller
                name="payment_mode_id"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Bank" />
                    </SelectTrigger>
                    <SelectContent>
                      {paymentMode?.[0]?.data?.map((mode: any) => (
                        <SelectItem
                          key={mode.payment_mode_id}
                          value={mode.payment_mode_id.toString()}
                        >
                          {mode.payment_mode_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </>
        )}

        {watchPaymentMode === "UPI" && watchPaymentLink === "Yes" && (
          <>
            <div className="space-y-2">
              <Label>Select UPI Type</Label>
              <Controller
                name="payment_mode_id"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select UPI Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {paymentMode?.[0]?.data?.map((mode: any) => (
                        <SelectItem
                          key={mode.payment_mode_id}
                          value={mode.payment_mode_id.toString()}
                        >
                          {mode.payment_mode_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </>
        )}

        {watchPaymentLink === "Yes" && (
          <div className="space-y-2">
            <Label>
              {watchPaymentMode === "Payment Link"
                ? "Set Payment Link Expiry Date"
                : watchPaymentMode === "Bank Details"
                ? "Set Bank Transfer Due Date"
                : watchPaymentMode === "UPI"
                ? "Set UPI Payment Due Date"
                : "Set Cash Collection Date"}
            </Label>
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
                      {field.value ? (
                        format(new Date(field.value), "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) =>
                        handleDateChange(date, "payment_expiry")
                      }
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              )}
            />
          </div>
        )}

        <div className="flex justify-center pt-4">
          <Button type="submit" disabled={loadingSuggest}>
            {loadingSuggest
              ? "Updating..."
              : data.payment_link
              ? "Create Payment Link"
              : "Update Suggest Program"}
          </Button>
        </div>
      </form>
    </div>
  );
}
