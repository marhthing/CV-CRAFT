import { Check } from 'lucide-react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const steps = [
  { number: 1, label: 'Personal' },
  { number: 2, label: 'Education' },
  { number: 3, label: 'Skills' },
  { number: 4, label: 'Experience' },
  { number: 5, label: 'Summary' },
  { number: 6, label: 'Projects' },
  { number: 7, label: 'Certificates' },
  { number: 8, label: 'Languages' },
  { number: 9, label: 'Additional' },
];

export const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
  return (
    <div className="w-full py-8">
      <div className="flex items-center justify-between relative">
        {/* Progress line */}
        <div className="absolute left-0 top-5 h-0.5 bg-border w-full -z-10">
          <div
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
          />
        </div>

        {/* Step circles */}
        {steps.map((step) => (
          <div key={step.number} className="flex flex-col items-center gap-2 bg-background px-2">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                step.number < currentStep
                  ? 'bg-primary border-primary text-primary-foreground'
                  : step.number === currentStep
                  ? 'bg-primary border-primary text-primary-foreground scale-110'
                  : 'bg-background border-border text-muted-foreground'
              }`}
            >
              {step.number < currentStep ? (
                <Check className="h-5 w-5" />
              ) : (
                <span className="font-semibold">{step.number}</span>
              )}
            </div>
            <span
              className={`text-sm font-medium hidden sm:block transition-colors ${
                step.number <= currentStep ? 'text-foreground' : 'text-muted-foreground'
              }`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
