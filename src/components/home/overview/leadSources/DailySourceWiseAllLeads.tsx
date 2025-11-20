import type { DailyLeadData } from "@/lib/types";

interface GroupedByDate {
  [date: string]: {
    totalLeads: number;
    bySource: { [source: string]: number };
    byCounsellor: { [counsellor: string]: { [source: string]: number } };
    entries: DailyLeadData[];
  };
}

export default function DailySourceWiseAllLeads({
  groupedData,
}: {
  groupedData: GroupedByDate;
}) {
  const sortedDates = Object.keys(groupedData).sort((a, b) => {
    const dateA = new Date(a).getTime();
    const dateB = new Date(b).getTime();
    return dateB - dateA;
  });
  return (
    <div className="space-y-6">
      {sortedDates.map((date) => (
        <div key={date} className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-base font-semibold text-gray-900 mb-2">
            {date} ({groupedData[date].totalLeads} leads)
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border border-gray-200">
                <tr>
                  <th className="px-3 py-2 text-left font-medium text-gray-700">
                    Counsellor
                  </th>
                  <th className="px-3 py-2 text-left font-medium text-gray-700">
                    Source
                  </th>
                  <th className="px-3 py-2 text-center font-medium text-gray-700">
                    Leads
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(groupedData[date].byCounsellor).map(
                  ([counsellor, sources], counsellorIdx) => {
                    const counsellorEntries = Object.entries(sources).sort(
                      (a, b) => b[1] - a[1]
                    );
                    return counsellorEntries.map((entry, sourceIdx) => (
                      <tr
                        key={counsellorIdx}
                        className={
                          sourceIdx % 2 === 0
                            ? "bg-white border"
                            : "bg-gray-50 bg-opacity-50 border"
                        }
                      >
                        {sourceIdx === 0 && (
                          <td
                            rowSpan={counsellorEntries.length}
                            className="px-3 py-2 font-medium text-gray-900 border-r border-gray-200"
                          >
                            {counsellor}
                          </td>
                        )}
                        <td className="px-3 py-2 text-gray-600">{entry[0]}</td>
                        <td className="px-3 py-2 text-center font-semibold text-blue-600">
                          {entry[1]}
                        </td>
                      </tr>
                    ));
                  }
                )}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
