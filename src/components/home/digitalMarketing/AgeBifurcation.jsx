// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Skeleton } from "@/components/ui/skeleton";
// import { selectPeriod } from "@/features/period/periodSlice";
// import { useGetGenderWiseLeadQuery } from "@/service/dashboard/api";
// import { useSelector } from "react-redux";

// type GenderData = {
//   overall_male_leads: number;
//   overall_female_leads: number;
// };

// type GenderBifurcationResponse = {
//   data: GenderData;
// };

// export default function GenderBifurcation() {
//   const filter = useSelector(selectPeriod);

//   const { data } = useGetGenderWiseLeadQuery({ filter }) as {
//     data: GenderBifurcationResponse;
//   };
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Gender Bifurcation</CardTitle>
//       </CardHeader>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-4">
//         <Card>
//           <CardHeader>
//             <CardTitle className="text-center">Overall Male Leads</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="flex items-center justify-center">
//               {data?.data?.overall_male_leads !== undefined ? (
//                 <span className="text-4xl font-bold">
//                   {data?.data?.overall_male_leads}
//                 </span>
//               ) : (
//                 <Skeleton className="h-8 w-20" />
//               )}
//             </div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader>
//             <CardTitle className="text-center">Overall Female Leads</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="flex items-center justify-center">
//               {!data?.data?.overall_female_leads !== undefined ? (
//                 <span className="text-2xl font-bold">
//                   {data?.data?.overall_female_leads}
//                 </span>
//               ) : (
//                 <Skeleton className="h-8 w-20" />
//               )}
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </Card>
//   );
// }

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function AgeBifurcation() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Age Group</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Age Group</TableHead>
              <TableHead className="text-center">Below 20</TableHead>
              <TableHead className="text-center">21 - 30</TableHead>
              <TableHead className="text-center">31 - 40</TableHead>
              <TableHead className="text-center">41 - 50</TableHead>
              <TableHead className="text-center">Above 50</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-semibold text-center">
                Lead
              </TableCell>
              <TableCell className="text-center text-blue-600 underline font-bold">
                546
              </TableCell>
              <TableCell className="text-center text-blue-600 underline font-bold">
                576
              </TableCell>
              <TableCell className="text-center text-blue-600 underline font-bold">
                576
              </TableCell>
              <TableCell className="text-center text-blue-600 underline font-bold">
                576
              </TableCell>
              <TableCell className="text-center text-blue-600 underline font-bold">
                576
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold text-center">
                OC
              </TableCell>
              <TableCell className="text-center text-blue-600 underline font-bold">
                546
              </TableCell>
              <TableCell className="text-center text-blue-600 underline font-bold">
                576
              </TableCell>
              <TableCell className="text-center text-blue-600 underline font-bold">
                576
              </TableCell>
              <TableCell className="text-center text-blue-600 underline font-bold">
                576
              </TableCell>
              <TableCell className="text-center text-blue-600 underline font-bold">
                576
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
