// // import * as React from "react"
// // import { Check, ChevronsUpDown, X } from 'lucide-react'
// // import { cn } from "@/lib/utils"
// // import { Badge } from "@/components/ui/badge"
// // import { Button } from "@/components/ui/button"
// // import {
// //   Command,
// //   CommandEmpty,
// //   CommandGroup,
// //   CommandInput,
// //   CommandItem,
// //   CommandList,
// // } from "@/components/ui/command"
// // import {
// //   Popover,
// //   PopoverContent,
// //   PopoverTrigger,
// // } from "@/components/ui/popover"

// // // Types for the unified component
// // type StringOption = string
// // type ObjectOption = { id: number; name: string }
// // type Option = StringOption | ObjectOption

// // interface UnifiedMultiSelectProps {
// //   options: Option[]
// //   selected: (string | number)[]
// //   onChange: (selected: (string | number)[]) => void
// //   placeholder?: string
// //   className?: string
// // }

// // export function MultiSelect({
// //   options,
// //   selected,
// //   onChange,
// //   placeholder = "Select items...",
// //   className,
// // }: UnifiedMultiSelectProps) {
// //   const [open, setOpen] = React.useState(false)

// //   // Helper function to check if option is an object with id/name
// //   const isObjectOption = (option: Option): option is ObjectOption => {
// //     return typeof option === 'object' && 'id' in option && 'name' in option
// //   }

// //   // Helper function to get display value
// //   const getDisplayValue = (option: Option): string => {
// //     return isObjectOption(option) ? option.name : option
// //   }

// //   // Helper function to get stored value
// //   const getStoredValue = (option: Option): string | number => {
// //     return isObjectOption(option) ? option.id : option
// //   }

// //   // Helper function to get display name from selected value
// //   const getSelectedDisplayName = (value: string | number): string => {
// //     const option = options.find(opt => getStoredValue(opt) === value)
// //     return option ? getDisplayValue(option) : String(value)
// //   }

// //   const handleUnselect = (value: string | number) => {
// //     onChange(selected.filter((selectedValue) => selectedValue !== value))
// //   }

// //   const handleSelect = (option: Option) => {
// //     const value = getStoredValue(option)
// //     if (selected.includes(value)) {
// //       handleUnselect(value)
// //     } else {
// //       onChange([...selected, value])
// //     }
// //   }

// //   const handleClearAll = () => {
// //     onChange([])
// //   }

// //   const selectedDisplayNames = selected.map(value => getSelectedDisplayName(value))

// //   return (
// //     <Popover open={open} onOpenChange={setOpen}>
// //       <PopoverTrigger asChild>
// //         <Button
// //           variant="outline"
// //           role="combobox"
// //           aria-expanded={open}
// //           className={cn(
// //             "w-full justify-between min-h-10 h-auto text-left font-normal",
// //             className
// //           )}
// //         >
// //           <div className="flex flex-wrap gap-1 flex-1">
// //             {selected.length === 0 && (
// //               <span className="text-muted-foreground">{placeholder}</span>
// //             )}
// //             {selected.length > 0 && (
// //               <>
// //                 {selectedDisplayNames.slice(0, 2).map((name, index) => (
// //                   <Badge
// //                     variant="secondary"
// //                     key={selected[index]}
// //                     className="mr-1 mb-1"
// //                     onClick={(e) => {
// //                       e.stopPropagation()
// //                       handleUnselect(selected[index])
// //                     }}
// //                   >
// //                     {name}
// //                     <X className="ml-1 h-3 w-3 cursor-pointer" />
// //                   </Badge>
// //                 ))}
// //                 {selected.length > 2 && (
// //                   <Badge variant="secondary" className="mr-1 mb-1">
// //                     +{selected.length - 2} more
// //                   </Badge>
// //                 )}
// //               </>
// //             )}
// //           </div>
// //           <div className="flex items-center gap-2">
// //             {selected.length > 0 && (
// //               <X
// //                 className="h-4 w-4 cursor-pointer text-muted-foreground hover:text-foreground"
// //                 onClick={(e) => {
// //                   e.stopPropagation()
// //                   handleClearAll()
// //                 }}
// //               />
// //             )}
// //             <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
// //           </div>
// //         </Button>
// //       </PopoverTrigger>
// //       <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
// //         <Command>
// //           <CommandInput placeholder="Search..." />
// //           <CommandList>
// //             <CommandEmpty>No results found.</CommandEmpty>
// //             <CommandGroup>
// //               <CommandItem
// //                 onSelect={handleClearAll}
// //                 className="justify-center text-center"
// //               >
// //                 Clear All
// //               </CommandItem>
// //               {options.map((option, index) => {
// //                 const displayValue = getDisplayValue(option)
// //                 const storedValue = getStoredValue(option)
// //                 return (
// //                   <CommandItem
// //                     key={isObjectOption(option) ? option.id : index}
// //                     onSelect={() => handleSelect(option)}
// //                   >
// //                     <Check
// //                       className={cn(
// //                         "mr-2 h-4 w-4",
// //                         selected.includes(storedValue) ? "opacity-100" : "opacity-0"
// //                       )}
// //                     />
// //                     {displayValue}
// //                   </CommandItem>
// //                 )
// //               })}
// //             </CommandGroup>
// //           </CommandList>
// //         </Command>
// //       </PopoverContent>
// //     </Popover>
// //   )
// // }

