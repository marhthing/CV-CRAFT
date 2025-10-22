import { useCV, Experience } from '@/contexts/CVContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export const ExperienceStep = () => {
  const { cvData, updateCVData } = useCV();

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    };
    updateCVData('experience', [...cvData.experience, newExperience]);
  };

  const removeExperience = (id: string) => {
    updateCVData(
      'experience',
      cvData.experience.filter((exp) => exp.id !== id)
    );
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    updateCVData(
      'experience',
      cvData.experience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp))
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold mb-2">Work Experience</h2>
          <p className="text-muted-foreground">Add your professional experience</p>
        </div>
        <Button onClick={addExperience} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Experience
        </Button>
      </div>

      {cvData.experience.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">No experience entries yet</p>
            <Button onClick={addExperience} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Experience
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {cvData.experience.map((exp) => (
            <Card key={exp.id}>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold">Experience Entry</h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeExperience(exp.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Company *</Label>
                      <Input
                        placeholder="Google"
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Position *</Label>
                      <Input
                        placeholder="Senior Software Engineer"
                        value={exp.position}
                        onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Location</Label>
                      <Input
                        placeholder="San Francisco, CA"
                        value={exp.location}
                        onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Start Date *</Label>
                      <Input
                        type="month"
                        value={exp.startDate}
                        onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <Input
                        type="month"
                        value={exp.endDate}
                        onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                        disabled={exp.current}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`current-${exp.id}`}
                        checked={exp.current}
                        onCheckedChange={(checked) =>
                          updateExperience(exp.id, 'current', checked)
                        }
                      />
                      <Label htmlFor={`current-${exp.id}`} className="cursor-pointer">
                        Currently working here
                      </Label>
                    </div>

                    <div className="md:col-span-2 space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        placeholder="Describe your responsibilities and achievements..."
                        value={exp.description}
                        onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                        rows={4}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
