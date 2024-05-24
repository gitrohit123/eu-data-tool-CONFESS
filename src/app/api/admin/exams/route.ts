import { NextRequest, NextResponse } from "next/server";
import Exam from "@/models/examModels";
import { connect } from "@/dbConfig/dbConfig";

connect();



export async function POST(request: NextRequest) {
  try {
    if (!request.body) {
      return NextResponse.json({ error: "Invalid request", status: 400 });
    }
    const body = await request.json();
    const exam = new Exam(body);
    const response = await exam.save();
    return NextResponse.json({ data: response, status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}

