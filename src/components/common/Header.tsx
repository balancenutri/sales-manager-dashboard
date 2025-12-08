import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, ChevronDown } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">B</span>
            </div>
            <h1 className="text-xl font-semibold text-gray-900">
              Balance Nutrition
            </h1>
          </div>
          <div className="hidden md:block">
            <Badge variant="secondary" className="bg-teal-100 text-teal-800">
              Sales Manager Dashboard
            </Badge>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
          </Button>

          <Button variant="ghost" className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback>SM</AvatarFallback>
            </Avatar>
            <span className="hidden md:block">Sales Manager</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}

// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// // import {
// //   Select,
// //   SelectContent,
// //   SelectItem,
// //   SelectTrigger,
// //   SelectValue,
// // } from "@/components/ui/select";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Bell, ChevronDown, Settings } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// // import { useDispatch, useSelector } from "react-redux";
// // import { selectPeriod } from "@/features/period/periodSlice";

// // type periodState = {
// //     period: 'today' | 'this_week' | 'mtd' | 'this_quarter';
// // }

// export default function Header() {
//   // const dispatch = useDispatch();
//   // const period = useSelector(selectPeriod);

//   return (
//     <header className="bg-white border-b border-gray-200 px-6 py-4">
//       <div className="flex items-center justify-between">
//         <div className="flex items-center space-x-4">
//           <div className="flex items-center space-x-2">
//             <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
//               <span className="text-white font-bold text-sm">B</span>
//             </div>
//             <h1 className="text-xl font-semibold text-gray-900">
//               Balance Nutrition
//             </h1>
//           </div>
//           <div className="hidden md:block">
//             <Badge variant="secondary" className="bg-teal-100 text-teal-800">
//               Sales Manager Dashboard
//             </Badge>
//           </div>
//         </div>

//         <div className="flex items-center space-x-4">
//           {/* <Select
//             value={period}
//             onValueChange={(val: periodState['period']) =>
//               dispatch(setPeriod(val))
//             }
//           >
//             <SelectTrigger className="w-32">
//               <SelectValue />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="today">Today</SelectItem>
//               <SelectItem value="this_week">This Week</SelectItem>
//               <SelectItem value="mtd">This Month</SelectItem>
//               <SelectItem value="this_quarter">This Quarter</SelectItem>
//             </SelectContent>
//           </Select> */}

//           <Button variant="outline" size="icon">
//             <Bell className="h-4 w-4" />
//           </Button>

//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="ghost" className="flex items-center space-x-2">
//                 <Avatar className="h-8 w-8">
//                   <AvatarImage src="/placeholder.svg?height=32&width=32" />
//                   <AvatarFallback>SM</AvatarFallback>
//                 </Avatar>
//                 <span className="hidden md:block">Sales Manager</span>
//                 <ChevronDown className="h-4 w-4" />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//               <DropdownMenuLabel>My Account</DropdownMenuLabel>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem>
//                 <Settings className="mr-2 h-4 w-4" />
//                 Settings
//               </DropdownMenuItem>
//               <DropdownMenuItem>Logout</DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </div>
//     </header>
//   );
// }
