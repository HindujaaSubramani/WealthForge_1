import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function BorrowerLoanApplication() {
  const [amount, setAmount] = useState<number>(0);
  const [tenure, setTenure] = useState<number>(0); // in months

  const handleSubmit = () => {
    if (amount <= 0 || tenure <= 0) {
      alert("Please enter valid loan details.");
      return;
    }

    // Later this will be sent to backend
    const loanRequest = {
      amount,
      tenure,
      status: "Pending Lender Offers"
    };

    console.log("Loan Request Submitted:", loanRequest);
    alert("✅ Loan Request Submitted Successfully!");
  };

  return (
    <div className="flex justify-center mt-10">
      <Card className="w-full max-w-2xl shadow-xl p-6">
        <CardContent>
          <h2 className="text-2xl font-bold mb-4 text-center">
            Borrower: Apply for Loan
          </h2>

          {/* Loan Amount */}
          <div className="mb-4">
            <Label>Loan Amount (₹)</Label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="Enter amount"
            />
          </div>

          {/* Loan Tenure */}
          <div className="mb-4">
            <Label>Tenure (in months)</Label>
            <Input
              type="number"
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
              placeholder="Enter tenure in months"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button onClick={handleSubmit}>Submit Loan Request</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
