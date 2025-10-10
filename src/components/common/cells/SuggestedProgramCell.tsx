import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useState } from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import SuggestProgramForm from "@/components/forms/SuggestedProgramForm"
import EditSuggestProgramForm from "@/components/forms/UpdateSuggestedProgramForm"

// Currency formatter
const INR = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
})

// Simple date utilities (replacing dayjs)
function addDays(date: Date, days: number): Date {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

function isSameOrBefore(date1: Date, date2: Date): boolean {
  return date1 <= date2
}

function diffInDays(date1: Date, date2: Date): number {
  const diffTime = date1.getTime() - date2.getTime()
  return Math.floor(diffTime / (1000 * 60 * 60 * 24))
}

function diffInHours(date1: Date, date2: Date): number {
  const diffTime = date1.getTime() - date2.getTime()
  return Math.floor(diffTime / (1000 * 60 * 60))
}

export default function SuggestProgramCell({ value, rowData }: any) {
  const [openModal, setOpenModal] = useState(false)
  const [trigger, setTrigger] = useState("")
  const [allData, setAllData] = useState<any>()
  const [oldPitched, setOldPitched] = useState(false)
  const [expiryDate, setExpiryDate] = useState<Date>()
  const [showDatePicker, setShowDatePicker] = useState(false)

  const handleSuggestProgram = () => {
    setTrigger("updateSuggestProgram")
    setAllData(rowData)
    setOpenModal(true)
  }

  const handleSuggest = () => {
    setTrigger("suggestprogram")
    setAllData(rowData)
    setOpenModal(true)
  }

  const handlePaymentDetails = () => {
    setAllData({
      payment: value?.message,
      phone:
        rowData?.user_details?.phone_number ||
        rowData?.user_details?.user_phone ||
        rowData?.client_details?.phone_number ||
        rowData?.client_details?.client_phone,
      user_id: rowData?.user_details?.user_id || rowData?.client_details?.client_id,
      copy: true,
    })
    setTrigger("sharedetails")
    setOpenModal(true)
  }

  const today = new Date()
  const tomorrow = addDays(today, 1)
  const yesterday = addDays(today, -1)

  const handleExpiryDateNow = () => {
    if (!expiryDate) {
      alert("Please fill the expiry date")
      return
    }
    // API call would go here
    console.log("[v0] Extending payment expiry to:", expiryDate)
    setExpiryDate(undefined)
    setShowDatePicker(false)
  }

  // Calculate expiry message
  let result = ""
  let isExpiringSoon = false
  let isExpired = false

  if (value?.suggested_payment_link_expiry) {
    const expiryDateObj = new Date(value.suggested_payment_link_expiry)
    const daysDiff = diffInDays(today, expiryDateObj)
    const hoursDiff = diffInHours(today, expiryDateObj) % 24
    const isInTheFuture = expiryDateObj > today

    result = isInTheFuture
      ? `Expires in${daysDiff > 0 ? ` ${Math.abs(daysDiff)} days` : ""} ${Math.abs(hoursDiff)} hours`
      : `Expired${daysDiff > 0 ? ` ${Math.abs(daysDiff)} days` : ""} ${Math.abs(hoursDiff)} hours ago`

    isExpired = isSameOrBefore(expiryDateObj, today)
    isExpiringSoon = format(expiryDateObj, "yyyy-MM-dd") === format(tomorrow, "yyyy-MM-dd")
  }

  return (
    <div className="min-w-[300px]">
      <div className="flex flex-col items-center text-center">
        {/* Program Name */}
        {value?.suggested_program_name && (
          <div className="mb-1.5 font-medium">
            {`${value.suggested_program_name.toUpperCase()} ${value?.suggested_program_duration || ""}`}
          </div>
        )}

        {/* MRP and Suggested Amount */}
        {value?.suggested_program_mrp && (
          <div className="mb-1.5">
            <span className="font-medium">MRP: </span>
            {INR.format(value.suggested_program_mrp)}
            <span className="ml-2 font-medium">Sugg. Amt.: </span>
            {INR.format(value?.suggested_program_qtd || 0)}
          </div>
        )}

        {/* Payment Mode */}
        {value?.suggested_payment_mode && (
          <div className="mb-1.5">
            <span className="font-medium">Mode: </span>
            {value.suggested_payment_mode}
          </div>
        )}

        {/* Suggested Date */}
        {value?.suggested_date && (
          <div className="mb-1.5 font-normal">
            Sugg. Date: {`${value.suggested_date} ${value?.suggested_days_ago || ""}`}
          </div>
        )}

        {/* Payment Link Expiry Warning */}
        {value?.suggested_payment_link_expiry && isExpired && (
          <div className="mb-2 space-y-3">
            <span className="font-medium text-red-500 mr-3">Payment Link {result}</span>
            <br />
            <Button size="sm" onClick={handleSuggest}>
              Suggest New
            </Button>
          </div>
        )}

        {/* Extend Payment Date */}
        {value?.suggested_payment_link_expiry && isExpiringSoon && (
          <div className="flex flex-wrap justify-center items-center gap-2 my-2">
            <p className="text-sm text-red-500 mb-1 w-full">Payment Link Expiring Tomorrow</p>
            <span className="font-normal">Extend Date:</span>
            <Popover open={showDatePicker} onOpenChange={setShowDatePicker}>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className={cn("w-36 justify-start text-left font-normal")}>
                  {expiryDate ? format(expiryDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={expiryDate}
                  onSelect={(date) => {
                    setExpiryDate(date)
                    setShowDatePicker(false)
                  }}
                  disabled={(date) => date < today}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Button size="sm" variant="default" onClick={handleExpiryDateNow}>
              Extend Now
            </Button>
          </div>
        )}

        {/* Old Pitched Details */}
        {oldPitched && rowData?.suggested_program_details?.old_pitched_details && (
          <div className="flex justify-center items-center gap-2 my-2">
            <div>
              <p className="mt-2 -mb-2 font-medium">Old Pitched Details:</p>
              <p
                className="font-normal"
                dangerouslySetInnerHTML={{
                  __html: rowData.suggested_program_details.old_pitched_details,
                }}
              />
            </div>
            <X size={16} className="cursor-pointer" onClick={() => setOldPitched(false)} />
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-4 flex flex-wrap justify-center items-center gap-2">
          {value?.suggested_program_name == null ? (
            <>
              <Button size="sm" onClick={handleSuggest}>
                Suggest Now
              </Button>
              {rowData?.suggested_program_details?.old_pitched_details && !oldPitched && (
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-yellow-300 text-white"
                  onClick={() => setOldPitched(true)}
                >
                  View Old Pitched
                </Button>
              )}
            </>
          ) : value?.suggested_program_qtd < 0 ? (
            <Button size="sm" variant="outline" onClick={handleSuggestProgram}>
              Add Rated Quoted
            </Button>
          ) : value?.suggested_program_qtd > 0 && !value?.suggested_payment_mode ? (
            <>
              <Button size="sm" onClick={handleSuggestProgram}>
                Create Payment Link
              </Button>
              <Button size="sm" variant="destructive" onClick={handleSuggestProgram}>
                Edit Suggest Details
              </Button>
              {rowData?.suggested_program_details?.old_pitched_details && !oldPitched && (
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-yellow-300 text-white"
                  onClick={() => setOldPitched(true)}
                >
                  View Old Pitched
                </Button>
              )}
            </>
          ) : value?.suggested_payment_mode === "UPI Details (G-Pay)" ? (
            <>
              <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white" onClick={handlePaymentDetails}>
                Share UPI Details
              </Button>
              <Button size="sm" variant="destructive" onClick={handleSuggestProgram}>
                Edit Suggest Details
              </Button>
              {rowData?.suggested_program_details?.old_pitched_details && !oldPitched && (
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-yellow-300 text-white"
                  onClick={() => setOldPitched(true)}
                >
                  View Old Pitched
                </Button>
              )}
            </>
          ) : value?.suggested_payment_mode === "Payment Link (Razor Pay)" &&
            !isSameOrBefore(new Date(value.suggested_payment_link_expiry), yesterday) ? (
            <>
              <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white" onClick={handlePaymentDetails}>
                Share Payment Link
              </Button>
              <Button size="sm" variant="destructive" onClick={handleSuggestProgram}>
                Edit Suggest Details
              </Button>
              {rowData?.suggested_program_details?.old_pitched_details && !oldPitched && (
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-yellow-300 text-white"
                  onClick={() => setOldPitched(true)}
                >
                  View Old Pitched
                </Button>
              )}
            </>
          ) : value?.suggested_payment_mode?.includes("Cash Collection") ? (
            <>
              <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white" onClick={handlePaymentDetails}>
                Share Cash Collection Again
              </Button>
              <Button size="sm" variant="destructive" onClick={handleSuggestProgram}>
                Edit Suggest Details
              </Button>
              {rowData?.suggested_program_details?.old_pitched_details && !oldPitched && (
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-yellow-300 text-white"
                  onClick={() => setOldPitched(true)}
                >
                  View Old Pitched
                </Button>
              )}
            </>
          ) : value?.suggested_payment_mode ? (
            <>
              <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white" onClick={handlePaymentDetails}>
                Share Bank Details
              </Button>
              <Button size="sm" variant="destructive" onClick={handleSuggestProgram}>
                Edit Suggest Details
              </Button>
              {rowData?.suggested_program_details?.old_pitched_details && !oldPitched && (
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-yellow-300 text-white"
                  onClick={() => setOldPitched(true)}
                >
                  View Old Pitched
                </Button>
              )}
            </>
          ) : null}
        </div>
      </div>

      {/* Modal Dialog */}
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="max-w-[550px] p-0">
          {trigger === "suggestprogram" && (
            <SuggestProgramForm modalControl={() => setOpenModal(false)} data={allData} />
          )}
          {trigger === "updateSuggestProgram" && (
            <EditSuggestProgramForm modalControl={() => setOpenModal(false)} data={allData} />
          )}
          {trigger === "sharedetails" && (
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Share Payment Details</h3>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium">Phone:</span> {allData?.phone}
                </p>
                <p className="text-sm">
                  <span className="font-medium">User ID:</span> {allData?.user_id}
                </p>
                <div className="mt-4 p-4 bg-muted rounded">
                  <p className="text-sm font-medium mb-2">Payment Details:</p>
                  <p className="text-sm whitespace-pre-wrap">{allData?.payment}</p>
                </div>
                <Button
                  className="w-full mt-4"
                  onClick={() => {
                    navigator.clipboard.writeText(allData?.payment || "")
                    alert("Payment details copied to clipboard!")
                  }}
                >
                  Copy Details
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
