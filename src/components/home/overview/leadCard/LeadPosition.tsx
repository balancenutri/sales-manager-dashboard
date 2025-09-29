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

export default function LeadPosition() {
  const totalLeadsRequired = 1000;
  const WORKING_DAYS = 26;

  const { data } = useGetLeadFunnelQuery();

  const parseLeadValue = (val?: string) => {
    if (!val) return [0, 0];
    const [today, mtd] = val.split("|").map((v) => parseInt(v.trim(), 10));
    return [isNaN(today) ? 0 : today, isNaN(mtd) ? 0 : mtd];
  };

  const leadData = data?.data;

  const { data: leadManagementData } = useGetLeadManagementQuery({});
  const { data: oldLeadManagementData } = useGetOldLeadManagementQuery({});

  const newLead = leadManagementData?.data;
  const oldLead = oldLeadManagementData?.data;

  const rows = [
    {
      name: "Mentor",
      lead: {
        today: {
          req: 20,
          alloted:
            parseLeadValue(
              newLead?.assigned?.total_assigned_to_mentors || ""
            )[0] +
            parseLeadValue(
              oldLead?.assigned?.total_assigned_to_mentors || ""
            )[0],
        },
        mtd: {
          req: 20 * WORKING_DAYS,
          alloted:
            parseLeadValue(
              newLead?.assigned?.total_assigned_to_mentors || ""
            )[1] +
            parseLeadValue(
              oldLead?.assigned?.total_assigned_to_mentors || ""
            )[1],
        },
      },
      consultation: {
        today: {
          req: 10,
          alloted:
            parseLeadValue(newLead?.consultation_done || "")[0] +
            parseLeadValue(oldLead?.consultation_done || "")[0],
        },
        mtd: {
          req: 10 * WORKING_DAYS,
          alloted:
            parseLeadValue(newLead?.consultation_done || "")[1] +
            parseLeadValue(oldLead?.consultation_done || "")[1],
        },
      },
    },
    {
      name: "Counsellor",
      lead: {
        today: {
          req: leadData?.monthly?.counsellor_todays_lead_target_units,
          alloted:
            parseLeadValue(
              newLead?.assigned?.total_assigned_to_counsellors || ""
            )[0] +
            parseLeadValue(
              oldLead?.assigned?.total_assigned_to_counsellors || ""
            )[0],
        },
        mtd: {
          req: leadData?.monthly?.counsellor_lead_target_units,
          alloted:
            parseLeadValue(newLead?.assigned?.total_assigned_to_counsellors || "")[1] +
            parseLeadValue(oldLead?.assigned?.total_assigned_to_counsellors || "")[1],
        },
      },
      consultation: {
        today: {
          req: 10,
          alloted:
            parseLeadValue(newLead?.consultation_done || "")[0] +
            parseLeadValue(oldLead?.consultation_done || "")[0],
        },
        mtd: {
          req: 10 * WORKING_DAYS,
          alloted:
            parseLeadValue(newLead?.consultation_done || "")[1] +
            parseLeadValue(oldLead?.consultation_done || "")[1],
        },
      },
    },
  ];

  return (
    <Card>
      <CardContent>
        <div>
          <div className="flex justify-between mb-2">
            <h2 className="text-lg font-semibold">
              Lead Funnel ({dayjs().format("MMM YYYY")})
            </h2>

            <p className="text-sm text-gray-600">
              Total Leads Required:{" "}
              <span className="font-bold">{totalLeadsRequired}</span>
            </p>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead rowSpan={2} className="text-center">
                  Source
                </TableHead>
                <TableHead colSpan={4} className="text-center">
                  Today
                </TableHead>
                <TableHead colSpan={4} className="text-center">
                  MTD
                </TableHead>
              </TableRow>
              <TableRow>
                <TableHead className="text-center">Leads Req</TableHead>
                <TableHead className="text-center">Leads Alloted</TableHead>
                <TableHead className="text-center">Consult Req</TableHead>
                <TableHead className="text-center">Consult Alloted</TableHead>
                <TableHead className="text-center">Leads Req</TableHead>
                <TableHead className="text-center">Leads Alloted</TableHead>
                <TableHead className="text-center">Consult Req</TableHead>
                <TableHead className="text-center">Consult Alloted</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell className="font-medium">{row.name}</TableCell>

                  {/* Today Leads */}
                  <TableCell className="text-center">
                    {row.lead.today.req}
                  </TableCell>
                  <TableCell className="text-center">
                    {row.lead.today.alloted}
                  </TableCell>

                  {/* Today Consultation */}
                  <TableCell className="text-center">
                    {row.consultation.today.req}
                  </TableCell>
                  <TableCell className="text-center">
                    {row.consultation.today.alloted}
                  </TableCell>

                  {/* MTD Leads */}
                  <TableCell className="text-center">
                    {row.lead.mtd.req}
                  </TableCell>
                  <TableCell className="text-center">
                    {row.lead.mtd.alloted}
                  </TableCell>

                  {/* MTD Consultation */}
                  <TableCell className="text-center">
                    {row.consultation.mtd.req}
                  </TableCell>
                  <TableCell className="text-center">
                    {row.consultation.mtd.alloted}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
