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

export default function LeadDistribution() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gender Bifurcation</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Gender</TableHead>
              <TableHead className="text-center">Lead</TableHead>
              <TableHead className="text-center">OC</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-semibold text-center">Male</TableCell>
              <TableCell className="text-center text-blue-600 underline font-bold">
                6789
              </TableCell>
              <TableCell className="text-center text-blue-600 underline font-bold">
                576
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold text-center">Female</TableCell>
              <TableCell className="text-center text-blue-600 underline font-bold">
                6789
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
