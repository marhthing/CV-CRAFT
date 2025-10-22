import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useCV, Project } from '@/contexts/CVContext';
import { Plus, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const ProjectsStep = () => {
  const { cvData, updateCVData } = useCV();

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: '',
      description: '',
      technologies: [],
      link: '',
      startDate: '',
      endDate: '',
    };
    updateCVData('projects', [...cvData.projects, newProject]);
  };

  const removeProject = (id: string) => {
    updateCVData('projects', cvData.projects.filter((p) => p.id !== id));
  };

  const updateProject = (id: string, field: keyof Project, value: any) => {
    updateCVData(
      'projects',
      cvData.projects.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Projects (Optional)</h2>
        <p className="text-muted-foreground">
          Showcase your personal or professional projects
        </p>
      </div>

      {cvData.projects.map((project, index) => (
        <Card key={project.id}>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold">Project {index + 1}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeProject(project.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`title-${project.id}`}>Project Title</Label>
                  <Input
                    id={`title-${project.id}`}
                    value={project.title}
                    onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                    placeholder="E-commerce Platform"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`link-${project.id}`}>Project Link</Label>
                  <Input
                    id={`link-${project.id}`}
                    value={project.link}
                    onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                    placeholder="https://github.com/username/project"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`start-${project.id}`}>Start Date</Label>
                  <Input
                    id={`start-${project.id}`}
                    type="month"
                    value={project.startDate}
                    onChange={(e) => updateProject(project.id, 'startDate', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`end-${project.id}`}>End Date</Label>
                  <Input
                    id={`end-${project.id}`}
                    type="month"
                    value={project.endDate}
                    onChange={(e) => updateProject(project.id, 'endDate', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`tech-${project.id}`}>Technologies (comma-separated)</Label>
                <Input
                  id={`tech-${project.id}`}
                  value={project.technologies.join(', ')}
                  onChange={(e) =>
                    updateProject(
                      project.id,
                      'technologies',
                      e.target.value.split(',').map((s) => s.trim())
                    )
                  }
                  placeholder="React, Node.js, MongoDB"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`desc-${project.id}`}>Description</Label>
                <Textarea
                  id={`desc-${project.id}`}
                  value={project.description}
                  onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                  placeholder="Describe what you built and your role..."
                  rows={3}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <Button onClick={addProject} variant="outline" className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Add Project
      </Button>
    </div>
  );
};

export default ProjectsStep;
