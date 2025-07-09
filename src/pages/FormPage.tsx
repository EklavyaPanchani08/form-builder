import { AlertCircle, ArrowLeft, Send } from "lucide-react"
import type React from "react"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import FieldRenderer from "../components/field-renderer"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Template } from "../lib/types"

export default function FormPage() {
  const params = useParams()
  const navigation = useNavigate()
  const [template, setTemplate] = useState<Template | null>(null)
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const savedTemplates = localStorage.getItem("form-templates")
    if (savedTemplates) {
      const templates = JSON.parse(savedTemplates)
      const currentTemplate = templates.find((t: Template) => t.id === params.id)
      if (currentTemplate) {
        setTemplate(currentTemplate)
      } else {
        navigation("/")
      }
    }
  }, [params.id, navigation])

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: value,
    }))

    // Clear error when user starts typing
    if (errors[fieldId]) {
      setErrors((prev) => ({
        ...prev,
        [fieldId]: "",
      }))
    }
  }

  const validateForm = () => {
    if (!template) return false

    const newErrors: Record<string, string> = {}

    template.sections.forEach((section) => {
      section.fields.forEach((field) => {
        if (field.required) {
          const value = formData[field.id]
          if (!value || (typeof value === "string" && !value.trim())) {
            newErrors[field.id] = `${field.label} is required`
          }
        }

        // Type validation
        if (formData[field.id] && field.type === "number") {
          const numValue = Number(formData[field.id])
          if (isNaN(numValue)) {
            newErrors[field.id] = `${field.label} must be a valid number`
          }
        }
      })
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    // SAVE FORM SUBMISSION TO LOCALSTORAGE
    const submission = {
      id: Date.now().toString(),
      templateId: template?.id,
      templateName: template?.name,
      data: formData,
      submittedAt: new Date().toISOString(),
    }

    const savedSubmissions = localStorage.getItem("form-submissions")
    const submissions = savedSubmissions ? JSON.parse(savedSubmissions) : []
    submissions.push(submission)
    localStorage.setItem("form-submissions", JSON.stringify(submissions))

    setIsSubmitting(false)
    navigation("/")
  }

  if (!template)
    return (
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-400">Loading form...</p>
      </div>
    )
  return (
    <>
      {/* HEADER */}
      <div className="bg-gray-900/80 border-b border-gray-800/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <a href="/">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg px-3 py-2"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </a>
              <div className="h-6 w-px bg-gray-700"></div>
              <div>
                <h1 className="text-xl font-semibold text-white">{template.name}</h1>
                <p className="text-sm text-gray-400">Fill out this form</p>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              {template.sections.reduce((acc, section) => acc + section.fields.filter((f) => f.required).length, 0)}{" "}
              required fields
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          <Card className="bg-gray-900/60 border border-gray-800/50 shadow-2xl backdrop-blur-sm">
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl font-bold text-white">{template.name}</CardTitle>
              {template.description && (
                <p className="text-gray-400 text-base leading-relaxed mt-2">{template.description}</p>
              )}
            </CardHeader>
            <CardContent className="space-y-10">
              {template.sections.map((section, sectionIndex) => (
                <div key={section.id} className="space-y-8">
                  <div className="flex items-center gap-4 pb-4 border-b border-gray-800/50">
                    <div className="w-8 h-8 bg-primary-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-primary-300 text-sm font-semibold">{sectionIndex + 1}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white">{section.title}</h3>
                    <div className="flex-1"></div>
                    <div className="text-sm text-gray-500">
                      {section.fields.length} field{section.fields.length !== 1 ? "s" : ""}
                    </div>
                  </div>
                  <div className="pl-12 space-y-8">
                    {section.fields.map((field) => (
                      <div key={field.id} className="space-y-2">
                        <FieldRenderer
                          field={field}
                          value={formData[field.id]}
                          onChange={(value: any) => handleFieldChange(field.id, value)}
                          error={errors[field.id]}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* ERROR SECTION */}
              {Object.keys(errors).length > 0 && (
                <div className="p-4 bg-red-900/20 border border-red-800/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="h-5 w-5 text-red-400" />
                    <h4 className="font-medium text-red-300">Please fix the following errors:</h4>
                  </div>
                  <ul className="text-sm text-red-400 space-y-1 ml-7">
                    {Object.values(errors).map((error, index) => (
                      <li key={index}>• {error}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex justify-end pt-8 border-t border-gray-800/50">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary-500 hover:bg-primary-600 disabled:bg-gray-700 disabled:text-gray-500 text-white rounded-lg px-8 py-3 font-medium transition-all duration-200 hover:shadow-lg hover:shadow-primary-500/25"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Submit Form
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </>
  )
}
