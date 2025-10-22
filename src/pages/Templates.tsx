import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCV } from '@/contexts/CVContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Template {
  id: string;
  title: string;
  description: string;
}

const Templates = () => {
  const { user, loading } = useAuth();
  const { setTemplateId, setCvId } = useCV();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loadingTemplates, setLoadingTemplates] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const { data, error } = await supabase
        .from('templates')
        .select('id, title, description')
        .eq('is_active', true);

      if (error) throw error;
      setTemplates(data || []);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoadingTemplates(false);
    }
  };

  const handleSelectTemplate = (templateId: string) => {
    setTemplateId(templateId);
    setCvId(null); // Reset CV ID for new CV
    navigate('/builder');
  };

  if (loading || loadingTemplates) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading templates...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FileText className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              CVCraft
            </span>
          </div>
          <Button variant="ghost" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Choose Your Template</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Select a professional template to get started. You can customize it later to match
              your style.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((template) => (
              <Card
                key={template.id}
                className="hover:shadow-xl transition-all cursor-pointer group border-2 hover:border-primary"
                onClick={() => handleSelectTemplate(template.id)}
              >
                <CardHeader>
                  <div className="h-48 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg mb-4 flex items-center justify-center">
                    <FileText className="h-20 w-20 text-primary/30 group-hover:text-primary/50 transition-colors" />
                  </div>
                  <CardTitle>{template.title}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    Use This Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Templates;
