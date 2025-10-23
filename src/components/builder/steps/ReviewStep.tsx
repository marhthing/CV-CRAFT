import { useCV } from '@/contexts/CVContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { User, GraduationCap, Briefcase, Award, Globe, FolderGit2, Heart, Trophy } from 'lucide-react';

export const ReviewStep = () => {
  const { cvData } = useCV();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Review Your CV</h2>
        <p className="text-muted-foreground">
          Review all your information before finalizing your CV
        </p>
      </div>

      {/* Personal Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div>
            <p className="font-semibold">{cvData.personalInfo.fullName}</p>
            <p className="text-sm text-muted-foreground">{cvData.personalInfo.email}</p>
            <p className="text-sm text-muted-foreground">{cvData.personalInfo.phone}</p>
            {cvData.personalInfo.location && (
              <p className="text-sm text-muted-foreground">{cvData.personalInfo.location}</p>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {cvData.personalInfo.linkedin && (
              <Badge variant="secondary">LinkedIn</Badge>
            )}
            {cvData.personalInfo.github && (
              <Badge variant="secondary">GitHub</Badge>
            )}
            {cvData.personalInfo.website && (
              <Badge variant="secondary">Website</Badge>
            )}
            {cvData.personalInfo.portfolio && (
              <Badge variant="secondary">Portfolio</Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Professional Summary */}
      {cvData.summary && (
        <Card>
          <CardHeader>
            <CardTitle>Professional Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{cvData.summary}</p>
          </CardContent>
        </Card>
      )}

      {/* Education */}
      {cvData.education.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Education ({cvData.education.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {cvData.education.map((edu, index) => (
              <div key={edu.id}>
                {index > 0 && <Separator className="my-4" />}
                <div>
                  <p className="font-semibold">{edu.degree} in {edu.field}</p>
                  <p className="text-sm text-muted-foreground">{edu.school}</p>
                  <p className="text-sm text-muted-foreground">
                    {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Skills */}
      {cvData.skills.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Skills ({cvData.skills.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {cvData.skills.map((skill, index) => (
                <Badge key={index} variant="secondary">{skill}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Experience */}
      {cvData.experience.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Work Experience ({cvData.experience.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {cvData.experience.map((exp, index) => (
              <div key={exp.id}>
                {index > 0 && <Separator className="my-4" />}
                <div>
                  <p className="font-semibold">{exp.position}</p>
                  <p className="text-sm text-muted-foreground">{exp.company} • {exp.location}</p>
                  <p className="text-sm text-muted-foreground">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </p>
                  {exp.description && (
                    <p className="text-sm mt-2">{exp.description}</p>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Projects */}
      {cvData.projects.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FolderGit2 className="h-5 w-5" />
              Projects ({cvData.projects.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {cvData.projects.map((project, index) => (
              <div key={project.id}>
                {index > 0 && <Separator className="my-4" />}
                <div>
                  <p className="font-semibold">{project.title}</p>
                  <p className="text-sm mt-1">{project.description}</p>
                  {project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {project.technologies.map((tech, i) => (
                        <Badge key={i} variant="outline" className="text-xs">{tech}</Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Certifications */}
      {cvData.certifications.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Certifications ({cvData.certifications.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {cvData.certifications.map((cert, index) => (
              <div key={cert.id}>
                {index > 0 && <Separator className="my-4" />}
                <div>
                  <p className="font-semibold">{cert.name}</p>
                  <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                  <p className="text-sm text-muted-foreground">{cert.date}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Languages */}
      {cvData.languages.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Languages ({cvData.languages.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {cvData.languages.map((lang) => (
                <Badge key={lang.id} variant="secondary">
                  {lang.language} - {lang.proficiency}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Volunteer Work */}
      {cvData.volunteerWork.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Volunteer Work ({cvData.volunteerWork.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {cvData.volunteerWork.map((vol, index) => (
              <div key={vol.id}>
                {index > 0 && <Separator className="my-4" />}
                <div>
                  <p className="font-semibold">{vol.position}</p>
                  <p className="text-sm text-muted-foreground">{vol.company}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Awards */}
      {cvData.awards.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Awards & Achievements ({cvData.awards.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {cvData.awards.map((award, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <p className="text-sm">{award}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Interests */}
      {cvData.interests.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Interests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {cvData.interests.map((interest, index) => (
                <Badge key={index} variant="outline">{interest}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
