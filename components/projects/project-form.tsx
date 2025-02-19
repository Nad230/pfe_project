"use client"

import { useState, useEffect } from "react"
import { FileUpload } from "@/components/ui/file-upload"
import { Chip } from "@/components/ui/chip"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from "sonner"
import { X, ClipboardList, Tags, Wallet, Image, Eye, Users, Target, Calendar, Globe, Rocket, Lightbulb, X as CloseIcon, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { AddTeamDialog } from "./add-team-dialog"




const projectTypes = ["BUSINESS", "CREATIVE", "SOCIAL_IMPACT", "PERSONAL", "OTHER"] as const
const revenueModels = ["SUBSCRIPTION", "ONE_TIME_SALES", "ADS", "DONATIONS", "OTHER"] as const
const budgetRanges = ["LOW_1K_5K", "MID_5K_10K", "HIGH_10K_PLUS", "NOT_SURE"] as const
const timelines = ["SHORT_0_3_MONTHS", "MEDIUM_3_12_MONTHS", "LONG_1_PLUS_YEARS"] as const
const visibilityOptions = ["PUBLIC", "PRIVATE", "INVITE_ONLY"] as const
const fundingSources = ["Bootstrapped", "Investor-backed", "Crowdfunded", "Other"] as const
const statuses = ["IDEA", "PLANNING", "IN_PROGRESS", "COMPLETED", "PAUSED","ACTIVE"] as const
const tags = [
  "Tech", "Finance", "Art", "Education", "Health", "Productivity",
  "Marketing", "SaaS", "AI", "Mobile", "Web", "E-commerce",
  "Sustainability", "IoT", "Blockchain", "Gaming", "Social",
  "Entertainment", "Travel", "Fitness", "Other"
] as const;
const steps = [
  {
    title: "Project Basics",
    description: "Let's start with the essentials",
    icon: ClipboardList,
    color: "text-indigo-500",
    emoji: "✨",
    subSteps: [
      {
        title: "Project Identity",
        fields: ["name","description"]
      },
      {
        title: "Project Overview",
        fields: ["type", "customType"]
      }
     
    ]
  },
  {
    title: "Vision & Details",
    description: "Tell us more about your goals",
    icon: Target,
    color: "text-emerald-500",
    emoji: "🎯",
    subSteps: [
      {
        title: "Project Tags",
        fields: ["tags"]
      }
      ,
      {
        title: "Vision & Impact",
        fields: ["vision", "Impact"]
      }
    ]
  },
  {
    title: "Business Model",
    description: "How will it generate value?",
    icon: Wallet,
    color: "text-blue-500",
    emoji: "💰",
    subSteps: [
      {
        title: "Revenue Model",
        fields: ["revenueModel", "customRevenue"]
      },
      {
        title: "Financial Planning",
        fields: ["budgetRange", "fundingSource"]
      }
    ]
  },
  {
    title: "Team & Timeline",
    description: "Planning and execution",
    icon: Users,
    color: "text-purple-500",
    emoji: "👥",
    subSteps: [
      {
        title: "Timeline & Status",
        fields: ["timeline", "status"]
      },
      {
        title: "Team & Milestones",
        fields: ["teamType", "teamMembers", "milestones"]
      }
    ]
  },
  {
    title: "Media & Visibility",
    description: "Show off your project",
    icon: Eye,
    color: "text-rose-500",
    emoji: "👁️",
    subSteps: [
      {
        title: "Project Visibility",
        fields: ["visibility", "location"]
      },
      {
        title: "Media & Plan",
        fields: ["collaborations", "media", "planType"]
      }
    ]
  }
]




const mockUsers = [
  { id: "u1", name: "Sarah Chen", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" },
  { id: "u2", name: "Alex Wong", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" },
  { id: "u3", name: "Emma Davis", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100" },
  { id: "u4", name: "James Wilson", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100" },
]

interface FormData {
  id: string
  name: string
  type: typeof projectTypes[number] | ""
  description: string
  tags: string[]
  visionImpact: string
  impact: string
  revenueModel: typeof revenueModels[number] | ""
  budgetRange: typeof budgetRanges[number] | ""
  timeline: typeof timelines[number] | ""
  teamType: "Solo" | "Team"
  teamMembers: string[]
  visibility: typeof visibilityOptions[number]
  location: string
  media: File | null
  status: typeof statuses[number]
  collaborations: string
  fundingSource: typeof fundingSources[number] | ""
  milestones: string
  planType: "Lite" | "Pro"
  customType?: string
  customRevenue?: string
}
interface AIAssistantProps {
  message: string
  onAccept: () => void
  onDismiss: () => void
  isLoading?: boolean
}

function AIAssistant({ message, onAccept, onDismiss, isLoading }: AIAssistantProps) {
  return (
    <div className="fixed bottom-4 right-4 max-w-md bg-background border rounded-lg shadow-lg p-4 animate-in slide-in-from-right">
      <div className="flex items-start gap-3">
        <div className="bg-primary/10 p-2 rounded-full">
          {isLoading ? (
            <span className="animate-pulse">...</span>
          ) : (
            <Sparkles className="h-5 w-5 text-primary" />
          )}
        </div>
        <div className="flex-1 space-y-2">
          <p className="text-sm">{message}</p>
          {!isLoading && (
            <div className="flex gap-2">
              <Button size="sm" onClick={onAccept}>
                Accept Suggestions
              </Button>
              <Button size="sm" variant="ghost" onClick={onDismiss}>
                Dismiss
              </Button>
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={onDismiss}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}


interface ProjectFormProps {
  onSubmit: (data: any) => void; // Accepts a function to handle submission
}
export default function ProjectForm({ onSubmit }: ProjectFormProps) {
  
  

  
    const handleChange = (e: any) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
  const router = useRouter()
  const [input, setInput] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [open, setOpen] = useState(true)
  const [showAIAssistant, setShowAIAssistant] = useState(false)
  const [aiMessage, setAIMessage] = useState("")
  const [aiSuggestion, setAISuggestion] = useState<Partial<FormData>>({})
  const [activeStep, setActiveStep] = useState(0)
  const [activeSubStep, setActiveSubStep] = useState(0)
  const [showTeamSearch, setShowTeamSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showTeamDialog, setShowTeamDialog] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    type: "",
    description: "",
    tags: [],
    visionImpact: "",
    impact: "",
    revenueModel: "",
    budgetRange: "",
    timeline: "",
    teamType: "Solo",
    teamMembers: [],
    visibility: "PUBLIC",
    location: "",
    media: null,
    status: "IDEA",
    collaborations: "",
    fundingSource: "",
    milestones: "",
    id:"",
    planType: "Lite"
  })

const [isAILoading, setIsAILoading] = useState(false)
const [hasSeenAIPrompt, setHasSeenAIPrompt] = useState(false);


const fetchAISuggestions = async (field: keyof FormData | 'section') => {
  setIsAILoading(true);
  try {
    const response = await fetch('http://localhost:3000/ai/assist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.name,
        description: formData.description
      }),
    });

    if (!response.ok) throw new Error('AI request failed');
    const data = await response.json();
    return mapAISuggestionsToFormData(data);

  } catch (error) {
    console.error('AI Error:', error);
    toast.error('Failed to get AI suggestions');
    return null;
  } finally {
    setIsAILoading(false);
  }
};


// Add this new function to handle AI suggestions per field


const mapAISuggestionsToFormData = (aiData: any): Partial<FormData> => {
  // Helper function to find matching enum value
  const findEnumMatch = <T extends readonly string[]>(value: string, options: T): T[number] | undefined => {
    const cleanValue = value.toLowerCase().replace(/[^a-z0-9]/g, '');
    return options.find(opt => opt.toLowerCase().replace(/[^a-z0-9]/g, '') === cleanValue);
  };

  // Handle project type
  const rawProjectType = aiData?.Type || '';
  const matchedType = findEnumMatch(rawProjectType, projectTypes);
  const [type, customType] = matchedType 
    ? [matchedType, undefined] 
    : ['OTHER' as const, rawProjectType];

  // Handle revenue model
  const rawRevenueModel = aiData?.['Revenue Model'] || '';
  const rawRevenue = aiData?.['Revenue Model'] || '';
  const baseRevenueModel = rawRevenue.split('(')[0].trim();
  const matchedRevenue = findEnumMatch(baseRevenueModel, revenueModels);
  const [revenueModel, customRevenue] = matchedRevenue
    ? [matchedRevenue, undefined]
    : ['OTHER' as const, rawRevenueModel];

  // Handle tags - only allow predefined or 'Other'
 // Process tags - allow any tags but limit to 8 and clean formatting
 const rawTags = aiData?.Tags || [];
 const processedTags = rawTags
   .map((t: string) => {
     // Clean and format the tag
     const cleaned = t.trim()
       .replace(/[^a-zA-Z0-9- ]/g, '')
       .replace(/\s+/g, '-')
       .substring(0, 20);
     
     // Capitalize first letter of each word
     return cleaned.toLowerCase()
       .split(' ')
       .map(word => word.charAt(0).toUpperCase() + word.slice(1))
       .join(' ');
   })
   .filter((t: string) => t.length > 0)
   .slice(0, 8); // Limit to 8 tags
  return {
    type,
    customType,
    revenueModel,
    customRevenue,
    tags: processedTags,
    visionImpact: aiData?.VisionImpact || '',
    budgetRange: convertAIBudgetToEnum(aiData?.Budget),
    timeline: convertAITimelineToEnum(aiData?.Timeline),
    teamType: aiData?.Team === "Team" ? "Team" : "Solo",
    visibility: visibilityOptions.find(vo => vo === aiData?.Visibility?.toUpperCase()) || "PUBLIC",
    location: aiData?.Location || '',
    status: statuses.find(s => s === aiData?.Status?.toUpperCase()) || "IDEA",
    fundingSource: fundingSources.find(fs => fs === aiData?.['Funding Source']) || "",
    milestones: aiData?.Milestones?.join('\n') || '',
    impact: aiData?.Impact || '',
    collaborations:aiData.Collaborations || '',
    media:aiData.Media,
    description: aiData?.Description || formData.description
  };
};

// Modified mapAISuggestionsToFormData

// Enhanced conversion functions
const convertAIBudgetToEnum = (budget?: string) => {
  const amount = parseInt(budget?.replace(/[^0-9]/g, '') || '0')
  if (amount <= 5000) return "LOW_1K_5K"
  if (amount <= 10000) return "MID_5K_10K"
  if (amount > 10000) return "HIGH_10K_PLUS"
  return "NOT_SURE"
}

const convertAITimelineToEnum = (timeline?: string) => {
  const months = parseInt(timeline?.match(/\d+/)?.[0] || '0')
  if (months <= 3) return "SHORT_0_3_MONTHS"
  if (months <= 12) return "MEDIUM_3_12_MONTHS"
  return "LONG_1_PLUS_YEARS"
}

// Modified useEffect for initial suggestions
// Add this useEffect hook
useEffect(() => {
  const shouldShowAIPrompt = 
    !hasSeenAIPrompt &&
    activeStep === 0 && 
    activeSubStep === 1 && 
    formData.name && 
    formData.description;

  if (shouldShowAIPrompt) {
    const fetchInitialSuggestions = async () => {
      const suggestions = await fetchAISuggestions('section');
      if (suggestions) {
        setAIMessage("Would you like AI to complete the rest of the form?");
        setAISuggestion(suggestions);
        setShowAIAssistant(true);
        setHasSeenAIPrompt(true);
      }
    };
    fetchInitialSuggestions();
  }
}, [activeStep, activeSubStep, formData.name, formData.description, hasSeenAIPrompt]);


  
 
  const handleInputChange = async (name: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  
    // Only show suggestions after first section
    
    }
  
  
  const handleTagSelection = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }))
  }
  

  const handleFileUpload = (files: File[]) => {
    if (files.length > 0) {
      handleInputChange("media", files[0])
    }
  }

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    !formData.teamMembers.includes(user.id)
  )

  const handleAddTeamMember = (userId: string) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: [...prev.teamMembers, userId]
    }))
  }

  
  const handleRemoveTeamMember = (userId: string) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.filter(id => id !== userId)
    }))
  }

  const handleSubmit = async () => {
    // TODO: Implement form submission
    console.log("Form submitted:", formData)
    // router.push("/projects")
  }

  const handleNext = () => {
    const currentStep = steps[activeStep]
    if (activeSubStep < currentStep.subSteps.length - 1) {
      setActiveSubStep(prev => prev + 1)
    } else {
      setActiveStep(prev => prev + 1)
      setActiveSubStep(0)
    }
  }

  const handleBack = () => {
    if (activeSubStep > 0) {
      setActiveSubStep(prev => prev - 1)
    } else if (activeStep > 0) {
      setActiveStep(prev => prev - 1)
      setActiveSubStep(steps[activeStep - 1].subSteps.length - 1)
    }
  }
  const handleAcceptAISuggestion = () => {
    if (!aiSuggestion) return;
    
    setFormData(prev => ({
      ...prev,
      ...aiSuggestion,
      name: prev.name,
      description: prev.description
    }));
  
    setShowAIAssistant(false);
    toast.success("AI suggestions applied!");
  };
  const renderTeamMembers = () => {
    return (
      <div className="flex flex-wrap gap-2 mt-2">
        {formData.teamMembers.map(userId => {
          const user = mockUsers.find(u => u.id === userId)
          if (!user) return null

          return (
            <Badge
              key={userId}
              variant="secondary"
              className="flex items-center gap-2 pl-1"
            >
              <Avatar className="h-6 w-6">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
              <span>{user.name}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5 p-0 hover:bg-transparent"
                onClick={() => handleRemoveTeamMember(userId)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )
        })}
      </div>
    )
  }

  const renderStepIndicator = () => {
    const currentStep = steps[activeStep]
    const Icon = currentStep.icon
    const currentSubStep = currentStep.subSteps[activeSubStep]
    
    return (
      <div className="mb-8 max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4"
        >
          <div className={`p-3 rounded-full bg-opacity-10 ${currentStep.color.replace('text-', 'bg-')}`}>
            <span className="text-xl mr-2">{currentStep.emoji}</span>
            <Icon className={`w-6 h-6 ${currentStep.color}`} />
          </div>
          <div>
            <h2 className={`text-lg font-semibold ${currentStep.color}`}>
              Step {activeStep + 1}.{activeSubStep + 1}: {currentSubStep.title}
            </h2>
            <p className="text-sm text-muted-foreground">
              {currentStep.description}
            </p>
          </div>
        </motion.div>
        <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className={`h-full ${currentStep.color.replace('text-', 'bg-')}`}
            initial={{ width: 0 }}
            animate={{ 
              width: `${((activeStep * steps[0].subSteps.length + activeSubStep + 1) / 
                (steps.length * steps[0].subSteps.length)) * 100}%` 
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    )
  }

  const renderTeamSection = () => (
    <div className="space-y-2">
      <Label className="text-lg font-semibold text-purple-600 dark:text-purple-400 flex items-center gap-2">
        <span>👥 Team</span>
      </Label>
      <Select
        value={formData.teamType}
        onValueChange={value => {
          handleInputChange("teamType", value as "Solo" | "Team");
          if (value === "Solo") handleInputChange("teamMembers", []);
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Are you working alone or with a team?" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Solo">Solo</SelectItem>
          <SelectItem value="Team">Team</SelectItem>
        </SelectContent>
      </Select>
  
      {formData.teamType === "Team" && (
        <div className="space-y-2">
          <Button
            variant="outline"
            onClick={() => setShowTeamDialog(true)}
            className="w-full"
          >
            {formData.teamMembers.length > 0 ? "Manage Team" : "Add Team Members"}
          </Button>
          {renderTeamMembers()}
  
<AddTeamDialog
  open={showTeamDialog}
  onOpenChange={setShowTeamDialog}
  onTeamCreated={(teamData) => {
    handleInputChange("teamMembers", teamData.members);
    handleInputChange("teamName", teamData.name);
    handleInputChange("teamDescription", teamData.description);
  }}
  projectId={formData.id} // Pass this after project creation
/>
        </div>
      )}
    </div>
  );

  const renderStep = () => {
    const fadeIn = {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 }
    }

    const currentStep = steps[activeStep]
    const currentSubStep = currentStep.subSteps[activeSubStep]
    const fields = currentSubStep.fields

    return (
      <motion.div 
        className="space-y-6 max-w-xl mx-auto"
        {...fadeIn}
      >
        <div className="space-y-4">
          {fields.includes("name") && (
            <div className="space-y-2">
              <Label className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
                <span>✨ Project Name</span>
              </Label>
              <Input
                value={formData.name}
                onChange={e => handleInputChange("name", e.target.value)}
                placeholder="What is the name of your project?"
                className="text-lg"
              />
            </div>
          )}
            {fields.includes("description") && (
            <div className="space-y-2">
              <Label className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
                <span>📝 Project Description</span>
              </Label>
              <Textarea
                value={formData.description}
                onChange={e => handleInputChange("description", e.target.value)}
                placeholder="Briefly describe your project in one or two sentences"
                className="min-h-[100px]"
              />
            </div>
          )}
          
          {fields.includes("tags") && (
  <div className="space-y-2">
    <Label className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
      <span>🏷️ Project Tags</span>
    </Label>
    <div className="flex flex-wrap gap-2">
      {/* Predefined tags */}
      {tags.map(tag => (
        <Chip
          key={tag}
          variant={formData.tags.includes(tag) ? "default" : "outline"}
          onClick={() => handleTagSelection(tag)}
          className={formData.tags.includes(tag) 
            ? "bg-indigo-500 hover:bg-indigo-600 text-white"
            : "hover:border-indigo-500"
          }
        >
          {tag}
        </Chip>
      ))}
      
      {/* Custom tags input */}
      <div className="relative">
        <Input
          placeholder="Add custom tag..."
          className="w-[150px] h-8"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const newTag = e.currentTarget.value.trim();
              if (newTag) {
                handleTagSelection(newTag);
                e.currentTarget.value = '';
              }
            }
          }}
        />
        <span className="absolute right-2 top-1.5 text-muted-foreground text-sm">
          ↵
        </span>
      </div>
    </div>
    
    {/* Display selected custom tags */}
    <div className="flex flex-wrap gap-2">
      {formData.tags
        .filter(t => !tags.includes(t as any))
        .map(tag => (
          <Chip
            key={tag}
            variant="default"
            onClick={() => handleTagSelection(tag)}
            className="bg-indigo-500 hover:bg-indigo-600 text-white"
          >
            {tag}
          </Chip>
        ))}
    </div>
  </div>
)}

          {fields.includes("type") && (
            <div className="space-y-2">
              <Label className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
                <span>🎯 Project Type</span>
              </Label>
              <Select
                value={formData.type}
                onValueChange={value => handleInputChange("type", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="What type of project are you building?" />
                </SelectTrigger>
                <SelectContent>
                  {projectTypes.map(type => (
                    <SelectItem key={type} value={type}>
                      {type.replace(/_/g, " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formData.type === "OTHER" && fields.includes("customType") && (
                <Textarea
                  value={formData.customType}
                  onChange={e => handleInputChange("customType", e.target.value)}
                  placeholder="Tell us more about your unique project type..."
                  className="mt-2"
                />
              )}
            </div>
          )}

          {fields.includes("vision") && (
            <div className="space-y-2">
              <Label className="text-lg font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                <span>🌟 Vision</span>
              </Label>
              <Textarea
                value={formData.visionImpact}
                onChange={e => handleInputChange("visionImpact", e.target.value)}
                placeholder="What is the long-term vision for your project?"
                className="min-h-[100px]"
              />
            </div>
          )}

          {fields.includes("impact") && (
            <div className="space-y-2">
              <Label className="text-lg font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                <span>💫 Expected Impact</span>
              </Label>
              <Textarea
                value={formData.impact}
                onChange={e => handleInputChange("impact", e.target.value)}
                placeholder="How will your project make a difference?"
                className="min-h-[100px]"
              />
            </div>
          )}

          {fields.includes("revenueModel") && (
            <div className="space-y-2">
              <Label className="text-lg font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-2">
                <span>💰 Revenue Model</span>
              </Label>
              <Select
                value={formData.revenueModel}
                onValueChange={value => handleInputChange("revenueModel", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="How will your project generate money?" />
                </SelectTrigger>
                <SelectContent>
                  {revenueModels.map(model => (
                    <SelectItem key={model} value={model}>
                      {model.replace(/_/g, " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formData.revenueModel === "OTHER" && fields.includes("customRevenue") && (
                <Textarea
                  value={formData.customRevenue}
                  onChange={e => handleInputChange("customRevenue", e.target.value)}
                  placeholder="Describe your unique revenue model..."
                  className="mt-2"
                />
              )}
            </div>
          )}

          {fields.includes("budgetRange") && (
            <div className="space-y-2">
              <Label className="text-lg font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-2">
                <span>💵 Budget Range</span>
              </Label>
              <Select
                value={formData.budgetRange}
                onValueChange={value => handleInputChange("budgetRange", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="What's your estimated budget?" />
                </SelectTrigger>
                <SelectContent>
                  {budgetRanges.map(range => (
                    <SelectItem key={range} value={range}>
                      {range === "NOT_SURE" ? "I'm not sure yet" : range.replace(/_/g, " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {fields.includes("fundingSource") && (
            <div className="space-y-2">
              <Label className="text-lg font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-2">
                <span>💸 Funding Source</span>
              </Label>
              <Select
                value={formData.fundingSource}
                onValueChange={value => handleInputChange("fundingSource", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Where is the funding coming from?" />
                </SelectTrigger>
                <SelectContent>
                  {fundingSources.map(source => (
                    <SelectItem key={source} value={source}>
                      {source}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {fields.includes("timeline") && (
            <div className="space-y-2">
              <Label className="text-lg font-semibold text-purple-600 dark:text-purple-400 flex items-center gap-2">
                <span>⏱️ Timeline</span>
              </Label>
              <Select
                value={formData.timeline}
                onValueChange={value => handleInputChange("timeline", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="How long do you expect this project to take?" />
                </SelectTrigger>
                <SelectContent>
                  {timelines.map(timeline => (
                    <SelectItem key={timeline} value={timeline}>
                      {timeline.replace(/_/g, " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {fields.includes("status") && (
            <div className="space-y-2">
              <Label className="text-lg font-semibold text-purple-600 dark:text-purple-400 flex items-center gap-2">
                <span>🎯 Project Status</span>
              </Label>
              <Select
                value={formData.status}
                onValueChange={value => handleInputChange("status", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="What stage is your project in?" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map(status => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {fields.includes("teamType") && renderTeamSection()}

          {fields.includes("milestones") && (
            <div className="space-y-2">
              <Label className="text-lg font-semibold text-purple-600 dark:text-purple-400 flex items-center gap-2">
                <span>🚀 Project Milestones</span>
              </Label>
              <Textarea
                value={formData.milestones}
                onChange={e => handleInputChange("milestones", e.target.value)}
                placeholder="List your major project milestones (Optional)"
                className="h-24"
              />
            </div>
          )}

          {fields.includes("visibility") && (
            <div className="space-y-2">
              <Label className="text-lg font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-2">
                <span>👁️ Project Visibility</span>
              </Label>
              <Select
                value={formData.visibility}
                onValueChange={value => handleInputChange("visibility", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Who can see your project?" />
                </SelectTrigger>
                <SelectContent>
                  {visibilityOptions.map(opt => (
                    <SelectItem key={opt} value={opt}>
                      {opt.replace(/_/g, " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {fields.includes("location") && (
            <div className="space-y-2">
              <Label className="text-lg font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-2">
                <span>🌍 Location</span>
              </Label>
              <Input
                value={formData.location}
                onChange={e => handleInputChange("location", e.target.value)}
                placeholder="Is your project location-based? (Optional, skip if not applicable)"
              />
            </div>
          )}

          {fields.includes("collaborations") && (
            <div className="space-y-0">
              <Label className="text-lg font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-2">
                <span>🤝 Collaborations</span>
              </Label>
              <Textarea
                value={formData.collaborations}
                onChange={e => handleInputChange("collaborations", e.target.value)}
                placeholder="Are you open to collaborations? What kind? (e.g., partnerships, co-founders, sponsorships)"
                className="min-h-[100px]"
              />
            </div>
          )}

          {fields.includes("media") && (
            <div className="space-y-0">
              <Label className="text-lg font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-2">
                <span>📸 Project Media</span>
              </Label>
              <FileUpload
                onFilesSelected={handleFileUpload}
                maxSize={10 * 1024 * 1024}
                accept={{
                  'image/*': ['.png', '.jpg', '.jpeg'],
                  'video/*': ['.mp4', '.mov'],
                  'audio/*': ['.mp3', '.wav']
                }}
                helperText="Upload images, videos, or a voice pitch (Max size: 10MB)"
              />
            </div>
          )}

          
        </div>
      </motion.div>
    )
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardContent className="pt-6">
        {renderStepIndicator()}

        <AnimatePresence mode="wait">
          <div className="mt-8">{renderStep()}</div>
        </AnimatePresence>
        {isAILoading && (
          <div className="fixed bottom-4 right-4 max-w-md bg-background border rounded-lg shadow-lg p-4">
            <div className="flex items-center gap-2 text-sm">
              <span className="animate-pulse">🤖 Analyzing your project...</span>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-8 max-w-xl mx-auto">
          {(activeStep > 0 || activeSubStep > 0) && (
            <Button
              variant="outline"
              onClick={handleBack}
              className="px-8"
            >
              Back
            </Button>
          )}
          {activeStep < steps.length - 1 || activeSubStep < steps[activeStep].subSteps.length - 1 ? (
            <Button
              className={`ml-auto px-8 ${
                activeStep === 0 ? "bg-indigo-500 hover:bg-indigo-600" :
                activeStep === 1 ? "bg-emerald-500 hover:bg-emerald-600" :
                activeStep === 2 ? "bg-blue-500 hover:bg-blue-600" :
                activeStep === 3 ? "bg-purple-500 hover:bg-purple-600" :
                "bg-rose-500 hover:bg-rose-600"
              }`}
              onClick={handleNext}
            >
              Next
            </Button>
          ) : (
            <Button
              className="ml-auto px-8 bg-rose-500 hover:bg-rose-600"
              onClick={() => onSubmit(formData)}
              
            >
              Launch Project 🚀
            </Button>
          )}
        </div>
        
        {showAIAssistant && (
  <AIAssistant
    message={aiMessage}
    onAccept={handleAcceptAISuggestion}
    onDismiss={() => {
      setShowAIAssistant(false);
      setHasSeenAIPrompt(true);
    }}
    isLoading={isAILoading}
  />)}
    
      </CardContent>
    </Card>
  )


}

