import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CustomDatePicker from "@/components/ui/custom-date-picker";
import { keyString } from "@/lib/utils";
import dayjs from "dayjs";
import { useState } from "react";

export default function KeySourceConversion() {
  const data = {
    social_media: {
      leads: 45,
      converted: 55,
      revenue: "₹ 53563",
      conversion: "45%",
    },
    direct: {
      leads: 45,
      converted: 55,
      revenue: "₹ 53563",
      conversion: "45%",
    },
    IWD: {
      leads: 45,
      converted: 55,
      revenue: "₹ 53563",
      conversion: "45%",
    },
    referral: {
      leads: 45,
      converted: 55,
      revenue: "₹ 53563",
      conversion: "45%",
    },
  };
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">Key Source Conversion</h2>
        <div className="flex gap-4">
          <Button>All Time</Button>
          <CustomDatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            showMonthYearPicker={true}
            dateFormat="MM/yyyy"
            maxDate={dayjs()}
          />
        </div>
      </div>

      <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
        {Object.entries(data).map(([key, value], idx) => (
          <Card key={idx}>
            <CardHeader>
              <CardTitle>{keyString(key)}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {Object.entries(value).map(([key, item], index) => {
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between border-b last:border-none pb-2 last:pb-0"
                  >
                    <div className="flex items-center space-x-2">
                      {/* <item.icon className={`h-4 w-4 ${item.color}`} /> */}
                      <span className="font-medium">{keyString(key)}</span>
                    </div>
                    <span className="font-medium">{item}</span>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
