import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function LeadPosition() {
  const totalLeadsRequired = 1000;

  const rows = [
    {
      name: "Mentor",
      today: { req: 20, alloted: 2 },
      mtd: { req: 440, alloted: 120 },
    },
    {
      name: "Counsellor",
      today: { req: 18, alloted: 7 },
      mtd: { req: 396, alloted: 490 },
    },
  ];

  return (
    <div className="space-y-4 max-h-[80vh] overflow-scroll">
      {/* <h2 className="text-lg font-semibold">Lead Position</h2> */}
      <div className="flex justify-end">
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
            <TableHead colSpan={2} className="text-center">
              Today
            </TableHead>
            <TableHead colSpan={2} className="text-center">
              MTD
            </TableHead>
          </TableRow>
          <TableRow>
            <TableHead className="text-center">Required</TableHead>
            <TableHead className="text-center">Alloted</TableHead>
            <TableHead className="text-center">Required</TableHead>
            <TableHead className="text-center">Alloted</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell className="font-medium">{row.name}</TableCell>
              <TableCell className="text-center">{row.today.req}</TableCell>
              <TableCell className="text-center">{row.today.alloted}</TableCell>
              <TableCell className="text-center">{row.mtd.req}</TableCell>
              <TableCell className="text-center">{row.mtd.alloted}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
