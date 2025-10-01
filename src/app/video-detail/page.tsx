"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProtectedPage from "../components/ProtectedPage";

import "./pages.css";

interface VideoData {
  id: number;
  name: string;
  type: string;
  uploadedAt: string;
}

interface Thumbnail {
  id: number;
  title: string;
  Duration: string;
  img: string;
}

export default function VideoDetailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fileName = searchParams.get("file") || "";
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [synopsis, setSynopsis] = useState<string>("Editable synopsis here...");
  const [captions, setCaptions] = useState<string>("Captions panel here...");

  const thumbnails: Thumbnail[] = [
    { id: 0, title: "filename1_v2.mp4", Duration: "Duration: 30:10", img: "/videos/themnal.jpg" },
    { id: 1, title: "Thumbnail 2", Duration: "Duration: 30:10", img: "/videos/themnal.jpg" },
    { id: 2, title: "Thumbnail 3", Duration: "Duration: 30:10", img: "/videos/downloads.jpg" },
  ];

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const res = await fetch("/api/get-videos");
        const data: VideoData[] = await res.json();
        const video = data.find((v) => v.name === fileName);
        if (video) setVideoData(video);
      } catch (err) {
        console.error("Failed to fetch video data", err);
      }
    };
    if (fileName) fetchVideoData();
  }, [fileName]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const handleDownload = () => {
    if (!videoData) return;
    const link = document.createElement("a");
    link.href = `/api/get-videos?file=${videoData.name}`;
    link.download = videoData.name;
    link.click();
  };

  return (
    <ProtectedPage>
      <div className="video-detail-container">
        {/* Display all thumbnails */}
        <div className="thumbnails-grid">
          {thumbnails.map((thumb) => (
            <div key={thumb.id} className="thumbnail-card">
              <img src={thumb.img} alt={thumb.title} />
              <p>
                {thumb.title} <br />
                <span>
                  {thumb.Duration} <br />
                  Uploaded: 01 Oct, 2025
                </span>
              </p>
              {videoData && (
                <button className="download-button" onClick={handleDownload}>
                  <img
                    style={{ height: "17px", width: "20px" }}
                    src="/videos/down.png"
                    alt="Download"
                    className="download-icon"
                  />
                  Download Video
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Captions Panel with button inside textarea */}
        <div className="synopsis-container relative w-full max-w-md">
          {/* <label className="font-semibold mb-2 block">Captions Panel</label> */}

          <div className="relative">
            <textarea
              value={captions}
              onChange={(e) => setCaptions(e.target.value)}
              className="w-full h-32 p-2 pl-40 border rounded-lg resize-none"
            ></textarea>

            <button
              onClick={() => handleCopy(captions)}
              className="copybox absolute left-2 top-2 bg-blue-500 text-white px-3 py-1 rounded shadow"
            >
              <img src="/videos/copy.png" alt="" style={{height:"15px",width:"18px"}} />    Copy
            </button>
          </div>
        </div>



<br />

 <div className="synopsis-container relative w-full max-w-md mt-3">
          {/* <label className="font-semibold">Synopsis Panel</label> */}

          <div className="relative">
            <textarea
              value={synopsis}
              onChange={(e) => setSynopsis(e.target.value)}
              className="w-full h-32 p-2 pl-20 border rounded-lg resize-none"
            ></textarea>

            <button
              onClick={() => handleCopy(synopsis)}
              className="copybox absolute left-2 top-2 bg-blue-500 text-white px-3 py-1 rounded shadow"
            >
          <img src="/videos/copy.png" alt="" style={{height:"15px",width:"18px"}} />    Copy
            </button>
          </div>
        </div>
        {/* Synopsis Panel */}
      
      </div>
    </ProtectedPage>
  );
}
