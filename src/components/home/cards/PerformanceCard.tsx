import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

interface PerformanceData {
  counsellor_lead_target_units: number;
  counsellor_lead_assigned_units: number;
  mentor_lead_target_units: number;
  mentor_lead_assigned_units: number;

  counsellor_total_target: number;
  mentor_total_target: number;

  counsellor_total_sales: number;
  mentor_total_sales: number;

  counsellor_total_consultations: number;
  mentor_total_consultations: number;

  counsellor_lead_to_sales_conversion_rate: number;
  mentor_lead_to_sales_conversion_rate: number | null;

  counsellor_consultation_to_sales_conversion_rate: number;
  mentor_consultation_to_sales_conversion_rate: number | null;

  total_lead_to_sales_conversion_rate: number;
  total_consultation_to_sales_conversion_rate: number;
}

export default function PerformanceCards({ data }: { data: PerformanceData }) {
  const formatPercentage = (value: number | null) =>
    value !== null ? `${value.toFixed(2)}%` : "N/A";

  const RenderCard = ({
    title,
    targetUnits,
    assignedUnits,
    sales,
    consultations,
    leadToSales,
    consultToSales,
  }: {
    title: string;
    targetUnits: number;
    assignedUnits: number;
    sales: number;
    consultations: number;
    leadToSales: number | null;
    consultToSales: number | null;
  }) => (
    <Card className="w-full">
      <CardHeader>
        <h3 className="font-semibold">{title} Performance</h3>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-3 gap-3 text-sm">
          <div>
            <p className="text-muted-foreground">Lead Target</p>
            <p className="font-semibold">{targetUnits}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Leads Ass.</p>
            <p className="font-semibold">{assignedUnits}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Cons. Target</p>
            <p className="font-semibold">
              {title == "Mentor" ? 15 * 26 : 30 * 26}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Cons. Done</p>
            <p className="font-semibold">{consultations}</p>
          </div>

          {/* <div>
            <p className="text-muted-foreground">Sales Closed</p>
            <p className="font-semibold text-green-600">{salesTarget}</p>
          </div> */}
          <div>
            <p className="text-muted-foreground">Sales Done</p>
            <p className="font-semibold text-green-600">
              {formatCurrency(sales)}
            </p>
          </div>

          <div className="mt-3 p-3 rounded-lg bg-gray-50 border text-sm col-span-3">
            <div className="grid grid-cols-2 text-center">
              <div>
                <p className="text-muted-foreground text-xs">L : S</p>
                <p className="font-semibold">{formatPercentage(leadToSales)}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">C : S</p>
                <p className="font-semibold">
                  {formatPercentage(consultToSales)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <>
      <div className="grid grid-cols-2 gap-3 mx-3">
        {/* Counsellor Card */}
        <RenderCard
          title="Counsellor"
          targetUnits={data.counsellor_lead_target_units || 15 * 26}
          assignedUnits={data.counsellor_lead_assigned_units}
          sales={data.counsellor_total_sales}
          consultations={data.counsellor_total_consultations}
          leadToSales={data.counsellor_lead_to_sales_conversion_rate}
          consultToSales={data.counsellor_consultation_to_sales_conversion_rate}
        />

        {/* Mentor Card */}
        <RenderCard
          title="Mentor"
          targetUnits={data.mentor_lead_target_units}
          assignedUnits={data.mentor_lead_assigned_units}
          sales={data.mentor_total_sales}
          consultations={data.mentor_total_consultations}
          leadToSales={data.mentor_lead_to_sales_conversion_rate}
          consultToSales={data.mentor_consultation_to_sales_conversion_rate}
        />
      </div>
    </>
  );
}
