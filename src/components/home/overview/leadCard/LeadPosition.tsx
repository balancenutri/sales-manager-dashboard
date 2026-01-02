import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetLeadFunnelQuery } from "@/service/dashboard/api";
import dayjs from "dayjs";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Metric {
  req: number | undefined;
  alloted: number;
}

interface Metrics {
  Mentor: Metric;
  Counsellor: Metric;
}

interface TimeFrame {
  lead: Metrics;
  consultation: Metrics;
  sales: Metrics;
  ratios?: {
    Mentor: { ls: string; cs: string };
    Counsellor: { ls: string; cs: string };
  };
}

interface ConvertedData {
  today: TimeFrame;
  yesterday: TimeFrame;
  mtd: TimeFrame;
}

interface Row {
  name: "Mentor" | "Counsellor";
  today: TimeFrame;
  yesterday: TimeFrame;
  mtd: TimeFrame;
}

export default function LeadPosition() {
  const [showLarge, setShowLarge] = useState(false);

  const { data } = useGetLeadFunnelQuery();

  const allData = data?.data;
  // if (isFetching) return;

  const convertedData: ConvertedData = {
    today: {
      lead: {
        Mentor: {
          req: allData?.today?.mentor_todays_lead_target_units || 0,
          alloted: allData?.today?.mentor_todays_lead_assigned_units || 0,
        },
        Counsellor: {
          req: allData?.today?.counsellor_todays_lead_target_units || 0,
          alloted: allData?.today?.counsellor_todays_lead_assigned_units || 0,
        },
      },
      consultation: {
        Mentor: {
          req: 15,
          alloted: allData?.today?.mentor_todays_consultations || 0,
        },
        Counsellor: {
          req: 30,
          alloted: allData?.today?.counsellor_todays_consultations || 0,
        },
      },
      sales: {
        Mentor: {
          req: allData?.today?.mentor_todays_sales_target || 0,
          alloted: allData?.today?.mentor_todays_sales || 0,
        },
        Counsellor: {
          req: allData?.today?.counsellor_todays_sales_target || 0,
          alloted: allData?.today?.counsellor_todays_sales || 0,
        },
      },
    },
    yesterday: {
      lead: {
        Mentor: {
          req: allData?.yesterday?.mentor_yesterdays_lead_target_units || 0,
          alloted:
            allData?.yesterday?.mentor_yesterdays_lead_assigned_units || 0,
        },
        Counsellor: {
          req: allData?.yesterday?.counsellor_yesterdays_lead_target_units || 0,
          alloted:
            allData?.yesterday?.counsellor_yesterdays_lead_assigned_units || 0,
        },
      },
      consultation: {
        Mentor: {
          req: 15,
          alloted: allData?.yesterday?.mentor_yesterdays_consultations || 0,
        },
        Counsellor: {
          req: 30,
          alloted: allData?.yesterday?.counsellor_yesterdays_consultations || 0,
        },
      },
      sales: {
        Mentor: {
          req: allData?.yesterday?.mentor_yesterdays_sales_target || 0,
          alloted: allData?.yesterday?.mentor_yesterdays_sales || 0,
        },
        Counsellor: {
          req: allData?.yesterday?.counsellor_yesterdays_sales_target || 0,
          alloted: allData?.yesterday?.counsellor_yesterdays_sales || 0,
        },
      },
    },
    mtd: {
      lead: {
        Mentor: {
          req: allData?.monthly?.mentor_lead_target_units || 0,
          alloted: allData?.monthly?.mentor_lead_assigned_units || 0,
        },
        Counsellor: {
          req: allData?.monthly?.counsellor_lead_target_units || 0,
          alloted: allData?.monthly?.counsellor_lead_assigned_units || 0,
        },
      },
      consultation: {
        Mentor: {
          req: 15 * 26,
          alloted: allData?.monthly?.mentor_total_consultations || 0,
        },
        Counsellor: {
          req: 30 * 26,
          alloted: allData?.monthly?.counsellor_total_consultations || 0,
        },
      },
      sales: {
        Mentor: {
          req: allData?.monthly?.mentor_total_target || 0,
          alloted: allData?.monthly?.mentor_total_sales || 0,
        },
        Counsellor: {
          req: allData?.monthly?.counsellor_total_target || 0,
          alloted: allData?.monthly?.counsellor_total_sales || 0,
        },
      },
      ratios: {
        Mentor: {
          ls: `${
            allData?.monthly?.mentor_lead_to_sales_conversion_rate?.toFixed(
              2
            ) || 0
          } %`,
          cs: `${
            allData?.monthly?.mentor_consultation_to_sales_conversion_rate?.toFixed(
              2
            ) || 0
          } %`,
        },
        Counsellor: {
          ls: `${
            allData?.monthly?.counsellor_lead_to_sales_conversion_rate?.toFixed(
              2
            ) || 0
          } %`,
          cs: `${
            allData?.monthly?.counsellor_consultation_to_sales_conversion_rate?.toFixed(
              2
            ) || 0
          } %`,
        },
      },
    },
  };
  const totalLeadsRequired =
    (convertedData.mtd.lead.Counsellor.req || 0) +
    (convertedData.mtd.lead.Mentor.req || 0);

  const rows: Row[] = [
    {
      name: "Mentor",
      today: convertedData.today,
      yesterday: convertedData.yesterday,
      mtd: convertedData.mtd,
    },
    {
      name: "Counsellor",
      today: convertedData.today,
      yesterday: convertedData.yesterday,
      mtd: convertedData.mtd,
    },
  ];

  // ---- compute totals for small table ----
  const totals = {
    today: {
      leads: 0,
      consultations: 0,
      sales: 0,
      reqLeads: 0,
      reqCons: 0,
      reqSales: 0,
    },
    yesterday: {
      leads: 0,
      consultations: 0,
      sales: 0,
      reqLeads: 0,
      reqCons: 0,
      reqSales: 0,
    },
    mtd: {
      leads: 0,
      consultations: 0,
      sales: 0,
      reqLeads: 0,
      reqCons: 0,
      reqSales: 0,
    },
  };

  rows.forEach((row) => {
    totals.today.leads += row.today.lead[row.name].alloted;
    totals.today.consultations += row.today.consultation[row.name].alloted;
    totals.today.sales += row.today.sales[row.name].alloted;
    totals.today.reqLeads += row.today.lead[row.name].req ?? 0;
    totals.today.reqCons += row.today.consultation[row.name].req ?? 0;
    totals.today.reqSales += row.today.sales[row.name].req ?? 0;

    totals.yesterday.leads += row.yesterday.lead[row.name].alloted;
    totals.yesterday.consultations +=
      row.yesterday.consultation[row.name].alloted;
    totals.yesterday.sales += row.yesterday.sales[row.name].alloted;
    totals.yesterday.reqLeads += row.yesterday.lead[row.name].req ?? 0;
    totals.yesterday.reqCons += row.yesterday.consultation[row.name].req ?? 0;
    totals.yesterday.reqSales += row.yesterday.sales[row.name].req ?? 0;

    totals.mtd.leads += row.mtd.lead[row.name].alloted;
    totals.mtd.consultations += row.mtd.consultation[row.name].alloted;
    totals.mtd.sales += row.mtd.sales[row.name].alloted;
    totals.mtd.reqLeads += row.mtd.lead[row.name].req ?? 0;
    totals.mtd.reqCons += row.mtd.consultation[row.name].req ?? 0;
    totals.mtd.reqSales += row.mtd.sales[row.name].req ?? 0;
  });

  const summaryData = [
    `${totals.today.leads} | ${totals.today.reqLeads}`,
    `${totals.today.consultations} | ${totals.today.reqCons}`,
    `₹ ${totals.today.sales?.toLocaleString(
      "en-IN"
    )} | ₹ ${totals.today.reqSales?.toLocaleString("en-IN")}`,
    `${totals.yesterday.leads} | ${totals.yesterday.reqLeads}`,
    `${totals.yesterday.consultations} | ${totals.yesterday.reqCons}`,
    `₹ ${totals.yesterday.sales?.toLocaleString(
      "en-IN"
    )} | ₹ ${totals.yesterday.reqSales?.toLocaleString("en-IN")}`,
    `${totals.mtd.leads} | ${totals.mtd.reqLeads}`,
    `${totals.mtd.consultations} | ${totals.mtd.reqCons}`,
    `₹ ${totals.mtd.sales?.toLocaleString(
      "en-IN"
    )} | ₹ ${totals.mtd.reqSales?.toLocaleString("en-IN")}`,
    // ratios — you can compute weighted average here if needed
    `${allData?.monthly.total_lead_to_sales_conversion_rate?.toFixed(2)} %`,
    `${allData?.monthly.total_consultation_to_sales_conversion_rate?.toFixed(2)} %`,
  ];

  return (
    <Card className="pt-2 pb-4">
      <CardContent>
        <div
          className="flex justify-between items-center cursor-pointer mb-1"
          onClick={() => setShowLarge((prev) => !prev)}
        >
          <h2 className="text-lg font-semibold">
            Lead Funnel ({dayjs().format("MMM YYYY")})
          </h2>
          <div className="flex items-center gap-3">
            <p className="text-sm text-gray-600">
              Total Leads Required:{" "}
              <span className="font-bold">{totalLeadsRequired}</span>
            </p>
            {showLarge ? (
              <ChevronUp className="cursor-pointer" />
            ) : (
              <ChevronDown className="cursor-pointer" />
            )}
          </div>
        </div>
        {!showLarge ? (
          <div>
            <Table
              onClick={() => setShowLarge(true)}
              className="cursor-pointer"
            >
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">Today Leads</TableHead>
                  <TableHead className="text-center">Today Cons.</TableHead>
                  <TableHead className="text-center">Today Sales</TableHead>
                  <TableHead className="text-center">Yest. Leads</TableHead>
                  <TableHead className="text-center">Yest. Cons.</TableHead>
                  <TableHead className="text-center">Yest. Sales</TableHead>
                  <TableHead className="text-center">MTD Leads</TableHead>
                  <TableHead className="text-center">MTD Cons.</TableHead>
                  <TableHead className="text-center">MTD Sales</TableHead>
                  <TableHead className="text-center">L : S</TableHead>
                  <TableHead className="text-center">C : S</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  {summaryData.map((item, idx) => (
                    <TableCell key={idx} className="text-center">
                      {item}
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </div>
        ) : (
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead rowSpan={2} className="text-center">
                    Source
                  </TableHead>
                  <TableHead colSpan={3} className="text-center">
                    Today
                  </TableHead>
                  <TableHead colSpan={3} className="text-center">
                    Yesterday
                  </TableHead>
                  <TableHead colSpan={5} className="text-center">
                    MTD
                  </TableHead>
                </TableRow>
                <TableRow>
                  <TableHead className="text-center">Leads</TableHead>
                  <TableHead className="text-center">Consultation</TableHead>
                  <TableHead className="text-center">Sales</TableHead>
                  <TableHead className="text-center">Leads</TableHead>
                  <TableHead className="text-center">Consultation</TableHead>
                  <TableHead className="text-center">Sales</TableHead>
                  <TableHead className="text-center">Leads</TableHead>
                  <TableHead className="text-center">Consultation</TableHead>
                  <TableHead className="text-center">Sales</TableHead>
                  <TableHead className="text-center">L : S</TableHead>
                  <TableHead className="text-center">C : S</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell className="font-medium">{row.name}</TableCell>
                    {/* Today */}
                    <TableCell className="text-center">
                      {row.today.lead[row.name].alloted} |{" "}
                      {row.today.lead[row.name].req}
                    </TableCell>
                    <TableCell className="text-center">
                      {row.today.consultation[row.name].alloted} |{" "}
                      {row.today.consultation[row.name].req}
                    </TableCell>
                    <TableCell className="text-center">
                      ₹{" "}
                      {row.today.sales[row.name].alloted?.toLocaleString(
                        "en-IN"
                      )}{" "}
                      | ₹{" "}
                      {row.today.sales[row.name].req?.toLocaleString("en-IN")}
                    </TableCell>
                    {/* Yesterday */}
                    <TableCell className="text-center">
                      {row.yesterday.lead[row.name].alloted} |{" "}
                      {row.yesterday.lead[row.name].req}
                    </TableCell>
                    <TableCell className="text-center">
                      {row.yesterday.consultation[row.name].alloted} |{" "}
                      {row.yesterday.consultation[row.name].req}
                    </TableCell>
                    <TableCell className="text-center">
                      ₹{" "}
                      {row.yesterday.sales[row.name].alloted?.toLocaleString(
                        "en-IN"
                      )}{" "}
                      | ₹{" "}
                      {row.yesterday.sales[row.name].req?.toLocaleString(
                        "en-IN"
                      )}
                    </TableCell>
                    {/* MTD */}
                    <TableCell className="text-center">
                      {row.mtd.lead[row.name].alloted} |{" "}
                      {row.mtd.lead[row.name].req}
                    </TableCell>
                    <TableCell className="text-center">
                      {row.mtd.consultation[row.name].alloted} |{" "}
                      {row.mtd.consultation[row.name].req}
                    </TableCell>
                    <TableCell className="text-center">
                      ₹{" "}
                      {row.mtd.sales[row.name].alloted?.toLocaleString("en-IN")}{" "}
                      | ₹ {row.mtd.sales[row.name].req?.toLocaleString("en-IN")}
                    </TableCell>
                    <TableCell className="text-center">
                      {row.mtd.ratios?.[row.name].ls ?? "-"}
                    </TableCell>
                    <TableCell className="text-center">
                      {row.mtd.ratios?.[row.name].cs ?? "-"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
