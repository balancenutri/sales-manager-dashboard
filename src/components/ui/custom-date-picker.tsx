// // components/ui/CustomDatePicker.tsx

// import { forwardRef } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { CalendarIcon } from "lucide-react";

// interface CustomDatePickerProps {
//   selected: Date | null;
//   onChange: (date: Date | null) => void;
//   placeholder?: string;
//   showMonthYearPicker?: boolean;
//   dateFormat?: string;
//   className?: string;
// }

// const CustomInput = forwardRef<HTMLButtonElement, any>(
//   ({ value, onClick, placeholder }, ref) => (
//     <button
//       onClick={onClick}
//       ref={ref}
//       type="button"
//       className="flex items-center justify-between gap-2 border border-gray-300 rounded-md px-4 py-2 text-sm bg-white shadow-sm hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
//     >
//       <span className={value ? "text-gray-900" : "text-gray-400"}>
//         {value || placeholder}
//       </span>
//       <CalendarIcon className="w-4 h-4 text-gray-500" />
//     </button>
//   )
// );

// CustomInput.displayName = "CustomInput";

// export default function CustomDatePicker({
//   selected,
//   onChange,
//   placeholder = "Select Date",
//   showMonthYearPicker = false,
//   dateFormat = "dd/MM/yyyy",
//   className = "",
// }: CustomDatePickerProps) {
//   return (
//     <DatePicker
//       selected={selected}
//       onChange={onChange}
//       dateFormat={dateFormat}
//       showMonthYearPicker={showMonthYearPicker}
//       placeholderText={placeholder}
//       customInput={<CustomInput placeholder={placeholder} />}
//       className={className}
//     />
//   );
// }

"use client";

import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

interface CustomDatePickerProps {
  selected: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  showMonthYearPicker?: boolean;
  dateFormat?: string;
  className?: string;
  maxDate?: any;
}

export default function CustomDatePicker({
  selected,
  onChange,
  placeholder = "Select Date",
  showMonthYearPicker = false,
  dateFormat = "dd/MM/yyyy",
  className = "",
  maxDate = undefined,
}: CustomDatePickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex items-center justify-between gap-2 border border-gray-300 rounded-md px-4 py-2 text-sm bg-white shadow-sm hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500",
            className
          )}
        >
          <span className={selected ? "text-gray-900" : "text-gray-400"}>
            {selected ? format(selected, dateFormat) : placeholder}
          </span>
          <CalendarIcon className="w-4 h-4 text-gray-500" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="p-0 border-none shadow-lg rounded-md w-auto bg-transparent"
        align="center"
      >
        <div className="bg-white rounded-md p-2">
          <DatePicker
            inline
            selected={selected}
            onChange={(date) => {
              onChange(date);
              setOpen(false); // close popover on date select
            }}
            showMonthYearPicker={showMonthYearPicker}
            maxDate={maxDate}
            isClearable={true}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
