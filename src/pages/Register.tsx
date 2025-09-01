import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { LanguageToggle } from "@/components/LanguageToggle";
import { supabase } from "@/lib/supabaseClient";

type Language = "en" | "ta";

const Register = () => {
  const [language, setLanguage] = useState<Language>("en");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const content = {
    en: {
      title: "Join LendTrust",
      subtitle: "Create your secure lending account",
      fullName: "Full Name",
      email: "Email Address",
      phone: "Phone Number",
      password: "Password",
      confirmPassword: "Confirm Password",
      agreeTerms: "I agree to the Terms of Service and Privacy Policy",
      createAccount: "Create Account",
      alreadyAccount: "Already have an account?",
      signIn: "Sign in here",
      backToHome: "Back to Home",
      passwordMismatch: "Passwords do not match",
      registrationFailed: "Registration failed. Please try again.",
    },
    ta: {
      title: "லெண்ட்ட்ரஸ்ட் உடன் சேருங்கள்",
      subtitle: "உங்கள் பாதுகாப்பான கடன் கணக்கை உருவாக்குங்கள்",
      fullName: "முழு பெயர்",
      email: "மின்னஞ்சல் முகவரி",
      phone: "தொலைபேசி எண்",
      password: "கடவுச்சொல்",
      confirmPassword: "கடவுச்சொல்லை உறுதிப்படுத்துங்கள்",
      agreeTerms: "நான் சேவை விதிமுறைகள் மற்றும் தனியுரிமைக் கொள்கையை ஏற்றுக்கொள்கிறேன்",
      createAccount: "கணக்கை உருவாக்கு",
      alreadyAccount: "ஏற்கனவே கணக்கு உள்ளதா?",
      signIn: "இங்கே உள்நுழையுங்கள்",
      backToHome: "முகப்புக்கு திரும்பு",
      passwordMismatch: "கடவுச்சொற்கள் பொருந்தவில்லை",
      registrationFailed: "பதிவு தோல்வியடைந்தது. மீண்டும் முயற்சிக்கவும்.",
    },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert(content[language].passwordMismatch);
      return;
    }

    if (!agreed) {
      alert("You must agree to the Terms");
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ Sign up user
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (signUpError) {
        alert(signUpError.message || content[language].registrationFailed);
        setLoading(false);
        return;
      }

      if (!signUpData.user) {
        alert("User signup failed. Please try again.");
        setLoading(false);
        return;
      }

      // 2️⃣ Auto sign-in immediately
      const { data: signInData, error: signInError } =
        await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

      if (signInError) {
        alert(signInError.message || content[language].registrationFailed);
        setLoading(false);
        return;
      }

      const userId = signInData.user.id;

      // 3️⃣ Insert profile row (matches RLS)
      const { error: insertError } = await supabase.from("profiles").insert([
        {
          id: userId, // must match auth UID
          full_name: formData.fullName,
          phone: formData.phone,
          email: formData.email,
        },
      ]);

      if (insertError) {
        console.error("Profile insert error:", insertError.message);
        alert(
          "Profile creation failed. Make sure your email is unique or try again later."
        );
        setLoading(false);
        return;
      }

      // 4️⃣ Redirect to KYC upload page
      navigate("/kyc-upload");
    } catch (err: any) {
      console.error(err);
      alert(content[language].registrationFailed);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate("/")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            {content[language].backToHome}
          </Button>
          <LanguageToggle
            currentLanguage={language}
            onLanguageChange={setLanguage}
          />
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-trust-blue">
              {content[language].title}
            </CardTitle>
            <CardDescription>{content[language].subtitle}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName">{content[language].fullName}</Label>
                <Input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">{content[language].email}</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone">{content[language].phone}</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  required
                />
              </div>

              {/* Password */}
              <div className="space-y-2 relative">
                <Label htmlFor="password">{content[language].password}</Label>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </Button>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2 relative">
                <Label htmlFor="confirmPassword">
                  {content[language].confirmPassword}
                </Label>
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, confirmPassword: e.target.value })
                  }
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-2"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff /> : <Eye />}
                </Button>
              </div>

              {/* Terms */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={agreed}
                  onCheckedChange={(checked) => setAgreed(checked as boolean)}
                />
                <Label htmlFor="terms">{content[language].agreeTerms}</Label>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full"
                disabled={!agreed || loading}
              >
                {loading ? "Creating..." : content[language].createAccount}
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                {content[language].alreadyAccount}{" "}
                <Link to="/login" className="text-trust-blue hover:underline">
                  {content[language].signIn}
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
