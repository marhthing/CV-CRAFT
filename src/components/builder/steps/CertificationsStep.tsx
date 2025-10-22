import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCV, Certification } from '@/contexts/CVContext';
import { Plus, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const CertificationsStep = () => {
  const { cvData, updateCVData } = useCV();

  const addCertification = () => {
    const newCert: Certification = {
      id: Date.now().toString(),
      name: '',
      issuer: '',
      date: '',
      expiryDate: '',
      credentialId: '',
    };
    updateCVData('certifications', [...cvData.certifications, newCert]);
  };

  const removeCertification = (id: string) => {
    updateCVData('certifications', cvData.certifications.filter((c) => c.id !== id));
  };

  const updateCertification = (id: string, field: keyof Certification, value: string) => {
    updateCVData(
      'certifications',
      cvData.certifications.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Certifications (Optional)</h2>
        <p className="text-muted-foreground">
          Add professional certifications and credentials
        </p>
      </div>

      {cvData.certifications.map((cert, index) => (
        <Card key={cert.id}>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold">Certification {index + 1}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeCertification(cert.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`name-${cert.id}`}>Certification Name</Label>
                  <Input
                    id={`name-${cert.id}`}
                    value={cert.name}
                    onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                    placeholder="AWS Certified Solutions Architect"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`issuer-${cert.id}`}>Issuing Organization</Label>
                  <Input
                    id={`issuer-${cert.id}`}
                    value={cert.issuer}
                    onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
                    placeholder="Amazon Web Services"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`date-${cert.id}`}>Issue Date</Label>
                  <Input
                    id={`date-${cert.id}`}
                    type="month"
                    value={cert.date}
                    onChange={(e) => updateCertification(cert.id, 'date', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`expiry-${cert.id}`}>Expiry Date (if applicable)</Label>
                  <Input
                    id={`expiry-${cert.id}`}
                    type="month"
                    value={cert.expiryDate}
                    onChange={(e) => updateCertification(cert.id, 'expiryDate', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`credential-${cert.id}`}>Credential ID (optional)</Label>
                <Input
                  id={`credential-${cert.id}`}
                  value={cert.credentialId}
                  onChange={(e) => updateCertification(cert.id, 'credentialId', e.target.value)}
                  placeholder="ABC123456"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <Button onClick={addCertification} variant="outline" className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Add Certification
      </Button>
    </div>
  );
};

export default CertificationsStep;
