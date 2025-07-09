import { Plus } from "lucide-react"
import { Card, CardContent } from "../components/ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Template } from "../lib/types";
import React from "react";

interface CreateTemplateProps {
  templates: Template[];
  showCreateForm: boolean;
  setShowCreateForm: React.Dispatch<React.SetStateAction<boolean>>;
  newTemplate: any;
  setNewTemplate: React.Dispatch<React.SetStateAction<any>>;
  createTemplate: () => void;
}
const CreateTemplate = ({ templates, showCreateForm, setShowCreateForm, newTemplate, setNewTemplate, createTemplate }: CreateTemplateProps) =>{
  return (
    <>
      {templates.length < 5 && (
        <Card className="group relative overflow-hidden border-2 border-dashed border-gray-700/60 hover:border-primary-500/50 transition-all duration-300 bg-gray-900/40 backdrop-blur-sm">
          <CardContent className="flex flex-col items-center justify-center p-8 min-h-[280px]">
            {!showCreateForm ? (
              <div className="text-center space-y-6">
                <div className="relative">
                  <div className="w-16 h-16 mx-auto bg-gray-800/50 rounded-2xl flex items-center justify-center group-hover:bg-primary-500/10 transition-colors duration-300">
                    <Plus className="h-8 w-8 text-gray-500 group-hover:text-primary-400 transition-colors duration-300" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-white">Create New Template</h3>
                  <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                    Build a custom form template with sections and fields
                  </p>
                </div>
                <Button
                  onClick={() => setShowCreateForm(true)}
                  className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:shadow-primary-500/25"
                >
                  Get Started
                </Button>
              </div>
            ) : (
              <div className="w-full space-y-5">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-1">New Template</h3>
                  <p className="text-gray-400 text-sm">Fill in the details below</p>
                </div>
                <div className="space-y-4">
                  <Input
                    placeholder="Template name"
                    value={newTemplate.name}
                    onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                    className="bg-gray-800/50 border-gray-700/50 text-white placeholder:text-gray-500 focus:border-primary-500/50 focus:ring-primary-500/20 rounded-lg h-11"
                  />
                  <Input
                    placeholder="Description (optional)"
                    value={newTemplate.description}
                    onChange={(e) => setNewTemplate({ ...newTemplate, description: e.target.value })}
                    className="bg-gray-800/50 border-gray-700/50 text-white placeholder:text-gray-500 focus:border-primary-500/50 focus:ring-primary-500/20 rounded-lg h-11"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <Button
                    onClick={()=>createTemplate()}
                    className="flex-1 bg-primary-500 hover:bg-primary-600 text-white rounded-lg h-10 font-medium transition-all duration-200"
                  >
                    Create
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowCreateForm(false)}
                    className="flex-1 border-gray-700/50 text-gray-300 hover:bg-gray-800/50 hover:text-white rounded-lg h-10 font-medium transition-all duration-200 bg-transparent"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </>
  )
}
export default React.memo(CreateTemplate)