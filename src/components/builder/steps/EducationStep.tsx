import { useCV, Education } from '@/contexts/CVContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export const EducationStep = () => {
  const { cvData, updateCVData } = useCV();

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      school: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      current: false,
    };
    updateCVData('education', [...cvData.education, newEducation]);
  };

  const removeEducation = (id: string) => {
    updateCVData(
      'education',
      cvData.education.filter((edu) => edu.id !== id)
    );
  };

  const updateEducation = (id: string, field: keyof Education, value: any) => {
    updateCVData(
      'education',
      cvData.education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu))
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold mb-2">Education</h2>
          <p className="text-muted-foreground">Add your educational background</p>
        </div>
        <Button onClick={addEducation} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Education
        </Button>
      </div>

      {cvData.education.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">No education entries yet</p>
            <Button onClick={addEducation} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Education
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {cvData.education.map((edu) => (
            <Card key={edu.id}>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold">Education Entry</h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeEducation(edu.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>School/University *</Label>
                      <Input
                        placeholder="Harvard University"
                        value={edu.school}
                        onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Degree *</Label>
                      <Input
                        placeholder="Bachelor of Science"
                        value={edu.degree}
                        onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Field of Study *</Label>
                      <Input
                        placeholder="Computer Science"
                        value={edu.field}
                        onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Start Date *</Label>
                      <Input
                        type="month"
                        value={edu.startDate}
                        onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <Input
                        type="month"
                        value={edu.endDate}
                        onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                        disabled={edu.current}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`current-${edu.id}`}
                        checked={edu.current}
                        onCheckedChange={(checked) =>
                          updateEducation(edu.id, 'current', checked)
                        }
                      />
                      <Label htmlFor={`current-${edu.id}`} className="cursor-pointer">
                        Currently studying here
                      </Label>
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
