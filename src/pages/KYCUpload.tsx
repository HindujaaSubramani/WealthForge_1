import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, FileText, ArrowLeft, CheckCircle } from 'lucide-react';
import { LanguageToggle } from '@/components/LanguageToggle';

const KYCUpload = () => {
  const [language, setLanguage] = useState<'en' | 'ta'>('en');
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    idType: '',
    idNumber: '',
    address: '',
    panNumber: '',
    documents: {
      idProof: null,
      addressProof: null,
      incomeProof: null,
      photo: null
    }
  });
  const navigate = useNavigate();

  const content = {
    en: {
      title: "Complete Your KYC",
      subtitle: "Upload your documents for verification",
      step1Title: "Identity Verification",
      step2Title: "Document Upload",
      idType: "ID Document Type",
      idNumber: "ID Number",
      address: "Current Address",
      panNumber: "PAN Number",
      idProof: "ID Proof (Aadhaar/Passport/License)",
      addressProof: "Address Proof",
      incomeProof: "Income Proof (Salary Slip/ITR)",
      photo: "Recent Photograph",
      selectFile: "Select File",
      continue: "Continue",
      submit: "Submit KYC",
      back: "Back",
      backToHome: "Back to Home",
      success: "KYC Submitted Successfully!",
      successMessage: "Your documents are under review. You'll be notified once verified.",
      proceedToDashboard: "Proceed to Dashboard"
    },
    ta: {
      title: "உங்கள் KYC ஐ முடிக்கவும்",
      subtitle: "சரிபார்ப்புக்காக உங்கள் ஆவணங்களை பதிவேற்றவும்",
      step1Title: "அடையாள சரிபார்ப்பு",
      step2Title: "ஆவண பதிவேற்றம்",
      idType: "அடையாள ஆவண வகை",
      idNumber: "அடையாள எண்",
      address: "தற்போதைய முகவரி",
      panNumber: "PAN எண்",
      idProof: "அடையாள ஆதாரம் (ஆதார்/பாஸ்போர்ட்/உரிமம்)",
      addressProof: "முகவரி ஆதாரம்",
      incomeProof: "வருமான ஆதாரம் (சம்பள சீட்டு/ITR)",
      photo: "சமீபத்திய புகைப்படம்",
      selectFile: "கோப்பைத் தேர்வுசெய்",
      continue: "தொடர்",
      submit: "KYC ஐ சமர்ப்பிக்கவும்",
      back: "பின்",
      backToHome: "முகப்புக்கு திரும்பு",
      success: "KYC வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது!",
      successMessage: "உங்கள் ஆவணங்கள் மதிப்பாய்வில் உள்ளன. சரிபார்க்கப்பட்டவுடன் உங்களுக்கு தெரிவிக்கப்படும்.",
      proceedToDashboard: "டாஷ்போர்டுக்கு செல்லுங்கள்"
    }
  };

  const handleFileUpload = (type: string, file: File | null) => {
    setFormData({
      ...formData,
      documents: {
        ...formData.documents,
        [type]: file
      }
    });
  };

  const handleSubmit = () => {
    setStep(3); // Success step
  };

  const renderStep1 = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className={language === 'ta' ? 'text-tamil' : ''}>
          {content[language].idType}
        </Label>
        <Select value={formData.idType} onValueChange={(value) => setFormData({...formData, idType: value})}>
          <SelectTrigger className="trust-input">
            <SelectValue placeholder={language === 'en' ? 'Select ID type' : 'அடையாள வகையைத் தேர்ந்தெடுக்கவும்'} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="aadhaar">Aadhaar Card / ஆதார் அட்டை</SelectItem>
            <SelectItem value="passport">Passport / பாஸ்போர்ட்</SelectItem>
            <SelectItem value="license">Driving License / ஓட்டுநர் உரிமம்</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className={language === 'ta' ? 'text-tamil' : ''}>
          {content[language].idNumber}
        </Label>
        <Input
          value={formData.idNumber}
          onChange={(e) => setFormData({...formData, idNumber: e.target.value})}
          className="trust-input"
        />
      </div>

      <div className="space-y-2">
        <Label className={language === 'ta' ? 'text-tamil' : ''}>
          {content[language].panNumber}
        </Label>
        <Input
          value={formData.panNumber}
          onChange={(e) => setFormData({...formData, panNumber: e.target.value})}
          className="trust-input"
        />
      </div>

      <div className="space-y-2">
        <Label className={language === 'ta' ? 'text-tamil' : ''}>
          {content[language].address}
        </Label>
        <Input
          value={formData.address}
          onChange={(e) => setFormData({...formData, address: e.target.value})}
          className="trust-input"
        />
      </div>

      <Button 
        onClick={() => setStep(2)} 
        className="w-full btn-trust"
        disabled={!formData.idType || !formData.idNumber || !formData.address}
      >
        <span className={language === 'ta' ? 'text-tamil' : ''}>
          {content[language].continue}
        </span>
      </Button>
    </div>
  );

  const renderFileUpload = (type: string, label: string) => (
    <div className="space-y-2">
      <Label className={language === 'ta' ? 'text-tamil' : ''}>{label}</Label>
      <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
        <p className="text-sm text-muted-foreground mb-2">
          {language === 'en' ? 'Click to upload or drag file here' : 'பதிவேற்ற கிளிக் செய்யவும் அல்லது கோப்பை இங்கே இழுக்கவும்'}
        </p>
        <Input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(e) => handleFileUpload(type, e.target.files?.[0] || null)}
          className="hidden"
          id={type}
        />
        <Label htmlFor={type} className="cursor-pointer">
          <Button variant="outline" className="btn-outline">
            <FileText className="h-4 w-4 mr-2" />
            <span className={language === 'ta' ? 'text-tamil' : ''}>
              {content[language].selectFile}
            </span>
          </Button>
        </Label>
        {formData.documents[type as keyof typeof formData.documents] && (
          <p className="text-sm text-success-green mt-2">
            ✓ {language === 'en' ? 'File uploaded' : 'கோப்பு பதிவேற்றப்பட்டது'}
          </p>
        )}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      {renderFileUpload('idProof', content[language].idProof)}
      {renderFileUpload('addressProof', content[language].addressProof)}
      {renderFileUpload('incomeProof', content[language].incomeProof)}
      {renderFileUpload('photo', content[language].photo)}

      <div className="flex gap-4">
        <Button 
          onClick={() => setStep(1)} 
          variant="outline" 
          className="flex-1"
        >
          <span className={language === 'ta' ? 'text-tamil' : ''}>
            {content[language].back}
          </span>
        </Button>
        <Button 
          onClick={handleSubmit} 
          className="flex-1 btn-trust"
        >
          <span className={language === 'ta' ? 'text-tamil' : ''}>
            {content[language].submit}
          </span>
        </Button>
      </div>
    </div>
  );

  const renderSuccess = () => (
    <div className="text-center space-y-6">
      <CheckCircle className="h-16 w-16 text-success-green mx-auto" />
      <div>
        <h3 className={`text-xl font-semibold text-success-green mb-2 ${language === 'ta' ? 'text-tamil' : ''}`}>
          {content[language].success}
        </h3>
        <p className={`text-muted-foreground ${language === 'ta' ? 'text-tamil' : ''}`}>
          {content[language].successMessage}
        </p>
      </div>
      <Button 
        onClick={() => navigate('/role-selection')} 
        className="btn-trust"
      >
        <span className={language === 'ta' ? 'text-tamil' : ''}>
          {content[language].proceedToDashboard}
        </span>
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
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
            
            {step < 3 && (
              <div className="flex justify-center mt-4">
                <div className="flex items-center space-x-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= 1 ? 'bg-trust-blue text-white' : 'bg-muted text-muted-foreground'
                  }`}>
                    1
                  </div>
                  <div className={`w-16 h-0.5 ${step >= 2 ? 'bg-trust-blue' : 'bg-muted'}`} />
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= 2 ? 'bg-trust-blue text-white' : 'bg-muted text-muted-foreground'
                  }`}>
                    2
                  </div>
                </div>
              </div>
            )}
          </CardHeader>
          <CardContent>
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderSuccess()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default KYCUpload;