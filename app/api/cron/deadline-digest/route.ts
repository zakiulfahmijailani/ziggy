import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (!process.env.CRON_SECRET || authHeader !== `Bearer ${process.env.CRON_SECRET}`) return new NextResponse("Unauthorized", { status: 401 });
  // Future connected mode: query Prisma for approaching deadlines and send a digest.
  return NextResponse.json({ ok: true, message: "Ziggy’s daily deadline check completed." });
}
