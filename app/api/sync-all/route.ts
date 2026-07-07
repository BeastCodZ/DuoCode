import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { sessionCookie } = await req.json();

    if (!sessionCookie) {
      return NextResponse.json({ error: "LEETCODE_SESSION cookie is required" }, { status: 400 });
    }

    const response = await fetch("https://leetcode.com/api/problems/all/", {
      method: "GET",
      headers: {
        "Cookie": `LEETCODE_SESSION=${sessionCookie}`,
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
        "Referer": "https://leetcode.com/",
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch from LeetCode. Invalid session or rate limited." }, { status: response.status });
    }

    const data = await response.json();

    if (!data.stat_status_pairs) {
      return NextResponse.json({ error: "Invalid response format from LeetCode" }, { status: 500 });
    }

    const acceptedSlugs = data.stat_status_pairs
      .filter((item: any) => item.status === "ac")
      .map((item: any) => item.stat.question__title_slug);

    return NextResponse.json({
      success: true,
      count: acceptedSlugs.length,
      slugs: acceptedSlugs,
    });
  } catch (error) {
    console.error("Error in /api/sync-all:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
