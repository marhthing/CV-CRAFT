import { useCV } from '@/contexts/CVContext';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export const SummaryStep = () => {
  const { cvData, updateCVData } = useCV();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Professional Summary</h2>
        <p className="text-muted-foreground">
          Write a brief summary highlighting your key qualifications and career goals
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="summary">Summary</Label>
        <Textarea
          id="summary"
          placeholder="Experienced software engineer with 5+ years of experience in full-stack development. Passionate about creating efficient, scalable solutions..."
          value={cvData.summary}
          onChange={(e) => updateCVData('summary', e.target.value)}
          rows={10}
          className="resize-none"
        />
        <p className="text-sm text-muted-foreground">
          {cvData.summary.length} characters
        </p>
      </div>

      <div className="bg-muted/50 rounded-lg p-4 space-y-2">
        <p className="text-sm font-semibold">Tips for a great summary:</p>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
          <li>Keep it concise (3-5 sentences)</li>
          <li>Highlight your most relevant experience</li>
          <li>Include key skills and achievements</li>
          <li>Mention your career goals or what you're looking for</li>
          <li>Use action words and be specific</li>
        </ul>
      </div>
    </div>
  );
};
