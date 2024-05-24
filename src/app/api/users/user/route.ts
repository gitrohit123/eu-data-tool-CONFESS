import { getTokenData } from "@/helpers/getTokenData";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModels";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value || "";
    const userId = await getTokenData(token);
    const user = await User.findById({ _id: userId }).select("-password");
    return NextResponse.json({ data: user, status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}

export const dynamic = "force-dynamic";
