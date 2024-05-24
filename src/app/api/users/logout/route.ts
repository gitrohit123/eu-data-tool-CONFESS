import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json({
      message: "Logout successful",
      status: 200,
    });
    response.cookies.delete("token");
    response.cookies.delete("name");
    response.cookies.delete("admin");
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
