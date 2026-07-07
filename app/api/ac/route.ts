import { NextRequest, NextResponse } from "next/server";
import { getAcSubmissions } from "@/lib/leetcode";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const username = url.searchParams.get("username");
  
  if (!username) {
    return NextResponse.json({ error: "Username is required" }, { status: 400 });
  }

  try {
    const submissions = await getAcSubmissions(username, 50);
    return NextResponse.json(submissions);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch submissions" }, { status: 500 });
  }
}
