import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";

// Dummy borrower loan requests (later replace with API call)
const borrowerRequests = [
  { id: 1, amount: 100000, tenure: 12 }, // 1 year
  { id: 2, amount: 50000, tenure: 6 },   // 6 months
  { id: 3, amount: 200000, tenure: 24 }, // 2 years
];

export default function LenderOffer() {
  const [roi, setRoi] = useState<{ [key: number]: number }>({});
  const [emi, setEmi] = useState<{ [key: number]: number }>({});
  const [warning, setWarning] = useState<string | null>(null);

  const calculateEMI = (id: number, amount: number, tenure: number, roiValue: number) => {
    if (roiValue < 5 || roiValue > 24) {
      setWarning("⚠️ ROI must be between 5% and 24%.");
      setEmi((prev) => ({ ...prev, [id]: 0 }));
      return;
    }
    setWarning(null);

    const monthlyRate = roiValue / 12 / 100;
    const emiCalc =
      (amount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
      (Math.pow(1 + monthlyRate, tenure) - 1);

    setEmi((prev) => ({ ...prev, [id]: Number(emiCalc.toFixed(2)) }));
  };

  const submitOffer = (id: number, amount: number, tenure: number, roiValue: number) => {
    if (!roiValue || roiValue < 5 || roiValue > 24) {
      alert("Please enter a valid ROI between 5% and 24%.");
      return;
    }

    const offer = {
      loanId: id,
      amount,
      tenure,
      roi: roiValue,
      emi: emi[id],
      status: "Offer Sent",
    };

    console.log("Lender Offer Submitted:", offer);
    alert(`✅ Offer submitted for Loan ID: ${id}`);
  };

  return (
    <div className="flex flex-col items-center mt-10 gap-6">
      <h2 className="text-2xl font-bold mb-4">Lender: View Borrower Requests</h2>

      {borrowerRequests.map((req) => (
        <Card key={req.id} className="w-full max-w-2xl shadow-lg p-6">
          <CardContent>
            <h3 className="text-lg font-semibold mb-2">Loan Request #{req.id}</h3>
            <p>Amount: ₹{req.amount}</p>
            <p>Tenure: {req.tenure} months</p>

            {/* ROI Input */}
            <div className="mt-4">
              <Label>Set Rate of Interest (%)</Label>
              <Input
                type="number"
                value={roi[req.id] || ""}
                onChange={(e) => {
                  const roiValue = Number(e.target.value);
                  setRoi((prev) => ({ ...prev, [req.id]: roiValue }));
                  calculateEMI(req.id, req.amount, req.tenure, roiValue);
                }}
                placeholder="Enter ROI (5% - 24%)"
              />
            </div>

            {/* Warning */}
            {warning && (
              <div className="flex items-center text-red-600 text-sm mt-2">
                <AlertCircle className="mr-2 h-4 w-4" />
                {warning}
              </div>
            )}

            {/* EMI Display */}
            {emi[req.id] > 0 && !warning && (
              <div className="bg-green-100 text-green-800 p-3 rounded mt-3">
                EMI: <strong>₹{emi[req.id]}</strong> / month
              </div>
            )}

            {/* Submit Offer */}
            <div className="flex justify-end mt-4">
              <Button onClick={() => submitOffer(req.id, req.amount, req.tenure, roi[req.id])}>
                Submit Offer
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
