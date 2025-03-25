// src/components/ui/date-picker.tsx
import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  date?: Date;
  onDateChange?: (date: Date | undefined) => void;
  className?: string;
  disabled?: boolean;
}

export const DatePicker = ({
  date,
  onDateChange,
  className,
  disabled = false,
}: DatePickerProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
            "bg-[#2F2F2F] border-[#2F2F2F] hover:bg-[#3F3F3F] hover:border-[#3F3F3F] text-white",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 text-[#ABABAB]" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-[#252525] border-[#2F2F2F]">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(selectedDate) => {
            onDateChange?.(selectedDate);
            setIsOpen(false);
          }}
          initialFocus
          className="text-white"
          classNames={{
            day_selected: "bg-[#B967FF] hover:bg-[#B967FF] text-white",
            day_today: "border border-[#B967FF]",
            day_outside: "text-[#ABABAB] opacity-50",
            day_disabled: "text-[#ABABAB] opacity-50",
            day_range_middle: "bg-[#3F3F3F]",
            day_hidden: "invisible",
            head_cell: "text-[#ABABAB]",
            caption: "text-white",
            nav_button: "text-[#ABABAB] hover:text-white",
            cell: "hover:bg-[#3F3F3F]",
            button: "hover:bg-[#3F3F3F]",
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker