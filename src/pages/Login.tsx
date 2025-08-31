import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { LanguageToggle } from '@/components/LanguageToggle';
import { supabase } from "@/lib/supabaseClient";  // ✅ Import Supabase client

const Login = () => {
  const [language, setLanguage] = useState<'en' | 'ta'>('en');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const content = {
    en: {
      title: "Welcome Back",
      subtitle: "Sign in to your LendTrust account",
      email: "Email Address",
      password: "Password",
      signIn: "Sign In",
      forgotPassword: "Forgot Password?",
      noAccount: "Don't have an account?",
      signUp: "Sign up here",
      backToHome: "Back to Home"
    },
    ta: {
      title: "மீண்டும் வரவேற்கிறோம்",
      subtitle: "உங்கள் லெண்ட்ட்ரஸ்ட் கணக்கில் உள்நுழையுங்கள்",
      email: "மின்னஞ்சல் முகவரி",
      password: "கடவுச்சொல்",
      signIn: "உள்நுழை",
      forgotPassword: "கடவுச்சொல் மறந்தீர்களா?",
      noAccount: "கணக்கு இல்லையா?",
      signUp: "இங்கே பதிவு செய்யுங்கள்",
      backToHome: "முகப்புக்கு திரும்பு"
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    setLoading(false);

    if (error) {
      alert(`Login failed: ${error.message}`);
      return;
    }

    // ✅ If login success, redirect
    navigate('/role-selection');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate('/')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span className={language === 'ta' ? 'text-tamil' : ''}>
              {content[language].backToHome}
            </span>
          </Button>
          <LanguageToggle currentLanguage={language} onLanguageChange={setLanguage} />
        </div>

        <Card className="trust-card">
          <CardHeader className="text-center">
            <CardTitle className={`text-2xl font-bold text-trust-blue ${language === 'ta' ? 'text-tamil' : ''}`}>
              {content[language].title}
            </CardTitle>
            <CardDescription className={language === 'ta' ? 'text-tamil' : ''}>
              {content[language].subtitle}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className={language === 'ta' ? 'text-tamil' : ''}>
                  {content[language].email}
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="trust-input"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className={language === 'ta' ? 'text-tamil' : ''}>
                  {content[language].password}
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    className="trust-input pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full btn-trust" disabled={loading}>
                <span className={language === 'ta' ? 'text-tamil' : ''}>
                  {loading ? 'Signing in...' : content[language].signIn}
                </span>
              </Button>

              <div className="text-center">
                <Button variant="link" className="text-trust-blue">
                  <span className={language === 'ta' ? 'text-tamil' : ''}>
                    {content[language].forgotPassword}
                  </span>
                </Button>
              </div>

              <div className="text-center text-sm text-muted-foreground">
                <span className={language === 'ta' ? 'text-tamil' : ''}>
                  {content[language].noAccount}
                </span>
                {' '}
                <Link to="/register" className="text-trust-blue hover:underline">
                  <span className={language === 'ta' ? 'text-tamil' : ''}>
                    {content[language].signUp}
                  </span>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
