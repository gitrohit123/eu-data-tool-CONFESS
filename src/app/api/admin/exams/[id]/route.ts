import { NextRequest, NextResponse } from "next/server";
import Exam from "@/models/examModels";
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
    const body = await request.json();
    console.log(body);
    const response = await Exam.updateOne({ _id: params.id }, body);
    return NextResponse.json({ data: response, status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const response = await Exam.deleteOne({ _id: params.id });
    return NextResponse.json({ data: response, status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
