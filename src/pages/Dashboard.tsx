import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, User, DollarSign, FileText, Bell } from 'lucide-react';

const Dashboard = () => {
  const [searchParams] = useSearchParams();
  const role = (searchParams.get('role') as 'borrower' | 'lender' | 'admin') || 'borrower';
  const [language, setLanguage] = useState<'en' | 'ta'>('en');
  const navigate = useNavigate();   // ✅ use hook properly

  const dashboardContent = {
    borrower: {
      en: {
        title: "Borrower Dashboard",
        welcomeMessage: "Welcome to your borrower dashboard",
        cards: [
          { title: "Loan Status", value: "No Active Loans", icon: FileText, color: "trust-blue" },
          { title: "Credit Score", value: "Building...", icon: User, color: "security-green" },
          { title: "Available Limit", value: "₹50,000", icon: DollarSign, color: "premium-gold" },
          { title: "Notifications", value: "2 New", icon: Bell, color: "trust-blue" }
        ]
      },
      ta: {
        title: "கடன் வாங்குபவர் பலகம்",
        welcomeMessage: "உங்கள் கடன் வாங்குபவர் பலகத்திற்கு வரவேற்கிறோம்",
        cards: [
          { title: "கடன் நிலை", value: "செயலில் உள்ள கடன் இல்லை", icon: FileText, color: "trust-blue" },
          { title: "கடன் மதிப்பீடு", value: "உருவாக்கப்படுகிறது...", icon: User, color: "security-green" },
          { title: "கிடைக்கும் வரம்பு", value: "₹50,000", icon: DollarSign, color: "premium-gold" },
          { title: "அறிவிப்புகள்", value: "2 புதியவை", icon: Bell, color: "trust-blue" }
        ]
      }
    },
    lender: {
      en: {
        title: "Lender Dashboard",
        welcomeMessage: "Welcome to your lender dashboard",
        cards: [
          { title: "Total Lent", value: "₹0", icon: DollarSign, color: "security-green" },
          { title: "Active Loans", value: "0", icon: FileText, color: "trust-blue" },
          { title: "Earnings", value: "₹0", icon: DollarSign, color: "premium-gold" },
          { title: "Available Funds", value: "₹1,00,000", icon: DollarSign, color: "trust-blue" }
        ]
      },
      ta: {
        title: "கடன் கொடுப்பவர் பலகம்",
        welcomeMessage: "உங்கள் கடன் கொடுப்பவர் பலகத்திற்கு வரவேற்கிறோம்",
        cards: [
          { title: "மொத்தம் கொடுத்த கடன்", value: "₹0", icon: DollarSign, color: "security-green" },
          { title: "செயலில் உள்ள கடன்கள்", value: "0", icon: FileText, color: "trust-blue" },
          { title: "வருமானம்", value: "₹0", icon: DollarSign, color: "premium-gold" },
          { title: "கிடைக்கும் நிதி", value: "₹1,00,000", icon: DollarSign, color: "trust-blue" }
        ]
      }
    },
    admin: {
      en: {
        title: "Admin Dashboard",
        welcomeMessage: "Welcome to the admin dashboard",
        cards: [
          { title: "Total Users", value: "125", icon: User, color: "trust-blue" },
          { title: "Pending KYC", value: "8", icon: FileText, color: "premium-gold" },
          { title: "Active Loans", value: "45", icon: DollarSign, color: "security-green" },
          { title: "Complaints", value: "2", icon: Bell, color: "trust-blue" }
        ]
      },
      ta: {
        title: "நிர்வாக பலகம்",
        welcomeMessage: "நிர்வாக பலகத்திற்கு வரவேற்கிறோம்",
        cards: [
          { title: "மொத்த பயனர்கள்", value: "125", icon: User, color: "trust-blue" },
          { title: "நிலுவையில் உள்ள KYC", value: "8", icon: FileText, color: "premium-gold" },
          { title: "செயலில் உள்ள கடன்கள்", value: "45", icon: DollarSign, color: "security-green" },
          { title: "புகார்கள்", value: "2", icon: Bell, color: "trust-blue" }
        ]
      }
    }
  };

  const content = dashboardContent[role][language];

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="bg-surface-elevated border-b border-border p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              {language === 'en' ? 'Back' : 'திரும்பு'}
            </Button>
            <h1 className={`text-xl font-semibold ${language === 'ta' ? 'text-tamil' : ''}`}>
              {content.title}
            </h1>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLanguage(language === 'en' ? 'ta' : 'en')}
          >
            {language === 'en' ? 'தமிழ்' : 'English'}
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        {/* Welcome Message */}
        <div className="mb-8">
          <h2 className={`text-2xl font-bold mb-2 ${language === 'ta' ? 'text-tamil' : ''}`}>
            {content.welcomeMessage}
          </h2>
        </div>

        {/* Dashboard Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {content.cards.map((card, index) => (
            <Card key={index} className="trust-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm text-muted-foreground mb-1 ${language === 'ta' ? 'text-tamil' : ''}`}>
                    {card.title}
                  </p>
                  <p className="text-2xl font-bold">{card.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-full bg-${card.color}/10 flex items-center justify-center`}>
                  <card.icon className={`h-6 w-6 text-${card.color}`} />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Recent Activity & Quick Actions */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="trust-card">
            <h3 className={`text-lg font-semibold mb-4 ${language === 'ta' ? 'text-tamil' : ''}`}>
              {language === 'en' ? 'Recent Activity' : 'சமீபத்திய செயல்பாடு'}
            </h3>
            <p className={`text-muted-foreground ${language === 'ta' ? 'text-tamil' : ''}`}>
              {language === 'en' ? 'No recent activity to display' : 'காண்பிக்க சமீபத்திய செயல்பாடு இல்லை'}
            </p>
          </Card>

          <Card className="trust-card">
            <h3 className={`text-lg font-semibold mb-4 ${language === 'ta' ? 'text-tamil' : ''}`}>
              {language === 'en' ? 'Quick Actions' : 'விரைவு செயல்கள்'}
            </h3>
            <div className="space-y-2">
              {role === 'borrower' && (
                <>
                  <Button 
                    className="w-full btn-trust"
                    onClick={() => navigate("/borrower/apply-loan")}
                  >
                    <span className={language === 'ta' ? 'text-tamil' : ''}>
                      {language === 'en' ? 'Apply for Loan' : 'கடனுக்கு விண்ணப்பிக்கவும்'}
                    </span>
                  </Button>
                  <Button 
                    className="w-full btn-destructive"
                    onClick={() => navigate("/complaints")}
                  >
                    <span className={language === 'ta' ? 'text-tamil' : ''}>
                      {language === 'en' ? 'Raise Complaint' : 'புகார் அளிக்கவும்'}
                    </span>
                  </Button>
                </>
              )}

              {role === 'lender' && (
                <>
                  <Button className="w-full btn-success">
                    <span className={language === 'ta' ? 'text-tamil' : ''}>
                      {language === 'en' ? 'Browse Borrowers' : 'கடன் வாங்குபவர்களைப் பார்க்கவும்'}
                    </span>
                  </Button>
                  <Button 
                    className="w-full btn-destructive"
                    onClick={() => navigate("/complaints")}
                  >
                    <span className={language === 'ta' ? 'text-tamil' : ''}>
                      {language === 'en' ? 'Raise Complaint' : 'புகார் அளிக்கவும்'}
                    </span>
                  </Button>
                </>
              )}

              {role === 'admin' && (
                <>
                  <Button className="w-full btn-premium">
                    <span className={language === 'ta' ? 'text-tamil' : ''}>
                      {language === 'en' ? 'Review KYC' : 'KYC மதிப்பாய்வு'}
                    </span>
                  </Button>
                  <Button 
                    className="w-full btn-destructive"
                    onClick={() => navigate("/admin/complaints")}
                  >
                    <span className={language === 'ta' ? 'text-tamil' : ''}>
                      {language === 'en' ? 'Review Complaints' : 'புகார்களை மதிப்பாய்வு செய்யவும்'}
                    </span>
                  </Button>
                </>
              )}

              {/* 🔹 Common Button for All Roles */}
              <Button className="w-full btn-outline">
                <span className={language === 'ta' ? 'text-tamil' : ''}>
                  {language === 'en' ? 'View Profile' : 'சுயவிவரம் காண்க'}
                </span>
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
