import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "data", "uploads.json");
    const data = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath, "utf-8")) : [];
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch videos" }, { status: 500 });
  }
}
