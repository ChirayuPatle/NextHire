import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OTPVerification } from './OTPVerification';
import { RegistrationForm } from './RegistrationForm';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

interface RegistrationWrapperProps {
  type: 'candidate' | 'organization';
  onBack: () => void;
}

export function RegistrationWrapper({ type, onBack }: RegistrationWrapperProps) {
  const [step, setStep] = useState<'form' | 'otp'>('form');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRegistrationComplete = (userEmail: string) => {
    setEmail(userEmail);
    setStep('otp');
  };

  const handleVerificationComplete = () => {
    toast.success('Registration completed successfully!');
    navigate('/dashboard');
  };

  return (
    <Card className="p-6">
      {step === 'form' ? (
        type === 'candidate' ? (
          <CandidateRegistrationForm
            onComplete={handleRegistrationComplete}
            onBack={onBack}
          />
        ) : (
          <OrganizationRegistrationForm
            onComplete={handleRegistrationComplete}
            onBack={onBack}
          />
        )
      ) : (
        <OTPVerification
          email={email}
          onVerificationComplete={handleVerificationComplete}
          onBack={() => setStep('form')}
        />
      )}
    </Card>
  );
} 