// // import { Card, CardHeader, CardTitle } from "@/components/ui/card";

// // export default function LeadDistribution() {
// //   return (
// //     <Card>
// //       <CardHeader>
// //         <CardTitle>Lead Distribution</CardTitle>
// //       </CardHeader>
// //       <div className="grid grid-cols-4 gap-4 mb-4 divide-x">
// //         <div className="grid col-span-2">
// //           <h2 className="text-center underline font-semibold text-lg">Lead</h2>
// //           <div className="grid grid-cols-2">
// //             <div
// //               className="p-4 w-full flex flex-col items-center justify-center cursor-pointer"
// //               //   onClick={() => handleClick("India")}
// //             >
// //               <h2 className="text-sm">India</h2>
// //               <p className="font-bold text-blue-600 underline">6789</p>
// //             </div>
// //             <div
// //               className="p-4 w-full flex flex-col items-center justify-center cursor-pointer"
// //               //   onClick={() => handleClick("nri")}
// //             >
// //               <h2 className="text-sm">Abroad</h2>
// //               <p className="font-bold text-blue-600 underline">576</p>
// //             </div>
// //           </div>
// //         </div>
// //         <div className="grid col-span-2">
// //           <h2 className="text-center underline font-semibold text-lg">OC</h2>
// //           <div className="grid grid-cols-2">
// //             <div
// //               className="p-4 w-full flex flex-col items-center justify-center cursor-pointer"
// //               //   onClick={() => handleClick("India")}
// //             >
// //               <h2 className="text-sm">India</h2>
// //               <p className="font-bold text-blue-600 underline">6789</p>
// //             </div>
// //             <div
// //               className="p-4 w-full flex flex-col items-center justify-center cursor-pointer"
// //               //   onClick={() => handleClick("nri")}
// //             >
// //               <h2 className="text-sm">Abroad</h2>
// //               <p className="font-bold text-blue-600 underline">576</p>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </Card>
// //   );
// // }

// import { Card, CardHeader, CardTitle } from "@/components/ui/card";

// export default function LeadDistribution() {
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Lead Distribution</CardTitle>
//       </CardHeader>
//       <div className="grid grid-cols-4 gap-4 mb-4 divide-x">
//         <div className="grid col-span-2">
//           <h2 className="text-center underline font-semibold text-lg">Lead</h2>
//           <div className="grid grid-cols-2">
//             <div
//               className="p-4 w-full flex flex-col items-center justify-center cursor-pointer"
//               //   onClick={() => handleClick("India")}
//             >
//               <h2 className="text-sm">India</h2>
//               <p className="font-bold text-blue-600 underline">6789</p>
//             </div>
//             <div
//               className="p-4 w-full flex flex-col items-center justify-center cursor-pointer"
//               //   onClick={() => handleClick("nri")}
//             >
//               <h2 className="text-sm">Abroad</h2>
//               <p className="font-bold text-blue-600 underline">576</p>
//             </div>
//           </div>
//         </div>
//         <div className="grid col-span-2">
//           <h2 className="text-center underline font-semibold text-lg">OC</h2>
//           <div className="grid grid-cols-2">
//             <div
//               className="p-4 w-full flex flex-col items-center justify-center cursor-pointer"
//               //   onClick={() => handleClick("India")}
//             >
//               <h2 className="text-sm">India</h2>
//               <p className="font-bold text-blue-600 underline">6789</p>
//             </div>
//             <div
//               className="p-4 w-full flex flex-col items-center justify-center cursor-pointer"
//               //   onClick={() => handleClick("nri")}
//             >
//               <h2 className="text-sm">Abroad</h2>
//               <p className="font-bold text-blue-600 underline">576</p>
//             </div>
//           </div>
//         </div>
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
        <CardTitle>Lead - OC Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Region</TableHead>
              <TableHead className="text-center">Lead</TableHead>
              <TableHead className="text-center">OC</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-semibold text-center">India</TableCell>
              <TableCell className="text-center text-blue-600 underline font-bold">
                6789
              </TableCell>
              <TableCell className="text-center text-blue-600 underline font-bold">
                576
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold text-center">Abroad</TableCell>
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
