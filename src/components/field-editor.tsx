import React, { useState, useEffect } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Switch } from "../components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { X, Plus, Type, Hash, ToggleLeft, ChevronDown, Trash2 } from "lucide-react"

interface Field {
  id: string
  type: "text" | "number" | "boolean" | "enum"
  label: string
  labelStyle: "h1" | "h2" | "h3"
  required: boolean
  options?: string[]
}

interface FieldEditorProps {
  field: Field
  onSave: (field: Field) => void
  onCancel: () => void
}
const FieldEditor = ({ field, onSave, onCancel }: FieldEditorProps) =>{
  const [editedField, setEditedField] = useState<Field>(field)
  const [newOption, setNewOption] = useState("")

  useEffect(() => {
    setEditedField(field)
  }, [field])

  const handleSave = () => {
    onSave(editedField)
  }

  const addOption = () => {
    if (!newOption.trim()) return

    setEditedField((prev) => ({
      ...prev,
      options: [...(prev.options || []), newOption.trim()],
    }))
    setNewOption("")
  }

  const removeOption = (index: number) => {
    setEditedField((prev) => ({
      ...prev,
      options: prev.options?.filter((_, i) => i !== index),
    }))
  }

  const fieldTypeIcons = {
    text: Type,
    number: Hash,
    boolean: ToggleLeft,
    enum: ChevronDown,
  }

  const FieldIcon = fieldTypeIcons[editedField.type]

  return (
    <Card className="bg-gray-900/60 border border-gray-800/50 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary-500/20 rounded-lg flex items-center justify-center">
              <FieldIcon className="h-4 w-4 text-primary-300" />
            </div>
            <span>Field Editor</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onCancel}
            className="text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg p-2 transition-all duration-200"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label className="text-gray-300 text-sm font-medium">Field Type</Label>
          <Select
            value={editedField.type}
            onValueChange={(value: Field["type"]) => setEditedField((prev) => ({ ...prev, type: value }))}
          >
            <SelectTrigger className="bg-gray-800/50 border-gray-700/50 text-white rounded-lg h-11 focus:border-primary-500/50 focus:ring-primary-500/20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700 rounded-lg">
              <SelectItem value="text" className="text-white hover:bg-gray-700 rounded-md">
                <div className="flex items-center gap-2">
                  <Type className="h-4 w-4" />
                  Text
                </div>
              </SelectItem>
              <SelectItem value="number" className="text-white hover:bg-gray-700 rounded-md">
                <div className="flex items-center gap-2">
                  <Hash className="h-4 w-4" />
                  Number
                </div>
              </SelectItem>
              <SelectItem value="boolean" className="text-white hover:bg-gray-700 rounded-md">
                <div className="flex items-center gap-2">
                  <ToggleLeft className="h-4 w-4" />
                  Boolean
                </div>
              </SelectItem>
              <SelectItem value="enum" className="text-white hover:bg-gray-700 rounded-md">
                <div className="flex items-center gap-2">
                  <ChevronDown className="h-4 w-4" />
                  Dropdown
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label className="text-gray-300 text-sm font-medium">Label</Label>
          <Input
            value={editedField.label}
            onChange={(e) => setEditedField((prev) => ({ ...prev, label: e.target.value }))}
            placeholder="Enter field label"
            className="bg-gray-800/50 border-gray-700/50 text-white placeholder:text-gray-500 focus:border-primary-500/50 focus:ring-primary-500/20 rounded-lg h-11"
          />
        </div>

        <div className="space-y-3">
          <Label className="text-gray-300 text-sm font-medium">Label Style</Label>
          <Select
            value={editedField.labelStyle}
            onValueChange={(value: "h1" | "h2" | "h3") => setEditedField((prev) => ({ ...prev, labelStyle: value }))}
          >
            <SelectTrigger className="bg-gray-800/50 border-gray-700/50 text-white rounded-lg h-11 focus:border-primary-500/50 focus:ring-primary-500/20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700 rounded-lg">
              <SelectItem value="h1" className="text-white hover:bg-gray-700 rounded-md">
                <div className="space-y-1">
                  <div className="font-semibold">Heading 1</div>
                  <div className="text-xs text-gray-400">Large heading</div>
                </div>
              </SelectItem>
              <SelectItem value="h2" className="text-white hover:bg-gray-700 rounded-md">
                <div className="space-y-1">
                  <div className="font-semibold">Heading 2</div>
                  <div className="text-xs text-gray-400">Medium heading</div>
                </div>
              </SelectItem>
              <SelectItem value="h3" className="text-white hover:bg-gray-700 rounded-md">
                <div className="space-y-1">
                  <div className="font-semibold">Heading 3</div>
                  <div className="text-xs text-gray-400">Small heading</div>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between px-3 py-2 bg-gray-800/30 border border-gray-700/30 rounded-lg">
          <div className="space-y-1">
            <Label className="text-gray-300 text-sm font-medium">Required Field</Label>
            <p className="text-xs text-gray-500">Make this field mandatory</p>
          </div>
          <Switch
            checked={editedField.required}
            onCheckedChange={(checked) => setEditedField((prev) => ({ ...prev, required: checked }))}
          />
        </div>

        {editedField.type === "enum" && (
          <div className="space-y-3">
            <Label className="text-gray-300 text-sm font-medium">Dropdown Options</Label>
            <div className="space-y-3">
              {editedField.options?.map((option, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="flex-1 flex items-center justify-between px-3 py-1 bg-gray-800/30 border border-gray-700/30 rounded-lg">
                    <span className="text-white text-sm">{option}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeOption(index)}
                      className="text-gray-500 hover:text-red-400 hover:bg-red-900/20 rounded-md p-1.5 transition-all duration-200"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
              <div className="flex gap-2">
                <Input
                  value={newOption}
                  onChange={(e) => setNewOption(e.target.value)}
                  placeholder="Add new option"
                  onKeyPress={(e) => e.key === "Enter" && addOption()}
                  className="bg-gray-800/50 border-gray-700/50 text-white placeholder:text-gray-500 focus:border-primary-500/50 focus:ring-primary-500/20 rounded-lg h-10"
                />
                <Button
                  onClick={addOption}
                  disabled={!newOption.trim()}
                  className="bg-primary-500 hover:bg-primary-600 disabled:bg-gray-700 disabled:text-gray-500 text-white rounded-lg px-4 py-2 font-medium transition-all duration-200"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {(!editedField.options || editedField.options.length === 0) && (
                <div className="text-center py-6 text-gray-500">
                  <ChevronDown className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No options added yet</p>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex gap-3 pt-4 border-t border-gray-800/50">
          <Button
            onClick={handleSave}
            className="flex-1 bg-primary-500 hover:bg-primary-600 text-white rounded-lg h-11 font-medium transition-all duration-200 hover:shadow-lg hover:shadow-primary-500/25"
          >
            Save Field
          </Button>
          <Button
            variant="outline"
            onClick={onCancel}
            className="flex-1 border-gray-700/50 text-gray-300 hover:bg-gray-800/50 hover:text-white rounded-lg h-11 font-medium transition-all duration-200 bg-transparent"
          >
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default React.memo(FieldEditor)