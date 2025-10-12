import dayjs from "dayjs"

interface GenericObjectCellProps {
  value: any
  hideData?: string[]
}

const isHideKey = (key: string) => {
  // Add common keys to hide
  const hideKeys = ["id", "_id", "created_at", "updated_at"]
  return hideKeys.includes(key)
}

const isDateKey = (key: string) => {
  const dateKeys = ["date", "time", "timestamp"]
  return dateKeys.includes(key.toLowerCase())
}

const CommonCell = ({ value, hideData = [] }: GenericObjectCellProps) => {
  if (!value || typeof value !== "object") {
    return <div className="text-xs">{String(value)}</div>
  }

  return (
    <div className="min-w-[200px] space-y-1 text-xs">
      {Object.entries(value).map(([key, item]) => {
        if (hideData.includes(key) || isHideKey(key)) return null

        return (
          <div key={key} className="flex gap-1">
            <span className="font-medium text-muted-foreground">
              {key
                .split("_")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
              :
            </span>
            <span className="font-normal">{typeof item === "object" ? JSON.stringify(item) : isDateKey(key) ? dayjs(item).format("DD MMM YYYY") : String(item)}</span>
          </div>
        )
      })}
    </div>
  )
}

export default CommonCell
