import dayjs from "dayjs";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface DatePickerProps {
  label: string;
  value: string; // Expected format: yyyy-MM-dd
  onChange: (value: string) => void;
  errorMessage?: string;
  placeholder?: string;
  disabled?: (date: Date) => boolean;
}

export function DatePicker({
  label,
  value,
  onChange,
  errorMessage,
  placeholder = "Pick a date",
  disabled,
}: DatePickerProps) {
  const [open, setOpen] = useState<boolean>(false);
  // Convert string value to Date object for the Calendar component
  const selectedDate = value ? dayjs(value, "YYYY-MM-DD").toDate() : undefined;

  return (
    <div className="space-y-2">
      <Label className="mb-1">{label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !value && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? (
              dayjs(value).format("MMM D, YYYY")
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          {/* <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start"> */}
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => {
              if (date) {
                onChange(dayjs(date).format("YYYY-MM-DD"));
                setOpen(false); // ✅ Close the popover after selecting
              }
            }}
            
            // onSelect={(date) => {
            //     onChange(date ? dayjs(date).format("YYYY-MM-DD") : "")
            // }}
            disabled={disabled}
            captionLayout="dropdown"
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {errorMessage && (
        <p className="mt-1 text-xs text-red-600">{errorMessage}</p>
      )}
    </div>
  );
}
