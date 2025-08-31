import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, FileText, ArrowLeft, CheckCircle } from "lucide-react";
import { LanguageToggle } from "@/components/LanguageToggle";
import { supabase } from "@/lib/supabaseClient";

const KYCUpload = () => {
  const [language, setLanguage] = useState<"en" | "ta">("en");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    idType: "",
    idNumber: "",
    address: "",
    panNumber: "",
    documents: {
      idProof: null as File | null,
      addressProof: null as File | null,
      incomeProof: null as File | null,
      photo: null as File | null,
    },
  });
  const navigate = useNavigate();

  const fileInputs = {
    idProof: useRef<HTMLInputElement>(null),
    addressProof: useRef<HTMLInputElement>(null),
    incomeProof: useRef<HTMLInputElement>(null),
    photo: useRef<HTMLInputElement>(null),
  };

  const content = {
    en: {
      title: "Complete Your KYC",
      subtitle: "Upload your documents for verification",
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
      successMessage:
        "Your documents are under review. You'll be notified once verified.",
      proceedToDashboard: "Proceed to Dashboard",
    },
    ta: {
      title: "உங்கள் KYC ஐ முடிக்கவும்",
      subtitle: "சரிபார்ப்புக்காக உங்கள் ஆவணங்களை பதிவேற்றவும்",
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
      successMessage:
        "உங்கள் ஆவணங்கள் மதிப்பாய்வில் உள்ளன. சரிபார்க்கப்பட்டவுடன் உங்களுக்கு தெரிவிக்கப்படும்.",
      proceedToDashboard: "டாஷ்போர்டுக்கு செல்லுங்கள்",
    },
  };

  const handleFileUpload = (type: keyof typeof formData.documents, file: File | null) => {
    setFormData((prev) => ({
      ...prev,
      documents: {
        ...prev.documents,
        [type]: file,
      },
    }));
  };

  const uploadFile = async (file: File, path: string) => {
    const { error } = await supabase.storage
      .from("kyc-documents")
      .upload(path, file, { upsert: true });
    if (error) throw error;

    const { data: urlData } = supabase.storage
      .from("kyc-documents")
      .getPublicUrl(path);

    return urlData.publicUrl;
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError || !userData.user) throw new Error("User not logged in");

      const user = userData.user;
      const urls: Record<string, string | null> = {};

      for (const key of Object.keys(formData.documents)) {
        const file = formData.documents[key as keyof typeof formData.documents];
        if (file) {
          const path = `${user.id}/${key}-${Date.now()}-${file.name}`;
          urls[key] = await uploadFile(file, path);
        } else {
          urls[key] = null;
        }
      }

      const { error: dbError } = await supabase.from("profiles").upsert({
        id: user.id,
        full_name: user.user_metadata?.full_name || "",
        email: user.email,
        phone: user.user_metadata?.phone || "",
        id_num: formData.idNumber,
        pan_num: formData.panNumber,
        current_address: formData.address,
        id_proof_url: urls.idProof,
        address_proof_url: urls.addressProof,
        income_proof_url: urls.incomeProof,
        photo_url: urls.photo,
      });

      if (dbError) throw dbError;

      setStep(3);
    } catch (err: any) {
      alert("Upload failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderFileUpload = (
    type: keyof typeof formData.documents,
    label: string
  ) => (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
        <p className="text-sm text-muted-foreground mb-2">
          {language === "en"
            ? "Click to upload or drag file here"
            : "பதிவேற்ற கிளிக் செய்யவும் அல்லது கோப்பை இங்கே இழுக்கவும்"}
        </p>

        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          ref={fileInputs[type]}
          onChange={(e) => handleFileUpload(type, e.target.files?.[0] || null)}
          style={{ display: "none" }}
        />

        <Button
          variant="outline"
          type="button"
          onClick={() => fileInputs[type].current?.click()}
        >
          <FileText className="h-4 w-4 mr-2" />
          {content[language].selectFile}
        </Button>

        {formData.documents[type] && (
          <p className="text-sm text-green-600 mt-2">
            ✓ {formData.documents[type]?.name}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
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
            <CardTitle className="text-2xl font-bold text-blue-600">
              {content[language].title}
            </CardTitle>
            <CardDescription>{content[language].subtitle}</CardDescription>
          </CardHeader>
          <CardContent>
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <Label>{content[language].idType}</Label>
                  <Select
                    value={formData.idType}
                    onValueChange={(value) =>
                      setFormData({ ...formData, idType: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select ID type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aadhaar">Aadhaar</SelectItem>
                      <SelectItem value="passport">Passport</SelectItem>
                      <SelectItem value="license">Driving License</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>{content[language].idNumber}</Label>
                  <Input
                    value={formData.idNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, idNumber: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label>{content[language].panNumber}</Label>
                  <Input
                    value={formData.panNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, panNumber: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label>{content[language].address}</Label>
                  <Input
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                  />
                </div>

                <Button
                  onClick={() => setStep(2)}
                  className="w-full"
                  disabled={
                    !formData.idType || !formData.idNumber || !formData.address
                  }
                >
                  {content[language].continue}
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                {renderFileUpload("idProof", content[language].idProof)}
                {renderFileUpload("addressProof", content[language].addressProof)}
                {renderFileUpload("incomeProof", content[language].incomeProof)}
                {renderFileUpload("photo", content[language].photo)}

                <div className="flex gap-4">
                  <Button
                    onClick={() => setStep(1)}
                    variant="outline"
                    className="flex-1"
                  >
                    {content[language].back}
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    className="flex-1"
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : content[language].submit}
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="text-center space-y-6">
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto" />
                <h3 className="text-xl font-semibold text-green-600">
                  {content[language].success}
                </h3>
                <p>{content[language].successMessage}</p>
                <Button onClick={() => navigate("/role-selection")}>
                  {content[language].proceedToDashboard}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default KYCUpload;
