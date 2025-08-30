import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { UserCheck, Wallet, Settings } from 'lucide-react';

interface RoleSelectorProps {
  language: 'en' | 'ta';
  onRoleSelect: (role: 'borrower' | 'lender' | 'admin') => void;
}

export const RoleSelector = ({ language, onRoleSelect }: RoleSelectorProps) => {
  const roles = {
    en: [
      {
        id: 'borrower' as const,
        icon: UserCheck,
        title: "I need a loan",
        subtitle: "Borrower",
        description: "Access funds from verified lenders with transparent terms",
        buttonText: "Continue as Borrower",
        gradient: "from-trust-blue to-trust-blue-light"
      },
      {
        id: 'lender' as const,
        icon: Wallet,
        title: "I want to lend",
        subtitle: "Lender",
        description: "Earn returns by lending to verified borrowers",
        buttonText: "Continue as Lender",
        gradient: "from-security-green to-security-green-light"
      },
      {
        id: 'admin' as const,
        icon: Settings,
        title: "Platform Admin",
        subtitle: "Administrator",
        description: "Manage platform operations and user verification",
        buttonText: "Admin Dashboard",
        gradient: "from-premium-gold to-premium-gold-light"
      }
    ],
    ta: [
      {
        id: 'borrower' as const,
        icon: UserCheck,
        title: "எனக்கு கடன் தேவை",
        subtitle: "கடன் வாங்குபவர்",
        description: "சரிபார்க்கப்பட்ட கடன் கொடுப்பவர்களிடமிருந்து வெளிப்படையான நிபந்தனைகளுடன் நிதி பெறுங்கள்",
        buttonText: "கடன் வாங்குபவராக தொடரவும்",
        gradient: "from-trust-blue to-trust-blue-light"
      },
      {
        id: 'lender' as const,
        icon: Wallet,
        title: "நான் கடன் கொடுக்க விரும்புகிறேன்",
        subtitle: "கடன் கொடுப்பவர்",
        description: "சரிபார்க்கப்பட்ட கடன் வாங்குபவர்களுக்கு கடன் கொடுத்து வருமானம் ஈட்டுங்கள்",
        buttonText: "கடன் கொடுப்பவராக தொடரவும்",
        gradient: "from-security-green to-security-green-light"
      },
      {
        id: 'admin' as const,
        icon: Settings,
        title: "தளத்தின் நிர்வாகி",
        subtitle: "நிர்வாகி",
        description: "தளத்தின் செயல்பாடுகள் மற்றும் பயனர் சரிபார்ப்பை நிர்வகிக்கவும்",
        buttonText: "நிர்வாக பலகம்",
        gradient: "from-premium-gold to-premium-gold-light"
      }
    ]
  };

  return (
    <div className="grid md:grid-cols-3 gap-6 py-8">
      {roles[language].map((role) => (
        <Card key={role.id} className="trust-card text-center group cursor-pointer" onClick={() => onRoleSelect(role.id)}>
          <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${role.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
            <role.icon className="h-8 w-8 text-white" />
          </div>
          <h3 className={`text-xl font-semibold mb-1 ${language === 'ta' ? 'text-tamil' : ''}`}>
            {role.title}
          </h3>
          <p className={`text-sm text-muted-foreground mb-2 ${language === 'ta' ? 'text-tamil' : ''}`}>
            {role.subtitle}
          </p>
          <p className={`text-sm text-muted-foreground mb-6 ${language === 'ta' ? 'text-tamil' : ''}`}>
            {role.description}
          </p>
          <Button 
            className={`w-full bg-gradient-to-r ${role.gradient} text-white hover:scale-105 transition-all duration-300`}
            onClick={(e) => {
              e.stopPropagation();
              onRoleSelect(role.id);
            }}
          >
            <span className={language === 'ta' ? 'text-tamil' : ''}>
              {role.buttonText}
            </span>
          </Button>
        </Card>
      ))}
    </div>
  );
};