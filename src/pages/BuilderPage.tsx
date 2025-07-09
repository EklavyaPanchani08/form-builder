import { ArrowLeft, Eye, Pencil, Save } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import EditTemplate from "../components/edit-template"
import PreviewTemplate from "../components/preview-template"
import { Button } from "../components/ui/button"
import { Field, Section, Template } from "../lib/types"

export default function BuilderPage() {
  const params = useParams()
  const navigator = useNavigate()
  const [template, setTemplate] = useState<Template | null>(null)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [editingField, setEditingField] = useState<Field | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [newSectionTitle, setNewSectionTitle] = useState("")

  useEffect(() => {
    const savedTemplates = localStorage.getItem("form-templates")
    if (savedTemplates) {
      const templates = JSON.parse(savedTemplates)
      const currentTemplate = templates.find((t: Template) => t.id === params.id)
      if (currentTemplate) {
        setTemplate(currentTemplate)
      } else {
        navigator("/")
      }
    }
  }, [params.id, navigator])

  const saveTemplate = () => {
    if (!template) return

    const savedTemplates = localStorage.getItem("form-templates")
    if (savedTemplates) {
      const templates = JSON.parse(savedTemplates)
      const updatedTemplates = templates.map((t: Template) =>
        t.id === template.id ? { ...template, updatedAt: new Date().toISOString() } : t,
      )
      localStorage.setItem("form-templates", JSON.stringify(updatedTemplates))
    }
  }

  const addSection = () => {
    if (!template || !newSectionTitle.trim()) return

    const newSection: Section = {
      id: Date.now().toString(),
      title: newSectionTitle,
      fields: [],
    }

    setTemplate({
      ...template,
      sections: [...template.sections, newSection],
    })
    setNewSectionTitle("")
  }

  const deleteSection = (sectionId: string) => {
    if (!template) return

    setTemplate({
      ...template,
      sections: template.sections.filter((s) => s.id !== sectionId),
    })
  }

  const addField = (sectionId: string) => {
    const newField: Field = {
      id: Date.now().toString(),
      type: "text",
      label: "New Field",
      labelStyle: "h3",
      required: false,
    }

    setEditingField(newField)
    setActiveSection(sectionId)
  }

  const saveField = (field: Field) => {
    if (!template || !activeSection) return

    setTemplate({
      ...template,
      sections: template.sections.map((section) =>
        section.id === activeSection
          ? {
            ...section,
            fields:
              editingField &&
                template.sections.find((s) => s.id === activeSection)?.fields.find((f) => f.id === editingField.id)
                ? section.fields.map((f) => (f.id === field.id ? field : f))
                : [...section.fields, field],
          }
          : section,
      ),
    })

    setEditingField(null)
    setActiveSection(null)
  }

  const deleteField = (sectionId: string, fieldId: string) => {
    if (!template) return

    setTemplate({
      ...template,
      sections: template.sections.map((section) =>
        section.id === sectionId ? { ...section, fields: section.fields.filter((f) => f.id !== fieldId) } : section,
      ),
    })
  }

  const onDragEnd = (result: any) => {
    if (!result.destination || !template) return

    const { source, destination } = result
    const newSections = Array.from(template.sections)
    const [reorderedSection] = newSections.splice(source.index, 1)
    newSections.splice(destination.index, 0, reorderedSection)

    setTemplate({
      ...template,
      sections: newSections,
    })
  }

  if (!template)
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading template...</p>
        </div>
      </div>
    )

  return (
    <>
      {/* Header */}
      <div className="bg-gray-900/80 border-b border-gray-800/50 backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4">
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
                <p className="text-sm text-gray-400">{template.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => setShowPreview(!showPreview)}
                className="border-gray-700/50 text-gray-300 hover:bg-gray-800/50 hover:text-white rounded-lg px-4 py-2 font-medium transition-all duration-200 bg-transparent"
              >
                {showPreview ? <Pencil className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                {showPreview ? "Edit" : "Preview"}
              </Button>
              <Button
                onClick={saveTemplate}
                className="bg-primary-500 hover:bg-primary-600 text-white rounded-lg px-4 py-2 font-medium transition-all duration-200 hover:shadow-lg hover:shadow-primary-500/25"
              >
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <a href={`/form/${template.id}`}>
                <Button
                  variant="outline"
                  className="border-gray-700/50 text-gray-300 hover:bg-gray-800/50 hover:text-white rounded-lg px-4 py-2 font-medium transition-all duration-200 bg-transparent"
                >
                  View Form
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {showPreview ? (
          /* PREVIEW MODE */
          <PreviewTemplate template={template} />
        ) : (
          /* EDIT MODE */
          <EditTemplate
            template={template}
            setActiveSection={setActiveSection}
            editingField={editingField}
            setEditingField={setEditingField}
            addSection={addSection}
            deleteSection={deleteSection}
            addField={addField}
            saveField={saveField}
            deleteField={deleteField}
            onDragEnd={onDragEnd}
            newSectionTitle={newSectionTitle}
            setNewSectionTitle={setNewSectionTitle}
          />
        )}
      </div>
    </>
  )
}
