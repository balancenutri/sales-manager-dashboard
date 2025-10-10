import { Button } from "@/components/ui/button"

type UserDetails = {
  user_id: number
  user_name: string
  email_id: string
  phone_number: string
  user_current_source: string
  wallet: number
  sub_sales_status: string
  status: string
  user_created_at: string
  app_updated: string
}

type UserDetailsCellProps = {
  value: UserDetails
  rowData: any
  hideData?: string[]
}

// Format date helper
function formatDate(dateString: string) {
  const date = new Date(dateString)
  const day = date.getDate()
  const month = date.toLocaleString("en-US", { month: "short" })
  const year = date.getFullYear()
  return `${day} ${month} ${year}`
}

// Calculate days ago
function getDaysAgo(dateString: string) {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return `(${diffDays} days ago)`
}

export default function UserDetailsCell({ value, rowData, hideData = [] }: UserDetailsCellProps) {
  if (!value) return null

  return (
    <div className="space-y-1 py-2 min-w-[200px]">
      <div className="text-sm font-medium text-blue-600 hover:underline cursor-pointer">{value.user_name}</div>
      <div className="text-xs text-muted-foreground">{value.email_id}</div>
      <div className="text-xs text-blue-600 hover:underline cursor-pointer">{value.phone_number}</div>
      <div className="text-xs">Source: {value.user_current_source}</div>
      <div className="text-xs">Wallet: {value.wallet}</div>
      <div className="inline-block px-2 py-0.5 text-xs font-medium bg-orange-100 text-orange-800 rounded">
        {value.sub_sales_status}
      </div>
      <div className="text-xs text-muted-foreground">
        {formatDate(value.user_created_at)} {getDaysAgo(value.user_created_at)}
      </div>
      {value.app_updated && <div className="text-xs text-muted-foreground">{value.app_updated}</div>}
      <Button size="sm" className="mt-2 h-7 text-xs bg-blue-500 hover:bg-blue-600">
        Add For App Update
      </Button>
    </div>
  )
}