// import * as React from "react"
// import { Check, ChevronsUpDown, X } from 'lucide-react'
// import { cn } from "@/lib/utils"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "@/components/ui/command"
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover"

// // Types for the unified component
// type StringOption = string
// type ObjectOption = Record<string, any>
// type Option = StringOption | ObjectOption

// interface UnifiedMultiSelectProps {
//   options: Option[]
//   selected: (string | number)[]
//   onChange: (selected: (string | number)[]) => void
//   placeholder?: string
//   className?: string
//   nameKey?: string // Key to use for display name in objects
//   valueKey?: string // Key to use for stored value in objects
// }

// export function MultiSelect({
//   options,
//   selected,
//   onChange,
//   placeholder = "Select items...",
//   className,
//   nameKey = "name",
//   valueKey = "id",
// }: UnifiedMultiSelectProps) {
//   const [open, setOpen] = React.useState(false)

//   // Helper function to check if option is an object
//   const isObjectOption = (option: Option): option is ObjectOption => {
//     return typeof option === 'object' && option !== null
//   }

//   // Helper function to get display value
//   const getDisplayValue = (option: Option): string => {
//     if (isObjectOption(option)) {
//       return option[nameKey] || String(option[valueKey]) || 'Unknown'
//     }
//     return String(option)
//   }

//   // Helper function to get stored value
//   const getStoredValue = (option: Option): string | number => {
//     if (isObjectOption(option)) {
//       return option[valueKey]
//     }
//     return option
//   }

//   // Helper function to get display name from selected value
//   const getSelectedDisplayName = (value: string | number): string => {
//     const option = options.find(opt => getStoredValue(opt) === value)
//     return option ? getDisplayValue(option) : String(value)
//   }

//   const handleUnselect = (value: string | number) => {
//     onChange(selected.filter((selectedValue) => selectedValue !== value))
//   }

//   const handleSelect = (option: Option) => {
//     const value = getStoredValue(option)
//     if (selected.includes(value)) {
//       handleUnselect(value)
//     } else {
//       onChange([...selected, value])
//     }
//   }

//   const handleClearAll = () => {
//     onChange([])
//   }

//   const selectedDisplayNames = selected.map(value => getSelectedDisplayName(value))

//   return (
//     <Popover open={open} onOpenChange={setOpen}>
//       <PopoverTrigger asChild>
//         <Button
//           variant="outline"
//           role="combobox"
//           aria-expanded={open}
//           className={cn(
//             "w-full justify-between min-h-10 h-auto text-left font-normal",
//             className
//           )}
//         >
//           <div className="flex flex-wrap gap-1 flex-1">
//             {selected.length === 0 && (
//               <span className="text-muted-foreground">{placeholder}</span>
//             )}
//             {selected.length > 0 && (
//               <>
//                 {selectedDisplayNames.slice(0, 2).map((name, index) => (
//                   <Badge
//                     variant="secondary"
//                     key={selected[index]}
//                     className="mr-1 mb-1"
//                     onClick={(e) => {
//                       e.stopPropagation()
//                       handleUnselect(selected[index])
//                     }}
//                   >
//                     {name}
//                     <X className="ml-1 h-3 w-3 cursor-pointer" />
//                   </Badge>
//                 ))}
//                 {selected.length > 2 && (
//                   <Badge variant="secondary" className="mr-1 mb-1">
//                     +{selected.length - 2} more
//                   </Badge>
//                 )}
//               </>
//             )}
//           </div>
//           <div className="flex items-center gap-2">
//             {selected.length > 0 && (
//               <X
//                 className="h-4 w-4 cursor-pointer text-muted-foreground hover:text-foreground"
//                 onClick={(e) => {
//                   e.stopPropagation()
//                   handleClearAll()
//                 }}
//               />
//             )}
//             <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
//           </div>
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
//         <Command>
//           <CommandInput placeholder="Search..." />
//           <CommandList>
//             <CommandEmpty>No results found.</CommandEmpty>
//             <CommandGroup>
//               <CommandItem
//                 onSelect={handleClearAll}
//                 className="justify-center text-center"
//               >
//                 Clear All
//               </CommandItem>
//               {options.map((option, index) => {
//                 const displayValue = getDisplayValue(option)
//                 const storedValue = getStoredValue(option)
//                 const uniqueKey = isObjectOption(option) ? storedValue : index
                
