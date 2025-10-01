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
import {
  useGetLeadFunnelQuery,
  useGetLeadManagementQuery,
  useGetOldLeadManagementQuery,
} from "@/service/dashboard/api";
import dayjs from "dayjs";
import { ChevronUp } from "lucide-react";

// Define types
interface LeadData {
  monthly?: {
    counsellor_todays_lead_target_units?: number;
    counsellor_lead_target_units?: number;
  };
}

interface LeadManagementData {
  assigned?: {
    total_assigned_to_mentors?: string;
    total_assigned_to_counsellors?: string;
  };
  consultation_done?: {
    mentor_consultations?: string;
    counsellor_consultations?: string;
  };
}

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

  const totalLeadsRequired = 1000;
  const WORKING_DAYS = 26;

  const { data } = useGetLeadFunnelQuery();
  const leadData: LeadData | undefined = data?.data;

  const { data: leadManagementData } = useGetLeadManagementQuery({});
  const { data: oldLeadManagementData } = useGetOldLeadManagementQuery({});

  const newLead: LeadManagementData | undefined = leadManagementData?.data;
  const oldLead: LeadManagementData | undefined = oldLeadManagementData?.data;

  const parseLeadValue = (val?: string): [number, number] => {
    if (!val) return [0, 0];
    const [today, mtd] = val.split("|").map((v) => parseInt(v.trim(), 10));
    return [isNaN(today) ? 0 : today, isNaN(mtd) ? 0 : mtd];
  };

  const convertedData: ConvertedData = {
    today: {
      lead: {
        Mentor: {
          req: 20,
          alloted:
            parseLeadValue(
              newLead?.assigned?.total_assigned_to_mentors || ""
            )[0] +
            parseLeadValue(
              oldLead?.assigned?.total_assigned_to_mentors || ""
            )[0],
        },
        Counsellor: {
          req: leadData?.monthly?.counsellor_todays_lead_target_units,
          alloted:
            parseLeadValue(
              newLead?.assigned?.total_assigned_to_counsellors || ""
            )[0] +
            parseLeadValue(
              oldLead?.assigned?.total_assigned_to_counsellors || ""
            )[0],
        },
      },
      consultation: {
        Mentor: {
          req: 10,
          alloted:
            parseLeadValue(
              newLead?.consultation_done?.mentor_consultations || ""
            )[0] +
            parseLeadValue(
              oldLead?.consultation_done?.mentor_consultations || ""
            )[0],
        },
        Counsellor: {
          req: 10,
          alloted:
            parseLeadValue(
              newLead?.consultation_done?.counsellor_consultations || ""
            )[0] +
            parseLeadValue(
              oldLead?.consultation_done?.counsellor_consultations || ""
            )[0],
        },
      },
      sales: {
        Mentor: { req: 0, alloted: 0 },
        Counsellor: { req: 0, alloted: 0 },
      },
    },
    yesterday: {
      lead: {
        Mentor: {
          req: 20,
          alloted:
            parseLeadValue(
              newLead?.assigned?.total_assigned_to_mentors || ""
            )[0] +
            parseLeadValue(
              oldLead?.assigned?.total_assigned_to_mentors || ""
            )[0],
        },
        Counsellor: {
          req: leadData?.monthly?.counsellor_todays_lead_target_units,
          alloted:
            parseLeadValue(
              newLead?.assigned?.total_assigned_to_counsellors || ""
            )[0] +
            parseLeadValue(
              oldLead?.assigned?.total_assigned_to_counsellors || ""
            )[0],
        },
      },
      consultation: {
        Mentor: {
          req: 10,
          alloted:
            parseLeadValue(
              newLead?.consultation_done?.mentor_consultations || ""
            )[0] +
            parseLeadValue(
              oldLead?.consultation_done?.mentor_consultations || ""
            )[0],
        },
        Counsellor: {
          req: 10,
          alloted:
            parseLeadValue(
              newLead?.consultation_done?.counsellor_consultations || ""
            )[0] +
            parseLeadValue(
              oldLead?.consultation_done?.counsellor_consultations || ""
            )[0],
        },
      },
      sales: {
        Mentor: { req: 0, alloted: 0 },
        Counsellor: { req: 0, alloted: 0 },
      },
    },
    mtd: {
      lead: {
        Mentor: {
          req: 20 * WORKING_DAYS,
          alloted:
            parseLeadValue(
              newLead?.assigned?.total_assigned_to_mentors || ""
            )[1] +
            parseLeadValue(
              oldLead?.assigned?.total_assigned_to_mentors || ""
            )[1],
        },
        Counsellor: {
          req: leadData?.monthly?.counsellor_lead_target_units,
          alloted:
            parseLeadValue(
              newLead?.assigned?.total_assigned_to_counsellors || ""
            )[1] +
            parseLeadValue(
              oldLead?.assigned?.total_assigned_to_counsellors || ""
            )[1],
        },
      },
      consultation: {
        Mentor: {
          req: 10 * WORKING_DAYS,
          alloted:
            parseLeadValue(
              newLead?.consultation_done?.mentor_consultations || ""
            )[1] +
            parseLeadValue(
              oldLead?.consultation_done?.mentor_consultations || ""
            )[1],
        },
        Counsellor: {
          req: 10 * WORKING_DAYS,
          alloted:
            parseLeadValue(
              newLead?.consultation_done?.counsellor_consultations || ""
            )[1] +
            parseLeadValue(
              oldLead?.consultation_done?.counsellor_consultations || ""
            )[1],
        },
      },
      sales: {
        Mentor: { req: 0, alloted: 0 },
        Counsellor: { req: 0, alloted: 0 },
      },
    },
  };

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

  const datas = [
    "42 | 45",
    "42 | 45",
    "42 | 45",
    "42 | 45",
    "42 | 45",
    "42 | 45",
    "42 | 45",
    "42 | 45",
    "42 | 45",
  ];

  return (
    <Card>
      <CardContent>
        {!showLarge ? (
          <div>
            <Table
              onClick={() => setShowLarge(true)}
              className="cursor-pointer"
            >
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">Today Leads</TableHead>
                  <TableHead className="text-center">
                    Today Cons.
                  </TableHead>
                  <TableHead className="text-center">Today Sales</TableHead>
                  <TableHead className="text-center">Yesterday Leads</TableHead>
                  <TableHead className="text-center">
                    Yesterday Cons.
                  </TableHead>
                  <TableHead className="text-center">Yesterday Sales</TableHead>
                  <TableHead className="text-center">MTD Leads</TableHead>
                  <TableHead className="text-center">
                    MTD Cons.
                  </TableHead>
                  <TableHead className="text-center">MTD Sales</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  {datas.map((item, idx) => (
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
            <div
              className="flex justify-between items-center cursor-pointer mb-2"
              onClick={() => setShowLarge(false)}
            >
              <h2 className="text-lg font-semibold">
                Lead Funnel ({dayjs().format("MMM YYYY")})
              </h2>
              <div className="flex items-center gap-3">
                <p className="text-sm text-gray-600">
                  Total Leads Required:{" "}
                  <span className="font-bold">{totalLeadsRequired}</span>
                </p>
                <ChevronUp className="cursor-pointer" />
              </div>
            </div>
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
                  <TableHead colSpan={3} className="text-center">
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
                      {row.today.sales[row.name].alloted} |{" "}
                      {row.today.sales[row.name].req}
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
                      {row.yesterday.sales[row.name].alloted} |{" "}
                      {row.yesterday.sales[row.name].req}
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
                      {row.mtd.sales[row.name].alloted} |{" "}
                      {row.mtd.sales[row.name].req}
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
