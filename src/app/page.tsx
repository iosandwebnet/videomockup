import Image from "next/image";
import UploadPage from "./upload/page";
import LoginPage from "./login/page";
export default function Home() {
  return (
   <div className="flex items-center justify-center h-screen bg-blue-200">
      <LoginPage />
    </div>
  );
}
