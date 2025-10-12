import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useState } from "react"

interface ProgramCellProps {
  value: any
  rowData: any
  hideData?: string[]
}

const isHideKey = (key: string) => {
  const hideKeys = [
    "current_program_duration",
    "current_program_amount_paid",
    "current_program_validity_used",
    "current_program_expiry_date",
    "program_duration",
    "program_amount_paid",
  ]
  return hideKeys.includes(key)
}

const INR = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
})

const ProgramDetailsCell = ({ value, rowData, hideData = [] }: ProgramCellProps) => {
  const [openModal, setOpenModal] = useState(false)

  if (!value) {
    return <p className="text-center text-xs">No Program Details</p>
  }

  const data = value?.current_program_session || value?.program_sessions
  let result = 0
  if (data) {
    const [a, b] = data.replace(/[()]/g, "").split("/").map(Number)
    result = b - a || 0
  }

  return (
    <div className="min-w-[300px] space-y-1 text-xs">
      {Object.entries(value).map(([key, item]) => (
        <div key={key} className="flex justify-center items-center">
          {key === "program_name" ? (
            <div>
              <span className="font-normal">{`${String(item).toUpperCase()} ${value?.program_duration || ""}`}</span>
            </div>
          ) : key === "current_program_mrp" ? (
            <div className="mb-0.5">
              {value.current_program_mrp && (
                <span className="font-normal">
                  <span className="font-medium">MRP: </span>
                  {INR.format(value.current_program_mrp)}
                </span>
              )}
              {value.current_program_mrp && (
                <span className="font-normal ml-2">
                  <span className="font-medium">&emsp;Paid: </span>
                  {value.current_program_amount_paid ? INR.format(value.current_program_amount_paid) : INR.format(0)}
                </span>
              )}
            </div>
          ) : key === "program_mrp" ? (
            <div className="mb-0.5">
              {value.program_mrp && (
                <span className="font-normal">
                  <span className="font-medium">MRP: </span>
                  {INR.format(value.program_mrp)}
                </span>
              )}
              {value.program_mrp && (
                <span className="font-normal ml-2">
                  <span className="font-medium">&emsp;Paid: </span>
                  {value.program_amount_paid ? INR.format(value.program_amount_paid) : INR.format(0)}
                </span>
              )}
            </div>
          ) : key === "current_program_name" ? (
            item ? (
              <div>
                <span className="font-normal">
                  <span className="font-medium">{String(item)}</span>{" "}
                  {String(value?.current_program_duration)?.toLowerCase()}
                </span>
              </div>
            ) : (
              <p className="text-center">No Program Details</p>
            )
          ) : key === "current_program_session" && value?.current_program_name ? (
            <div>
              <span className="font-normal">
                <span className="font-medium">Ssn. {String(item)}</span>
              </span>
            </div>
          ) : (key === "current_program_session" && value?.current_program_name) ||
            (key === "program_sessions" && value?.program_name) ? (
            <div>
              <span className="font-normal">
                <span className="font-medium">Ssn. {String(item)}</span>
              </span>
            </div>
          ) : key === "current_program_validity" && value?.current_program_name ? (
            <div>
              {!["Completed", "Dropout", "Fs", "Maintenance"].includes(rowData?.user_details?.status) && (
                <>
                  <p className="font-normal pb-1.5">
                    Validity: <span className="font-medium">{String(item)} Days</span> / Used:{" "}
                    <span className="font-medium">{value.current_program_validity_used} Days</span>
                  </p>
                  <p className="font-normal">{`${
                    Number(value.current_program_validity) - Number(value.current_program_validity_used)
                  } days left to complete ${result} sessions`}</p>
                </>
              )}
            </div>
          ) : key === "advance_program_count" ? (
            value?.current_program_name && (
              <div>
                {item == 0 ? (
                  <span className="text-red-500">No Adv. Purchase</span>
                ) : (
                  <span className="text-green-500">With {String(item)} Adv. Purchase</span>
                )}
              </div>
            )
          ) : key === "current_program_sale_by" || key === "program_sale_by" ? (
            (value?.current_program_sale_by || value?.program_sale_by) && (
              <div className="font-medium">
                Sale By: <span className="font-normal"> {String(item)}</span>
              </div>
            )
          ) : key === "program_mentor_assigned" ? (
            value?.program_mentor_assigned && (
              <div className="font-medium">
                Mentor: <span className="font-normal">{String(item)}</span>
              </div>
            )
          ) : key === "current_program_payment_mode" ? (
            value?.current_program_payment_mode && <div>Payment Mode: {String(item)}</div>
          ) : hideData?.includes(key) || isHideKey(key) ? null : (
            <span>{String(item)}</span>
          )}
        </div>
      ))}

      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              Order History for{" "}
              <a
                href={`/profile/${rowData?.user_details?.user_id || rowData?.client_details?.client_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {rowData?.user_details?.user_name || rowData?.client_details?.client_name}
              </a>
            </DialogTitle>
          </DialogHeader>
          <div className="p-4">
            <p className="text-sm text-muted-foreground">Order history content goes here</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ProgramDetailsCell
