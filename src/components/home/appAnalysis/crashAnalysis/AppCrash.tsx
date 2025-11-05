import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { keyString } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import AppCrashForm from "./AppCrashForm";

export default function AppCrash() {
  const data = {
    crash_free_users: "99.6%",
    crash_free_sessions: "99.6%",
    yesterday: 7,
    last_7_days: 13,
    mtd: 35,
  };

  const [openModal, setOpenModal] = useState<string | null>(null);

  const skeletonArray = Array(5).fill(null);

  return (
    <div>
      <div className="flex justify-between items-center space-y-6">
        <h2 className="text-xl font-bold my-4">App Crash Analytics</h2>
        <Button onClick={() => setOpenModal("true")} variant={"outline"}>
          Update
        </Button>
      </div>

      <Card className="">
        <div className="flex justify-between items-center px-4 -my-3">
          {!data
            ? skeletonArray.map((_, index: number) => (
                <div
                  className="flex items-center justify-between mt-1 gap-2"
                  key={index}
                >
                  <Skeleton className="h-4 w-26 rounded-md" />
                  <Skeleton className="h-4 w-10 rounded-md" />
                </div>
              ))
            : Object.entries(data).map(([period, value]) => {
                return (
                  <div className="text-sm flex items-center gap-0">
                    <span className="mr-2 font-semibold">
                      {keyString(period?.replace("_count", " Installs"))} :
                    </span>
                    <span
                      className="font-bold cursor-pointer"
                      onClick={() =>
                        setOpenModal(period?.replace("_hours_count", ""))
                      }
                    >
                      {value}
                    </span>
                  </div>
                );
              })}
        </div>
      </Card>
      <Dialog open={!!openModal} onOpenChange={() => setOpenModal(null)}>
        <DialogContent>
          <CardHeader>
            <CardTitle>{keyString("App Crash Form")}</CardTitle>
          </CardHeader>
          {openModal && <AppCrashForm closeModal={() => setOpenModal(null)} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}
