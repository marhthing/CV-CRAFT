import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCV } from '@/contexts/CVContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, ArrowLeft, ArrowRight, Save, Eye } from 'lucide-react';
import { ProgressBar } from '@/components/builder/ProgressBar';
import { PersonalInfoStep } from '@/components/builder/steps/PersonalInfoStep';
import { EducationStep } from '@/components/builder/steps/EducationStep';
import { SkillsStep } from '@/components/builder/steps/SkillsStep';
import { ExperienceStep } from '@/components/builder/steps/ExperienceStep';
import { SummaryStep } from '@/components/builder/steps/SummaryStep';
import ProjectsStep from '@/components/builder/steps/ProjectsStep';
import CertificationsStep from '@/components/builder/steps/CertificationsStep';
import LanguagesStep from '@/components/builder/steps/LanguagesStep';
import AdditionalStep from '@/components/builder/steps/AdditionalStep';
import { useToast } from '@/hooks/use-toast';

const Builder = () => {
  const { id } = useParams();
  const { user, loading } = useAuth();
  const { currentStep, setCurrentStep, cvData, saveCVData, isSaving, setCvId, updateCVData } =
    useCV();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (id && user) {
      loadCV(id);
    }
  }, [id, user]);

  const loadCV = async (cvId: string) => {
    try {
      const { data, error } = await supabase
        .from('cvs')
        .select('*')
        .eq('id', cvId)
        .single();

      if (error) throw error;

      if (data) {
        setCvId(data.id);
        setCurrentStep(data.current_step || 1);
        
        // Load CV data
        if (data.cv_data) {
          Object.keys(data.cv_data).forEach((key) => {
            updateCVData(key as any, data.cv_data[key]);
          });
        }
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
      navigate('/dashboard');
    }
  };

  const steps = [
    { number: 1, title: 'Personal Info', required: true },
    { number: 2, title: 'Education', required: true },
    { number: 3, title: 'Skills', required: true },
    { number: 4, title: 'Experience', required: true },
    { number: 5, title: 'Summary', required: true },
    { number: 6, title: 'Projects', required: false },
    { number: 7, title: 'Certifications', required: false },
    { number: 8, title: 'Languages', required: false },
    { number: 9, title: 'Additional', required: false },
  ];

  const totalSteps = steps.length;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      saveCVData();
    } else {
      navigate('/dashboard');
    }
  };

  const handleSkip = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/dashboard');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoStep />;
      case 2:
        return <EducationStep />;
      case 3:
        return <SkillsStep />;
      case 4:
        return <ExperienceStep />;
      case 5:
        return <SummaryStep />;
      case 6:
        return <ProjectsStep />;
      case 7:
        return <CertificationsStep />;
      case 8:
        return <LanguagesStep />;
      case 9:
        return <AdditionalStep />;
      default:
        return <PersonalInfoStep />;
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return (
          cvData.personalInfo.fullName &&
          cvData.personalInfo.email &&
          cvData.personalInfo.phone
        );
      case 2:
        return true; // Education is optional
      case 3:
        return cvData.skills.length > 0;
      case 4:
        return true; // Experience is optional
      case 5:
        return cvData.summary.length > 0;
      default:
        return false;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FileText className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              CVCraft
            </span>
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
            <Button variant="outline" onClick={saveCVData} disabled={isSaving}>
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

          <Card className="mt-8">
            <CardContent className="p-8">{renderStep()}</CardContent>
          </Card>

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
              size="lg"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>

            <div className="flex gap-2">
              {!steps[currentStep - 1]?.required && (
                <Button onClick={handleSkip} variant="ghost" size="lg">
                  Skip
                </Button>
              )}
              <Button onClick={handleNext} disabled={!isStepValid()} size="lg">
                {currentStep === totalSteps ? (
                  <>
                    Finish
                    <Eye className="h-4 w-4 ml-2" />
                  </>
                ) : (
                  <>
                    Next Step
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Builder;
