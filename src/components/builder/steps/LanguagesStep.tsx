import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCV, Language } from '@/contexts/CVContext';
import { Plus, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const LanguagesStep = () => {
  const { cvData, updateCVData } = useCV();

  const addLanguage = () => {
    const newLang: Language = {
      id: Date.now().toString(),
      language: '',
      proficiency: 'intermediate',
    };
    updateCVData('languages', [...cvData.languages, newLang]);
  };

  const removeLanguage = (id: string) => {
    updateCVData('languages', cvData.languages.filter((l) => l.id !== id));
  };

  const updateLanguage = (id: string, field: keyof Language, value: string) => {
    updateCVData(
      'languages',
      cvData.languages.map((l) => (l.id === id ? { ...l, [field]: value } : l))
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Languages (Optional)</h2>
        <p className="text-muted-foreground">
          List languages you speak and your proficiency level
        </p>
      </div>

      {cvData.languages.map((lang, index) => (
        <Card key={lang.id}>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold">Language {index + 1}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeLanguage(lang.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`lang-${lang.id}`}>Language</Label>
                <Input
                  id={`lang-${lang.id}`}
                  value={lang.language}
                  onChange={(e) => updateLanguage(lang.id, 'language', e.target.value)}
                  placeholder="English"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`prof-${lang.id}`}>Proficiency</Label>
                <Select
                  value={lang.proficiency}
                  onValueChange={(value) => updateLanguage(lang.id, 'proficiency', value)}
                >
                  <SelectTrigger id={`prof-${lang.id}`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="native">Native</SelectItem>
                    <SelectItem value="fluent">Fluent</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="beginner">Beginner</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <Button onClick={addLanguage} variant="outline" className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Add Language
      </Button>
    </div>
  );
};

export default LanguagesStep;
