// import { NextRequest, NextResponse } from "next/server";
// import fs from "fs";
// import path from "path";

// export async function POST(req: NextRequest) {
//   try {
//     const { name, type } = await req.json();
//     const filePath = path.join(process.cwd(), "data", "uploads.json");

//     let data: any[] = [];
//     if (fs.existsSync(filePath)) {
//       const fileContent = fs.readFileSync(filePath, "utf-8");
//       data = fileContent ? JSON.parse(fileContent) : [];
//     }

//     const newVideo = {
//       id: Date.now(),
//       name,
//       type,
//       uploadedAt: new Date().toISOString(),
//     };

//     data.push(newVideo);
//     fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

//     return NextResponse.json({ success: true, video: newVideo });
//   } catch (err) {
//     return NextResponse.json({ success: false, error: "Failed to save video" }, { status: 500 });
//   }
// }



import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false, // keep false if you want streaming, but optional for simple file save
  },
};

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ success: false, error: "No file uploaded" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Save file to public/videos
    const filePath = path.join(process.cwd(), "public/videos", file.name);
    fs.writeFileSync(filePath, buffer);

    // Save metadata to uploads.json
    const uploadsPath = path.join(process.cwd(), "data/uploads.json");
    let data: any[] = [];
    if (fs.existsSync(uploadsPath)) {
      const fileContent = fs.readFileSync(uploadsPath, "utf-8");
      data = fileContent ? JSON.parse(fileContent) : [];
    }

    const newVideo = {
      id: Date.now(),
      name: file.name,
      type: file.type,
      uploadedAt: new Date().toISOString(),
    };

    data.push(newVideo);
    fs.writeFileSync(uploadsPath, JSON.stringify(data, null, 2));

    return NextResponse.json({ success: true, video: newVideo });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: "Upload failed" }, { status: 500 });
  }
}
