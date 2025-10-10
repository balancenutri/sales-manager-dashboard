import { DataTable } from "@/components/common/Table"
import { generateHeadersAndAccessors } from "@/lib/tableHeaders"

// Sample data
const data = [
  {
    user_details: {
      user_id: 130994,
      user_name: "Dhwani S",
      email_id: "sonde.dhwani12@gmail.com",
      phone_number: "91 8779424421",
      user_current_source: "Consultation",
      wallet: 0,
      sub_sales_status: "RATE SHARED",
      status: "Lead",
      user_created_at: "2025-10-08T08:25:26.000Z",
      app_updated: "(App Not Updated)",
    },
    health_details: {
      weight: null,
      age: null,
      ibw: null,
      health_score: null,
      medical_issue: [],
      goal: [],
      health_score_taken_date: null,
    },
    suggested_program_details: {
      suggested_id: 88178,
      suggested_program_id: 2,
      suggested_program_session_id: 3,
      suggested_program_name: "BEAT PCOS",
      suggested_program_duration: "(90 Day)",
      suggested_program_mrp: 16999,
      suggested_program_qtd: "10200",
      suggested_date: "08 Oct 2025",
      suggested_days_ago: "(2 Days ago)",
      suggested_by: "Krishna Sidhpura",
      suggested_payment_mode: null,
      suggested_payment_details: null,
      suggested_payment_link_shared: false,
      suggested_payment_link_expiry: false,
      suggested_payment_link: null,
      suggested_mentor_note: null,
      suggested_motivation_level: null,
      message: "<span>No valid payment mode selected.</span>",
    },
    next_follow_up: {
      prev_follow_up_id: null,
      prev_follow_up_date: null,
      prev_follow_up_type: null,
      prev_appointment_slots: null,
      prev_follow_up_note: null,
      next_follow_up_id: 15248,
      next_follow_up_date: "2025-10-09T18:30:00.000Z",
      next_follow_up_type: "1",
      next_appointment_slots: "06:00 pm - 06:20 pm",
      next_follow_up_note: "",
      key_insights: {
        lifestyle: "[]",
        health_history: null,
        target_oriented: null,
        meal_management: null,
        frequency: null,
        consultation_note:
          "History \nAge-26\nWt-5\nHt-60\nSleep-disturbed from last 1 month\nnuclear, self cooks when at home\nKeep traveling due to job\n7-8 days in different cities\nNever tried the diet\n\nConcerns\nWants to conceive (trying from the last 6 months)\nDiagonsed with PCOS in 2013\nIrregular periods\n\nGoal\n loose weight, correct PCOS and infertility issue\n\nLocated- Mumbai\n\nHUSBAND \nAge-30\nWt-6.1\nHt-75\nStays in Us\nAlternate month comes in India\n\nSuggested plan for her Beat Pcos 90 days",
        communication: "Asking Queries",
        awareness_level: "Medium",
        motivational_level: "Medium",
        language: "English",
        special_note: null,
        suggested_program: {
          program_name: "BEAT PCOS",
          program_amount: "10200",
        },
      },
      follow_up_id: 15248,
    },
  },
]

export default function Home() {
  const tableData = generateHeadersAndAccessors(
    { data },
    [], // hiddenColumns
    [], // hiddenData
  )

  return (
    <div className="container mx-auto py-6">
      <DataTable
        columns={tableData.columns}
        data={tableData.data}
        showPagination={true}
        showColumnVisibility={false}
        pageSize={10}
      />
    </div>
  )
}
