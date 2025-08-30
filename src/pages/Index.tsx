import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LanguageToggle } from '@/components/LanguageToggle';
import { TrustSignals } from '@/components/TrustSignals';
import { RoleSelector } from '@/components/RoleSelector';
import heroImage from '@/assets/hero-lending.jpg';

const Index = () => {
  const [language, setLanguage] = useState<'en' | 'ta'>('en');
  const navigate = useNavigate();

  const handleRoleSelect = (role: 'borrower' | 'lender' | 'admin') => {
    navigate(`/dashboard?role=${role}`);
  };

  const content = {
    en: {
      title: "LendTrust",
      subtitle: "Secure Peer-to-Peer Lending Platform",
      description: "Connect with verified lenders and borrowers in a transparent, secure environment designed for trust and growth.",
      getStarted: "Get Started Today",
      learnMore: "Learn More",
      heroTitle: "Lending Made Simple, Safe & Transparent",
      heroSubtitle: "Join thousands of users who trust our platform for secure peer-to-peer lending"
    },
    ta: {
      title: "லெண்ட்ட்ரஸ்ட்",
      subtitle: "பாதுகாப்பான P2P கடன் தளம்",
      description: "நம்பகத்தன்மை மற்றும் வளர்ச்சிக்காக வடிவமைக்கப்பட்ட வெளிப்படையான, பாதுகாப்பான சூழலில் சரிபார்க்கப்பட்ட கடன் கொடுப்பவர்கள் மற்றும் கடன் வாங்குபவர்களுடன் இணையுங்கள்.",
      getStarted: "இன்றே தொடங்குங்கள்",
      learnMore: "மேலும் அறிய",
      heroTitle: "கடன் கொடுப்பது எளிதாக, பாதுகாப்பாக மற்றும் வெளிப்படையாக",
      heroSubtitle: "பாதுகாப்பான P2P கடனுக்காக எங்கள் தளத்தை நம்பும் ஆயிரக்கணக்கான பயனர்களுடன் சேருங்கள்"
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-surface-elevated border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className={`text-2xl font-bold text-trust-blue ${language === 'ta' ? 'text-tamil' : ''}`}>
                {content[language].title}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <LanguageToggle currentLanguage={language} onLanguageChange={setLanguage} />
              <Button variant="outline" onClick={() => navigate('/login')}>
                <span className={language === 'ta' ? 'text-tamil' : ''}>
                  {language === 'en' ? 'Login' : 'உள்நுழை'}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-background via-surface to-surface-elevated">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="trust-badge mb-6">
                <span className={language === 'ta' ? 'text-tamil' : ''}>
                  {content[language].subtitle}
                </span>
              </div>
              <h1 className={`text-4xl lg:text-5xl font-bold mb-6 leading-tight ${language === 'ta' ? 'text-tamil' : ''}`}>
                {content[language].heroTitle}
              </h1>
              <p className={`text-xl text-muted-foreground mb-8 ${language === 'ta' ? 'text-tamil' : ''}`}>
                {content[language].heroSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="btn-trust text-lg px-8 py-4" onClick={() => navigate('/register')}>
                  <span className={language === 'ta' ? 'text-tamil' : ''}>
                    {content[language].getStarted}
                  </span>
                </Button>
                <Button variant="outline" className="text-lg px-8 py-4" onClick={() => navigate('/faq')}>
                  <span className={language === 'ta' ? 'text-tamil' : ''}>
                    {content[language].learnMore}
                  </span>
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src={heroImage} 
                alt="P2P Lending Platform"
                className="rounded-xl shadow-card w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="bg-surface-elevated">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TrustSignals language={language} />
        </div>
      </section>

      {/* Role Selection */}
      <section className="bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold mb-4 ${language === 'ta' ? 'text-tamil' : ''}`}>
              {language === 'en' ? 'Choose Your Role' : 'உங்கள் பாத்திரத்தை தேர்வு செய்யுங்கள்'}
            </h2>
            <p className={`text-xl text-muted-foreground ${language === 'ta' ? 'text-tamil' : ''}`}>
              {content[language].description}
            </p>
          </div>
          <RoleSelector language={language} onRoleSelect={handleRoleSelect} />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h3 className={`text-2xl font-bold mb-4 ${language === 'ta' ? 'text-tamil' : ''}`}>
              {content[language].title}
            </h3>
            <p className={`text-primary-foreground/80 ${language === 'ta' ? 'text-tamil' : ''}`}>
              {content[language].subtitle}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
