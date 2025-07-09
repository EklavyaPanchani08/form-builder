import { Eye, Layout } from "lucide-react"
import FieldRenderer from "./field-renderer"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Template } from "../lib/types"
import React from "react"

const PreviewTemplate = ({ template }: { template: Template }) => {
    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-6 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500/10 border border-primary-500/20 rounded-full text-primary-300 text-sm font-medium">
                    <Eye className="h-4 w-4" />
                    Preview Mode
                </div>
            </div>
            <Card className="bg-gray-900/60 border border-gray-800/50 shadow-2xl backdrop-blur-sm">
                <CardHeader className="pb-6">
                    <CardTitle className="text-2xl font-bold text-white">{template.name}</CardTitle>
                    {template.description && (
                        <p className="text-gray-400 text-base leading-relaxed mt-2">{template.description}</p>
                    )}
                </CardHeader>
                <CardContent className="space-y-8">
                    {template.sections.map((section, index) => (
                        <div key={section.id} className="space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-primary-500/20 rounded-lg flex items-center justify-center">
                                    <span className="text-primary-300 text-sm font-semibold">{index + 1}</span>
                                </div>
                                <h3 className="text-xl font-semibold text-white">{section.title}</h3>
                            </div>
                            <div className="pl-11 space-y-6">
                                {section.fields.map((field) => (
                                    <FieldRenderer key={field.id} field={field} />
                                ))}
                            </div>
                        </div>
                    ))}
                    {template.sections.length === 0 && (
                        <div className="text-center py-12">
                            <Layout className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                            <p className="text-gray-400">No sections added yet. Switch to edit mode to get started.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
export default React.memo(PreviewTemplate)