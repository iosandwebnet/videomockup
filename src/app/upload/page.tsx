"use client";

import { useState, useEffect } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { useRouter } from "next/navigation";
import "./pages.css";
import ProtectedPage from "../components/ProtectedPage";
import toast, { Toaster } from "react-hot-toast";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const router = useRouter();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setStatus("idle");
      setMessage("");
      setProgress(0);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      setFile(droppedFile);
      setStatus("idle");
      setMessage("");
      setProgress(0);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();

  const saveVideoInfo = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload-video", {
      method: "POST",
      body: formData, // no JSON, no Content-Type header needed
    });

    const data = await res.json();
    return data.video;
  };


  const handleUpload = () => {
    if (!file) return;

    setStatus("uploading");
    setMessage(`Uploading ${file.name}...`);
    setProgress(1);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);

          if (file.type.startsWith("video/")) {
            setStatus("success");
            setMessage(`✅ ${file.name} uploaded successfully`);
          } else {
            setStatus("error");
            setMessage("❌ Invalid file format");
          }

          return 100;
        }
        return prev + 1;
      });
    }, 50);
  };

  useEffect(() => {
    if (status === "success" && file) {
      (async () => {
        const savedVideo = await saveVideoInfo(file);
        if (savedVideo) {
          router.push(`/video-detail?file=${encodeURIComponent(savedVideo.name)}`);
        }
      })();
    }
  }, [status, file, router]);



  const handleLogout = () => {
    // Remove login info
    localStorage.removeItem("isLoggedIn");

    // Show toast
    toast.success("Logged out successfully ✅");

    // Redirect to login page
    setTimeout(() => {
      router.push("/login");
    }, 1000);
  };


  const handelclick = () => {
    setTimeout(() => {
      router.push("/login");
    }, 1500);
  }
  return (
    <ProtectedPage>

      <Toaster position="top-right" />
      <div className="w-full flex justify-end">
        <button
          onClick={handleLogout}
          className="logoutbutton mb-5 ml-auto py-3 px-6 rounded-lg font-semibold text-white bg-red-500 hover:bg-red-600 transition-all"
        >
          Logout
        </button>
      </div>

      <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 p-6">
        <div className="bg-white rounded-xl shadow-lg w-full p-6 mb-6 max-w-xl">
          <h1 className="text-2xl font-bold mb-6 text-center">Upload Video</h1>

          {/* Drag & Drop Upload Box */}
          <div
            className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center hover:border-blue-500 transition-all mb-6 mx-auto cursor-pointer"
            style={{ minHeight: "24vh", width: "500px", maxWidth: "90vw" }}
            // onDrop={handleDrop}
            // onDragOver={handleDragOver}
            // onClick={() => document.getElementById("fileInput")?.click()}
          >
            {/* <FiUploadCloud className="text-5xl text-gray-400 mb-3" /> */}
            {/* <p className="text-gray-500 mb-2 text-center">Drag & Drop File Here</p>
            {file && <p className="text-sm mt-2 text-gray-700">{file.name}</p>} */}
              <label className="custom-upload-button cursor-pointer">
                            <img src="/videos/uplods.png" alt="" style={{ height: "20px", width: "20px", }} /> &nbsp; Choose File
              <input
                type="file"
                id="fileInput"
                className="hidden"
                accept="video/*"
                onChange={handleFileSelect}
              />
            </label>
          </div>

          {/* Choose File Button */}
          {/* <div className="flex flex-col items-center justify-center mb-4">
            <p className="text-sm text-gray-400 mb-2">or</p>
            <label className="custom-upload-button cursor-pointer">
              <img src="/videos/uplods.png" alt="" style={{ height: "20px", width: "20px", marginBottom: "-18px" }} /> Choose File
              <input
                type="file"
                id="fileInput"
                className="hidden"
                accept="video/*"
                onChange={handleFileSelect}
              />
            </label>
          </div> */}

          {/* Upload Button */}
          <button
            className={`UploadButton mb-5 mt-4 w-full py-3 rounded-lg font-semibold text-white transition-all ${file ? "bg-gray-800 hover:bg-gray-900" : "bg-gray-400 cursor-not-allowed"
              }`}
            disabled={!file}
            onClick={handleUpload}
          >
            <img src="/videos/uplod.png" alt="" style={{ height: "20px", width: "20px", marginBottom: "-18px" }} /> &nbsp; Upload & Process
          </button>
          <br />
          {/* Progress & Status */}
          <div className="progress w-sm bg-[#ebebeb] rounded-lg mb-4 p-4 min-h-[150px] flex flex-col gap-4">

            <p className="text-sm text-gray-400"> &nbsp;  Select a file to get started</p>
            <hr className="border-t-2 border-gray-300 w-full" />
            {file && (
              <div className="flex items-center gap-4">
                {/* File name on left */}
                <div className="filenamemassges   w-1/1 text-gray-700 font-medium">{file.name}</div>

                {/* Progress bar on right */}
                <div className="w-2/3">
                  {status === "uploading" && (
                    <div>
                      <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-1">
                        <img src="/videos/uplod.jpg" alt="" />  Uploading progress:
                      </label>
                      <progress
                        id="file"
                        value={progress}
                        max="100"
                        className="w-lg h-4"
                      >
                        {progress}%
                      </progress>
                      {/* <p className="text-sm text-blue-600 mt-1">{progress}%</p> */}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Message below */}
            {message && (
              <p
                className={`message text-sm ${status === "error" ? "text-red-500" : "text-gray-700"} mt-3`}
              >
                {message}
              </p>
            )}
          </div>
        </div>
        {/* <div
    className="mb-5 mt-4 w-full py-3 rounded-lg font-semibold text-white bg-red-500 hover:bg-red-600 text-center cursor-pointer transition-all"
    onClick={handelclick}
  >
    Logout Button
  </div> */}
      </div>



    </ProtectedPage>

  );
}
