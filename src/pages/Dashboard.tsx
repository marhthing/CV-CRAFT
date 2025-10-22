import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Plus, LogOut, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CV {
  id: string;
  title: string;
  updated_at: string;
  is_complete: boolean;
}

const Dashboard = () => {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [cvs, setCvs] = useState<CV[]>([]);
  const [loadingCvs, setLoadingCvs] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchCVs();
    }
  }, [user]);

  const fetchCVs = async () => {
    try {
      const { data, error } = await supabase
        .from('cvs')
        .select('id, title, updated_at, is_complete')
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setCvs(data || []);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoadingCvs(false);
    }
  };

  const handleDeleteCV = async (id: string) => {
    try {
      const { error } = await supabase.from('cvs').delete().eq('id', id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'CV deleted successfully',
      });

      fetchCVs();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (loading || loadingCvs) {
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
          <Button variant="ghost" onClick={handleSignOut}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">My CVs</h1>
              <p className="text-muted-foreground">Manage and create your professional CVs</p>
            </div>
            <Button size="lg" onClick={() => navigate('/templates')}>
              <Plus className="h-5 w-5 mr-2" />
              New CV
            </Button>
          </div>

          {cvs.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent className="space-y-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">No CVs yet</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Start creating your first professional CV. Choose a template and follow our
                  step-by-step builder.
                </p>
                <Button onClick={() => navigate('/templates')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First CV
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cvs.map((cv) => (
                <Card
                  key={cv.id}
                  className="hover:shadow-lg transition-shadow cursor-pointer group"
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1" onClick={() => navigate(`/builder/${cv.id}`)}>
                        <CardTitle className="line-clamp-1">{cv.title}</CardTitle>
                        <CardDescription>
                          Updated {new Date(cv.updated_at).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteCV(cv.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent onClick={() => navigate(`/builder/${cv.id}`)}>
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-sm px-3 py-1 rounded-full ${
                          cv.is_complete
                            ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                            : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                        }`}
                      >
                        {cv.is_complete ? 'Complete' : 'In Progress'}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
