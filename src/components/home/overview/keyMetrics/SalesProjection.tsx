import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import PitchedHistory from "./PitchedDetails";
import { useGetSalesProjectionQuery } from "@/service/dashboard/api";
import PageVisitModal from "./PageVisitModal";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import dayjs from "dayjs";
import quarterOfYear from "dayjs/plugin/quarterOfYear";
import { keyString } from "@/lib/utils";
dayjs.extend(quarterOfYear);

export default function SalesProjection({ prev }: { prev: boolean }) {
  const [openDialog, setOpenDialog] = useState<
    "rate_shared" | "link_shared" | "to_pay" | "pay_later" | null
  >(null);
  const [openModal, setOpenModal] = useState<null | number>(null);
  const [selected, setSelected] = useState<"" | "prev" | "quarter">("prev");

  const { data } = useGetSalesProjectionQuery(
    prev
      ? selected === "prev"
        ? {
            start_date: dayjs()
              .subtract(1, "month")
              .startOf("month")
              .format("YYYY-MM-DD"),
            end_date: dayjs()
              .subtract(1, "month")
              .endOf("month")
              .format("YYYY-MM-DD"),
          }
        : selected === "quarter"
        ? {
            start_date: dayjs().startOf("quarter").format("YYYY-MM-DD"),
            end_date: dayjs().format("YYYY-MM-DD"),
          }
        : {}
      : {
          start_date: dayjs().startOf("month").format("YYYY-MM-DD"),
          end_date: dayjs().format("YYYY-MM-DD"),
        }
  );

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">
          {prev ? `Sales Possibilty (All)` : "Sales Possibility (MTD)"}
        </h2>
        {prev && (
          <Tabs defaultValue={selected} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger
                className="cursor-pointer"
                value=""
                onClick={() => setSelected("")}
              >
                All
              </TabsTrigger>
              <TabsTrigger
                className="cursor-pointer"
                value={"prev"}
                onClick={() => setSelected("prev")}
              >
                Prev. Month
              </TabsTrigger>
              <TabsTrigger
                className="cursor-pointer"
                value="quarter"
                onClick={() => setSelected("quarter")}
              >
                This Quater
              </TabsTrigger>
            </TabsList>
          </Tabs>
        )}
      </div>
      <Card className="w-full">
        <CardContent className="px-6">
          <div className="grid grid-cols-6 gap-6">
            {/* Total Pitched */}
            <div onClick={() => setOpenDialog("rate_shared")}>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200 hover:shadow-md transition-all cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        Rate Shared
                      </h4>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-600">
                      {data?.data.rate_shared.units}
                    </div>
                    <div className="text-sm text-black font-semibold">
                      ₹{data?.data.rate_shared.amount.toLocaleString("en-IN")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div onClick={() => setOpenDialog("link_shared")}>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200 hover:shadow-md transition-all cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        Link Shared
                      </h4>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-600">
                      {data?.data.link_shared.units}
                    </div>
                    <div className="text-sm text-green-600 font-semibold">
                      ₹{data?.data.link_shared.amount.toLocaleString("en-IN")}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* To Pay */}
            <div onClick={() => setOpenDialog("to_pay")}>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200 hover:shadow-md transition-all cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div>
                      <h4 className="font-semibold text-gray-800">To Pay</h4>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-blue-600">
                      {data?.data.total_to_pay.units}
                    </div>
                    <div className="text-sm text-black font-semibold">
                      ₹{data?.data.total_to_pay.amount.toLocaleString("en-IN")}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div onClick={() => setOpenDialog("pay_later")}>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200 hover:shadow-md transition-all cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div>
                      <h4 className="font-semibold text-gray-800">Pay Later</h4>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-blue-600">
                      {data?.data.pay_later.units}
                    </div>
                    <div className="text-sm text-black font-semibold">
                      ₹{data?.data.pay_later.amount.toLocaleString("en-IN")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Pay Later */}
            <div onClick={() => setOpenModal(1)}>
              <div className="bg-gradient-to-r flex items-center h-full from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200 hover:shadow-md transition-all cursor-pointer">
                <div className="flex items-center w-full justify-between">
                  <div className="flex items-center space-x-3">
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        Page Visit
                      </h4>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-blue-600">
                      {data?.data.page_visits.total_page_visits}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div onClick={() => setOpenModal(2)}>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200 hover:shadow-md transition-all cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        Checkout Vist
                      </h4>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-blue-600">
                      {data?.data.page_visits.total_checkout_visits}
                    </div>
                    <div className="text-sm text-black font-semibold">
                      ₹
                      {data?.data.page_visits.total_checkout_amount.toLocaleString(
                        "en-IN"
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>

        <Dialog open={!!openDialog} onOpenChange={() => setOpenDialog(null)}>
          <DialogContent
            onInteractOutside={(e: React.MouseEvent | Event) =>
              e.preventDefault()
            }
            className="min-w-[80vw]"
          >
            <DialogHeader>
              <DialogTitle>{keyString(openDialog || "")}</DialogTitle>
            </DialogHeader>
            {openDialog && (
              <PitchedHistory
                filter={openDialog}
                type={prev ? selected : "mtd"}
              />
            )}
          </DialogContent>
        </Dialog>
        <Dialog open={!!openModal} onOpenChange={() => setOpenModal(null)}>
          <DialogContent
            onInteractOutside={(e: React.MouseEvent | Event) =>
              e.preventDefault()
            }
            className="min-w-[80vw]"
          >
            <DialogHeader>
              <DialogTitle>
                {openModal == 1 ? "Page Visits" : "Checkout Visit"}
              </DialogTitle>
            </DialogHeader>
            {openModal && (
              <PageVisitModal id={openModal} type={prev ? selected : "mtd"} />
            )}
          </DialogContent>
        </Dialog>
      </Card>
    </>
  );
}
