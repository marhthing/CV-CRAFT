import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  current: boolean;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link: string;
  startDate: string;
  endDate: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate: string;
  credentialId: string;
}

export interface Language {
  id: string;
  language: string;
  proficiency: string;
}

export interface Reference {
  id: string;
  name: string;
  position: string;
  company: string;
  email: string;
  phone: string;
}

export interface CVData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    website: string;
    github: string;
    portfolio: string;
  };
  education: Education[];
  skills: string[];
  experience: Experience[];
  summary: string;
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
  references: Reference[];
  volunteerWork: Experience[];
  awards: string[];
  interests: string[];
}

interface CVContextType {
  cvData: CVData;
  updateCVData: (section: keyof CVData, data: any) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  cvId: string | null;
  setCvId: (id: string | null) => void;
  templateId: string | null;
  setTemplateId: (id: string | null) => void;
  saveCVData: () => Promise<void>;
  isSaving: boolean;
}

const CVContext = createContext<CVContextType | undefined>(undefined);

const initialCVData: CVData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: '',
    github: '',
    portfolio: '',
  },
  education: [],
  skills: [],
  experience: [],
  summary: '',
  projects: [],
  certifications: [],
  languages: [],
  references: [],
  volunteerWork: [],
  awards: [],
  interests: [],
};

export const CVProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cvData, setCVData] = useState<CVData>(initialCVData);
  const [currentStep, setCurrentStep] = useState(1);
  const [cvId, setCvId] = useState<string | null>(null);
  const [templateId, setTemplateId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const updateCVData = (section: keyof CVData, data: any) => {
    setCVData((prev) => ({
      ...prev,
      [section]: data,
    }));
  };

  const saveCVData = async () => {
    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to save your CV",
          variant: "destructive",
        });
        return;
      }

      if (cvId) {
        // Update existing CV
        const { error } = await supabase
          .from('cvs')
          .update({
            cv_data: cvData as any,
            current_step: currentStep,
            is_complete: currentStep === 9,
            template_id: templateId,
          })
          .eq('id', cvId);

        if (error) throw error;
      } else {
        // Create new CV
        const { data, error } = await supabase
          .from('cvs')
          .insert([{
            user_id: user.id,
            cv_data: cvData as any,
            current_step: currentStep,
            template_id: templateId,
            title: cvData.personalInfo.fullName || 'Untitled CV',
          }])
          .select()
          .single();

        if (error) throw error;
        if (data) setCvId(data.id);
      }

      toast({
        title: "Saved",
        description: "Your CV has been saved successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save CV",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Auto-save when CV data changes
  useEffect(() => {
    if (cvData.personalInfo.fullName || cvData.personalInfo.email) {
      const timeoutId = setTimeout(() => {
        saveCVData();
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [cvData]);

  return (
    <CVContext.Provider
      value={{
        cvData,
        updateCVData,
        currentStep,
        setCurrentStep,
        cvId,
        setCvId,
        templateId,
        setTemplateId,
        saveCVData,
        isSaving,
      }}
    >
      {children}
    </CVContext.Provider>
  );
};

export const useCV = () => {
  const context = useContext(CVContext);
  if (context === undefined) {
    throw new Error('useCV must be used within a CVProvider');
  }
  return context;
};
