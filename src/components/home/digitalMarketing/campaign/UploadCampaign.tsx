import type React from "react"
import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Upload, X, FileSpreadsheet } from "lucide-react"
import { useUplaodAdPerformanceReportMutation } from "@/service/dashboard/api"
import { toast } from "sonner"

interface UploadReportModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function UploadReportModal({ open, onOpenChange }: UploadReportModalProps) {
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [uploadReport, { isLoading }] = useUplaodAdPerformanceReportMutation()

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && isExcelFile(droppedFile)) {
      setFile(droppedFile)
    } else {
      toast.error("Please upload a valid Excel file (.xlsx or .xls)")
    }
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && isExcelFile(selectedFile)) {
      setFile(selectedFile)
    } else {
      toast.error("Please upload a valid Excel file (.xlsx or .xls)")
    }
  }

  const isExcelFile = (file: File) => {
    const validTypes = ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel"]
    const validExtensions = [".xlsx", ".xls"]
    return validTypes.includes(file.type) || validExtensions.some((ext) => file.name.toLowerCase().endsWith(ext))
  }

  const handleRemoveFile = () => {
    setFile(null)
  }

  const handleSubmit = async () => {
    if (!file) {
      toast.error("Please select a file to upload")
      return
    }

    try {
      const formData = new FormData()
      formData.append("file", file)

      await uploadReport(formData as any).unwrap()
      toast.success("Report uploaded successfully!")
      setFile(null)
      onOpenChange(false)
    } catch (error: any) {
      toast.error(error?.data?.message)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i]
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Upload Ad Performance Report</DialogTitle>
          <DialogDescription>Upload an Excel file (.xlsx or .xls) containing ad performance data</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Drag and Drop Area */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50"
            }`}
          >
            <div className="flex flex-col items-center gap-2">
              <Upload className="h-10 w-10 text-muted-foreground" />
              <div className="space-y-1">
                <p className="text-sm font-medium">Drag and drop your file here</p>
                <p className="text-xs text-muted-foreground">or</p>
              </div>
              <Input
                id="file-upload"
                type="file"
                accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                onChange={handleFileChange}
                className="hidden"
              />
              <Button
                variant="outline"
                size="sm"
                type="button"
                onClick={() => document.getElementById("file-upload")?.click()}
              >
                Browse Files
              </Button>
              <p className="text-xs text-muted-foreground mt-2">Only Excel files (.xlsx, .xls) are accepted</p>
            </div>
          </div>

          {/* File Preview */}
          {file && (
            <div className="border rounded-lg p-4 bg-muted/50">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <FileSpreadsheet className="h-6 w-6 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={handleRemoveFile} className="h-8 w-8">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setFile(null)
                onOpenChange(false)
              }}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={!file || isLoading} className="min-w-[100px]">
              {isLoading ? "Uploading..." : "Upload"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
