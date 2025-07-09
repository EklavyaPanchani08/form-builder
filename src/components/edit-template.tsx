import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd"
import { GripVertical, Layout, Pen, Plus, Settings, Trash2 } from "lucide-react"
import FieldEditor from "./field-editor"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Field, Template } from "../lib/types"
import React from "react"

interface EditTemplateProps {
    newSectionTitle: string;
    setNewSectionTitle: React.Dispatch<React.SetStateAction<string>>;
    addSection: () => void;
    template: Template;
    addField: (sectionId: string) => void;
    deleteSection: (sectionId: string) => void;
    deleteField: (sectionId: string, fieldId: string) => void;
    saveField: (field: Field) => void;
    setEditingField: React.Dispatch<React.SetStateAction<Field | null>>;
    setActiveSection: React.Dispatch<React.SetStateAction<string | null>>;
    editingField: Field | null;
    onDragEnd: (result: any) => void;
}
const EditTemplate = ({ newSectionTitle, setNewSectionTitle, addSection, template, addField, deleteSection, setEditingField, setActiveSection, deleteField, saveField, editingField, onDragEnd }: EditTemplateProps) => {
    return (
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* MAIN CONTENT */}
            <div className="xl:col-span-3 space-y-6">
                {/* Add Section */}
                <Card className="bg-gray-900/60 border border-gray-800/50 backdrop-blur-sm">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="flex-1">
                                <Input
                                    placeholder="Enter section title..."
                                    value={newSectionTitle}
                                    onChange={(e) => setNewSectionTitle(e.target.value)}
                                    className="bg-gray-800/50 border-gray-700/50 text-white placeholder:text-gray-500 focus:border-primary-500/50 focus:ring-primary-500/20 rounded-lg h-11"
                                    onKeyPress={(e) => e.key === "Enter" && addSection()}
                                />
                            </div>
                            <Button
                                onClick={addSection}
                                disabled={!newSectionTitle.trim()}
                                className="bg-primary-500 hover:bg-primary-600 disabled:bg-gray-700 disabled:text-gray-500 text-white rounded-lg px-6 py-2.5 font-medium transition-all duration-200"
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Add Section
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* SECTIONS */}
                <DragDropContext onDragEnd={onDragEnd}>
                    {template.sections.map((section, sectionIndex) => (
                        <Card
                            key={section.id}
                            className="bg-gray-900/60 border border-gray-800/50 backdrop-blur-sm transition-all duration-200 hover:border-gray-700/50"
                        >
                            <CardHeader className="pb-4">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-primary-500/20 rounded-lg flex items-center justify-center">
                                            <span className="text-primary-300 text-sm font-semibold">
                                                {sectionIndex + 1}
                                            </span>
                                        </div>
                                        <CardTitle className="text-xl font-semibold text-white">
                                            {section.title}
                                        </CardTitle>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Badge
                                            variant="secondary"
                                            className="bg-gray-800/50 text-gray-400 border border-gray-700/50"
                                        >
                                            {section.fields.length} fields
                                        </Badge>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => addField(section.id)}
                                            className="border-gray-700/50 text-gray-300 hover:bg-gray-800/50 hover:text-white rounded-lg px-3 py-2 font-medium transition-all duration-200 bg-transparent"
                                        >
                                            <Plus className="h-4 w-4 mr-2" />
                                            Add Field
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => deleteSection(section.id)}
                                            className="text-gray-500 hover:text-red-400 hover:bg-red-900/20 rounded-lg p-2 transition-all duration-200"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <Droppable droppableId={section.id}>
                                    {(provided, snapshot) => (
                                        <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            className={`space-y-3 min-h-[60px] rounded-lg transition-all duration-200 ${snapshot.isDraggingOver
                                                ? "bg-primary-500/5 border-2 border-dashed border-primary-500/30 p-3"
                                                : ""
                                                }`}
                                        >
                                            {section.fields.map((field, index) => (
                                                <Draggable key={field.id} draggableId={field.id} index={index}>
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            className={`group flex items-center gap-4 p-4 bg-gray-800/40 border border-gray-700/30 rounded-lg transition-all duration-200 ${snapshot.isDragging
                                                                ? "shadow-xl shadow-black/20 rotate-1 scale-105"
                                                                : "hover:bg-gray-800/60 hover:border-gray-600/50"
                                                                }`}
                                                        >
                                                            <div
                                                                {...provided.dragHandleProps}
                                                                className="p-1 hover:bg-gray-700/50 rounded cursor-grab active:cursor-grabbing transition-colors duration-200"
                                                            >
                                                                <GripVertical className="h-4 w-4 text-gray-500" />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <div className="flex items-center gap-3 mb-1">
                                                                    <Badge
                                                                        variant="secondary"
                                                                        className="bg-gray-700/50 text-gray-300 text-xs px-2 py-1 hover:bg-none"
                                                                    >
                                                                        {field.type}
                                                                    </Badge>
                                                                    <Badge
                                                                        variant="outline"
                                                                        className="border-gray-600/50 text-gray-400 text-xs px-2 py-1 hover:bg-none"
                                                                    >
                                                                        {field.labelStyle.toUpperCase()}
                                                                    </Badge>
                                                                    {field.required && (
                                                                        <Badge className="bg-red-900/30 text-red-300 border border-red-800/50 text-xs px-2 py-1 hover:bg-none">
                                                                            Required
                                                                        </Badge>
                                                                    )}
                                                                </div>
                                                                <p className="font-medium text-white truncate">{field.label}</p>
                                                            </div>
                                                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    onClick={() => {
                                                                        setEditingField(field)
                                                                        setActiveSection(section.id)
                                                                    }}
                                                                    className="text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg p-2 font-medium transition-all duration-200"
                                                                >
                                                                    <Pen className="h-4 w-4" />
                                                                </Button>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    onClick={() => deleteField(section.id, field.id)}
                                                                    className="text-gray-500 hover:text-red-400 hover:bg-red-900/20 rounded-lg p-2 transition-all duration-200"
                                                                >
                                                                    <Trash2 className="h-4 w-4" />
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                            {section.fields.length === 0 && !snapshot.isDraggingOver && (
                                                <div className="text-center py-8 text-gray-500">
                                                    <Plus className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                                    <p className="text-sm">No fields yet. Click "Add Field" to get started.</p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </Droppable>
                            </CardContent>
                        </Card>
                    ))}
                    {template.sections.length === 0 && (
                        <div className="text-center py-16">
                            <Layout className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-white mb-2">No sections yet</h3>
                            <p className="text-gray-400 max-w-md mx-auto">
                                Add your first section above to start building your form template.
                            </p>
                        </div>
                    )}
                </DragDropContext>
            </div>

            {/* FIELD EDITOR SIDEBAR */}
            <div className="xl:col-span-1">
                <div className="sticky top-24">
                    {editingField ? (
                        <FieldEditor
                            field={editingField}
                            onSave={saveField}
                            onCancel={() => {
                                setEditingField(null)
                                setActiveSection(null)
                            }}
                        />
                    ) : (
                        <Card className="bg-gray-900/60 border border-gray-800/50 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-white flex items-center gap-2">
                                    <Settings className="h-5 w-5" />
                                    Field Editor
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-center py-8">
                                    <div className="w-12 h-12 bg-gray-800/50 rounded-xl flex items-center justify-center mx-auto mb-4">
                                        <Settings className="h-6 w-6 text-gray-500" />
                                    </div>
                                    <p className="text-gray-400 text-sm leading-relaxed">
                                        Select a field to edit its properties, or add a new field to get started.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    )
}
export default React.memo(EditTemplate)