import React from "react"
import { Input } from "../components/ui/input"
import { Switch } from "../components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"

interface Field {
  id: string
  type: "text" | "number" | "boolean" | "enum"
  label: string
  labelStyle: "h1" | "h2" | "h3"
  required: boolean
  options?: string[]
}

interface FieldRendererProps {
  field: Field
  value?: any
  onChange?: (value: any) => void
  error?: string
}

const FieldRenderer = ({ field, value, onChange, error }: FieldRendererProps) => {
  const renderLabel = () => {
    const HeadingTag = field.labelStyle
    const headingClasses = {
      h1: "text-3xl font-bold text-white mb-3",
      h2: "text-2xl font-semibold text-white mb-3",
      h3: "text-lg font-medium text-white mb-2",
    }

    return React.createElement(
      HeadingTag,
      { className: headingClasses[HeadingTag] },
      <>
        {field.label}
        {field.required && <span className="text-red-400 ml-1">*</span>}
      </>,
    )
  }

  const renderField = () => {
    switch (field.type) {
      case "text":
        return (
          <div className="space-y-3">
            {renderLabel()}
            <Input
              id={field.id}
              value={value || ""}
              onChange={(e) => onChange?.(e.target.value)}
              className={`bg-gray-800/50 border-gray-700/50 text-white placeholder:text-gray-500 focus:border-primary-500/50 focus:ring-primary-500/20 rounded-lg h-12 ${
                error ? "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20" : ""
              }`}
              placeholder={`Enter ${field.label.toLowerCase()}...`}
            />
            {error && (
              <p className="text-sm text-red-400 flex items-center gap-1">
                <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                {error}
              </p>
            )}
          </div>
        )

      case "number":
        return (
          <div className="space-y-3">
            {renderLabel()}
            <Input
              id={field.id}
              type="number"
              value={value || ""}
              onChange={(e) => onChange?.(e.target.value)}
              className={`bg-gray-800/50 border-gray-700/50 text-white placeholder:text-gray-500 focus:border-primary-500/50 focus:ring-primary-500/20 rounded-lg h-12 ${
                error ? "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20" : ""
              }`}
              placeholder={`Enter ${field.label.toLowerCase()}...`}
            />
            {error && (
              <p className="text-sm text-red-400 flex items-center gap-1">
                <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                {error}
              </p>
            )}
          </div>
        )

      case "boolean":
        return (
          <div className="flex items-center space-x-4 p-4 bg-gray-800/20 border border-gray-700/30 rounded-lg">
            <Switch
              id={field.id}
              checked={value || false}
              onCheckedChange={onChange}
              className="data-[state=checked]:bg-primary-500"
            />
            <div className="flex-1">{renderLabel()}</div>
            {error && (
              <p className="text-sm text-red-400 flex items-center gap-1">
                <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                {error}
              </p>
            )}
          </div>
        )

      case "enum":
        return (
          <div className="space-y-3">
            {renderLabel()}
            <Select value={value || ""} onValueChange={onChange}>
              <SelectTrigger
                className={`bg-gray-800/50 border-gray-700/50 text-white rounded-lg h-12 focus:border-primary-500/50 focus:ring-primary-500/20 ${
                  error ? "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20" : ""
                }`}
              >
                <SelectValue placeholder="Select an option..." />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 rounded-lg">
                {field.options?.map((option, index) => (
                  <SelectItem key={index} value={option} className="text-white hover:bg-gray-700 rounded-md">
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {error && (
              <p className="text-sm text-red-400 flex items-center gap-1">
                <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                {error}
              </p>
            )}
          </div>
        )

      default:
        return null
    }
  }

  return <div>{renderField()}</div>
}

export default React.memo(FieldRenderer)