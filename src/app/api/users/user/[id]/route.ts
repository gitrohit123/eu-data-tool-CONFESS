import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModels";
import { connect } from "@/dbConfig/dbConfig";


connect();

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!request.body) {
      return NextResponse.json({ error: "Invalid request", status: 400 });
    }
    const newUserData = await request.json();
    const response = await User.updateOne({ _id: params.id }, newUserData);
    return NextResponse.json({ data: response, status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}