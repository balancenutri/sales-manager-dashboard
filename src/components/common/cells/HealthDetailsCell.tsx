import { Button } from "@/components/ui/button"

type HealthDetails = {
  weight: number | null
  age: number | null
  ibw: number | null
  health_score: number | null
  medical_issue: string[]
  goal: string[]
  health_score_taken_date: string | null
}

type HealthDetailsCellProps = {
  value: HealthDetails
  rowData: any
}

export default function HealthDetailsCell({ value, rowData }: HealthDetailsCellProps) {
  if (!value) return null

  const hasHealthData = value.health_score !== null || value.weight !== null

  return (
    <div className="py-2 min-w-[120px]">
      {hasHealthData ? (
        <div className="space-y-1">
          {value.weight && <div className="text-xs">Weight: {value.weight} kg</div>}
          {value.age && <div className="text-xs">Age: {value.age}</div>}
          {value.health_score && <div className="text-xs">Health Score: {value.health_score}</div>}
          {value.medical_issue && value.medical_issue.length > 0 && (
            <div className="text-xs">Issues: {value.medical_issue.join(", ")}</div>
          )}
          {value.goal && value.goal.length > 0 && <div className="text-xs">Goals: {value.goal.join(", ")}</div>}
        </div>
      ) : (
        <Button size="sm" className="h-7 text-xs bg-blue-500 hover:bg-blue-600">
          Ask For HS
        </Button>
      )}
    </div>
  )
}
