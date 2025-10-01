"use client";

import { useRouter } from "next/navigation";
import ProtectedPage from "../components/ProtectedPage";
export default function PaymentPage(): JSX.Element {
  const router = useRouter();

  const handlePayNow = () => {
    // Redirect to upload page
    router.push("/upload");
  };

  return (
    <ProtectedPage>
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-100 to-indigo-200 p-6">
      
      {/* Payment illustration */}
      <img
        src="https://png.pngtree.com/png-clipart/20190916/ourmid/pngtree-stereo-smart-payment-bill-png-image_1730282.jpg" // Place your image in public folder
        alt="Payment Illustration"
        className="w-64 h-64"
      />
      {/* <p className="text-center text-gray-600 mb-6">
        Click the button below to proceed with your payment and continue.
      </p> */}

      {/* Pay Now Button */}
      <button style={{backgroundColor:"black",color:"white",padding:"10px 25px",borderRadius:"5px"}}
        onClick={handlePayNow}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-xl shadow-lg transition-all"
      >
        Pay Now
      </button>
    </div>
    </ProtectedPage>
  
  );
}
