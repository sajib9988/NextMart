"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@/context/userContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function PaymentDetails() {
  const user = useUser();
  const router = useRouter();

  const handleOrder = async () => {
    toast.loading("Order is being placed");

    if (!user.user) {
      router.push("/login");
      toast.error("Please login first.");
      return;
    }

    toast.success("Order placed successfully!");
    router.push("/order-confirmation");
  };

  return (
    <div className="border-2 border-white bg-background brightness-105 rounded-md col-span-4 h-fit p-5">
      <h1 className="text-2xl font-bold">Payment Details</h1>
      <div className="space-y-2 mt-4">
        <div className="flex justify-between">
          <p className="text-gray-500 ">Subtotal</p>
          <p className="font-semibold">৳0</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-500 ">Discount</p>
          <p className="font-semibold">৳0</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-500 ">Shipment Cost</p>
          <p className="font-semibold">৳0</p>
        </div>
      </div>
      <div className="flex justify-between mt-10 mb-5">
        <p className="text-gray-500 ">Grand Total</p>
        <p className="font-semibold">৳0</p>
      </div>
      <Button
        onClick={handleOrder}
        className="w-full text-xl font-semibold py-5"
      >
        Order Now
      </Button>
    </div>
  );
}
