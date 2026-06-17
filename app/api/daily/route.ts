import { getDailyQuestion } from "@/lib/leetcode";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const daily = await getDailyQuestion();
    return NextResponse.json(daily);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
