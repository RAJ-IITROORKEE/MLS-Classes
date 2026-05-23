"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type BuyMockButtonProps = {
  mockTestId?: string;
  mockBundleId?: string;
  title: string;
  amount: number;
  onSuccess?: () => void;
};

type RazorpayResponse = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve(false);
      return;
    }
    if ((window as unknown as { Razorpay?: unknown }).Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export function BuyMockButton({
  mockTestId,
  mockBundleId,
  title,
  amount,
  onSuccess,
}: BuyMockButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleBuy = async () => {
    if (!mockTestId && !mockBundleId) return;
    setLoading(true);
    toast.loading("Creating payment order...");

    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        toast.dismiss();
        toast.error("Razorpay SDK failed to load.");
        setLoading(false);
        return;
      }

      const res = await fetch("/api/payment/mock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mockTestId, mockBundleId }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.dismiss();
        toast.error(data?.error ?? "Failed to create payment order");
        setLoading(false);
        return;
      }

      toast.dismiss();

      const razorpay = new (window as unknown as { Razorpay: new (options: unknown) => { open: () => void } }).Razorpay({
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: "MLS Classes",
        description: title,
        order_id: data.orderId,
        handler: (response: RazorpayResponse) => {
          verifyPayment(response);
        },
        theme: { color: "#0f172a" },
      });

      razorpay.open();
    } catch {
      toast.dismiss();
      toast.error("Something went wrong while starting payment.");
      setLoading(false);
    }
  };

  const verifyPayment = async (response: RazorpayResponse) => {
    try {
      toast.loading("Verifying payment...");
      const verifyRes = await fetch("/api/payment/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          razorpayOrderId: response.razorpay_order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpaySignature: response.razorpay_signature,
        }),
      });

      const data = await verifyRes.json();
      if (!verifyRes.ok) {
        toast.dismiss();
        toast.error(data?.error ?? "Payment verification failed");
        setLoading(false);
        return;
      }

      toast.dismiss();
      toast.success("Payment verified. Access unlocked!");
      onSuccess?.();
      router.refresh();
    } catch {
      toast.dismiss();
      toast.error("Error during payment verification.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleBuy} disabled={loading} className="gap-2">
      {loading ? "Processing..." : `Buy for ₹${amount}`}
    </Button>
  );
}
