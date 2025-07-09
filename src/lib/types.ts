export interface Template {
  id: string
  name: string
  description: string
  sections: Section[]
  createdAt: string
  updatedAt: string
}

export interface Section {
  id: string
  title: string
  fields: Field[]
}

export interface Field {
  id: string
  type: "text" | "number" | "boolean" | "enum"
  label: string
  labelStyle: "h1" | "h2" | "h3"
  required: boolean
  options?: string[]
}