//                 return (
//                   <CommandItem
//                     key={uniqueKey}
//                     onSelect={() => handleSelect(option)}
//                   >
//                     <Check
//                       className={cn(
//                         "mr-2 h-4 w-4",
//                         selected.includes(storedValue) ? "opacity-100" : "opacity-0"
//                       )}
//                     />
//                     {displayValue}
//                   </CommandItem>
//                 )
//               })}
//             </CommandGroup>
//           </CommandList>
//         </Command>
//       </PopoverContent>
//     </Popover>
//   )
// }


import * as React from "react"
import { Check, ChevronsUpDown, X } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList, // Ensure CommandList is imported
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

// Types for the unified component
type StringOption = string
type ObjectOption = Record<string, any>
type Option = StringOption | ObjectOption

interface MultiSelectProps {
  options: Option[]
  selected: (string | number)[]
  onChange: (selected: (string | number)[]) => void
  placeholder?: string
  className?: string
  nameKey?: string // Key to use for display name in objects
  valueKey?: string // Key to use for stored value in objects
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select items...",
  className,
  nameKey = "name",
  valueKey = "id",
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)

  // Helper function to check if option is an object
  const isObjectOption = (option: Option): option is ObjectOption => {
    return typeof option === 'object' && option !== null
  }

  // Helper function to get display value
  const getDisplayValue = (option: Option): string => {
    if (isObjectOption(option)) {
      return option[nameKey] || String(option[valueKey]) || 'Unknown'
    }
    return String(option)
  }

  // Helper function to get stored value
  const getStoredValue = (option: Option): string | number => {
    if (isObjectOption(option)) {
      return option[valueKey]
    }
    return option
  }

  // Helper function to get display name from selected value
  const getSelectedDisplayName = (value: string | number): string => {
    const option = options.find(opt => getStoredValue(opt) === value)
    return option ? getDisplayValue(option) : String(value)
  }

  const handleUnselect = (value: string | number) => {
    onChange(selected.filter((selectedValue) => selectedValue !== value))
  }

  const handleSelect = (option: Option) => {
    const value = getStoredValue(option)
    if (selected.includes(value)) {
      handleUnselect(value)
    } else {
      onChange([...selected, value])
    }
  }

  const handleClearAll = () => {
    onChange([])
  }

  const selectedDisplayNames = selected.map(value => getSelectedDisplayName(value))

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between min-h-10 h-auto text-left font-normal",
            className
          )}
        >
          <div className="flex flex-wrap gap-1 flex-1">
            {selected.length === 0 && (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
            {selected.length > 0 && (
              <>
                {selectedDisplayNames.slice(0, 2).map((name, index) => (
                  <Badge
                    variant="secondary"
                    key={selected[index]}
                    className="mr-1 mb-1"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleUnselect(selected[index])
                    }}
                  >
                    {name}
                    <X className="ml-1 h-3 w-3 cursor-pointer" />
                  </Badge>
                ))}
                {selected.length > 2 && (
                  <Badge variant="secondary" className="mr-1 mb-1">
                    +{selected.length - 2} more
                  </Badge>
                )}
              </>
            )}
          </div>
          <div className="flex items-center gap-2">
            {selected.length > 0 && (
              <X
                className="h-4 w-4 cursor-pointer text-muted-foreground hover:text-foreground"
                onClick={(e) => {
                  e.stopPropagation()
                  handleClearAll()
                }}
              />
            )}
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn(
          "w-[var(--radix-popover-trigger-width)] p-0",
          "flex flex-col" // Use flex-col to stack Command and sticky button
        )}
        align="start"
      >
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList className="max-h-[200px] overflow-y-auto"> {/* Added max-height and overflow-y-auto here */}
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option, index) => {
                const displayValue = getDisplayValue(option)
                const storedValue = getStoredValue(option)
                const uniqueKey = isObjectOption(option) ? storedValue : index
                
                return (
                  <CommandItem
                    key={uniqueKey}
                    onSelect={() => handleSelect(option)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selected.includes(storedValue) ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {displayValue}
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
        {/* Sticky Clear All Button */}
        {selected.length > 0 && (
          <div className="sticky bottom-0 bg-background border-t p-2">
            <Button
              variant="ghost"
              onClick={handleClearAll}
              className="w-full text-center"
            >
              Clear All
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}
