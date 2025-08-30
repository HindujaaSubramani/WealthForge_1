import { Shield, Users, Scale } from 'lucide-react';

interface TrustSignalsProps {
  language: 'en' | 'ta';
}

export const TrustSignals = ({ language }: TrustSignalsProps) => {
  const signals = {
    en: [
      {
        icon: Shield,
        title: "Secure & Transparent",
        description: "Bank-level encryption and complete transaction transparency"
      },
      {
        icon: Users,
        title: "Verified Users Only",
        description: "Comprehensive KYC verification for all platform members"
      },
      {
        icon: Scale,
        title: "Dispute Resolution",
        description: "Fair and professional dispute resolution process"
      }
    ],
    ta: [
      {
        icon: Shield,
        title: "பாதுகாப்பு மற்றும் வெளிப்படைத்தன்மை",
        description: "வங்கி அளவிலான பாதுகாப்பு மற்றும் முழுமையான பரிவர்த்தனை வெளிப்படைத்தன்மை"
      },
      {
        icon: Users,
        title: "சரிபார்க்கப்பட்ட பயனர்கள் மட்டுமே",
        description: "எல்லா உறுப்பினர்களுக்கும் விரிவான அடையாள சரிபார்ப்பு"
      },
      {
        icon: Scale,
        title: "சர்ச்சை தீர்வு",
        description: "நியாயமான மற்றும் தொழில்முறை சர்ச்சை தீர்வு செயல்முறை"
      }
    ]
  };

  return (
    <div className="grid md:grid-cols-3 gap-6 py-12">
      {signals[language].map((signal, index) => (
        <div key={index} className="trust-card text-center">
          <signal.icon className="h-12 w-12 mx-auto mb-4 text-trust-blue" />
          <h3 className={`text-lg font-semibold mb-2 ${language === 'ta' ? 'text-tamil' : ''}`}>
            {signal.title}
          </h3>
          <p className={`text-muted-foreground text-sm ${language === 'ta' ? 'text-tamil' : ''}`}>
            {signal.description}
          </p>
        </div>
      ))}
    </div>
  );
};