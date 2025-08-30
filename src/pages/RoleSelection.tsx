import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, UserCheck, HandCoins, Shield } from 'lucide-react';
import { LanguageToggle } from '@/components/LanguageToggle';

const RoleSelection = () => {
  const [language, setLanguage] = useState<'en' | 'ta'>('en');
  const navigate = useNavigate();

  const content = {
    en: {
      title: "Choose Your Role",
      subtitle: "Select how you'd like to use LendTrust",
      borrower: {
        title: "Borrower",
        description: "Get loans from verified lenders with transparent terms",
        features: ["Apply for personal loans", "Transparent interest rates", "Flexible repayment options", "Quick approval process"]
      },
      lender: {
        title: "Lender", 
        description: "Lend money to verified borrowers and earn returns",
        features: ["Browse verified borrowers", "Set your own interest rates", "Secure investment platform", "Track your earnings"]
      },
      admin: {
        title: "Administrator",
        description: "Manage platform operations and user verification",
        features: ["Verify user documents", "Handle disputes", "Monitor transactions", "Ensure platform security"]
      },
      select: "Select Role",
      backToHome: "Back to Home"
    },
    ta: {
      title: "உங்கள் பாத்திரத்தை தேர்வு செய்யுங்கள்",
      subtitle: "லெண்ட்ட்ரஸ்ட்டை எவ்வாறு பயன்படுத்த விரும்புகிறீர்கள் என்பதைத் தேர்ந்தெடுக்கவும்",
      borrower: {
        title: "கடன் வாங்குபவர்",
        description: "வெளிப்படையான விதிமுறைகளுடன் சரிபார்க்கப்பட்ட கடன் கொடுப்பவர்களிடமிருந்து கடன் பெறுங்கள்",
        features: ["தனிப்பட்ட கடனுக்கு விண்ணப்பிக்கவும்", "வெளிப்படையான வட்டி விகிதங்கள்", "நெகிழ்வான திருப்பிச் செலுத்தும் விருப்பங்கள்", "விரைவான ஒப்புதல் செயல்முறை"]
      },
      lender: {
        title: "கடன் கொடுப்பவர்",
        description: "சரிபார்க்கப்பட்ட கடன் வாங்குபவர்களுக்கு பணம் கொடுத்து வருமானம் ஈட்டுங்கள்",
        features: ["சரிபார்க்கப்பட்ட கடன் வாங்குபவர்களைப் பார்க்கவும்", "உங்கள் சொந்த வட்டி விகிதங்களை அமைக்கவும்", "பாதுகாப்பான முதலீட்டு தளம்", "உங்கள் வருவாயைக் கண்காணிக்கவும்"]
      },
      admin: {
        title: "நிர்வாகி",
        description: "தளத்தின் செயல்பாடுகள் மற்றும் பயனர் சரிபார்ப்பை நிர்வகிக்கவும்",
        features: ["பயனர் ஆவணங்களைச் சரிபார்க்கவும்", "சர்ச்சைகளைக் கையாளுங்கள்", "பரிவர்த்தனைகளைக் கண்காணிக்கவும்", "தளத்தின் பாதுகாப்பை உறுதிப்படுத்துங்கள்"]
      },
      select: "பாத்திரத்தைத் தேர்ந்தெடுக்கவும்",
      backToHome: "முகப்புக்கு திரும்பு"
    }
  };

  const roles = [
    {
      key: 'borrower',
      icon: UserCheck,
      color: 'trust-blue',
      ...content[language].borrower
    },
    {
      key: 'lender', 
      icon: HandCoins,
      color: 'success-green',
      ...content[language].lender
    },
    {
      key: 'admin',
      icon: Shield,
      color: 'premium-gold',
      ...content[language].admin
    }
  ];

  const handleRoleSelect = (role: string) => {
    navigate(`/dashboard?role=${role}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={() => navigate('/')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span className={language === 'ta' ? 'text-tamil' : ''}>
              {content[language].backToHome}
            </span>
          </Button>
          <LanguageToggle currentLanguage={language} onLanguageChange={setLanguage} />
        </div>

        <div className="text-center mb-12">
          <h1 className={`text-3xl font-bold mb-4 ${language === 'ta' ? 'text-tamil' : ''}`}>
            {content[language].title}
          </h1>
          <p className={`text-xl text-muted-foreground ${language === 'ta' ? 'text-tamil' : ''}`}>
            {content[language].subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {roles.map((role) => (
            <Card key={role.key} className="trust-card hover:shadow-trust transition-shadow">
              <CardHeader className="text-center">
                <div className={`w-16 h-16 rounded-full bg-${role.color}/10 flex items-center justify-center mx-auto mb-4`}>
                  <role.icon className={`h-8 w-8 text-${role.color}`} />
                </div>
                <CardTitle className={`text-xl font-bold ${language === 'ta' ? 'text-tamil' : ''}`}>
                  {role.title}
                </CardTitle>
                <CardDescription className={`${language === 'ta' ? 'text-tamil' : ''}`}>
                  {role.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {role.features.map((feature, index) => (
                    <li key={index} className={`text-sm flex items-center ${language === 'ta' ? 'text-tamil' : ''}`}>
                      <div className={`w-1.5 h-1.5 rounded-full bg-${role.color} mr-3 flex-shrink-0`} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  onClick={() => handleRoleSelect(role.key)}
                  className={`w-full ${role.key === 'borrower' ? 'btn-trust' : role.key === 'lender' ? 'btn-success' : 'btn-premium'}`}
                >
                  <span className={language === 'ta' ? 'text-tamil' : ''}>
                    {content[language].select}
                  </span>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;