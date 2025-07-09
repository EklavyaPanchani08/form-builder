import { Calendar, Eye, FileText, Layers, Trash2 } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Template } from "../lib/types"

interface TemplateProps {
  template: Template
  deleteTemplate: (id: string) => void
  formatDate: (date: string) => string
}
export default function TemplateComponent({template,deleteTemplate,formatDate}: TemplateProps) {
  return (
    <Card
      key={template.id}
      className="group relative overflow-hidden bg-gray-900/60 border border-gray-800/50 hover:border-gray-700/50 transition-all duration-300 hover:shadow-xl hover:shadow-black/20 backdrop-blur-sm"
    >
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start gap-3">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg font-semibold text-white truncate group-hover:text-primary-300 transition-colors duration-200">
              {template.name}
            </CardTitle>
            {template.description && (
              <CardDescription className="mt-2 text-gray-400 text-sm leading-relaxed line-clamp-2">
                {template.description}
              </CardDescription>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => deleteTemplate(template.id)}
            className="text-gray-500 hover:text-red-400 hover:bg-red-900/20 rounded-lg p-2 transition-all duration-200 opacity-0 group-hover:opacity-100"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-5">
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1.5 text-gray-400">
            <Layers className="h-4 w-4" />
            <span>{template.sections.length} sections</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-400">
            <FileText className="h-4 w-4" />
            <span>{template.sections.reduce((acc, section) => acc + section.fields.length, 0)} fields</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <Calendar className="h-3.5 w-3.5" />
          <span>Updated {formatDate(template.updatedAt)}</span>
        </div>

        <div className="flex gap-2 pt-2">
          <a href={`/builder/${template.id}`} className="flex-1">
            <Button className="w-full bg-primary-500 hover:bg-primary-600 text-white rounded-lg h-10 font-medium transition-all duration-200 hover:shadow-lg hover:shadow-primary-500/25">
              <FileText className="h-4 w-4 mr-2" />
              Edit Template
            </Button>
          </a>
          <a href={`/form/${template.id}`}>
            <Button
              variant="outline"
              className="border-gray-700/50 text-gray-300 hover:bg-gray-800/50 hover:text-white hover:border-gray-600/50 rounded-lg h-10 px-4 font-medium transition-all duration-200 bg-transparent"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </a>
        </div>
      </CardContent>
    </Card>
  )
}