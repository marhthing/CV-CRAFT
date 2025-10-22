import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCV } from '@/contexts/CVContext';
import { Plus, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const AdditionalStep = () => {
  const { cvData, updateCVData } = useCV();

  const addAward = () => {
    updateCVData('awards', [...cvData.awards, '']);
  };

  const removeAward = (index: number) => {
    updateCVData('awards', cvData.awards.filter((_, i) => i !== index));
  };

  const updateAward = (index: number, value: string) => {
    updateCVData(
      'awards',
      cvData.awards.map((a, i) => (i === index ? value : a))
    );
  };

  const addInterest = () => {
    updateCVData('interests', [...cvData.interests, '']);
  };

  const removeInterest = (index: number) => {
    updateCVData('interests', cvData.interests.filter((_, i) => i !== index));
  };

  const updateInterest = (index: number, value: string) => {
    updateCVData(
      'interests',
      cvData.interests.map((i, idx) => (idx === index ? value : i))
    );
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Additional Information (Optional)</h2>
        <p className="text-muted-foreground">
          Add awards, achievements, and personal interests
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-lg font-semibold">Awards & Achievements</Label>
              <Button onClick={addAward} variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Award
              </Button>
            </div>

            {cvData.awards.map((award, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={award}
                  onChange={(e) => updateAward(index, e.target.value)}
                  placeholder="Employee of the Year 2023"
                  className="flex-1"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeAward(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}

            {cvData.awards.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No awards added yet. Click "Add Award" to get started.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-lg font-semibold">Interests & Hobbies</Label>
              <Button onClick={addInterest} variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Interest
              </Button>
            </div>

            {cvData.interests.map((interest, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={interest}
                  onChange={(e) => updateInterest(index, e.target.value)}
                  placeholder="Photography, Hiking, Open Source"
                  className="flex-1"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeInterest(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}

            {cvData.interests.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No interests added yet. Click "Add Interest" to get started.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdditionalStep;
