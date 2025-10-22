import { useState } from 'react';
import { useCV } from '@/contexts/CVContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, X } from 'lucide-react';

export const SkillsStep = () => {
  const { cvData, updateCVData } = useCV();
  const [newSkill, setNewSkill] = useState('');

  const addSkill = () => {
    if (newSkill.trim() && !cvData.skills.includes(newSkill.trim())) {
      updateCVData('skills', [...cvData.skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    updateCVData(
      'skills',
      cvData.skills.filter((skill) => skill !== skillToRemove)
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Skills</h2>
        <p className="text-muted-foreground">Add your professional skills and competencies</p>
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
          <div className="flex-1 space-y-2">
            <Label htmlFor="skill">Add a skill</Label>
            <Input
              id="skill"
              placeholder="e.g., React, Project Management, Python"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
          <div className="flex items-end">
            <Button onClick={addSkill} disabled={!newSkill.trim()}>
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>
        </div>

        {cvData.skills.length > 0 && (
          <div>
            <Label className="mb-3 block">Your Skills</Label>
            <div className="flex flex-wrap gap-2">
              {cvData.skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="text-sm py-2 px-3">
                  {skill}
                  <button
                    onClick={() => removeSkill(skill)}
                    className="ml-2 hover:text-destructive transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}

        {cvData.skills.length === 0 && (
          <div className="text-center py-8 border-2 border-dashed border-border rounded-lg">
            <p className="text-muted-foreground">No skills added yet. Start adding your skills above.</p>
          </div>
        )}
      </div>

      <div className="bg-muted/50 rounded-lg p-4">
        <p className="text-sm text-muted-foreground">
          <strong>Tip:</strong> Add both technical and soft skills. Include programming languages,
          tools, frameworks, and interpersonal abilities relevant to your career.
        </p>
      </div>
    </div>
  );
};
