type FollowUpDetails = {
  prev_follow_up_id: number | null;
  prev_follow_up_date: string | null;
  prev_follow_up_type: string | null;
  prev_appointment_slots: string | null;
  prev_follow_up_note: string | null;
  next_follow_up_id: number;
  next_follow_up_date: string;
  next_follow_up_type: string;
  next_appointment_slots: string;
  next_follow_up_note: string;
  key_insights: any;
  follow_up_id: number;
};

type FollowUpCellProps = {
  value: FollowUpDetails;
  rowData: any;
};

// Check if date is today
function isToday(dateString: string) {
  const date = new Date(dateString);
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

// Format date
function formatDate(dateString: string) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

export default function FollowUpCell({ value, rowData }: FollowUpCellProps) {
  if (!value && !rowData) return null;

  const followUpType = value.next_follow_up_type === "1" ? "Whatsapp" : "Call";

  return (
    <div className="space-y-1 py-2 min-w-[200px]">
      <div className="text-xs font-semibold">Previous Follow Up</div>
      {value.prev_follow_up_date ? (
        <div className="text-xs">{formatDate(value.prev_follow_up_date)}</div>
      ) : (
        <div className="text-xs text-muted-foreground">
          No Previous Follow Up
        </div>
      )}

      <div className="text-xs font-semibold mt-2">Next Follow Up</div>
      <div className="text-xs font-semibold">
        {isToday(value.next_follow_up_date)
          ? "Today"
          : formatDate(value.next_follow_up_date)}
      </div>
      <div className="text-xs">Slot: {value.next_appointment_slots}</div>
      <div className="text-xs">Type: {followUpType}</div>

      {/* <div className="flex gap-2 mt-2">
        <Button size="sm" className="h-7 text-xs bg-blue-500 hover:bg-blue-600">
          Set Next FU
        </Button>
        <Button size="sm" className="h-7 text-xs bg-blue-500 hover:bg-blue-600">
          Key Insights
        </Button>
      </div> */}
    </div>
  );
}
