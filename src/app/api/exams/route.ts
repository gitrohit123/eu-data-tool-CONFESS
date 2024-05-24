import { NextRequest, NextResponse } from "next/server";
import Exam from "@/models/examModels";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
  try {
    const exams = await Exam.find({});
    return NextResponse.json({ data: exams, status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}