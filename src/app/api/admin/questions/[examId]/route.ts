import { NextRequest, NextResponse } from "next/server";
import Question from "@/models/questionModels";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function PUT(
    request: NextRequest,
    { params }: { params: { examId: string } }
  ) {
    try {
      if (!request.body) {
        return NextResponse.json({ error: "Invalid request", status: 400 });
      }
      const body = await request.json();
      const res = await Question.updateOne({ _id: body._id }, { ...body });
      return NextResponse.json({ data: res, status: 200 });
    } catch (error: any) {
      return NextResponse.json({ error: error.message, status: 500 });
    }
  }
  
  export async function DELETE(
    request: NextRequest,
    { params }: { params: { examId: string } }
  ) {
    try {
      const response = await Question.deleteOne({ _id: params.examId });
      return NextResponse.json({ data: response, status: 200 });
    } catch (error: any) {
      return NextResponse.json({ error: error.message, status: 500 });
    }
  }
  