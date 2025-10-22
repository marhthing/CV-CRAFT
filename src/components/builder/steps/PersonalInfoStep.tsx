import { useCV } from '@/contexts/CVContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const PersonalInfoStep = () => {
  const { cvData, updateCVData } = useCV();

  const handleChange = (field: string, value: string) => {
    updateCVData('personalInfo', {
      ...cvData.personalInfo,
      [field]: value,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Personal Information</h2>
        <p className="text-muted-foreground">Let's start with your basic information</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            placeholder="John Doe"
            value={cvData.personalInfo.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            value={cvData.personalInfo.email}
            onChange={(e) => handleChange('email', e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+1 (555) 123-4567"
            value={cvData.personalInfo.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            placeholder="New York, NY"
            value={cvData.personalInfo.location}
            onChange={(e) => handleChange('location', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn</Label>
          <Input
            id="linkedin"
            placeholder="linkedin.com/in/johndoe"
            value={cvData.personalInfo.linkedin}
            onChange={(e) => handleChange('linkedin', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="website">Website/Portfolio</Label>
          <Input
            id="website"
            placeholder="johndoe.com"
            value={cvData.personalInfo.website}
            onChange={(e) => handleChange('website', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
