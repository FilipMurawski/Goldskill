import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  if (!session?.user) {
    return new NextResponse(
      JSON.stringify({ status: "fail", message: "You are not logged in" }),
      { status: 401 }
    );
  }

  return NextResponse.json({
    authenticated: !!session,
    session,
  });
}
