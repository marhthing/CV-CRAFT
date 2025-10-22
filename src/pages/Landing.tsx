import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { FileText, Zap, Download, Eye } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <FileText className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            CVCraft
          </span>
        </div>
        <div className="flex gap-3">
          <Button variant="ghost" onClick={() => navigate('/auth')}>
            Sign In
          </Button>
          <Button onClick={() => navigate('/auth')}>
            Get Started
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Build Your Perfect CV in{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Minutes
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create professional, ATS-friendly resumes with our intuitive step-by-step builder. 
            Choose from beautiful templates and land your dream job.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" onClick={() => navigate('/auth')} className="text-lg px-8">
              Start Building Free
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/templates')}>
              View Templates
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-card rounded-2xl p-8 shadow-sm border border-border hover:shadow-md transition-shadow">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Quick & Easy</h3>
            <p className="text-muted-foreground">
              Build your CV in 5 simple steps. Auto-save ensures you never lose your progress.
            </p>
          </div>

          <div className="bg-card rounded-2xl p-8 shadow-sm border border-border hover:shadow-md transition-shadow">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Eye className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Live Preview</h3>
            <p className="text-muted-foreground">
              See your CV come to life as you type. What you see is what you get.
            </p>
          </div>

          <div className="bg-card rounded-2xl p-8 shadow-sm border border-border hover:shadow-md transition-shadow">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Download className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Export & Share</h3>
            <p className="text-muted-foreground">
              Download your CV as PDF or share it online with a single click.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-primary to-accent rounded-3xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of professionals who've created stunning CVs with CVCraft
          </p>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => navigate('/auth')}
            className="text-lg px-8"
          >
            Create Your CV Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 CVCraft. Built with care for job seekers.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
