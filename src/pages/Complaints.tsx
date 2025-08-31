import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Complaints() {
  const [role, setRole] = useState<string>("");
  const [issue, setIssue] = useState<string>("");

  const handleSubmit = () => {
    if (!role || !issue) {
      alert("Please select role and enter complaint");
      return;
    }
    alert(`Complaint submitted by ${role}: ${issue}`);
    setRole("");
    setIssue("");
  };

  return (
    <div className="flex justify-center mt-20 px-4">
      <Card className="w-full max-w-2xl shadow-lg p-6">
        <CardContent>
          <h2 className="text-2xl font-bold mb-4 text-center">Raise a Complaint</h2>

          {/* Role Selection */}
          <div className="mb-4">
            <Label>Who is raising complaint?</Label>
            <Select onValueChange={setRole} value={role}>
              <SelectTrigger>
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="borrower">Borrower</SelectItem>
                <SelectItem value="lender">Lender</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Complaint Text */}
          <div className="mb-4">
            <Label>Describe your issue</Label>
            <Textarea
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
              placeholder="Enter details of complaint"
            />
          </div>

          {/* Helpline */}
          <div className="bg-blue-100 text-blue-800 p-3 rounded mb-4">
            📞 For urgent help, contact our helpline: <strong>1800-123-456</strong>
          </div>

          <Button className="w-full" onClick={handleSubmit}>
            Submit Complaint
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
