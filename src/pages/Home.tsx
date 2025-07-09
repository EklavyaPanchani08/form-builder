import { FileText } from "lucide-react"
import { useEffect, useState } from "react"
import CreateTemplate from "../components/create-template"
import TemplateComponent from "../components/template-card"
import { Badge } from "../components/ui/badge"
import { Template } from "../lib/types"

export default function Home() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newTemplate, setNewTemplate] = useState<Record<string, string>>({ name: "", description: "" })

  useEffect(() => {
    const savedTemplates = localStorage.getItem("form-templates")
    if (savedTemplates) {
      setTemplates(JSON.parse(savedTemplates))
    }
  }, [])

  const createTemplate = () => {
    if (!newTemplate.name.trim()) return

    const newTemp: Template = {
      id: Date.now().toString(),
      name: newTemplate.name,
      description: newTemplate.description,
      sections: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const updatedTemplates = [...templates, newTemp]
    setTemplates(updatedTemplates)
    localStorage.setItem("form-templates", JSON.stringify(updatedTemplates))

    setNewTemplate({ name: "", description: "" })
    setShowCreateForm(false)
  }

  const deleteTemplate = (id: string) => {
    const updatedTemplates = templates.filter((t) => t.id !== id)
    setTemplates(updatedTemplates)
    localStorage.setItem("form-templates", JSON.stringify(updatedTemplates))
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <>
      {/* HEADER */}
      <div className="border-b border-gray-800/50 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold text-white tracking-tight">Form Template Builder</h1>
              <p className="text-gray-400 text-base">Create and manage your form templates with ease</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge
                variant="secondary"
                className="px-3 py-1.5 text-sm font-medium bg-gray-800/80 text-gray-300 border border-gray-700/50"
              >
                {templates.length}/5 Templates
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* CREATE NEW TEMPLATE */}
          <CreateTemplate
            templates={templates}
            showCreateForm={showCreateForm}
            setShowCreateForm={setShowCreateForm}
            newTemplate={newTemplate}
            setNewTemplate={setNewTemplate}
            createTemplate={createTemplate}
          />
          {/* ALL TEMPLATES LIST */}
          {templates.map((template) => (
            <TemplateComponent
              key={template.id}
              template={template}
              deleteTemplate={deleteTemplate}
              formatDate={formatDate}
            />
          ))}
        </div>

        {/* EMPTY */}
        {templates.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto bg-gray-800/50 rounded-2xl flex items-center justify-center mb-6">
              <FileText className="h-10 w-10 text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No templates yet</h3>
            <p className="text-gray-400 max-w-md mx-auto">
              Create your first form template to get started with building dynamic forms.
            </p>
          </div>
        )}

        {/* MAX TEMPLATES REACHED */}
        {templates.length === 5 && (
          <div className="mt-12 text-center py-8 px-6 bg-gray-900/40 border border-gray-800/50 rounded-xl backdrop-blur-sm">
            <div className="w-16 h-16 mx-auto bg-amber-500/10 rounded-2xl flex items-center justify-center mb-4">
              <FileText className="h-8 w-8 text-amber-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Template limit reached</h3>
            <p className="text-gray-400 max-w-md mx-auto">
              You've reached the maximum of 5 templates. Delete a template to create a new one.
            </p>
          </div>
        )}
      </div>
    </>
  )
}
