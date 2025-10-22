-- Create users profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create templates table
CREATE TABLE IF NOT EXISTS public.templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  html_content TEXT NOT NULL,
  thumbnail_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on templates
ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;

-- Templates policies (read-only for all authenticated users)
CREATE POLICY "Anyone can view active templates"
  ON public.templates FOR SELECT
  USING (is_active = true);

-- Create CVs table
CREATE TABLE IF NOT EXISTS public.cvs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  template_id UUID REFERENCES public.templates(id) ON DELETE SET NULL,
  title TEXT NOT NULL DEFAULT 'Untitled CV',
  cv_data JSONB DEFAULT '{}'::jsonb,
  current_step INTEGER DEFAULT 1,
  is_complete BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on CVs
ALTER TABLE public.cvs ENABLE ROW LEVEL SECURITY;

-- CVs policies
CREATE POLICY "Users can view their own CVs"
  ON public.cvs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own CVs"
  ON public.cvs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own CVs"
  ON public.cvs FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own CVs"
  ON public.cvs FOR DELETE
  USING (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for CVs updated_at
CREATE TRIGGER update_cvs_updated_at
  BEFORE UPDATE ON public.cvs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Insert default templates
INSERT INTO public.templates (title, description, html_content, thumbnail_url) VALUES
(
  'Modern Professional',
  'Clean and modern design perfect for any industry',
  '<div class="cv-template modern"><h1>{{fullName}}</h1><p>{{email}} | {{phone}}</p><div class="section"><h2>Summary</h2><p>{{summary}}</p></div><div class="section"><h2>Experience</h2>{{experience}}</div><div class="section"><h2>Education</h2>{{education}}</div><div class="section"><h2>Skills</h2>{{skills}}</div></div>',
  null
),
(
  'Classic Elegant',
  'Traditional layout with elegant typography',
  '<div class="cv-template classic"><header><h1>{{fullName}}</h1><p>{{email}} | {{phone}}</p></header><section><h2>Professional Summary</h2><p>{{summary}}</p></section><section><h2>Work Experience</h2>{{experience}}</section><section><h2>Education</h2>{{education}}</section><section><h2>Skills</h2>{{skills}}</section></div>',
  null
),
(
  'Creative Bold',
  'Stand out with a creative and bold design',
  '<div class="cv-template creative"><div class="header"><h1>{{fullName}}</h1><p>{{email}} | {{phone}}</p></div><div class="content"><div class="summary"><h2>About Me</h2><p>{{summary}}</p></div><div class="experience"><h2>Experience</h2>{{experience}}</div><div class="education"><h2>Education</h2>{{education}}</div><div class="skills"><h2>Skills</h2>{{skills}}</div></div></div>',
  null
);